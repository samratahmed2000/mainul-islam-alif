# Application Architecture & Folder Structure

## Architecture principles
- **Presentation:** reusable React components and route pages.
- **Domain:** typed models for profile, categories, creations, product metadata, and contact forms.
- **Data access:** a single repository/data layer reads `db.json`; components do not import JSON directly.
- **Routing:** Next.js App Router with dynamic category and creation routes.
- **Future migration:** replace the JSON-backed data functions with API/database implementations without rewriting UI components.
- **Safety:** draft content is hidden from public pages; paid file delivery and payments require a trusted server-side implementation.

## Suggested structure

```text
project-root/
├── AGENTS.md
├── PROMPT.md
├── README.md
├── db.json
├── package.json
├── public/
│   └── images/
│       ├── logo.svg
│       ├── profile/
│       │   ├── hero.jpg
│       │   └── profile.jpg
│       ├── creations/
│       │   └── placeholder-cover.jpg
│       └── cta/
│           └── cta.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── creations/
│   │   │   ├── page.tsx
│   │   │   └── [category]/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   └── social-links.tsx
│   │   ├── home/
│   │   │   ├── hero.tsx
│   │   │   ├── creation-shelf.tsx
│   │   │   └── cta-section.tsx
│   │   ├── profile/
│   │   │   ├── profile-hero.tsx
│   │   │   ├── journey-card.tsx
│   │   │   ├── education-card.tsx
│   │   │   ├── creative-life.tsx
│   │   │   ├── interests.tsx
│   │   │   └── personal-words.tsx
│   │   ├── creations/
│   │   │   ├── creation-card.tsx
│   │   │   ├── creation-grid.tsx
│   │   │   ├── creation-carousel.tsx
│   │   │   ├── creation-detail.tsx
│   │   │   ├── media-player.tsx
│   │   │   └── product-panel.tsx
│   │   ├── contact/
│   │   │   ├── contact-form.tsx
│   │   │   └── contact-info.tsx
│   │   └── ui/
│   │       ├── section-heading.tsx
│   │       ├── button.tsx
│   │       ├── container.tsx
│   │       ├── empty-state.tsx
│   │       └── breadcrumbs.tsx
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

> If the existing project uses `app/` directly at the root instead of `src/app/`, preserve that convention. Do not create both route roots.

## Route map

| Route | Purpose |
|---|---|
| `/` | Homepage, hero, six creation shelves, CTA |
| `/about` | Profile, career, education, creative life, interests |
| `/creations` | Overview of all six categories |
| `/creations/[category]` | All published creations in one category |
| `/creations/[category]/[slug]` | Individual creation detail |
| `/contact` | Contact details and form |
| `/privacy` | Contact-form privacy notice |

## Data flow

```text
db.json
   ↓
src/lib/data.ts  ← single data access/repository layer
   ↓
typed domain models in src/types/
   ↓
route pages in src/app/
   ↓
reusable UI components in src/components/
```

## Content and digital-product lifecycle

1. Add a creation record with a unique `id` and `slug`.
2. Assign a valid `categoryId` from `categories`.
3. Add Bengali title, excerpt, description, cover image, tags and optional media.
4. Keep `status: "draft"` while reviewing.
5. Set `status: "published"` only when the content and rights are confirmed.
6. For sale, configure product metadata. A real payment flow must verify orders server-side before allowing protected downloads.

## Scalability notes
- `db.json` is suitable for seed content and early frontend development, not concurrent production editing.
- A future CMS or MongoDB/API adapter should implement the same data-access functions.
- Add admin authentication and authorization before allowing content management.
- Add a payment provider, server-side order verification, secure file storage, and download authorization before enabling paid products.
- Keep environment secrets in environment variables; never put secrets or private digital-file URLs in `db.json`.
