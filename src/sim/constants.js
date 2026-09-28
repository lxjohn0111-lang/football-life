// Pitch, ball and timing constants (metres, seconds, Y up).
// Team 0 attacks +X in the first half.

export const DT = 1 / 120; // fixed physics timestep

export const PITCH = {
  L: 64, W: 42,
  HL: 32, HW: 21,
};

export const GOAL = {
  W: 5, HW: 2.5, H: 2.0,
  DEPTH: 1.6,        // depth of the net box at ground level
  TOP_DEPTH: 1.0,    // depth of the roof of the net
  POST_R: 0.06,
};

export const AREA = {
  PEN_D: 9, PEN_HW: 10,       // penalty area depth and half width
  GOAL_D: 3, GOAL_HW: 4.5,    // goal area
  SPOT: 7.5,                  // penalty spot distance
  CIRCLE_R: 6,                // centre circle
  ARC_R: 5,                   // penalty arc radius around the spot
  CORNER_R: 1,
};

export const WORLD = { HL: 40, HW: 29 }; // perimeter boards that keep a dead ball recoverable

export const BALL_R = 0.11;
export const G = 9.81;

export const BALL = {
  AIR_DRAG: 0.0125,     // quadratic drag coefficient (1/m)
  ROLL_A0: 0.6,         // constant rolling deceleration m/s^2
  ROLL_C: 0.014,        // quadratic rolling deceleration (1/m)
  BOUNCE: 0.55,         // grass restitution
  BOUNCE_FRICTION: 0.82,
  MAGNUS: 0.003,
};

export const RULES = {
  RESTART_DIST: 6,        // opponents keep this distance at free kicks/corners
  THROW_DIST: 3,
  KICK_RELEASE_LOCK: 0.25, // kicker cannot recapture after a kick
  CONTROL_RADIUS: 1.0,   // generous receiving zone around the feet
  CONTROL_HEIGHT: 1.0,
  PROTECT_RADIUS: 1.15,  // opponents cannot take a ball this close to its controller without a tackle
  LOSE_RADIUS: 4.0,      // controller loses control beyond this distance
  ASSIST_WINDOW: 8,
  TACKLE_WINDOW: 2,
  SLIDE_COOLDOWN: 1.5,
  TACKLE_COOLDOWN: 0.55,
  REQUEST_COOLDOWN: 1.6,
  INPUT_BUFFER: 0.15,
  GK_MAX_HOLD: 4.0,
};

export const HALF_LENGTHS = { short: 120, normal: 180, long: 300 };
export const MATCH_MINUTES = 90; // displayed clock is scaled to a 90 minute match

export const ROLES = ['GK', 'DEF', 'CM', 'AM', 'W', 'ST'];
export const POSITIONS = [
  { id: 'ST', name: 'Striker' },
  { id: 'W', name: 'Winger' },
  { id: 'AM', name: 'Attacking Midfielder' },
  { id: 'CM', name: 'Central Midfielder' },
  { id: 'DEF', name: 'Defender' },
];
