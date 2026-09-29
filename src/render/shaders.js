// Ink materials. Solids are unlit (Classic) or 2-step toon with hard sun shadows
// (Neobrutalist) from the SAME shader, switched by uniforms. Edges are fat
// screen-space lines computed per primitive on the GPU: creases are always drawn,
// smooth edges only where they form a silhouette from the current viewpoint.
import * as THREE from 'three';
import { palette, NUM_ROLES, R } from './palette.js';

export const SU = {
  uPalette: { value: palette },
  uLightDir: { value: new THREE.Vector3(-0.45, 0.8, 0.38).normalize() },
  uToon: { value: 0 },
  uShadowAmt: { value: 0 },
  uLineWidth: { value: 1.2 },
  uMinWidth: { value: 1.0 },
  uTaper: { value: 22 },
  uTaperMin: { value: 0.3 },
  // fine-detail ink (window bars, roof tiles, seat rows, bracing) is only drawn this close
  uDetailDist: { value: 50 },
  // edges that end up shorter than this many pixels are not drawn (far detail would
  // otherwise turn into a smear of ink), and figures further away than uCreaseDist
  // keep only their outline instead of every interior crease
  uCullPx: { value: 3 },
  uCreaseDist: { value: 20 },
  uResolution: { value: new THREE.Vector2(1280, 720) },
  uTime: { value: 0 },
  uCrowd: { value: 0 },
  uParts: { value: null },
  uAtlas: { value: null },
  uNetA: { value: new THREE.Vector4(0, 0, 0, 0) },
  uNetDA: { value: new THREE.Vector3(1, 0, 0) },
  uNetB: { value: new THREE.Vector4(0, 0, 0, 0) },
  uNetDB: { value: new THREE.Vector3(-1, 0, 0) },
};

const PARTS_GLSL = /* glsl */`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`;

const CROWD_GLSL = /* glsl */`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`;

const NET_GLSL = /* glsl */`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netDisp(vec3 p) {
  vec3 da = p - uNetA.xyz; vec3 db = p - uNetB.xyz;
  float fa = uNetA.w * exp(-dot(da, da) / 0.5);
  float fb = uNetB.w * exp(-dot(db, db) / 0.5);
  return uNetDA * fa + uNetDB * fb;
}
`;

// ---------------------------------------------------------------------------
const solidVert = /* glsl */`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${PARTS_GLSL}
#endif
#ifdef CROWD
attribute vec2 aBob;
${CROWD_GLSL}
#endif
uniform vec3 uPalette[${NUM_ROLES}];
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
  vec3 transformed = position;
  vec3 objectNormal = normal;
#ifdef CROWD
  transformed.y += crowdLift(aBob);
#endif
#ifdef PARTS
  mat4 pm = partMatrix(aPart);
  transformed = (pm * vec4(transformed, 1.0)).xyz;
  objectNormal = mat3(pm) * objectNormal;
#endif
  vColor = uPalette[int(aRole + 0.5)];
#ifdef USE_ATLAS
  vUv2 = uv;
#else
  vUv2 = vec2(-1.0);
#endif
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * objectNormal);
  vec4 mvPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;
  vec3 transformedNormal = normalMatrix * objectNormal;
  #include <shadowmap_vertex>
  #include <fog_vertex>
}
`;

const solidFrag = /* glsl */`
uniform float uToon;
uniform float uShadowAmt;
uniform vec3 uLightDir;
#ifdef USE_ATLAS
uniform sampler2D uAtlas;
#endif
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
  vec3 base = vColor;
#ifdef USE_ATLAS
  if (vUv2.x >= 0.0) {
    float a = texture2D(uAtlas, vUv2).a;
    if (a < 0.5) discard;
  }
#endif
  vec3 n = normalize(vNormalW);
  if (!gl_FrontFacing) n = -n;
  float ndl = dot(n, uLightDir);
  // Classic: near-unlit paper with a whisper of form shading
  float classic = 0.9 + 0.08 * clamp(ndl * 0.5 + 0.5, 0.0, 1.0) + 0.02 * clamp(n.y, 0.0, 1.0);
  // Neobrutalist: two tone steps and hard sun shadows
  float sh = mix(1.0, getShadowMask(), uShadowAmt);
  float lit = step(0.1, ndl) * sh;
  float toon = mix(0.68, 1.0, lit);
  float shade = mix(classic, toon, uToon);
  gl_FragColor = vec4(base * shade, 1.0);
  #include <fog_fragment>
}
`;

export function makeSolidMaterial(o = {}) {
  const defines = {};
  if (o.parts) defines.PARTS = '';
  if (o.crowd) defines.CROWD = '';
  if (o.atlas) defines.USE_ATLAS = '';
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.lights, THREE.UniformsLib.fog]);
  Object.assign(uniforms, {
    uPalette: SU.uPalette, uLightDir: SU.uLightDir, uToon: SU.uToon, uShadowAmt: SU.uShadowAmt,
    uParts: SU.uParts, uAtlas: SU.uAtlas, uTime: SU.uTime, uCrowd: SU.uCrowd,
  });
  const m = new THREE.ShaderMaterial({
    uniforms, defines, vertexShader: solidVert, fragmentShader: solidFrag,
    lights: true, fog: o.fog !== false,
    side: o.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
  });
  return m;
}

// ---------------------------------------------------------------------------
const edgeVert = /* glsl */`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${PARTS_GLSL}
#endif
#ifdef CROWD
attribute vec2 iBob;
${CROWD_GLSL}
#endif
#ifdef NET
${NET_GLSL}
#endif
uniform float uLineWidth;
uniform float uWidthScale;
uniform float uMinWidth;
uniform float uTaper;
uniform float uTaperMin;
uniform float uDetailDist;
uniform float uCullPx;
uniform float uCreaseDist;
uniform vec2 uResolution;
#include <common>
#include <fog_pars_vertex>

void trimSegment(const in vec4 start, inout vec4 end) {
  float a = projectionMatrix[2][2];
  float b = projectionMatrix[3][2];
  float nearEstimate = -0.5 * b / a;
  float alpha = (nearEstimate - start.z) / (end.z - start.z);
  end.xyz = mix(start.xyz, end.xyz, alpha);
}

void main() {
  vec3 a = iA, b = iB, n1 = iN1, n2 = iN2;
#ifdef PARTS
  if (iMeta.x >= 0.0) {
    mat4 pm = partMatrix(iMeta.x);
    a = (pm * vec4(a, 1.0)).xyz; b = (pm * vec4(b, 1.0)).xyz;
    n1 = mat3(pm) * n1; n2 = mat3(pm) * n2;
  }
#endif
#ifdef CROWD
  float lift = crowdLift(iBob);
  a.y += lift; b.y += lift;
#endif
#ifdef NET
  a += netDisp(a); b += netDisp(b);
#endif
  vec4 wa = modelMatrix * vec4(a, 1.0);
  vec4 wb = modelMatrix * vec4(b, 1.0);
  // iMeta.y: 1 = crease, +2 = fine detail that fades out with distance
  float detail = step(1.5, iMeta.y);
  float crease = iMeta.y - 2.0 * detail;
  float camDist = length(0.5 * (wa.xyz + wb.xyz) - cameraPosition);
  if (detail > 0.5 && camDist > uDetailDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  bool boundary = dot(n2, n2) < 0.01;
  if (!boundary) {
    vec3 V = 0.5 * (wa.xyz + wb.xyz) - cameraPosition;
    float d1 = dot(mat3(modelMatrix) * n1, V);
    float d2 = dot(mat3(modelMatrix) * n2, V);
    bool silhouette = d1 * d2 <= 0.0;
    bool visibleCrease = crease > 0.5 && (d1 < 0.0 || d2 < 0.0);
    if (!silhouette && !visibleCrease) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#ifdef PARTS
    // far figures keep their outline only, not the creases between their parts
    if (!silhouette && camDist > uCreaseDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#endif
  }
  vec4 start = viewMatrix * wa;
  vec4 end = viewMatrix * wb;
  if (start.z < 0.0 && end.z >= 0.0) trimSegment(start, end);
  else if (end.z < 0.0 && start.z >= 0.0) trimSegment(end, start);
  vec4 clipStart = projectionMatrix * start;
  vec4 clipEnd = projectionMatrix * end;
  vec3 ndcStart = clipStart.xyz / clipStart.w;
  vec3 ndcEnd = clipEnd.xyz / clipEnd.w;
  float aspect = uResolution.x / uResolution.y;
  // edges that are only a few pixels long are dropped
  if (length((ndcEnd.xy - ndcStart.xy) * 0.5 * uResolution) < uCullPx) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 dir = ndcEnd.xy - ndcStart.xy;
  dir.x *= aspect;
  dir = normalize(dir);
  vec2 offset = vec2(dir.y, -dir.x);
  dir.x /= aspect;
  offset.x /= aspect;
  if (position.x < 0.0) offset *= -1.0;
  // square caps so thick lines join cleanly at corners
  offset += (position.y < 0.5) ? -dir : dir;
  vec4 clip = (position.y < 0.5) ? clipStart : clipEnd;
  // thick ink thins out with distance so far figures stay readable
  float wpx = uLineWidth * uWidthScale;
  wpx = max(min(wpx, uMinWidth), wpx * clamp(uTaper / max(clip.w, 0.1), uTaperMin, 1.0));
  offset *= wpx;
  offset /= uResolution.y;
  offset *= clip.w;
  clip.xy += offset;
  // pull the ink towards the eye by a small distance in world units (not in depth-buffer
  // units, which grow with the square of the distance and let hidden parts show through)
  clip.z += projectionMatrix[2][2] * (0.008 + 0.002 * clip.w);
  gl_Position = clip;
  vec4 mvPosition = (position.y < 0.5) ? start : end;
  #include <fog_vertex>
}
`;

const edgeFrag = /* glsl */`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;

export function makeEdgeMaterial(o = {}) {
  const defines = {};
  if (o.parts) defines.PARTS = '';
  if (o.crowd) defines.CROWD = '';
  if (o.net) defines.NET = '';
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog]);
  Object.assign(uniforms, {
    uLineWidth: SU.uLineWidth, uMinWidth: SU.uMinWidth, uTaper: SU.uTaper, uTaperMin: SU.uTaperMin, uDetailDist: SU.uDetailDist, uCreaseDist: SU.uCreaseDist,
    uCullPx: o.cull === false ? { value: 0 } : SU.uCullPx, uResolution: SU.uResolution, uParts: SU.uParts,
    uTime: SU.uTime, uCrowd: SU.uCrowd,
    uNetA: SU.uNetA, uNetDA: SU.uNetDA, uNetB: SU.uNetB, uNetDB: SU.uNetDB,
    uColor: { value: palette[o.role ?? R.INK] },
    uOpacity: { value: o.opacity ?? 1 },
    uWidthScale: { value: o.widthScale ?? 1 },
  });
  return new THREE.ShaderMaterial({
    uniforms, defines, vertexShader: edgeVert, fragmentShader: edgeFrag,
    fog: o.fog !== false, transparent: (o.opacity ?? 1) < 1, depthWrite: (o.opacity ?? 1) >= 1,
  });
}

// depth-only material for the animated batch (shadow casting)
export function makePartsDepthMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uParts: SU.uParts },
    vertexShader: `${PARTS_GLSL}\nattribute float aPart;\nvoid main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,
    fragmentShader: 'void main(){ gl_FragColor = vec4(1.0); }',
  });
}

// ---------------------------------------------------------------------------
export function makeSkyMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTop: { value: palette[R.SKY_TOP] }, uBottom: { value: palette[R.SKY_BOTTOM] } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }',
    side: THREE.BackSide, depthWrite: false, fog: false,
  });
}

export function makeBlobMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uInk: { value: palette[R.INK] } },
    vertexShader: 'attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }',
    transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
}

// flat, unlit, uses a palette role colour (markers, UI-like 3D elements)
export function makeFlatMaterial(role, opacity = 1) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: palette[role] }, uOpacity: { value: opacity } },
    vertexShader: 'void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }',
    transparent: opacity < 1, depthWrite: opacity >= 1,
  });
}

export function makeScreenMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: { uMap: { value: texture } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }',
  });
}
