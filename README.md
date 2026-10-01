# First Touch

A first-person 3D stickman football career game for the browser. You create one footballer, see every match through their eyes, and earn moves to bigger clubs purely through what you do on the pitch.

- 7v7 association football on a 64 x 42 m pitch with 5 x 2 m goals.
- Six venues: Community Ground, Town Stadium, Regional Stadium, Premier Arena, Continental Stadium and a Training Ground.
- A full career loop: create a player, join a community club, train or play fixtures, read the match report, upgrade attributes, attract offers, transfer upwards.
- Two live-switchable visual styles: **Classic** (pale ink drawing) and **Neobrutalist** (saturated, toon-shaded, 3 px outlines).
- Everything is built at load time from boxes, cylinders, spheres and cones. All sounds are synthesised with the Web Audio API and pre-rendered to buffers. No external art or audio files.

## Launching

**Offline, no install:** double-click `index.html`. It loads the prebuilt bundle `dist/game.js` as a classic script, so it works from `file://`.

**With the tiny static server (optional):**

```sh
node server.js          # http://localhost:8080
node server.js 9000     # custom port
```

**Rebuilding the bundle** (only needed after changing `src/`):

```sh
npm install             # installs esbuild (the only dev dependency)
npm run build           # writes dist/game.js (three.js is bundled from vendor/three)
npm test                # headless simulation test suite
```

three.js r186 is vendored unmodified in `vendor/three/` (MIT, see `vendor/three/LICENSE`) and bundled by esbuild into `dist/game.js`. A browser with WebGL2 is required.

## Controls

One scheme is used everywhere (tutorial text, HUD hints, menus):

| Input | Action |
| --- | --- |
| W A S D | Move, relative to where you are looking |
| Mouse | Look |
| Shift | Sprint |
| Left mouse | Shoot: hold to charge (full at ~0.65 s, fires automatically at ~0.85 s), release to strike. A tap is a quick shot. |
| Right mouse | Pass to the highlighted teammate. A tap sends the right weight for the distance; holding briefly adds power. |
| Space | With the ball: through pass into the highlighted teammate's run. Without it: call for the ball. |
| E | Standing tackle: lunges at the ball if it is within about 3 m. A press during a cooldown or a pending first-time kick is held briefly and fires as soon as possible. |
| C | Slide tackle (1.5 s cooldown, costs stamina) |
| Esc | Pause (Resume, Controls, Settings, Visual Style, Match Statistics, Exit) |

- Click the game to capture the mouse (pointer lock is requested inside the click). After Esc, browsers can refuse to re-capture for about a second; the game stays paused and asks you to click again.
- If pointer lock is unavailable or refused, you can play with **drag-look**: hold a mouse button and drag, or use the arrow keys. All other controls are unchanged.
- The browser context menu is suppressed during play. The game pauses and mutes when the tab loses focus.

### First-time tutorial

On a first visit the game opens Coach Ada's warm-up instead of the menu: nine quick drills on the training ground (find a golden star by looking around, jog to a circle, sprint to another, take the ball, dribble through a gate, pass to Jojo, receive his return pass, score past Sleepy Sam in goal, and tackle Big Barry to win the ball back). The coach card shows what to do, the controls for your device (mouse and keyboard or touch), progress dots and a timer bar, and an arrow at the screen edge points to the objective when it is out of view.

- Each drill has a par time; beating it earns a star (up to nine), and the result screen gives a rank from "Future legend" to "Superstar".
- It never runs past two minutes: every drill has a time limit after which the coach simply moves on, and the whole warm-up has a hard two-minute cap. Played normally it takes well under a minute and a half.
- Skip it at any time: **Skip tutorial** on the start card, on the coach card (tap it on touch screens), or press Esc and choose **Skip tutorial** in the pause menu.
- Once finished or skipped it never shows automatically again (remembered in the browser's local storage). It can be replayed from **Training**.

### Phones and tablets

The game runs in mobile browsers with on-screen touch controls. They appear automatically on touch screens and switch off again if you use a mouse; Settings → Touch controls can force them on or off.

| Touch | Action |
| --- | --- |
| Left thumb | Drag anywhere on the left side to move with a floating analog stick (partial push walks, pushing to the edge sprints) |
| Right thumb | Drag anywhere on the right side to look and aim |
| SHOOT | Hold to charge, release to strike; sliding your thumb on the button fine-tunes the aim |
| PASS | Pass to the ringed teammate (hold briefly for more power) |
| THRU / CALL | Through pass with the ball; call for the ball without it |
| TACKLE / SLIDE | Replace SHOOT and PASS while an opponent has the ball (they dim while on cooldown) |
| II | Pause |

- Tap to start (there is no mouse capture on touch screens). Where the browser allows it the game goes fullscreen and locks to landscape; it is best played sideways, and a hint says so in portrait. In portrait the field-of-view setting applies to the long, vertical side and the wide projection is not used.
- The HUD rearranges for thumbs: pause top-left, radar top-right, and in portrait the score drops below them. Menus scroll where they don't fit, turn into two columns on short landscape screens and one column on narrow ones.
- Touch devices start on Medium quality. During matches the render resolution also adapts: if the frame rate stays below about 42 fps it steps down (to half at most), and it steps back up when there is headroom. If a step down doesn't help, as on a phone capped at 30 fps in power-saving mode, it is undone.

### Playing tips

- **Receiving:** let the ball reach your feet (a ~1 m zone, up to 1.25 m on Assisted). The first touch softens the ball and places it in front of you, into the direction you are moving.
- **Dribbling:** while you have the ball the screen edge pulses green with **YOU HAVE THE BALL**. Your close control keeps the ball about half a metre ahead (under a metre at a full sprint) and it follows your turns; opponents can't simply step in and take it, they have to tackle. How tightly it sticks depends on the difficulty. AI players (teammates and opponents) dribble with ordinary physical touches.
- **First-time play:** press pass (or hold shoot) just before the ball arrives and you will play it first time as soon as contact is possible.
- **Passing:** look towards a teammate; a ring marks the selected receiver. Pass assistance picks the best open teammate near where you look (a wide cone on Assisted, narrower on Expert) and weighs the pass for the distance. On Assisted and Standard, a ground pass whose lane is blocked by an opponent is automatically chipped over them. With no teammate in range the pass goes into the space you are looking at.
- **Shooting:** aim with the crosshair. Low aim = low shot, higher aim = rising shot. A little assistance pulls slightly-wide shots back inside the post when you face the goal, but it never turns a bad shot into a certain goal.
- **Tackling:** press E near the ball carrier: your tackle homes in on the ball and, when it wins it, knocks it back to your feet. Approach the exposed side of the ball (not through the dribbler). Late, body-first challenges (especially from behind or with a slide) are fouls.
- **Stamina:** sprinting and sliding use stamina, jogging and walking restore it. Low stamina modestly lowers top sprint speed only.

### Settings and difficulty

- **Field of view** is horizontal, 60-200 degrees, default 100. Up to 120 degrees the view is an ordinary perspective. Wider settings switch to a wide-angle projection: the scene is rendered into a cube map around your eye and remapped to the screen, blending smoothly from the ordinary view at 120 degrees to a stereographic projection from about 175 degrees (which is what makes 200 degrees possible without extreme stretching). The wide projection draws the scene up to six times per frame (about 45-50 draw calls instead of 10-16), so use Medium or Low quality on slower machines.
- **Difficulty** changes the help you get and how sharp the opposing team is. Your teammates are never weakened.
  - *Assisted* (default): the ball sticks tightly to your feet, bigger receiving zone, accurate passes with a wide targeting cone and automatic chips over blocked lanes, strong tackle help. Opponents react and press less, make frequent passing mistakes (misdirected, under- or over-hit), take heavy touches and shoot less accurately.
  - *Standard*: a little less of each kind of help; opponents press properly and make occasional mistakes.
  - *Expert*: light assistance, no automatic chips; opponents play at full sharpness.
  - Higher-tier opponents keep more of their quality at every difficulty, so the climb through the tiers still feels harder.
- Look sensitivity defaults to 1 with a mouse and 2.25 on touch screens (phones and tablets that still had the old default of 1 are moved to 2.25 once); it goes up to 3. Invert Y, audio volumes, view bob, camera shake, goal replays, quality and match length are also in Settings.

### Goal replays

After every goal in a career or quick match, once the celebration ends (or you skip it), a cinematic replay plays before the kick-off while the match stays frozen. It shows the last couple of seconds of the build-up, the shot and the ball hitting the net, filmed from a drone that follows the scorer from behind and above (so you see yourself from the outside), then swoops down beside the goal as the ball goes in. Time slows to about a quarter of normal speed around the strike and again as the ball crosses the line, with slowed-down sound. **Skip replay** (the button, or any action: click, Space, E, or a tap on touch screens) goes straight to the kick-off. Replays can be switched off in Settings.

The view records what it draws (every player's body parts, the ball, the nets and the crowd, about 60 times a second, the last 12 seconds) and plays that back, so the replay shows exactly what happened with the same animation. The clip starts after any restart that moved players into place.

## Match rules

- 7-a-side: you, five outfield teammates and a goalkeeper against six outfield players and a goalkeeper. Goalkeepers are always AI.
- Two halves, 3 minutes each by default (2 or 5 minutes in Settings). The clock is shown scaled to a 90-minute match and stops during goal celebrations and restarts.
- Kick-offs, throw-ins, corners, goal kicks, free kicks and penalties are used. Opponents keep 6 m away at free kicks and corners, 3 m at throw-ins, and stay outside the centre circle at kick-off.
- **There is no offside** in this small-sided format.
- Keepers may handle the ball anywhere inside their own penalty area (no back-pass rule) and must release it within a few seconds.
- A goal counts only when the whole ball crosses the goal line between the posts and under the crossbar. Each goal is counted once; scoring is frozen during the celebration and restart.
- Ends are changed at halftime: team tactics, goal targets, restart positions and the radar orientation all flip.
- Balls that go out of play produce the correct restart; a ball that somehow leaves the world gets a fair throw-in/restart, never a free goal.

## Statistics (definitions)

All statistics come from the single match event stream (possession changes, kicks, receptions, tackles, shots, saves, goals, restarts), never from button presses or animations.

- **Pass attempted:** you intentionally release a pass (ground pass, through ball, cross or lofted pass).
- **Pass completed:** a teammate controls that pass (or plays it first time) before an opponent gains controlled possession or the ball goes out. A deflection alone is not possession.
- **Assist:** you made the final completed pass to a teammate who scores within 8 seconds, with no opponent possession and no further pass to another teammate in between.
- **Goal:** credited to the actual scorer at the scoring event. A defender's touch that turns in an on-target shot still counts for the shooter; otherwise it is recorded as an own goal.
- **Shot on target:** a shot that scores, or is stopped by the goalkeeper while on a trajectory into the goal. A shot blocked by an outfield player is not automatically on target.
- **Successful tackle:** your challenge dislodges an opponent's controlled ball and your team gains control within 2 seconds.
- **Interception:** you gain control of an opponent's pass while it is live (within 3 s of the pass).
- **Possession lost:** your controlled dribble or your pass ends in opponent control, or an avoidable out-of-bounds turnover. An ordinary missed shot is only a shot outcome, not a possession loss.
- Pending passes, tackles and shots are resolved exactly once and are all cleared at restarts, halftime and full time, so nothing leaks into later play. Match results and career rewards are committed once per match, even if the report is reopened.

### Match rating

Starts at 6.0, clamped to 1.0-10.0. Goals and assists give large increases; successful tackles and interceptions meaningful ones; completed passes small ones (progressive passes a little more). Repeated safe passes between the same two players decay quickly so passing in circles cannot farm a perfect rating; repeated tackles and interceptions also have diminishing returns. Possession losses, fouls, own goals and repeated speculative long shots reduce it. Contributions are weighted by position (defenders gain more from tackles, interceptions, distribution and clean sheets; forwards from scoring, chance creation and shots on target). A light positioning component rewards being in useful areas for your role without punishing creative movement, and the result and involvement adjust it slightly. The report explains the largest positive and negative changes.

## Career

- **Create a player:** name, shirt number, nationality, dominant foot, skin/hair/boot colours, preferred position (Striker, Winger, Attacking Midfielder, Central Midfielder, Defender) and starting community club. Position decides where you start, your responsibilities, how your rating is weighted, which attributes start higher and how clubs judge you.
- **Attributes:** pace, stamina, ball control, passing, finishing and tackling, starting around 44-53 with a small position bonus. Matches award development XP (participation, rating, goals, assists, wins). Every 100 XP gives an upgrade point (+3 below 60, +2 below 75, +1 above).
- **Clubs:** 20 real clubs in 5 tiers of 4, taken from the [openfootball/football.json](https://github.com/openfootball/football.json) data (public domain): the current 2026/27 Premier League, Championship and top European leagues, and League One and League Two from 2025/26, the latest season the data has for them (mid-table clubs, so ones staying in the division). Each has its real kit colours and home ground and a playing style (possession, direct, wing play, pressing, counter-attack); crests are simple generated badges with the club's initial, not the clubs' own crests. Squad players other than you are generated names. Careers saved with the earlier fictional clubs are moved to the real club in the same slot when loaded.

| Tier | League | Venue | Clubs |
| --- | --- | --- | --- |
| 1 | League Two | Community Ground | Swindon Town, Chesterfield, Bromley, Grimsby Town |
| 2 | League One | Town Stadium | Bradford City, Barnsley, Wigan Athletic, Plymouth Argyle |
| 3 | Championship | Regional Stadium | West Ham United, Wolverhampton Wanderers, Southampton, Swansea City |
| 4 | Premier League | Premier Arena | Manchester City, Arsenal, Liverpool, Chelsea |
| 5 | European Elite | Continental Stadium | Real Madrid, FC Barcelona, Bayern München, Paris Saint-Germain |

- **Seasons:** 6 league fixtures (double round robin) and a final placement. Other fixtures are simulated deterministically so the table is consistent. The top two of the European Elite meet in the **Continental Cup Final** at the Continental Stadium, with a special presentation. Winning a league or the cup adds a trophy.
- **Training:** three short drills (Passing Gates, Finishing, Dribbling Course, 45-60 s) plus untimed Free Practice. A drill gives limited XP once between matches and never counts towards club interest.
- **Club interest** uses your last 5 match ratings (rolling form), long-term reputation, position-specific contributions (e.g. goal involvement for strikers, passing accuracy and ball winning for midfielders, tackles/interceptions and distribution for defenders), appearances for your current club (3 for tier 2 clubs, 5 for tiers 3-5) and whether the club has a role for your position. Interest bars and plain-language requirements are shown in the career hub.
- **Transfer windows** open after fixture 3 and at the end of the season. Offers show the club, tier, role, wage, contract length, expectations and why the club is interested. Transfers normally move one tier up. You can accept or stay. Mid-season moves join the new club's league at the same round.
- **Pacing:** with consistently strong performances (ratings around 7.2-8.0) the elite tier takes roughly 20-25 matches; middling form stalls around tiers 3-4. Time passing and training alone never earn a move. One poor match cannot erase a good run (rolling form plus reputation).
- **Contracts:** 2-3 seasons. When a contract expires your club always offers a renewal (and a lower-tier club may offer regular football after a poor season), so there is always a playable next step.
- **Records:** appearances, goals, assists, average rating, pass accuracy, tackles and trophies across the whole career and per season, plus a timeline of debuts, first goal, first assist, transfers, windows and trophies.
- **Saving:** the career is saved after creation, training, completed matches, upgrades, transfers and season changes. The save is versioned, checksummed and keeps a backup of the previous good save; a damaged save is restored from the backup automatically, and a clear message is shown if saving fails. Starting a new career asks for confirmation before overwriting.

**Quick Match** uses exactly the same football systems with any two clubs and never changes career progress.

## Visual styles

Every surface belongs to a shared material role (pitch, lines, stands, crowd, shirt, skin, ball...). Switching style recolours those shared role colours in place and flips shader uniforms (toon shading, shadow strength, line width, fog); no material or geometry is rebuilt and the simulation is never touched, so switching mid-match preserves positions, velocities, the ball, stamina, score, clock, AI decisions and statistics. The choice is saved in `localStorage`. The Visual Style menu shows previews rendered by the game itself.

- **Classic:** pale unlit surfaces, thin (~1.2 px) black ink edges on every primitive, simple shading, restrained team colours, light distance fog, paper-like UI.
- **Neobrutalist:** saturated pitch, cyan gradient sky with outlined clouds, colourful stands, vivid kits, 3 px outlines, two-step toon shading with hard sun shadows, UI with 3 px borders and hard offset shadows, bold score cards and geometric celebration bursts.

### Models and scenery

- **Players** have smooth, rounded bodies (torso, shorts, sleeves, socks and boots are lofted from cross-sections rather than boxes), a face with eyes, brows, nose, mouth and ears, one of several hair styles (crop, curls, buzz cut, quiff, bun) or a beard, hands with thumbs, studded boots with laces, and padded keeper gloves. Kits follow each club's design: stripes, a chest band, halves or contrast sleeves, trims in the club's second colour, a back number that follows the curve of the shirt, a small front number and a crest.
- **Surroundings:** terraced, gabled, hipped and cottage houses (with dormers) with tiled roofs, chimneys, framed windows with sills, doors, gutters and front gardens with picket fences or hedges; pines, broadleaf trees, poplars and bushes; clubhouses with verandas and name boards; stands with aisles, seat rows, railings and roof trusses; lattice floodlight towers with ladders and banks of lamps; dugouts with perspex canopies and bucket seats; spectators with scarves and bobble hats (and arms on High quality in the front rows).
- **Ink and distance:** outlines are depth-tested as if they sat 2-15 cm nearer the eye along the same view ray (more with distance), so the outline of a hidden part (the far leg, a player behind another, a stand behind a wall) never shows through what is in front of it. Players' ink is a little finer than the scenery's, lines thin out with distance, and far players keep just their outline. Fine ink lines (roof tiles, window bars, seat rows, truss bracing, garden fences) are dropped beyond about 34 m in Neobrutalist and 45 m in Classic, so distant figures and stands stay readable instead of turning into solid ink. The Quality setting also sets how round the players are (studs only on High, no laces on Low); Medium drops glazing bars and some tree and bush clumps, and Low simplifies the scenery further (no gardens or roof tile lines). The layout of houses and trees is the same at every quality.

## How it works (technical notes)

- **Simulation** (`src/sim`) is independent of rendering and runs at a fixed 120 Hz with interpolated rendering. The ball has one authoritative model with explicit states (free, controlled, airborne, held, dead), gravity, drag, rolling resistance, energy-losing bounces, substepped swept collisions against posts, crossbar, nets and bodies, and an inelastic net that absorbs goals. Only one player controls the ball at a time; simultaneous claims resolve deterministically.
- **Actions** have anticipation, an explicit contact moment and follow-through; the ball impulse and the contact sound happen at the contact tick, and only if the ball is inside the kicking foot's reach. Kickers cannot recapture the ball for 250 ms.
- **Dribbling** for AI players is physical: short foot-contact impulses timed from the gait (alternating feet) push the ball ahead; sprinting pushes it further (interception chances), turning takes more than one touch at speed. Your own dribbling uses assisted close control: the ball is steered each tick toward a point just ahead of your feet (leading your run, biased toward where you look) with a spring whose strength depends on the difficulty, while your feet still animate touches on the stride.
- **AI** teammates and opponents use the same movement limits, contact rules and cooldowns as you: formation zones that shift with the ball, one presser plus a cover player, marking, support triangles, forward runs, anticipation of where the ball will be, separation steering and stuck recovery. Tiers change reaction time and decision quality only. The difficulty setting additionally handicaps only the team playing against you (see Settings and difficulty). Keepers position on the ball-goal line, react after a delay, dive with limited reach, catch or parry only on physical contact, and distribute within a few seconds.
- **Rendering** (`src/render`) uses three.js with custom shaders. Edges are fat screen-space lines computed per primitive on the GPU: crease edges are always drawn, smooth edges only where they form a silhouette from the current viewpoint, so spheres and cylinders get clean outlines. All players and the ball are one mesh plus one edge batch whose rigid parts are posed from a float texture; static stadium geometry (including thousands of spectators, animated in the vertex shader) is merged into one mesh and one edge batch. A match typically renders in 12-16 draw calls.
- **Animation** is procedural: feet are planted in world space from the simulation's gait phase (no foot sliding), legs and arms use two-bone IK, and kicks, tackles, slides, keeper dives, throw-ins, falls and celebrations are pose layers driven by the same action timers as the simulation.
## Tests

```sh
npm test                      # physics, rules, statistics definitions, halftime, determinism
node tests/multi.mjs 8 1      # 8 full AI matches at tier 1: flow and stall detection
node tests/human.mjs 4 ST 1   # full matches with a scripted player driving the real controls
node tests/career.mjs ST 20   # headless career: fixtures, windows, transfers, save/backup/corruption
node tests/pacing.mjs         # matches needed to reach the elite tier by form
node tests/shooting.mjs 1     # shot placement vs keeper at a given tier
```

Browser checks (require Playwright with Chromium, `node server.js` running) write screenshots to `tests/out/`: `tests/browser.mjs` (venues and styles), `tests/flow.mjs` (create career → match → report → hub, reload persistence), `tests/ui.mjs` (menus, pause, settings), `tests/drills.mjs`, `tests/fulltime.mjs`, `tests/styleswitch.mjs` (mid-match style switch leaves the simulation identical), `tests/robust.mjs` (focus loss, corrupted save), `tests/fp.mjs`, `tests/poses.mjs`, `tests/net.mjs`, `tests/bigvenues.mjs [classic|neo]`, `tests/fov.mjs` (normal and wide field of view), `tests/possession.mjs` (possession glow in both styles), `tests/controls.mjs` (real keyboard/mouse: E tackles, W+Shift dribbling while swinging the view, FOV slider), `tests/mobile.mjs [classic|neo]` (phone emulation with real multi-touch: menus fit, tap to play, stick, look, both thumbs at once, SHOOT/PASS/TACKLE, pause; landscape and portrait), `tests/mobile-screens.mjs` (settings, visual style and match report on phone screens), `tests/replay.mjs [classic|neo]` (scores real goals: the replay starts after the celebration with the match frozen, the drone stays above and away from the player, it ends on its own, Skip and any action end it at once, the kick-off follows, and none with the setting off), `tests/ink.mjs [classic|neo] [port]` (players from 4 to 60 m, players standing one behind another, and a far stand: no see-through outlines, no solid ink), `tests/anim.mjs [port]` (frame-to-frame jumps of every body part over a match), `tests/models.mjs [classic|neo] [home] [away] [high|medium|low]` (close-ups of the player line-up, faces, boots, houses, trees, floodlights and stands), `tests/tutorial.mjs [classic|neo]` (first visit shows the tutorial, a scripted player completes it inside two minutes, an idle player is still done in time, the result screen, never shown again after finishing or skipping, skip from the start card, the pause menu and the coach card on phones). Automated browsers don't get the first-run tutorial unless the URL has `?tutorial`.

`node tests/human.mjs 4 ST 1 standard` takes the difficulty as a fifth argument and also reports the opposing team's pass completion, shots and goals.

## Remaining limitations

- Keepers are always AI-controlled; there are no substitutions, cards or injuries.
- Throw-ins, corners, free kicks and kick-offs are taken by you only when you are the natural taker (nearest or fouled player, or the striker at kick-off); otherwise a teammate takes them.
- Heading is not modelled: high balls are controlled with the chest/thigh zone (up to about 1 m) or bounce off players.
- The crowd, scoreboards and advertising are decorative; the crowd reacts to danger and goals through sound and animation only.
- Performance was verified for draw calls and geometry budgets; very large stadiums (Premier Arena, Continental Stadium) are the heaviest scenes (the Continental Stadium is about 520k vertices on High quality, the 14 players about 200k; on Medium, the default on phones, the community ground is about 78k and the players about 115k), and the Medium and Low quality settings reduce model detail, crowd density and resolution for weaker GPUs.
- Audio is synthesised procedurally and is intentionally simple.
- On phones, fullscreen and landscape lock depend on the browser: iPhone browsers and some embedded views don't allow them, so turn the phone sideways yourself. Touch controls were tested with Chromium's phone emulation and real multi-touch events rather than on physical devices, and how smoothly the game runs depends on the phone's GPU (the adaptive resolution helps; Low quality helps more).
- The wide field-of-view projection (above 120 degrees) renders cube-map faces without multisampling; faces are rendered slightly above screen resolution to soften edges, but lines can look a little rougher than in the normal view.
