# Addendum for the LONG / premium games (read after BRIEF_COMMON.md)

These are deeper games the friends return to across many work breaks. The quality bar is a premium indie game. Scope ambitiously, but everything you ship must be polished and fully working. A smaller, complete, beautiful game beats a big broken one.

## Persistence (critical)
- **Autosave:** save to localStorage often (every ~20s and on `visibilitychange`/`pagehide`). Wrap it in try/catch, and version the save format with a migration guard.
- **Multiple slots:** "Continue" and "New game" on the title screen, with at least 3 save slots.
- **Export / Import save code:** base64 of compressed JSON, so a player can move phones or back up.
- **Shared worlds:** the HOST's device owns and saves the shared world (world state, base, quest progress). Each player's own character (stats, gear, cosmetics) is saved on their own device and sent to the host on join.
  - Hosting from a saved world continues it, and friends rejoin with their characters.
  - If the host leaves, clients get a clean message, and their character progress up to that point is kept.
- **Short sessions:** design for 5–15 minute sessions that add up over weeks. Make it easy to stop at any time, and on Continue show a "since last time" recap or daily reward.

## Depth
- **Real progression:** levels/XP, unlocks, upgrades, rare loot or cosmetics, and goals on several timescales (this session / this week / long-term).
- **Onboarding:** a tutorial or first-session guidance with clear objectives (quest log or objective tracker).
- **Content variety:** procedural generation plus handcrafted set pieces, so it doesn't feel repetitive.

## Performance
- Long games accumulate entities. Cap them, pool objects, chunk or cull the world, and keep 60fps on mid-range Android.

## Extra tests to report (pass/fail)
- Play → autosave → reload → Continue restores everything.
- Export, then import into a fresh state, restores everything.
- Host saved world → friend joins with their own character → progress for both persists after reload.
- A 10+ minute simulated session (drive `update()` in fast-forward) shows no errors, no memory or entity blow-up, and no frame-time creep.
