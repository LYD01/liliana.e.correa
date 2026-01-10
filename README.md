# Liliana E. Correa — Portfolio Website

A responsive portfolio website for artist and researcher **Liliana E. Correa** showcasing her creative work (children's literature, exhibitions, poetry, academic research, documentary and more). The site provides a searchable, filterable catalogue of works (with categories, tags, and detail pages), and a clean, mobile-first UI.

---

## 🚀 Features

- Gallery of works with category and tag filters
- Individual work pages and optional modal previews
- Bilingual and multimedia works supported (images, video embeds, external links)
- Responsive layout and accessible markup

## 🔧 Tech stack

- **Next.js** (App Router)
- **React + TypeScript**
- **Tailwind CSS** and **Sass** for styling
- **Framer Motion** for animations

## 📁 Project structure (high level)

- `src/app/` — app routes and pages
- `src/app/_components/` — UI components (nav, footer, modals, etc.)
- `src/app/_constants/WorksData.ts` — canonical data source for the works displayed
- `public/` — static assets (images, icons)

> Tip: Content for each work (title, summary, tags, category, images, external links) is maintained in `src/app/_constants/WorksData.ts`.

## ⚙️ Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm start` — start production server
- `npm run lint` — run linters

## ✍️ Updating or adding works

1. Add or update an entry in `src/app/_constants/WorksData.ts` following the `Work` interface shape.
2. Add or update the corresponding image in `public/img/` (or adjust `img` path in the data entry).
3. If the work has an external link, provide `externalUrl` in the data entry.

## 📫 Contact / Contributing

For content updates or questions, edit `WorksData.ts` and open a pull request. For anything else, contact the project owner.

---

**License:** No license specified.
