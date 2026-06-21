# FrameTheory

Marketing + storefront site for FrameTheory, a software studio building
premium plugins for modern editors. Plain HTML/CSS/JS, no build step,
deployed via GitHub Pages.

Live: https://zjhunter29.github.io/frametheory/

---

## Project layout

```
index.html              Home — hero, stats, featured plugins, why-us, latest releases
plugins.html            Catalog — search + category chips
marketplace.html        Storefront — sidebar filters + sort dropdown
plugin.html             Detail page (driven by ?id=N query param)
about.html              Company story + values
contact.html            Contact form (mailto:) + info card

assets/
  styles.css            Single source of truth for the design system
  app.js                Nav, footer, ambient layer, plugin card factory, observers
  data/plugins.js       Centralized plugin catalog (window.PLUGINS, window.CATEGORIES)

Plugin Display Images/  Plugin imagery — one file per plugin id (plugin{id}.png)
  placeholder.svg       Auto-shown when a plugin image is missing

frametheory-logo.png    Brand mark, used in nav / footer / favicon / hero
.github/workflows/static.yml   GitHub Pages deploy
```

---

## Adding a new plugin

A new plugin appears across the Home page (featured + latest), the Plugins
catalog, the Marketplace, and gets its own detail page — **with no code
changes** beyond the data entry and one image upload.

### 1. Drop the image into `/Plugin Display Images/`

Name it `plugin{id}.png`, matching the `id` you'll use in the data file.

```
Plugin Display Images/plugin7.png
```

If you don't have an image yet, the layout won't break — the SVG placeholder
will show in its place until you upload one.

### 2. Add an entry to `assets/data/plugins.js`

```js
{
  id: 7,
  name: 'My New Plugin',
  tagline: 'One sentence positioning line.',
  description: 'One paragraph that explains what it does and why it matters.',
  category: 'Video Editing',     // Must be one of window.CATEGORIES
  version: '1.0.0',
  price: '$29',
  rating: 4.7,
  reviews: 0,
  released: '2026-06-21',        // YYYY-MM-DD, sorted "newest first"
  featured: false,               // true = appears on Home > Featured
  features: [
    'Bullet one',
    'Bullet two',
    'Bullet three'
  ],
  payhipLink: 'PAYHIP_LINK_HERE' // Replace with your Payhip URL when ready
}
```

### 3. Set the Payhip link when you have one

While `payhipLink` is the literal placeholder `"PAYHIP_LINK_HERE"`, the Buy
Now button stays visible but disabled with a "Purchase link coming soon"
tooltip. Swap in the real URL and it lights up — opens in a new tab with
`rel="noopener noreferrer"`.

```js
payhipLink: 'https://payhip.com/b/yourSlug'
```

That's it. No component edits, no page edits.

---

## Adding a new category

Append to the `window.CATEGORIES` array at the bottom of `assets/data/plugins.js`:

```js
window.CATEGORIES = [
  'Video Editing',
  'AI Tools',
  'Productivity',
  'Design',
  'Utilities',
  'Effects'            // new
];
```

The new category automatically appears in the catalog chips and marketplace
sidebar filters.

---

## Editing copy

All visible text lives in the page HTML files (`index.html`, `about.html`, etc.)
plus the plugin data file. Search-and-replace works fine — there's no JSX
escaping or framework layer.

## Editing styles

`assets/styles.css` carries the full design system. The two key swatches
to tweak if you want to shift the brand:

```css
--amber-400: #f59e0b;   /* primary accent (lens flare) */
--amber-500: #d97706;
--steel-300: #d4d4d8;   /* secondary accent (camera body) */
```

## Deployment

The `.github/workflows/static.yml` workflow auto-deploys the repo root to
GitHub Pages on every push to `main`. Just commit and push; the site
updates in 30–90 seconds.
