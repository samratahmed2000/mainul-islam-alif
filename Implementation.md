# Project Implementation Plan

## Current baseline

- The project uses `src/app/` with Next.js App Router; keep that routing root.
- The core stack is present: Next.js 16.4.2, React 19.3, TypeScript, and Tailwind CSS. The package scripts include development, lint, and build commands; there is no dedicated type-check script.
- Many route and component files exist, but key pages are still placeholders. The homepage, profile, creation listings, detail route, and contact form need implementation.
- The supplied `db.json` contains 72 template creations. They are all marked `draft`; there are no published records. Keep them hidden from public pages unless verified content is supplied or a clearly documented demo mode is explicitly enabled.
- `react-icons` is required by the project documents but is not listed in `package.json`.
- The existing `README.md` has no content to guide setup or content editing.

## Phase 1 — Baseline and content readiness

**Status: complete.** This phase inspected the required project documents and current structure, checked the package-manager/configuration baseline, and validated `db.json`. No application code, dependencies, or content records were changed.

### Confirmed baseline

- The repository has one App Router root at `src/app/`, with the expected route and component directories. Keep this structure; do not create a second `app/` root.
- `package-lock.json` identifies npm as the existing package manager. The project uses strict TypeScript and Tailwind CSS 4.
- The installed Next.js version is 16.4.2, and its local documentation is available under `node_modules/next/dist/docs/`. Read the relevant App Router guide before implementing Next.js code.
- Available package scripts are `dev`, `build`, `start`, and `lint`. No dedicated type-check script exists; `npx tsc --noEmit` can be used for a direct type-check when implementation begins.
- `public/` currently contains no files. All five image paths referenced by the seed data are missing: the logo, hero image, profile image, CTA image, and creation-cover placeholder.
- The README is empty. The current homepage, profile, contact, privacy, creation listing/detail routes, and several shared modules contain placeholders or empty implementations and need to be assessed as their implementation phases begin.
- `react-icons` is specified in the project requirements but is not currently listed in `package.json`.

### `db.json` validation

- The JSON parses successfully and includes all required top-level keys: `site`, `profile`, `categories`, and `creations`.
- There are six categories, each with 12 seed creations, for 72 creations total. Category order is explicitly set from 1 through 6.
- All 72 creations have the required top-level and nested product, media, and SEO fields. IDs and slugs are unique, category references are valid, and every status is an allowed value.
- All 72 creations are `draft`; there are currently no published creations. Public catalog pages should therefore show empty states until verified works are supplied and published.
- The profile structure includes the expected list sizes: five career entries, five education entries, four creative-life entries, four interests, and four personal-words paragraphs. These contain editable placeholder text. Organization and period are blank for all five career entries; institution, year, and result are blank for all five education entries.
- `site.scheduleUrl` is empty. Handle it through the documented contact-page fallback rather than rendering a broken link.

### Worktree note

At inspection time, `src/app/error.tsx` already had an uncommitted change adding `"use client";`. It was not changed as part of Phase 1 and must be preserved unless the user directs otherwise.

## Phase 2 — Typed content foundation

**Status: complete.** Added strict domain models and one server-only repository for validated `db.json` content. Public creation records omit protected download URLs, and public query helpers return published work only.

- Added site, profile, education, category, creation, product, media, SEO, and contact-form types.
- Added runtime checks for required data shapes, status values, category references, unique category and creation identifiers/slugs, and category order.
- Added centralized getters for site settings, profile, sorted categories, category lookup, published creations, category-filtered creations, and category-matched creation lookup.
- Confirmed private product `fileUrl` values are not included in the public creation model.
- `npx.cmd tsc --noEmit`: passed.
- Targeted ESLint for the new data and type files: passed.
- Query behavior check using an isolated in-memory published fixture: passed (category order, published-only filtering, category/slug matching, protected URL omission, and frozen data).
- `npm.cmd run build`: compilation and TypeScript passed, but page-data collection failed because existing `src/app/robots.ts` has no default export; the empty `src/app/sitemap.ts` also produced a warning. These SEO route placeholders are outside Phase 2 and remain for the later SEO phase.

## Phases

### 1. Confirm the baseline and content readiness

- Completed: confirmed the repository baseline, validated the seed data, and recorded content and asset gaps above.

**Deliverable:** a confirmed implementation scope and a record of content/data gaps.

### 2. Build the typed content foundation

- Completed: see the Phase 2 record above.
- Models now cover site settings, profile, categories, creations, products, media, SEO metadata, and contact-form data.
- A single data-access layer reads and validates `db.json`.
- Runtime guards check required fields, valid statuses, unique IDs/slugs, category references, and ordering.
- Category ordering is resolved centrally, and public creation queries include only published records.

**Deliverable:** reliable, typed data functions that can later be replaced by an API or database adapter.

### 3. Establish the shared layout and visual system

- Implement the Bengali-language root layout, metadata defaults, Bengali-friendly typography, and forest-green editorial theme.
- Build the shared navbar, responsive mobile menu, footer, social links, buttons, and reusable layout primitives.
- Use real route links, visible focus states, keyboard access, reduced-motion support, and graceful image fallbacks.
- Add `react-icons` only if needed to meet the specified icon requirements, while preserving the existing package setup.

**Deliverable:** a consistent, accessible shell for all routes.

### 4. Implement the homepage

- Build the hero, CTA, and six creation shelves in the required order: কবিতা, ছোটগল্প, বই, ইসলামী সংগীত, উপন্যাস, সংগীত ভিডিও.
- Show up to six **published** creations in each shelf, with accessible scrolling controls and working detail links.
- Handle empty shelves clearly; do not silently surface draft templates as real works.
- Add a contact-form section in the footer with Bengali validation and an honest “not connected” demo response until a backend exists.

**Deliverable:** a responsive homepage that works with both empty and populated published content.

### 5. Implement the profile page

- Build the introduction, professional journey, education, creative-life, interests, and “আমার কিছু কথা” sections from profile data.
- Suppress blank or placeholder facts rather than presenting them as verified biographical information.
- Use reusable, data-driven cards and responsive layouts.

**Deliverable:** a complete `/about` page without invented biography details.

### 6. Implement the creations catalog and details

- Build `/creations` with the six categories, responsive grids, and useful empty states.
- Build `/creations/[category]` with category resolution, published-item counts, and all matching published works.
- Build `/creations/[category]/[slug]` with details, breadcrumbs, related works, and optional media only when valid sources exist.
- Return not-found responses for unknown categories, unknown or mismatched slugs, and unpublished creations.
- Keep purchase UI clearly nonfunctional until a real checkout exists; never expose private file URLs or claim a purchase/download succeeded.

**Deliverable:** a complete, data-driven catalog with public visibility rules enforced consistently.

### 7. Add contact, privacy, and SEO behavior

- Build `/contact` and `/privacy`, with clear Bengali form messages and explicit demo/not-connected language.
- Add route metadata, Open Graph defaults, `sitemap.ts`, and `robots.ts`; exclude drafts and archived creations from public metadata and the sitemap.
- Add not-found, loading, error, and empty states where appropriate.

**Deliverable:** complete route coverage and safe public indexing behavior.

### 8. Verify and document

- Run the repository lint command, a TypeScript check, and a production build; fix issues introduced by implementation.
- Test category filtering, dynamic routes, unpublished-content exclusion, missing images/links/media, mobile navigation, and form validation.
- Update the README with setup, scripts, content editing, image replacement, route map, and limitations.

**Deliverable:** a checked implementation with clear maintenance instructions.

## Acceptance criteria

- All specified routes and navigation links work.
- Public pages, related items, metadata, and sitemap exclude drafts and archived records.
- No placeholder biography is presented as fact; no broken media, empty social links, fake form success, or fake checkout/download behavior.
- Layout is readable and usable from 320px mobile screens through desktop, with accessible controls and reduced-motion support.
- Lint, TypeScript checking, and production build are run and their actual results recorded.

## Content dependency

The current seed creations are all drafts. The catalog should correctly show empty states until verified works are added and explicitly published.
