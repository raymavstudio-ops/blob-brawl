# Game status (as of 2026-11-24)

All listed games are live, load, play without console errors in desktop-browser tests, and have had a graphics / buttons / auto-size pass. **None has been tested on a real phone, over a real network, with 3–4 humans, or for sound/vibration.** "Weak spots" are known, unfixed issues.

## Quick games
| Folder | Game | Notes / weak spots |
|---|---|---|
| brawl | Blob Brawl (twin-stick shooter; Blaster, Glow Tag, Lights Out) | Original game. Mute button/menu card tight at 667x375 (fixed). |
| kart | Blob Kart | Ramp/wheel placement fixed earlier. A career mode was planned (not built). |
| sumo | Blob Sumo | Clean. |
| prophunt | Prop Hunt | Seeker blind phase has quit button. Hider-side UI lightly tested. |
| squad | Blob Squad (co-op waves) | Candy Castle map is pale. Frosty Fort map not checked. |
| golf | Blob Golf | Holes 2,3,5,6,7 not visually checked. 4-way tie says "YOU WIN!". Crazy-putt mode planned. |
| party | Blob Party (board + 6 minigames) | Minigame banner change not re-viewed. |
| hotbomb | Hot Bomb | 4th place podium blob close to 2nd in camera view. |
| tanks | Tank Bounce | Fog scales with camera on tall windows. |
| doodle | Doodle Guess | 2D canvas game. |
| kitchen | Blob Kitchen (10 kitchens) | Haunted ghost steal animation not watched. Frosty has extra pan. |
| royale | Blob Royale (16-player battle royale) | Heavy foliage, unmeasured on mid-range Android; trees can hide players; late join refused. |
| heist | Blob Heist (robbers vs guards, 3 maps) | Characters small on phones; Museum leans to guards; no client prediction. |
| among | Among Blobs (social deduction, 3 maps) | Bots lean saboteur and vote poorly without evidence; only 1 client tested; corpse eyes/Fix Wires not re-viewed. |

## Long games (3 save slots, export/import)
| Folder | Game | Notes / weak spots |
|---|---|---|
| critters | Critter Quest (open-world capture/battle) | Slot 1 key `critterquest_save_v1` (don't change). No mid-game back-to-title (Arcade link autosaves). Shop/trade dialogs not opened in QA. |
| kingdom | Blob Kingdom | `btnPmBack` returns to title not Saves. |
| delvers | Dungeon Delvers | Damage numbers pile up in big fights. |
| cards | Card Clash (deckbuilder) | Real pointer clicks needed (DOM `.click()` opens info popup). Slot Load/delete buttons not clicked in QA. |
| starship | Starship Crew | Lobby name truncates. Boss/shop/event screens not individually viewed. |
| farm | Blob Farm | Quit-to-title reloads the page. |
| tycoon | Blob Tycoon | Log flume rebuilt; log snaps facing at corners. |
| fishing | Blob Fishing | Catch/save/co-op tested. |
| tactics | Blob Tactics | Turn-based battles on islands. |
| ranch | Monster Ranch | Quit-to-title is at bottom of Menu > Save tab. |
| pirates | Pirate Seas | Kraken body plain dome; random island names can mismatch biome; HUD small at 1080p; 3–4 players untested. |
| survival | Blob Survival (co-op survival) | Meadow flat up close; "cave" is a walled crypt; shipwreck far with no pointer; phone-size audit not re-run after camera change. |

## In progress / queued
See `ROADMAP.md`.
