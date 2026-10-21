# Mainul Islam Alif — Portfolio

An English-language personal portfolio and creative catalogue. The project uses the Next.js App Router, React, TypeScript, Tailwind CSS, and editable content in `db.json`.

## Running the project

Install Node.js, then run these commands from the project root:

```powershell
npm install
npm run dev
```

The local site usually runs at `http://localhost:3000`. Other commands:

| Command | Purpose |
| --- | --- |
| `npm run lint` | Runs ESLint |
| `npx tsc --noEmit` | Checks TypeScript |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build |

## Site URL and SEO

Before deploying to production, set `SITE_URL` to the real site origin:

```env
SITE_URL=https://your-verified-domain.example
```

Add it in `.env.local` locally or in the deployment platform's environment settings. Make sure the domain and protocol are real, then create the production build. This value drives canonical URLs, the Open Graph origin, and the sitemap. Without `SITE_URL`, canonical URLs are omitted and the sitemap stays empty rather than publishing an invented domain.

## Editing content

- `db.json` is the primary editable content source. Keep site settings, profile information, categories, and creations there.
- Creation `status` can be `draft`, `published`, or `archived`. Keep unverified templates as `draft`; only `published` work appears on public pages, search metadata, and the sitemap.
- A creation's `categoryId` must reference an existing category ID. Keep IDs and slugs unique.
- Edit the contact email, phone, address, availability, and social URLs under `site`. Blank or invalid contact URLs are not rendered as links.
- Add images to `public/` and reference them with public paths such as `/images/...` in `db.json`. The interface includes fallbacks for missing images.

### Before publishing verified content

The current `db.json` contains 72 seed creation records and six clearly marked demo records used to test the catalogue layout; all 78 are `draft`. Profile biography text is still editable instruction copy, all five career entries have blank organisation and period values, and all five education entries have a blank institution. Do not present these as real facts.

The six extra demo records use IDs starting with `demo-` and titles prefixed with "Demo". They contain original fictional samples for interface review only: not real work, not for sale, and never shown on public pages, metadata, or the sitemap. Do not publish them when adding real work; remove them if they are no longer needed.

When real information is available, update only the relevant fields:

- **Profile:** verified short introduction, background, personality, professional summary, and writing/music overview; career role, organisation, period, and description; education degree, institution, department, year, and result; creative life, interests, and the person's own paragraphs.
- **Creations:** real titles, categories, short and full descriptions, publication dates (if any), covers, creator/rights, and verified media URLs or previews. Keep work as `draft` until the work and publication permission are confirmed; publish only after verification.
- **Contact:** confirm the email, phone, address, and social URLs approved for publication. Verify the current `db.json` values with the owner before publishing them.
- **Images:** `public/` still contains no images. Expected replacement paths are `/images/logo.svg`, `/images/profile/hero.jpg`, `/images/profile/profile.jpg`, `/images/cta/cta.jpg`, and, for published creations, each work's own verified cover path instead of `/images/creations/placeholder-cover.jpg`. Only supply images whose use rights are confirmed.

Submit data and it can be validated together against the existing typed fields and category IDs. Missing information will not be invented; optional fields may stay blank.

## Theme and typography

- The interface follows the supplied reference: deep forest-green hero and footer bands, a warm cream page surface, white rounded cards, amber accent buttons, wave-shaped section edges, and small four-point sparkles.
- Typography uses Poppins, loaded with `next/font/google` in `src/app/layout.tsx` and applied through `--font-body`.
- Theme tokens live in `:root` in `src/app/globals.css` (`--color-forest-*`, `--color-accent`, `--color-cream-*`). Components use semantic classes such as `site-container` and `creation-card` rather than utility classes.
- All user-facing copy, dates, and counts use English (`en-US`). Keep new copy natural English.

## Route map

| Route | Purpose |
| --- | --- |
| `/` | Introduction, six creation shelves, contact CTA |
| `/about` | Profile and background |
| `/creations` | All creation categories |
| `/creations/[category]` | Published work in one category |
| `/creations/[category]/[slug]` | Published work detail |
| `/contact` | Contact details and demo form |
| `/privacy` | Information about the demo form |
| `/robots.txt`, `/sitemap.xml` | Crawler guidance and sitemap |

## Current limitations

- With seed creations left as drafts, the catalog and category pages show empty states.
- The contact form only validates input in the browser; it does not send or store messages. A backend/email integration and matching privacy details are needed before a working submission.
- Shopping, payment, and protected downloads are not connected; private file URLs must never appear in public content.
- Profile placeholders must be replaced with verified information. Do not present unverified material as a real biography.
