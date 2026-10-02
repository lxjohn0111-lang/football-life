# First Touch: CrazyGames submission

Everything needed to submit First Touch to CrazyGames (developer.crazygames.com).

| Path | What it is |
| --- | --- |
| `first-touch-crazygames.zip` | **Upload this.** `index.html` and `game.js` at the zip's root (about 260 KB). |
| `upload/` | The same two files unzipped, if you prefer to upload a folder or test locally. |
| `covers/landscape-1920x1080.png` | Cover, landscape 16:9 |
| `covers/portrait-800x1200.png` | Cover, portrait 2:3 |
| `covers/square-800x800.png` | Cover, square 1:1 |

The covers are rendered from the game itself and carry only the game's title (no logos, borders or other text).

## Upload steps

1. Developer portal → **Submit game** → **HTML5**. Upload `first-touch-crazygames.zip` (or the files in `upload/`). The entry file is `index.html`.
2. **Progress Save: turn it ON.** The game saves the career, settings, visual style and tutorial state through the SDK's data module. If the toggle is off the data module is disabled; the game then falls back to the browser's localStorage, so nothing breaks, but saves won't follow logged-in players across devices.
3. SDK: HTML5 SDK **v3** (already loaded by `index.html`).
4. Fill in the fields below, add the three covers, then check the game in the portal's preview/QA tool before submitting (see "Checking it" below).

## Portal fields

**Title:** First Touch

**Short description:**
A first-person 3D football career: one player, every match through your own eyes, from League Two to the Continental Cup Final.

**Description:**
Create your footballer and live every 7v7 match through their eyes. Sprint into space, call for the ball, take a first touch, and pick your shot past a keeper who dives for real. There is no game-wide camera and no switching players: you are one player, and what you do on the pitch is all that counts.

Start at a community club and work your way up five tiers, from League Two to the European Elite. Play fixtures, train between matches, read your match report and rating, and spend upgrade points on pace, stamina, ball control, passing, finishing and tackling. Clubs watch your form; when the transfer window opens, the offers come in.

- First-person football with full physics: spin, bounces, posts, nets
- Career mode: 5 tiers, seasons, league tables, transfers, contracts, trophies and the Continental Cup Final
- Quick Match with any two clubs, plus training drills and a 2-minute tutorial
- Goal replays from a drone camera
- Two visual styles: Classic ink drawing and bold Neobrutalist toon shading
- Plays on desktop and on phones and tablets with touch controls
- Progress is saved automatically

**Controls (desktop):**
- W A S D: move
- Mouse: look (click the game to capture the mouse)
- Shift: sprint
- Left mouse: shoot (hold to charge, release to strike)
- Right mouse: pass to the highlighted teammate
- Space: through pass with the ball, call for the ball without it
- E: tackle
- C: slide tackle
- Esc: pause

**Controls (mobile):**
- Left thumb: move (floating stick, push to the edge to sprint)
- Right thumb: look and aim
- SHOOT (hold to charge), PASS, THRU / CALL
- TACKLE and SLIDE replace them while the opponent has the ball
- II: pause

**Category:** Sports. **Tags:** soccer, football, 3d, first person, career, stickman, sports, mobile.

**Platforms and orientation:** desktop and mobile (phones and tablets). Best played in landscape; in portrait the game still works and shows a hint to turn the phone.

**Other answers:** single player, no multiplayer, no in-game purchases, no external links, no chat, no user-generated content. English only. Works without an account.

## What the game does with the SDK

All in `src/platform/crazygames.js`:

- `CrazyGames.SDK.init()` before the game starts, then `game.loadingStart()` / `game.loadingStop()` around loading.
- **Saving:** every save goes through `SDK.data` (`getItem` / `setItem` / `removeItem`). Keys: `firsttouch.career`, `firsttouch.career.backup`, `firsttouch.settings.v1`, `firsttouch.style`, `firsttouch.tutorial`. A career of 20 matches takes about 25 KB (the save plus its backup); the match log is capped at 400 matches, so even a very long career stays around 300 KB, well under the 1 MB limit. Saves made earlier in the same browser's localStorage (for example on another site) are copied into the data module once.
- `game.gameplayStart()` / `game.gameplayStop()` follow real play: on while a match, drill or the tutorial is being played; off on the pause menu, the result screen, menus and during ads. A pause because the tab or the page lost focus does not send `gameplayStop`.
- `game.happytime()` when you win a match and when you finish the tutorial.
- **Ads:** one `ad.requestAd('midgame')` when the player leaves a match's result screen (Continue, Play again, Change teams, Main menu). Never during play. Audio is muted while the ad plays and the game continues once it ends or fails. No rewarded ads, no banners.
- **Audio:** the platform's mute setting (`game.settings.muteAudio` and its change listener) silences the game.
- **Fullscreen:** on CrazyGames the game doesn't request fullscreen itself (the platform has its own button). The browser context menu is disabled.
- If the SDK isn't there, fails to load, or is "disabled" (any other domain), the game runs normally without it and saves to localStorage.

## Checking it

- **Locally:** `npm run build && npm run crazygames`, `node server.js`, then open `http://localhost:8080/crazygames/upload/index.html`. On localhost the SDK runs in its "local" environment (demo ads, local saves).
- **Automated:** `node tests/crazygames.mjs` drives the upload build with a stand-in SDK (`tests/fakes/crazygames-sdk.js`): saves through the data module and back after a reload, the localStorage copy, loading and gameplay events, focus-loss pauses, platform mute, happytime on a win, the midgame ad (muted) only when leaving the result screen, a failing ad, and the localStorage fallbacks. The real SDK could not be reached from the build environment, so do a final check in the portal's preview/QA tool: the pause menu during an ad, saving after a match, reloading the page and finding the career again, and a phone in landscape.

## Rebuilding

```sh
npm run crazygames   # rebuilds dist/game.js, writes upload/ and the zip
npm run covers       # re-renders the three covers (needs Playwright with Chromium)
```

## Before you submit: the club names

The career uses 20 real club names with their real kit colours and grounds (crests are generated, not the clubs' own). Club names are trademarks, and a portal may reject or later remove a game that uses them without a licence. If that is a concern, swap them for fictional clubs in `src/career/clubs.js` before submitting.
