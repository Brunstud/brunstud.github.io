# Shicheng Hu — personal academic website

A quiet editorial homepage built with Next.js App Router, TypeScript, and Tailwind CSS. Includes three research entries (two link directly to external publications), two illustrated project pages, About, three bilingual poems, and two CV versions with online reading and download.

## Run locally

Use Node.js 22.13+ (or current LTS) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npx playwright test
```

Browser tests check routes, local links and anchors, CV download, unknown URLs, Open Graph image, keyboard navigation, accessibility, and overflow at 1440, 390, and 320 pixels. Screenshots are saved in ignored `qa/`.

## Content editing

- `src/content/site.ts`: biography, email, social URLs, research/project summaries and metadata, personal paragraph, real photo gallery.
- `src/content/research/*.md` and `src/content/projects/*.md`: long-form notes. Standard Markdown supports headings, lists, code, links, and images. Raw HTML is not enabled.
- Add a research/project record with a unique slug and matching Markdown file. Routes are generated at build time. For external-only research, set `externalUrl` and `links: [{ label, href }]`; no Markdown file or local detail route is needed. The two replaced local research URLs now return 404 and are excluded from the sitemap.
- `src/content/poems.json`: the three original poems and sentence-level English translations. Each record has `slug`, `title`, `englishTitle`, optional `byline` / `englishByline`, optional ISO `date`, optional `notes`, and `lines: [{ zh, en, stanza }]`. Each Chinese sentence is followed by its English translation; changes in the stanza number add whitespace. Each poem receives `/poetry/<slug>`. Edit this data file directly; no DOCX source is required at build time.
- Put real photographs in `public/images/`, then add `src`, descriptive `alt`, `caption`, `width`, and `height` to `photos`. The gallery appears only when photos exist.
- `src/content/cv.ts`: CV options. `/cv` defaults to `CV-Shicheng Hu`; the selector also offers the research resume. Both have direct PDF opening, download, and responsive page previews.
- `public/cv/`: standalone public PDFs and WebP page previews, derived from the two supplied PDFs in the root `cv/` folder. Phone numbers and the excluded CPU project are removed from public copies; original PDFs remain unchanged. `public/shicheng-hu-cv.pdf` is a compatibility copy of the default CV.
- `scripts/generate_cv.py`: regenerate these public copies from `cv/CV-Shicheng Hu.pdf` and `cv/Resume-Shicheng Hu-Research.pdf` with `pymupdf` and `pillow` installed. Review the generated previews after changes. The script is not run by the build.
- Project figures are standalone assets under `public/images/projects/`; their alt text, dimensions, and captions are in `site.ts`. They link to full-size images. No report PDF is served.

## Sources and missing material

The supplied CVs establish education, dates, research, and engineering background. The CG team report provides implementation details and individual contributions (pp. 30–43, 55–60); the images come from p. 54. The InnBook HCI report supplies design concepts, team roles (p. 2), and creation-interface screenshots (p. 24). Its interface prototype and proposed features are distinguished from the engineering work described in the CV. Homepage interests and personal activities also follow `.prompt`.

GitHub, LinkedIn, itch.io, publication/project links, and rowing/dragon-boat links use the owner-supplied URLs. The poems preserve the supplied Chinese wording and stanza structure. Numeric interview references in 同舟行 are omitted in the reading edition; its supplied team byline is preserved. Supplementary interviews and prose glosses are not published. The English translations are editorial reading translations, not pre-existing author translations. No dates have been inferred.

The original project PDFs, poem DOCX files, and root `cv/` sources can be removed after extraction without affecting the website. Keep `src/content/*.json`, Markdown notes, and generated `public/` assets. `.vercelignore` excludes raw source documents, and no page imports them. The unrelated digital-logic report is not featured. Optional future additions: original personal photographs, complete research author lists, and an InnBook repository URL.

## Deploy to Vercel

Import this repository into Vercel using its Next.js preset. Set `NEXT_PUBLIC_SITE_URL` to your actual HTTPS origin (no trailing slash), then deploy. No database or paid API is needed. Main pages and work pages are prerendered; new poem records are prerendered after rebuilding. Unknown poems return 404. No publication was performed as part of the local implementation.

The origin is intentionally not invented: without it, the sitemap is empty; with it, canonical links and sitemap entries use the real domain. System fonts keep the website independent of external font services, including Chinese serif fallbacks for poetry.

## Dependency audit

The production dependency audit passed with zero reported vulnerabilities. The full audit reports five high-severity findings through the development-only `eslint-config-next → fast-glob → micromatch → braces` chain (GHSA-vfj7-8cjw-p6xm). npm proposes an incompatible downgrade to Next 14 lint configuration rather than a compatible patch. Do not apply `npm audit fix --force` blindly; update the lint chain when a compatible fix is available. Dependency versions and the lockfile are pinned for reproducibility.
