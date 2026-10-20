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

# AGENTS.md — Project-wide Instructions

## Project purpose

Build and maintain a premium Bengali-language personal portfolio and digital-creations catalog for a person who is a banker, writer, and Islamic music artist. The application must present the person's verified profile and creative works, and keep the architecture ready for future digital-product sales, content management, and backend integration.

## Required stack

- Next.js App Router
- React
- TypeScript with strict typing
- Tailwind CSS
- `react-icons`
- `db.json` as the initial content/seed source

Respect the versions, package manager, and configuration already present in the repository. Do not replace working configuration or migrate between `app/` and `src/app/` without a clear need.

## Before making changes

1. Inspect the repository and read `AGENTS.md`, `PROMPT.md`, `ARCHITECTURE.md`, `README.md`, `package.json`, `db.json`, and relevant source files when they exist.
2. Identify the existing routing root, package manager, scripts, dependencies, and current implementation status.
3. Give a concise plan for multi-step changes, then proceed with implementation. Do not stop after describing the plan.
4. Preserve existing working features and user-authored content. Avoid broad rewrites when a focused change will work.
5. Never claim a test, build, or command passed unless you actually ran it and checked its result.

## Language and content rules

- All visible website content must be in professional, natural Bengali unless a technical term, brand name, proper noun, URL, or user-supplied title should remain as-is.
- Use a Bengali-friendly font such as Noto Sans Bengali, with reliable fallbacks.
- Do not invent the person's name, biography, education, institution, employment history, awards, publications, social links, contact information, prices, reviews, or testimonials.
- Use editable placeholders where information is missing. Make placeholders easy to find and replace.
- Do not present template records as real published works.
- Keep Bengali text readable with suitable line-height, spacing, and responsive typography.

## Design system

- Use a premium, minimal, editorial visual style.
- Main theme: dark forest-green gradient, white/off-white text, restrained green/teal gradient buttons, subtle borders, and tasteful shadows.
- Prioritize clarity, readability, consistency, and mobile-first responsive behavior.
- Avoid visual clutter, excessive glassmorphism, neon effects, excessive animations, and generic dashboard styling.
- Use a consistent set of design tokens for colors, spacing, radius, typography, and shadows.
- Respect `prefers-reduced-motion`.
- Use semantic HTML and accessible controls. Provide visible focus states, keyboard support, appropriate contrast, useful image alt text, and accessible labels for icon-only buttons.
- Use `react-icons` for interface icons; do not use emoji as UI icons.

## Architecture and code quality

- Use Next.js App Router conventions and TypeScript.
- Prefer Server Components by default. Add Client Components only when browser-side interactivity is needed.
- Keep route pages small and compose them from reusable components.
- Separate route pages, UI components, domain types, and data-access logic.
- Centralize all content reading and querying in a data-access layer such as `src/lib/data.ts` (adapt the path to the existing project).
- Components must not independently parse or import `db.json` in many places.
- Create and reuse typed models for site settings, profile, education, career journey, category, creation, product, media, and contact-form data.
- Use stable IDs and unique slugs; never use array indexes as persistent identities.
- Keep category order controlled by category data, not duplicated in multiple components.
- Handle missing, malformed, or optional fields safely.
- Avoid `any` unless there is a documented, unavoidable reason. Prefer explicit types, type guards, and clear function signatures.
- Avoid unnecessary dependencies. Reuse existing packages when suitable.
- Do not duplicate components or business logic to implement similar routes.
- Do not silence TypeScript, lint, or build errors with broad casts, blanket ignores, or disabled rules as a shortcut.
- Keep secrets in environment variables. Never hardcode credentials or commit `.env` files.

## Content data rules

- Treat `db.json` as seed/content data for early development, not as a production database.
- Expected top-level keys: `site`, `profile`, `categories`, `creations`.
- Each creation must reference a valid category ID and have a unique slug.
- Supported content states: `draft`, `published`, `archived`.
- Public pages, search results, related items, SEO metadata, and sitemap must include only `published` records.
- Keep sample/template creations in `draft` until verified real content is supplied.
- Empty social URLs, contact fields, optional media, and missing publication dates must be handled gracefully rather than rendered as broken UI.
- Do not expose private paid-download URLs or secrets in public page data.

## Required route conventions

- `/` — homepage
- `/about` — profile and background
- `/creations` — all creation categories
- `/creations/[category]` — one category's published works
- `/creations/[category]/[slug]` — individual work details
- `/contact` — contact details and contact form
- `/privacy` — contact-form privacy notice
- Add suitable not-found, loading, and error states when appropriate.

Unknown category slugs, unknown creation slugs, category/creation mismatches, and unpublished records should not be rendered as public detail pages; use Next.js `notFound()` where appropriate.

## Homepage and profile requirements

- Homepage has a responsive navbar, hero section, six creation shelves, CTA banner, and footer.
- The six creation categories, in order, are: কবিতা, ছোটগল্প, বই, ইসলামী সংগীত, উপন্যাস, সংগীত ভিডিও.
- Each homepage shelf shows up to six published cards, has accessible carousel controls where needed, and links to the category page.
- Creation cards link to the corresponding dynamic detail route.
- Profile page includes introduction, professional journey, education, creative life, interests/hobbies, and “আমার কিছু কথা”.
- Use data-driven reusable components for repeated card patterns.
- Do not display blank fields as fabricated facts.

## Forms and external integrations

- Validate contact form inputs and show clear Bengali status/error messages.
- Until a backend endpoint or email service is configured, clearly treat form submission as a demo/not connected. Never claim a message was sent when it was not.
- Do not create fake working buttons for unimplemented integrations.
- Only render social links when valid URLs are configured.
- Only embed YouTube or audio media when a valid source exists.
- Do not fake payment success, purchase completion, or digital downloads.
- Before paid digital downloads go live, implement server-side payment/order verification, access authorization, and secure file delivery. A private file URL must never be exposed as a free public link.

## SEO and performance

- Add appropriate Bengali page metadata and sensible Open Graph defaults.
- Do not include draft or archived creations in metadata, sitemap, or public content.
- Use responsive images with suitable sizes and alt text.
- Avoid unnecessary client-side JavaScript and large dependencies.
- Ensure useful loading, empty, error, and not-found states.
- Prefer accessible, performant patterns over decorative effects that harm usability.

## Testing and completion

After meaningful changes:

1. Run the repository's available lint command.
2. Run the available TypeScript/type-check command.
3. Run the production build when feasible.
4. Fix errors caused by your changes and report any checks that could not run.
5. Test key routes, mobile navigation, category filtering, dynamic detail routing, missing images/optional links, and form validation when feasible.
6. Update `README.md` with setup, scripts, content editing, image replacement, route map, and current limitations when project-level changes warrant it.

## Working style

- Implement the requested task, not just a tutorial or conceptual answer.
- For multi-step work, use small, verifiable phases.
- Before editing a file, understand its purpose and check how it is used.
- Prefer minimal, maintainable changes that fit the existing project.
- If a requirement conflicts with the current architecture, explain the conflict briefly and choose the safest maintainable approach.
- At completion, summarize what changed, list checks actually run, and mention remaining limitations or follow-up steps.
