# kamilkolodziejczyk.dev

Personal website of Kamil Kołodziejczyk, Senior Frontend Developer. A single static page for recruiters and tech leads.

## Stack

- Next.js (App Router) with static export
- TypeScript (strict)
- Tailwind CSS v4
- Self-hosted fonts via Fontsource: Bricolage Grotesque and IBM Plex Sans

## Development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/` and can be served by any static host.

## Content

All copy, links and data live in `src/content/profile.ts`. Components only render it.
