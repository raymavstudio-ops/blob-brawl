# Blob Brawl

A cartoon party brawl for 2–4 players on phones (iPhone + Android) or desktop. No install, no accounts.

**Play:** https://raymavstudio-ops.github.io/blob-brawl/

## Modes
- **Blaster:** every-player-for-themselves twin-stick shooter. Kills and gems level up your gun. First to 15 kills wins.
- **Glow Tag:** one player is IT. Runners score every second, IT scores per tag. Double points in the last 30 seconds.
- **Lights Out:** night-time hide and seek. Zombies spread the infection and get radar pings. Last survivors win.

## Playing with friends
1. One person taps **Host a game**, then **Share invite link**.
2. Friends open the link, enter a name, and join.
3. The host picks a mode and taps **Start**.

Tip: tap Share → **Add to Home Screen** to get a full-screen app icon.

Controls: phones use a left thumb stick to move, a right stick to aim and fire (Blaster), and DASH. On desktop, use WASD + mouse + space.

## How it works
One `index.html`, no build. Three.js renders the cartoon 3D view, and PeerJS (WebRTC) connects the phones directly, with the host's device running the game.
