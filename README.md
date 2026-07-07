# Selected work — portfolio section

A split-screen "work" section. Projects sit in a selector rail (vertical on
desktop, a horizontal scrollable strip on mobile). Selecting one swaps the
stage, which shows that project's media, description, and — the signature
element — its problems, embedded in the project but elevated as red-marked
problem / solution pairs.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Structure

- `src/PortfolioWork.jsx` — the whole section, self-contained (data + styles).
  This is the only file you need if you're dropping it into an existing site.
- `src/App.jsx` — slim page frame (nav, hero, footer) around the section.
- `src/index.css` — page-level styling (warm background, type, hero).

## Adding a project

Append an object to the `projects` array in `PortfolioWork.jsx`:

```js
{
  id: "myproject",
  name: "myproject",
  tagline: "One line on what it is.",
  status: "active",            // "active" gets a pulsing dot; else "shipped"
  tech: ["React", "..."],
  links: [{ label: "live", href: "https://..." }],
  description: "A paragraph of context.",
  media: [
    { type: "image", src: "/img/shot.png", label: "dashboard" },
    { type: "video", src: "/clip.mp4",     label: "demo" },
  ],
  problems: [
    { q: "The hard question you faced?", a: "How you solved it." },
  ],
}
```

## Media

Each media item is `{ type, src, label }`. Leave `src: ""` to render a
labelled placeholder (useful while you gather assets). Drop real files in
`public/` and reference them as `/file.png`. The first media item is the
featured tile; the rest become thumbnails.

## Notes

- Fonts use system stacks (Georgia for display, system sans for body, system
  mono for labels). To match your editorial direction more tightly, swap the
  serif for a webfont like Fraunces or GT Sectra in `index.css`.
- Motion is kept light and respects `prefers-reduced-motion`.
- Breakpoint for the desktop→mobile layout swap is 820px.
