# Blob Arcade

A pocket arcade of cartoon games for 1–4 friends. Works on iPhone, Android and desktop. No install, no accounts.

**Play:** https://raymavstudio-ops.github.io/blob-brawl/

Tip: open the link on your phone and tap **Add to Home Screen** for a full-screen app icon.

## Games
Quick games: Blob Brawl, Blob Kart, Blob Sumo, Prop Hunt, Blob Squad, Blob Golf, Blob Party, Hot Bomb, Tank Bounce, Doodle Guess, Blob Kitchen, Blob Royale.

Long games that save your progress: Critter Quest, Blob Kingdom, Dungeon Delvers, Card Clash, Starship Crew, Blob Farm, Blob Tycoon, Blob Fishing, Blob Tactics, Monster Ranch, Pirate Seas.

## Playing with friends
1. One person opens a game and taps **Host**, then **Share invite link**.
2. Friends open the link, enter a name, and join.
3. The host starts the game.

## How it works
Each game is one `index.html` in its own folder, with no build step. Three.js draws the 3D, and PeerJS (WebRTC) connects the phones directly, with the host's device running the game.
