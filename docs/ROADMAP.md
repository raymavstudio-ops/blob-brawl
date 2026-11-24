# Roadmap

Owner's rule: **build one game at a time, finish it completely (graphics, every button, all screen sizes, 2-client multiplayer, saves where relevant), then push.** Do not start the next until the current one is shipped.

## Build queue (in order)
1. **Blob Smash** (`smash/`) — platform fighter, 2.5D, up to 4 players + bots, damage-% launching, 3 stocks / timed / coin-grab modes, 6+ original characters, 5+ stages with hazards, items, game-feel (hit-stop, shake, KO bursts). IN PROGRESS.
2. **Blob Wobble** — physics co-op: floppy wobbly blobs carry, build and climb together (Human-Fall-Flat-style chaos), levels with objectives, 1–4 players.
3. **Blob Supermarket Simulator** — long game with saves: stock shelves, set prices, checkout, hire staff, expand; friends split jobs.
4. **Blob Mining Simulator** — long game with saves: dig deeper, sell ore, upgrade pickaxe/drill/cart, layers, creatures, bosses, shared base.
5. **Blob Cleaning Simulator** — power-wash places (car, mansion, graffiti wall...), satisfying clean-reveal, upgrades, calm co-op.

For each new game follow `AGENTS.md`, `docs/briefs/BRIEF_COMMON.md` (+ `BRIEF_LONG.md` for saving games), reuse the newest games (royale, heist, among, survival) as code references.

## Ideas the owner liked or may want later
- Blob Survivors (horde survivor), Blob Roguelike (co-op dungeon runs), Blob Crew Control (panic co-op), Blob Arena Auto-Battler, Blob Gardens (cozy builder), Blob Detective (mystery), Blob Beats (rhythm), Blob Trivia Show, Ghost Hunters, co-op platformer, Blob Escape (escape rooms), Tower Defense co-op, Blob Monster Hunt (boss raids).
- More sims: Pet Simulator, Hospital/Vet Clinic, Airport.
- Other: Rocket Soccer, Dragon Riders, Blob Racing League (Kart career), Paint Turf, Restaurant Empire (Kitchen extension), Hidden Spy, Tetris Versus, Blob City, Blob Rush (obstacle party race).
- The full list of 100 original ideas (50 quick Q1–Q50, 50 long L1–L50): `docs/100-game-ideas.txt`. Near-duplicates were to be folded in as modes: Crazy Putt -> Golf mode, Racing Career -> Kart career mode, Pet Battle League -> Critter Quest league, Ranch Valley -> Farm expansion.

## Quality / hardening backlog (high value)
1. **Real-device testing**: iPhone Safari + Android Chrome — touch feel, frame rate, audio unlock, vibration, Add-to-Home-Screen. Never done.
2. **Real-network multiplayer** across different networks (TURN relay), and 3–4 human sessions.
3. Fix the per-game weak spots listed in `GAMES.md`.
4. Performance pass for mid-range Android (Royale, Survival, Pirates are heaviest): reduce instanced foliage/draw calls, consider a quality toggle.
5. Optional: shared utility extraction is deliberately NOT done (single-file games); only do it if it won't break saves/multiplayer.
6. Optional: a visible "report a problem" link, and a lightweight automated smoke test runner (see `docs/tools/`).

## Release checklist for a new game
- [ ] Single `<game>/index.html`, peer prefix `blobarcade-<game>-`, `window.__game`.
- [ ] Every button/menu path works; Leave/back never traps; new game works after leaving without reload.
- [ ] Sizes: 667x375, 780x360, 915x412, 375x812 (rotate hint), 768x1024, 1024x768, 1280x720, 1920x1080.
- [ ] 2-client host/join test with a started round, client leave, no console errors.
- [ ] Solo play to results screen; saving games: save -> reload -> Continue restores; export/import round-trip.
- [ ] Placement/facing/swing checks; screenshots at phone size.
- [ ] Add hub card in `index.html`, README list, commit, push, confirm live page returns 200.
