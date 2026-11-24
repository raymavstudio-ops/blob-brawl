# Blob Arcade — guide for AI agents and contributors

Read this first if you are an AI (or a person) picking up this project.

## What this is
A hub of cartoon multiplayer games for phones (landscape) and desktop, hosted free on GitHub Pages.
Live: https://raymavstudio-ops.github.io/blob-brawl/ (repo `raymavstudio-ops/blob-brawl`, branch `main`, served from the root).
Players: the owner on iPhone plus two friends on Android. Games are played on work breaks, so quick and easy to share beats everything.

## Layout
- `index.html` — the hub. One `<a class="game" href="<folder>/">` card per game, inserted before `  </div>\n  <div class="foot">`. Also has the Add-to-Home-Screen button and an old-link redirect (`#CODE` -> `brawl/#CODE`).
- `<game>/index.html` — each game is ONE self-contained file, no build step, no npm. Folder name = game id.
- `sw.js` (network-first service worker), `manifest.webmanifest`, icons.
- `docs/` — roadmap, game status, briefs, test tools, the 100-idea list. **Start with `docs/ROADMAP.md` and `docs/GAMES.md`.**

## House style (non-negotiable)
- Bright **cartoon** look. NEVER neon or bloom (the owner rejected it). Three.js 0.160.0 via importmap from unpkg, `MeshToonMaterial` with a 3-step gradient map, inverted-hull ink outlines, soft PCF shadows, RoundedBoxGeometry. Fonts: Lilita One + Fredoka. Soft greens (~`0x7cc47e`), not lime.
- Phone landscape first (test 667x375, 780x360, 915x412, 874x402), also portrait (show a "rotate your phone" hint), tablet and desktop 1280x720 / 1920x1080. Tap targets >= 44px, text >= 12px, no clipping, no page scroll.
- Pixel ratio cap: `min(devicePixelRatio, 1.5)`, and 1.25 when window width > 1200. Re-apply on resize.
- Every game: `◀ Arcade` link to `../`, mute button, a two-tap `✕` (or menu) to quit mid-game, rotate hint in portrait, a vibration guard shim (only vibrate after user activation), `window.__game = { update(dt), render(), ... }` for tests.
- Multiplayer: PeerJS 1.5.4 (WebRTC), host-authoritative, 20 Hz snapshots, STUN + public TURN. Peer id prefix `blobarcade-<game>-` + 4-letter code. Invite link = page URL (no hash) + `#CODE`. Bots fill empty slots. A leaving client becomes a bot; the game continues.
- Long (saving) games: 3 save slots, autosave every 20 s and on `pagehide`/`visibilitychange`, versioned saves with migration, Export/Import codes, Continue restores. Host owns the shared world; each player's character is saved on their own device. Never change an existing save key/format.
- Correctness bar: things sit on the ground (no floating/sunken), face the way they move/aim, swings and bullets go where they face, no clipping. Every button must work and nothing may trap the player.

Full rules: `docs/briefs/BRIEF_COMMON.md` (all games) and `docs/briefs/BRIEF_LONG.md` (saving games). Paths inside them point at the original author's machine; ignore the paths, keep the rules.

## How to test (important — read the CPU note)
- Serve locally: `python -m http.server 8901` in the repo root, open `http://localhost:8901/<game>/`. Pages need http (not file://) for localStorage and CDN scripts.
- Drive frames manually: `window.__game.update(1/60)` in chunks (<= 300 per call), then `window.__game.render()`. Headless/hidden browsers throttle `requestAnimationFrame` and freeze CSS animations, so inject `*{animation:none!important;transition:none!important}` and step manually.
- Multiplayer smoke test: host in the main page, join from a same-origin iframe loaded with `?mp=1#CODE`. See `docs/tools/mp.js`. Single-player smoke: `docs/tools/smoke.js`. Phone-fit audit rules: `docs/tools/audit.js`.
- Check at every viewport size above, click every button, play to the results screen, reload and Continue for saving games.
- **CPU note:** the owner's PC was overloaded by a software-rendered headless Chrome. Do not spawn your own headless Chrome/SwiftShader; use one browser instance, few screenshots, short loops, and stop servers when finished.

## Shipping rules
- Only push games that load, play to the end, pass the checks above, and have no console errors. Add the hub card, update `README.md`, commit, push to `main`. GitHub Pages rebuilds in about a minute.
- The owner prefers: finish one game completely before starting the next; honest reports of what is untested.

## Known global gaps
Nothing has been tested on real phones or across real networks (only same-machine iframe multiplayer), and sound/vibration have never been heard/felt. See `docs/GAMES.md` for per-game weak spots.
