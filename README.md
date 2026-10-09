# Rakshith Raj M · Portfolio

Personal site of Rakshith Raj M (Asura), MLOps & AI Engineer in Bengaluru.

The hero is the Asura crest rebuilt from about 25k particles sampled from the logo's own pixels. It assembles on load, pushes away from the cursor, breaks into a starfield as you scroll, and re-forms at the contact section.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file routes, server functions) on Vite, deployed with Nitro
- three.js via React Three Fiber, with a custom particle shader and bloom
- Tailwind CSS v4, Motion, Lenis smooth scroll, Phosphor icons
- Contact form: a TanStack server function, validated with Zod, sent through [Resend](https://resend.com)

## Run it

```bash
npm install
cp .env.example .env   # add your Resend key
npm run dev            # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build into `.output/` |
| `npm start` | Serve the production build |

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the form | Resend API key. Without it the form asks visitors to email directly. |
| `CONTACT_TO` | Recommended | Inbox that receives messages. Without a verified domain, Resend only delivers to the account owner's address. |

## Editing content

All copy and data (profile, projects, experience, stack, awards, certifications) live in [`src/lib/content.ts`](src/lib/content.ts). Change content there; components never need touching.

```
src/
  lib/content.ts            all site content
  lib/contact.ts            contact server function (Zod + Resend)
  components/crest-scene.tsx  particle crest (three.js)
  components/sections.tsx   page sections, nav, footer
  routes/                   __root (shell, meta, Lenis) and index page
  styles.css                design tokens, fonts, global styles
public/
  crest-sample.png          200px crest the particles are sampled from
  logo-*.webp, favicon      brand assets
  fonts/                    Clash Display + Satoshi (self-hosted)
```

## Deploy

Built for Vercel: import the repo, add the environment variables above, deploy. Nitro picks the Vercel preset automatically.

## Accessibility and performance

- `prefers-reduced-motion` and devices without WebGL get a static crest instead of the particle scene, with no smooth scroll or marquee.
- The 3D scene is lazy loaded after the page renders. Phones get fewer particles and skip bloom.
- The hero headline animates with CSS, so it never waits on JavaScript.
