# Project Implementation Prompt — Bengali Portfolio & Digital Creations Store

## Role and objective
Act as a senior full-stack-minded frontend architect and UI engineer. Build the actual working application in the current repository—not just a plan, mockup, or explanation. The site belongs to one person who is a banker, writer, and Islamic music artist. It combines:
1. A polished personal portfolio/profile.
2. A browsable catalog of creative works, with a storefront-ready digital-product model.

All visible website copy, labels, navigation, validation messages, metadata defaults, empty states, and CTA text must be in natural, professional Bengali. Use a Bengali-friendly font such as Noto Sans Bengali (or a reliable local/system fallback). Do not invent the person's name, career history, institutions, awards, social URLs, contact information, published works, prices, or biography. Use clearly marked editable placeholders from `db.json` until real information is supplied.

## Required technology
- Next.js App Router
- React + TypeScript with strict typing
- Tailwind CSS
- `react-icons` for icons
- `db.json` as initial local content data
- Use Server Components by default; add Client Components only for interactivity (carousel, mobile menu, filters, form feedback).
- Do not add a database, payment provider, authentication provider, CMS, or unrelated UI library in this phase.
- Keep the code ready for a future database/API/admin dashboard/payment integration without pretending those features already work.

## First steps — mandatory
1. Inspect the current repository and read `AGENTS.md`, `PROMPT.md`, `db.json`, `package.json`, and the existing app structure if present.
2. Preserve the existing package manager, dependencies, app-router location (`app/` or `src/app/`), useful code, and configuration. Do not overwrite working files blindly.
3. Validate the shape of `db.json`; report malformed or missing fields and handle data defensively.
4. Write a short implementation plan, then implement the app in small, testable phases. Do not stop after the plan.
5. Run available lint, type-check, and build scripts; fix errors caused by your changes. If a script is missing, do not invent a successful result.

## Design direction
- Premium, minimal, editorial, trustworthy, culturally respectful.
- Dark forest-green gradient background with subtle tonal variation, white/off-white text, restrained green/teal gradient buttons, soft borders, accessible contrast, tasteful shadows, and generous spacing.
- Avoid excessive glassmorphism, neon, clutter, huge animations, and generic dashboard styling.
- Responsive and mobile-first: excellent at 320px width, then tablet, laptop, and large desktop.
- Use a consistent spacing, typography, radius, border, shadow, and color-token system.
- Use semantic HTML, keyboard-accessible controls, visible focus states, reduced-motion support, useful alt text, and responsive image sizing.
- All icon-only controls need accessible labels. Never use emoji as interface icons.
- Use `react-icons`; do not use Unicode icon substitutes.
- Use tasteful transitions; respect `prefers-reduced-motion`.

## Global layout and routes
Create working routes with Next.js App Router:
- `/` — Homepage
- `/about` — Full profile page
- `/creations` — All six creation categories and a browsable overview
- `/creations/[category]` — One category's complete list
- `/creations/[category]/[slug]` — Individual creation details
- `/contact` — Professional contact page
- `/privacy` — Basic privacy notice suitable for the contact form (do not claim legal review)
- `not-found.tsx` and meaningful loading/empty/error states where appropriate.

Navbar:
- Left: logo/brand name.
- Center: Home, About, Creations, Contact; each is a real route.
- Right: “সময় নির্ধারণ করুন” button pointing to `site.scheduleUrl`. If it is empty, route to `/contact` instead. Do not render a broken link.
- Mobile: accessible menu with correct open/close behavior, Escape handling where practical, and route links that close the menu.

## Homepage
1. Hero:
   - Left: Bengali title/name, designation, concise intro, “সৃষ্টিকর্ম দেখুন” button, social links for Facebook, YouTube, Instagram, WhatsApp.
   - Right: hero/profile image with graceful fallback if image is missing.
   - Do not render social icons as links when the URL is empty.
2. Six creation shelves in this order: কবিতা, ছোটগল্প, বই, ইসলামী সংগীত, উপন্যাস, সংগীত ভিডিও.
   - Each shelf header has the category title on the left and “সব দেখুন” on the right.
   - Show six cards per shelf in a responsive horizontal carousel/slider with previous/next controls, touch/trackpad scrolling, keyboard support where feasible, and accessible labels. Do not add a heavy carousel dependency unless the repository already uses one.
   - Cards include cover image, category, title, short excerpt, and a suitable type/status label.
   - Clicking a card navigates to `/creations/[category]/[slug]`.
   - Draft/unpublished placeholder records must not appear as public products; for initial visual development, you may add a clearly documented demo-data mode, but do not silently publish draft items.
3. CTA banner:
   - Use a wide image, Bengali title and subtitle, and schedule/contact button.
4. Footer:
   - Left: logo, name, designation, available social links.
   - Right: contact form with name, email, phone, message, submit button.
   - Validate required fields, email format, and reasonable phone length. Show Bengali success/error feedback.
   - Since there is no backend, do not pretend the message was sent. Implement a clear demo response or prepare a typed submission adapter and document where a backend endpoint must be connected. Avoid exposing secrets.

## About/profile page (`/about`)
- Intro block: profile image on left; name, designation, short intro on right (stack on mobile).
- Professional journey: five cards arranged left-to-right on wide screens, responsive on smaller screens; each has icon, stage/title, period/organization where known, and short description.
- Education: responsive 2-column card grid; show all five entries in `db.json`: Banking & Finance, MSc Chemistry, BSc Chemistry, HSC Science, SSC Science. Each card supports institution, department, year, result, and icon. Do not display blank facts as fabricated values.
- Creative life: four cards covering entry into writing, inspiration, favorite topics, and future plans.
- Interests & hobbies: four cards.
- “আমার কিছু কথা”: four readable Bengali paragraphs, with editorial typography and comfortable line-height.
- Keep all content data-driven from `db.json`.

## Creations routes
`/creations`:
- Present all six categories in the specified order.
- Each category should have a responsive grid with at least 12 seed/template records available in `db.json`, but only show records whose status is `published` in normal public mode.
- Four columns on large desktop (4 × 3 for the first 12), two columns on medium screens, one or two on mobile depending on available width.
- Each category section includes a “আরও সৃষ্টি দেখুন” button linking to `/creations/[category]`.
- Provide useful category descriptions and empty states.

`/creations/[category]`:
- Resolve category by its slug from `db.json`; unknown category returns `notFound()`.
- Show category title, description, count of published creations, and all published creations in a four-column desktop grid.
- Use pagination or “আরও দেখুন” progressive loading if the list grows; keep route behavior compatible with future server-side pagination.
- Data must not be duplicated across pages. Category pages should automatically include newly added published entries.

`/creations/[category]/[slug]`:
- Resolve both category and slug; return `notFound()` if missing, mismatched, or unpublished.
- Render a polished detail page: cover image, category breadcrumb, title, subtitle, excerpt, publication date if present, long description/content, tags, related creations, and media/product controls where applicable.
- Poems/stories/novels/books must support Bengali long-form text and readable typography.
- Islamic music may display audio player only when a valid audio URL exists.
- Music video should embed a valid YouTube video responsively when a valid video ID/URL exists, and provide a safe external YouTube link. Never render an empty/broken iframe.
- Show “ডিজিটাল পণ্য” purchase UI only when `product.isForSale` is true and a price/product link or configured checkout adapter exists. Without checkout/backend, use a clearly labeled “বিক্রয় ব্যবস্থা শিগগিরই যুক্ত হবে” or contact-to-purchase path; never fake a completed payment or download.
- Protect paid file URLs: do not expose a private file URL as a free public download. Document that secure delivery requires a server-side purchase verification flow.

## Contact page (`/contact`)
- Professional Bengali layout with contact information, response expectations only if configured, working social links, and a contact form.
- Validate form fields and provide accessible status messages.
- In the absence of a backend, state clearly that form submission is a UI demo/not yet connected. Keep form logic behind a typed adapter so it can later call an API route.

## Data model and architecture
- Treat `db.json` as seed/content data, not as a production database.
- Create typed models/interfaces for SiteSettings, Profile, Education, ProfessionalJourney, Category, Creation, Product, Media, and ContactFormData.
- Add a data access layer (`src/lib/data.ts` or equivalent) with functions such as `getSiteSettings`, `getProfile`, `getCategories`, `getPublishedCreations`, `getCreationsByCategory`, and `getCreationBySlug`. Components should not import/parse JSON independently.
- Add `src/lib/slug.ts`, `src/lib/validation.ts`, `src/lib/format.ts`, and centralized site/design constants where useful.
- Keep UI components reusable: Navbar, Footer, SocialLinks, SectionHeading, CreationCard, CreationGrid, CreationCarousel, ProfileHero, EducationCard, JourneyCard, CTASection, ContactForm, EmptyState, Breadcrumbs.
- Separate content/data, domain types, shared UI, and route pages. Avoid giant page components and duplicated card markup.
- Use stable IDs and unique slugs; do not derive route identity from array index.
- Validate `db.json` at development/build time if a validation library is already available; otherwise use lightweight TypeScript/runtime guards. Do not add large dependencies without need.
- Keep future migration straightforward: components call repository/data functions rather than reading JSON directly, so a future MongoDB/API implementation can replace the data layer without rewriting the UI.
- Future-ready interfaces may be documented for authentication, admin CRUD, payments, order records, secure digital delivery, search/filtering, analytics, and multilingual support. Do not implement unfinished features as fake buttons.
- Add SEO metadata per route, Open Graph defaults, canonical-friendly URLs, `sitemap.ts`, and `robots.ts` where appropriate. Do not expose draft records in metadata/sitemap.

## Suggested folder structure
Adapt to the existing repository; do not create both `app/` and `src/app/`:
```text
project-root/
├── AGENTS.md
├── PROMPT.md
├── README.md
├── db.json
├── public/
│   └── images/
│       ├── profile/
│       ├── creations/
│       ├── cta/
│       └── logo.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── about/page.tsx
│   │   ├── creations/page.tsx
│   │   ├── creations/[category]/page.tsx
│   │   ├── creations/[category]/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/{navbar,footer,mobile-menu,social-links}.tsx
│   │   ├── home/{hero,creation-shelf,cta-section}.tsx
│   │   ├── profile/{profile-hero,journey-card,education-card,creative-life,interests,personal-words}.tsx
│   │   ├── creations/{creation-card,creation-grid,creation-carousel,creation-detail,media-player,product-panel}.tsx
│   │   ├── contact/{contact-form,contact-info}.tsx
│   │   └── ui/{section-heading,button,container,empty-state,breadcrumbs}.tsx
│   ├── data/
│   │   └── schema-notes.md
│   ├── lib/
│   │   ├── data.ts
│   │   ├── slug.ts
│   │   ├── validation.ts
│   │   ├── format.ts
│   │   └── constants.ts
│   └── types/
│       ├── site.ts
│       ├── profile.ts
│       ├── category.ts
│       ├── creation.ts
│       └── contact.ts
├── tests/
└── package.json
```

## `db.json` conventions
- Use the supplied root `db.json` as the initial data source.
- Keep top-level keys: `site`, `profile`, `categories`, `creations`.
- Creation `categoryId` must match a category `id`; route uses category `slug` plus creation `slug`.
- Each creation includes `id`, `slug`, `categoryId`, `title`, `subtitle`, `excerpt`, `description`, `coverImage`, `publishedAt`, `status`, `featured`, `tags`, `creator`, `product`, `media`, and `seo`.
- Allowed `status`: `draft`, `published`, `archived`.
- Set all template records to `draft` until real content is confirmed. Never make placeholder entries appear as real published work.
- The provided seed file contains 12 template entries per category (72 total) to test layouts. Replace them with verified works. Add 25–30 genuine creations per category as content becomes available; do not fabricate works.
- For a real launch, move content to a CMS/database/API when editing by nontechnical users is needed. A JSON file is not suitable for concurrent production writes or secure paid downloads.

## Implementation phases
Phase 1 — Inspect repository and confirm constraints.
Phase 2 — Types, data access layer, route scaffolding, layout and theme.
Phase 3 — Navbar, homepage hero, six responsive creation shelves, footer and CTA.
Phase 4 — About/profile sections and education/career layouts.
Phase 5 — Creations overview, category route, dynamic detail route, media and product-ready UI.
Phase 6 — Contact form validation, privacy page, SEO and responsive/accessibility pass.
Phase 7 — Run lint/typecheck/build, fix errors, update README with setup, data editing, image replacement, route map, limitations, and future extension points.

## Acceptance checklist
- All specified routes work and navigation links are real.
- All website copy is Bengali and visually consistent.
- Six homepage shelves each show six published creations when enough exist.
- Cards navigate to valid dynamic detail pages.
- Category routes automatically reflect new published records.
- Draft placeholders are hidden from public views, SEO and sitemap.
- No broken images, empty social links, empty YouTube embeds, fake form success, fake checkout, or fake downloads.
- Responsive at 320px, 375px, tablet, laptop, and desktop.
- TypeScript types are strict enough to catch malformed content.
- No unnecessary dependencies, duplicated logic, or giant page components.
- Lint/typecheck/build checks pass, and README explains any environment-specific limitation.

Begin by inspecting the repository and reading the required files. Then implement the application in the existing codebase, not merely describe how it could be built.
