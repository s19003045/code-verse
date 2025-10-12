# Deployment & Testing Checklist

## Automated Commands
- `npm run lint` – ensure ESLint rules and Tailwind class usage stay clean.
- `npm run test` – execute Vitest unit + component suites.
- `npm run test:e2e` – launch Playwright smoke tests (`npx playwright install` required once).
- `npm run build` – produce the production bundle and surface chunk size warnings.
- `npm run preview` – verify the built output locally before pushing to Vercel/Cloudflare.

## Manual Verification
- **Performance**: load the preview build with DevTools Performance panel; target <5s First Contentful Paint and >30 FPS (FPS badge renders in the HUD).
- **Responsive Layouts**: check 1280px (desktop), 834px (tablet), 390px (mobile). Confirm Navigator flows into column layout and Mini Map remains tappable.
- **World Interactions**: WASD + Orbit controls, hover glow, InfoPanel open/close (ESC/click), auto tour toggle, Mini Map teleport.
- **Audio**: ambient loop, hover/select/teleport cues, mute toggle.
- **Data Source**: switch between local JSON and Firebase by setting `VITE_DATA_SOURCE` and Firebase env keys; confirm fallback to JSON if Firestore unavailable.

## Deployment Notes
1. Commit artifacts, then push to your hosting provider (Vercel/Cloudflare Pages).
2. Supply required env variables in the hosting dashboard:
   - `VITE_DATA_SOURCE` (`json` or `firebase`)
   - Firebase keys (when applicable)
3. Upload textures (`public/textures`), card art (`public/cards`), and audio loops (`public/audio`).
4. Use the preview URL to repeat the manual checklist before promoting to production.
