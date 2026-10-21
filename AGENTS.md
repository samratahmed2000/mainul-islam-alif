<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

# AGENTS.md — Project instructions

## Read first

- `README.md` — setup, scripts, content editing, assets, routes, limitations.
- `ARCHITECTURE.md` — intended layers, data flow, product/content lifecycle.
- `Implementation.md` — completed phases and known Next.js quirks.
- Use the version-matched docs in `node_modules/next/dist/docs/`. This app uses Next.js 16 Cache Components, Partial Prefetching, and `instant`, so older Next.js patterns may not apply.

## Commands

```bash
npm run dev
npm run lint       # flat ESLint config
npx tsc --noEmit   # no typecheck script exists
npm run build      # production build; also runs TypeScript
```

- There is no test runner, test script, or CI. Do not invent or claim test results.
- Verify meaningful changes in this order: `npm run lint` -> `npx tsc --noEmit` -> `npm run build`. The build succeeds without `SITE_URL`.

## Architecture

- Single App Router root: `src/app/`; alias `@/*` points to `src/*`. Do not create a root `app/` or a second route tree.
- `src/lib/data.ts` is the only module that reads `db.json`. It is `server-only`, validates and deep-freezes the data at import, and strips private product URLs. Never import it from a Client Component.
- Public creation getters return only `published` rows. Add new queries to `src/lib/data.ts` instead of filtering ad hoc in pages.
- When adding data, update `src/types/*`, the runtime guards in `src/lib/data.ts`, and `db.json` together. Missing nested fields fail validation even when empty strings are allowed.
- `toPublicCreation` intentionally omits `product.fileUrl`. Never expose private download URLs or imply that checkout/downloads work.
- Pages stay thin and compose components from `src/components/{home,profile,creations,contact,layout,ui}`. Server Components are the default. Current Client Components are `src/app/error.tsx`, `ContactForm`, `ContentImage`, `CreationCarousel`, and `MobileMenu`; add `"use client"` only for real browser interactivity.
- `params` are Promises (`const { category } = await params`). `LayoutProps` and `PageProps` are generated global types.
- Creation routes call `notFound()` for an unknown category/slug, a category mismatch, or unpublished records. `export const instant = false` in `src/app/creations/[category]/page.tsx` and `[slug]/page.tsx` is deliberate; do not remove it without reading the Next.js 16 `instant` and streaming docs.
- `cacheComponents` and `partialPrefetching` are enabled. Dev may report instant-navigation or static-shell warnings; fix them per the bundled docs rather than disabling the features.

## Styling

- Tailwind 4 is loaded through `@tailwindcss/turbopack` in `next.config.ts` and `@import "tailwindcss"` in `globals.css`; there is no Tailwind config file.
- Components use semantic custom CSS classes (`site-container`, `creation-card`, ...), not utility classes. Put new styles in `src/app/globals.css` and reuse the `:root` tokens (`--color-*`, `--font-body`, `--radius-card`, `--shadow-card`). Do not introduce a second styling system.
- Preserve the forest-green/cream/amber editorial theme: deep-green hero and footer bands, a cream page surface, white rounded cards, amber pill buttons, wave-shaped section edges, and small four-point sparkles. Keep readable line-height, visible focus states, `prefers-reduced-motion`, and keyboard accessibility. Use `react-icons`; never use emoji as UI icons.
- Typography is Poppins via `next/font/google` (`--font-poppins` on `<html>`, consumed through `--font-body`). Keep an English sans-serif fallback stack.

## Content and data

- `db.json` top-level keys: `site`, `profile`, `categories`, `creations`. Validation rejects unknown `categoryId`, duplicate IDs/slugs/category `order`, wrong types, and unknown statuses.
- Status is `draft`, `published`, or `archived`. Only `published` may appear on public pages, metadata, sitemap, or related lists. Do not add a demo mode or publish sample records.
- At the time of writing, all 78 creations are `draft` (including six `demo-*` fixtures), so catalog pages intentionally show empty states. `public/` contains no files yet.
- Category order comes from `category.order` (1-6: Poems, Short Stories, Books, Islamic Music, Novels, Music Videos). Keep it data-driven. Current slugs are `poems`, `short-stories`, `books`, `islamic-music`, `novels`, `music-videos`.
- Image paths are public URLs such as `/images/...`; missing or failed local images use the `ContentImage` fallback. Do not use remote image URLs without configuring `next/image`.
- The contact form is demo-only and must keep stating that no message was sent. Do not fake email delivery, payments, purchases, or downloads.
- `SITE_URL` must be an origin only (for example `https://example.com`). It drives canonical/Open Graph URLs and the sitemap; if unset there is no canonical URL and the sitemap is empty; invalid values throw. Never hardcode a domain.

## Content policy

- All user-visible copy, labels, validation messages, metadata, numbers, dates, and empty states must be natural English (`lang="en"`, `en-US` formatting), except brands, proper nouns, URLs, and technical terms. Keep English copy consistent even when adding new components.
- Template placeholders in `db.json` start with "Add …" or "Edit …". `src/lib/placeholder.ts` keeps them out of rendered biography, interest, and media sections until the owner supplies verified content.
- Never invent the person's name, biography, education, career, awards, publications, social links, contact details, prices, reviews, or testimonials. Use editable `db.json` placeholders and omit blank fields instead of rendering fabricated facts.
- Do not present template or demo records as real works. Confirm content and usage rights before setting `status: "published"`.

## Routes

`/`, `/about`, `/creations`, `/creations/[category]`, `/creations/[category]/[slug]`, `/contact`, `/privacy`, plus `robots.ts` and `sitemap.ts`. See `README.md` for the route map and current limitations.

## Before finishing

- Run lint, typecheck, and build; report what actually ran and any check that could not run.
- Update `README.md` when setup, scripts, content editing, assets, routes, or limitations change.
