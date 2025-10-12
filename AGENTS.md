# Repository Guidelines

## Project Structure & Module Organization
Keep reference material in `docs/`; update specs there when architecture shifts. Runtime code belongs in `src/` with clear domains: `src/world/` for Three.js scenes, `src/components/` for UI shells, `src/store/` for Zustand logic, and `src/theme/` for shared tokens. Type contracts sit in `src/types/`. Load content from `data/apps.json`, following the schema in `docs/spec.md`. For optional Firebase sourcing, set `VITE_DATA_SOURCE=firebase` and provide the keys consumed by `src/data/firebaseLoader.ts`. Serve imagery and audio from `public/cards/` and `public/audio/` using kebab-case filenames that match JSON ids (`ambient.mp3`, `ui-hover.mp3`, `ui-select.mp3`, `ui-teleport.mp3`).

## Build, Test, and Development Commands
Run `npm install` after cloning or pulling to sync dependencies. Use `npm run dev` for the Vite dev server, `npm run build` to verify production bundles, and `npm run preview` for static spot checks. Execute `npm run test` for Vitest suites, `npm run test:e2e` after `npx playwright install`, and `npm run lint` before committing.

## Coding Style & Naming Conventions
Enable TypeScript strict mode with Prettier’s 2-space indentation. Name React components, hooks, and stores in PascalCase (`WorldMapScene`, `useMiniMapStore`). Prefer camelCase for utilities and SCREAMING_SNAKE_CASE for shared constants. Keep shaders or math-heavy helpers alongside the owning module, and add brief comments when logic is not self-evident. JSON ids stay kebab-case and stable for teleport shortcuts and tests.

## Testing Guidelines
Vitest with @testing-library/react covers units and interactions; colocate specs in a `__tests__` folder beside each module. Mock heavy Three.js primitives and assert against Zustand actions to reduce brittle DOM checks. Maintain ≥80% statement coverage and add regression tests for navigation, panel toggles, Mini Map teleport, auto tour cycling, and audio control whenever bugs surface. Before releases, run Playwright smoke tests—or document equivalent manual steps—to confirm camera movement, InfoPanel toggling, auto tour playback, and external links.

## Commit & Pull Request Guidelines
Use Conventional Commits (`feat:`, `fix:`, `refactor:`) with subjects under 72 characters and issue references in the body. Summaries should note user-visible changes plus testing evidence (`npm run test`, `npm run lint`, device checks). Each PR must update related docs, attach screenshots for UI changes, request at least one review, and wait for green CI and a verified preview link before merge.

## Deployment & Configuration Tips
Store Firebase or analytics keys in `.env.local` and list required variables in `docs/configuration.md`. Do not commit populated secrets. When adding assets, update `data/apps.json` and confirm URLs during `npm run preview`. After merges, check the preview deployment for missing textures, audio glitches, Mini Map markers, or smoke-test failures.
