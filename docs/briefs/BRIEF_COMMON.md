# Blob Arcade — common brief for every game (read fully before starting)

## Context
- `D:\New Projects\glow-tag` is the GitHub Pages site for raymavstudio-ops/blob-brawl, live at https://raymavstudio-ops.github.io/blob-brawl/.
- It is "Blob Arcade": the root is a hub menu, and each game is ONE self-contained `index.html` in its own folder with no build step.
- Several other agents are building other games in sibling folders at the same time. Create ONLY your own folder and file. Touch NO other files, and do not commit or push.

## Players and quality bar
- The players are the user (iPhone) and two friends (Android). They play 2–4 player sessions on work breaks with phones in landscape. Desktop browsers should work too.
- The user's words:
  - "real high quality arcade games"
  - "make sure the games themselves look good and not like garbage"
  - "make sure they all work completely"
- The user HATED a neon/bloom look and wants a bright **cartoon** style.

## Reuse Blob Brawl's proven patterns
Read `D:\New Projects\glow-tag\brawl\index.html` first, then reuse or copy these patterns:

**Rendering and style**
- Three.js 0.160.0 via importmap from unpkg.
- MeshToonMaterial with a 3-step gradientMap, inverted-hull ink outlines (`hull()`), RoundedBoxGeometry, and PCF soft shadows.
- Blob characters in colors `['#4cc9ff','#ff6fb5','#8be04e','#ffa23f']`, with per-color hats (red cap, yellow bow, propeller beanie, leaf sprout).
- Lilita One + Fredoka fonts, and white cards with 4px ink borders.

**Networking and lobby**
- PeerJS 1.5.4 with the same ICE list: STUN plus openrelay TURN, including TCP.
- A generation counter that guards stale handlers, and a cleanup function.
- Peer id prefix **`blobarcade-<yourgame>-`**+CODE. It must be unique to your game.
- A lobby with Host / Join by 4-letter code / Share invite link.
  - The link is the URL without query or hash, plus `#CODE`, sent via `navigator.share` with a clipboard fallback.
  - Opening a `#CODE` link pre-fills the join flow.
- Bots fill empty slots wherever the genre allows it, so a solo player can always play.

**Mobile**
- Pointer-event touch controls.
- A rotate-to-landscape overlay.
- Wake lock.
- iOS WebAudio unlock on touchend.
- Safe-area insets.
- Tap targets ≥48px and text ≥12px.
- A mute button.

**Navigation and icons**
- A visible "◀ Arcade" button linking to `../`.
- `<link rel="icon" href="../favicon.png">`, `<link rel="apple-touch-icon" href="../apple-touch-icon.png">` and `<link rel="manifest" href="../manifest.webmanifest">`.

**Juice**
- Synthesized WebAudio SFX plus a short procedural music loop, all mutable. Brawl's `MUSIC` block is an example.
- Particles and squash-and-stretch.
- Camera shake must be small and must decay EVERY frame. A past bug was a shake that never decayed.
- Title/menu card, countdown, round banners, and a results/podium screen with Play Again.

**Performance**
- Must run smoothly on mid-range Android.
- Shadow map ≤2048.
- pixelRatio capped at 2, or 1.5 if innerWidth<1000.
- Instance or merge repeated scenery.

**Testing hook**
- Expose `window.__game` with state, `update(dt)` and `render()`.

## Visual bar (enforced)
- Take real screenshots of the menu, gameplay and results.
- Critique them honestly against a commercial cartoon party game (Fall Guys / Party Animals / Mario Party look), then iterate until it looks polished.
- Things to avoid:
  - flat untextured planes (use texture or color variation)
  - empty void backgrounds (use a gradient sky, clouds and backdrop scenery)
  - default browser-looking UI
  - lumpy primitive characters
- Use warm sun with shadows and a fog tint, plus bold HUD text with outlines.

## Placement & animation correctness (enforced, user request)
The user said: "make sure everything is in the right place and not clipping or doing weird stuff, and everything is facing and swinging the right way". Check these in close-up screenshots from several angles:
- **Grounding:** nothing floats above or sinks into the ground. Feet, wheels, props, trees and buildings sit exactly on their surface, including on slopes and platforms.
- **No clipping or overlap:** characters never pass through walls or props, and props don't intersect each other. Hats, eyes and accessories sit ON the body, not inside it or floating off it. Outline hulls don't poke through. Nothing z-fights (flickering coplanar surfaces). There are no gaps between wall and floor pieces.
- **Facing:** characters, creatures, karts, tanks and turrets face the direction they move or aim. Eyes and faces are on the FRONT. Enemies turn toward their target. Remote players face the right way after interpolation. NPCs and critters face the camera or their opponent in battles where appropriate.
- **Swinging and rotation direction:**
  - Weapons and tools (mallets, swords, bats) swing in the correct arc toward the target, from the correct hand side.
  - Wheels roll forward when moving forward and backward in reverse, at a rate that matches speed.
  - Propellers and fans spin sensibly.
  - Recoil kicks backward.
  - Muzzle flashes and projectiles spawn at the barrel tip.
  - Doors open outward correctly.
- **Camera:** it never goes inside walls or terrain. Pull it in or fade occluders.
- **UI:** nothing overlaps or is cut off, and labels stay attached above the right heads.
- Write a quick automated check where feasible. For example, compare each object's bounding-box bottom to the ground height, and check the dot product of the facing vector with the velocity. Report the results.

## Must fully work (enforced)
- No placeholder buttons, dead menu items or half-finished features. If something can't be made solid, cut it.
- Test each item below and report it as pass/fail:
  1. Every button and menu path: Arcade link, Mute, Share invite, Play Again.
  2. A full game loop solo (vs bots, or solo-capable mode).
  3. Host in one tab and join from a second tab, via the code AND via the `#CODE` link. Play a round together and confirm both stay in sync.
  4. One player leaving mid-game doesn't break the others.
  5. Rematch works.
  6. Touch controls work. Simulate pointer events.
  7. No console errors.
  8. Phone-fit audit (see Testing).

## Testing
- Use the built-in browser tools (`mcp__Claude_Browser__*`) with `file:///D:/New%20Projects/glow-tag/<folder>/index.html?v=N`. Bump N to bust the cache, and prefer the `navigate` tool for reloads.
- Many agents share the browser pane:
  - Create your OWN tab with `tabs_create` and pass its `tabId` on every call. If navigate replaces your tab id, re-check `tabs_context`.
  - Never close tabs you didn't create.
- The pane is hidden, which has three effects:
  - rAF is throttled to ~2fps.
  - CSS animations are frozen.
  - Screenshots may be stale.
- Because of that, drive frames manually via `javascript_tool` (loop `__game.update(1/60)`, then render), and disable pop-in animations before measuring.
- Phone fit: the audit script source is at `C:\Users\mylan\AppData\Local\Temp\claude\140276d8c21af325\af5624ef-f728-478d-82a7-7973452a6dc4\scratchpad\audit.js`.
  - Read it and inject its text via `javascript_tool`. It defines `window.audit(label,minTap)`.
  - Run it at 667x375, 874x402, 780x360 and 915x412 (`resize_window`) on the menu, lobby, HUD and results screens.
  - Fix every issue it finds.
  - Reset with preset "desktop" when done.

## Report back (brief)
- What you built and the controls.
- The pass/fail list.
- 1–2 screenshot file paths.
- Known gaps.
