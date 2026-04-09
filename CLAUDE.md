# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Run bot in staging/development mode (uses capybaradb-test)
yarn register         # Register slash commands with Discord
yarn start            # Run bot in production mode
```

No test runner or lint scripts are configured — TypeScript strict mode (`tsc`) serves as the primary type-safety check.

## Architecture

Discord.js v14 bot with MongoDB (Mongoose) for persistence. Entry point is [src/index.ts](src/index.ts), which connects to the database, initializes the Discord client, attaches event listeners, and starts cron jobs.

### Environment

- `STAGING=true` switches to the test MongoDB database and shows "TEST MODE" status
- `REGISTER=true` triggers slash command registration with the Discord API (used by `dev:register`)
- All env vars are validated on startup in [src/lib/configs/env.ts](src/lib/configs/env.ts) — missing vars exit with code 1

### Adding a Command

1. Create `src/commands/<name>.ts` exporting `{ data: SlashCommandBuilder, execute: CommandExecuteFunction }`
2. Re-export it from [src/commands/index.ts](src/commands/index.ts)
3. Add a feature toggle in [src/constants/config.ts](src/constants/config.ts) under `FEATURES`
4. Handle the command name in [src/helpers/handleCommandInteraction.ts](src/helpers/handleCommandInteraction.ts)
5. Run `yarn dev:register` to register the new slash command with Discord

### Key Directories

| Path              | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `src/commands/`   | Slash command definitions (`data` + `execute`)                         |
| `src/events/`     | Discord.js event handlers (`interactionCreate`, `messageCreate`, etc.) |
| `src/helpers/`    | Shared logic: routing, replies, logging, cron, registration            |
| `src/services/`   | Mongoose CRUD operations for each collection                           |
| `src/models/`     | Mongoose schemas (`user`, `birthday`)                                  |
| `src/constants/`  | Feature flags (`config.ts`), UI copy/emojis/timezones (`copy.ts`)      |
| `src/lib/`        | Client initialization (Discord, MongoDB) and env loading               |
| `src/interfaces/` | TypeScript interfaces for shared types                                 |

### Points System

- Points are awarded in `messageCreate`: 1 per message, +2 if attachment
- Stored in the `users` collection (`discord_id`, `discord_username`, `points`)
- New members are auto-registered on `guildMemberAdd`
- Commands: `/gamble` (49% win rate, configurable), `/points` (view balance), `/coinflip`

### Birthday System

- Users set their birthday once via `/birthday`; can only update it once per month after initial set
- A cron job runs every 30 minutes, checking each configured timezone for midnight to announce birthdays in the configured channel

### Path Aliases

`@/*` maps to `src/*` — use this for all internal imports.
