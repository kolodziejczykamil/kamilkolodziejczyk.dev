# kamilkolodziejczyk.dev

Personal website of Kamil Kołodziejczyk, Senior Frontend Developer. A single static page for recruiters and tech leads, served by a Cloudflare Worker that also handles the contact form.

## Stack

- Next.js (App Router) with static export
- TypeScript (strict)
- Tailwind CSS v4
- Zod, shared by the contact form and the Worker
- Cloudflare Workers: static assets, `send_email` binding and Turnstile
- Self-hosted fonts via Fontsource: Bricolage Grotesque and IBM Plex Sans
- Technology logos from Simple Icons, rendered at build time
- MDX for notes

## Development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000. The contact form endpoint is not available in `next dev`.

To run the full site with the Worker and the contact form:

```bash
cp .dev.vars.example .dev.vars
npm run preview
```

The site runs at http://localhost:8787. Locally, Wrangler simulates sending the email and prints it to the console.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` writes the static site to `out/`.

## Configuration

| Name | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `.env.production` | Public Turnstile site key, baked into the build |
| `TURNSTILE_SECRET_KEY` | Worker secret | Verifies Turnstile tokens |
| `CONTACT_TO` | Worker secret | Inbox that receives contact form messages |
| `CONTACT_FROM` | `wrangler.jsonc` | Sender address on the Email Routing domain |

Set secrets with `npx wrangler secret put <NAME>`. After changing `wrangler.jsonc`, regenerate Worker types with `npm run cf-typegen`.

## Deploy

Every push to `main` is built and deployed by Cloudflare Workers Builds. To deploy manually from a local machine:

```bash
npm run deploy
```

## Content

All copy, links and data live in `src/content/profile.ts`. Components only render it.

Notes are MDX files in `src/content/notes/`. To publish one, add the file and register it in `src/content/notes.ts` with its title, description, date and reading time. It then appears on `/notes`, on the home page, in the sitemap and gets its own page at `/notes/<slug>`.
