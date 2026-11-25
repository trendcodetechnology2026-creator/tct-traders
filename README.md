# TCT Traders — plastic products website

A fast, single-page, mobile-first website for **TCT Traders**, Ganapathy, Coimbatore.
Built with plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.

## Run it

Open `index.html` directly in a browser, or serve the folder locally:

```bash
# Python 3
python -m http.server 8080

# then visit http://localhost:8080
```

Deploy the whole folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, cPanel, etc.).

## Files

```
index.html                 All page content, sections and SEO metadata
css/styles.css             Design system, responsive layout, animations
js/main.js                 Menu, filtering, reveal effects and WhatsApp form
assets/favicon.svg         Browser tab icon
assets/images/*.jpg        Illustrative catalog product photos
assets/images/og-placeholder.svg   Temporary social-share image
README.md                  This guide
```

---

## 1. Replace the images

The files in `assets/images/` are **illustrative catalog photos** (AI-generated placeholders), not photos of the exact stock in the shop:

| Photo | Used for |
|---|---|
| `spoon.jpg` | Serving Spoon Set |
| `mug.jpg` | Everyday Mug — Set of 6 |
| `bucket.jpg` | Heavy-Duty Bucket, 20 L |
| `container.jpg` | Airtight Container Set |
| `lunchbox.jpg` | Compartment Lunch Box |
| `bottle.jpg` | Fridge Water Bottle |
| `dustbin.jpg` | Pedal Dustbin |
| `soapdish.jpg` | Soap Dish |
| `cups.jpg` | Disposable Cups |
| `tumbler.jpg` | Tumbler & Mug Set |

To use your own product photos:

1. Add your photos to `assets/images/` (WebP or JPG, around **800 × 600 px**, under ~150 KB each works well).
2. Replace the matching file name, or update the `src` in `index.html` **and** the `image` value in `PRODUCTS_DATA` at the top of `js/main.js` (the cart, search results and deal thumbnails read from that data).
3. Update each `alt` attribute so it accurately describes the new photo.
4. Keep the `width`/`height` attributes proportional (e.g. `800` / `600`) to prevent layout shifts.

When you replace an existing file, bump the `?v=` number on its URL (for example `spoon.jpg?v=2` → `spoon.jpg?v=3`) in `index.html` and `js/main.js` so returning visitors do not see the old cached photo.

Product photos are shown inside a white rounded tile on the category tint, using `object-fit: contain`. A square-ish crop with the product centred works best.

To add or remove products, copy a `<article class="product-card-wrap">` block and add a matching entry to `PRODUCTS_DATA`. The filter totals update automatically. Keep `data-category` exactly equal to one of the filter categories.

### Hero & social preview

- The hero is a three-slide text banner carousel; product photos appear in the flash-deal strip, the product grid, the search dropdown and the quote cart.
- `assets/images/og-placeholder.svg` is only a temporary social preview. Replace it with a **1200 × 630 px JPG/PNG** and update these paths: `og:image`, `twitter:image`, and the `image` field in the JSON-LD in `<head>`.

---

## 2. Replace phone & WhatsApp details

**Main settings:** `js/main.js`, at the top:

```js
var CONFIG = {
  phone: "+919384846922",
  displayPhone: "+91 93848 46922",
  whatsapp: "919384846922"
};
```

- `phone` is used for `tel:` links (country code included, no spaces).
- `displayPhone` is the visible text.
- `whatsapp` is the number that receives WhatsApp messages (country code, no `+` or spaces).

The JavaScript rewrites those links and visible numbers on load. For no-JS visitors and search engines, also update the static fallback number in `index.html` — search for `9384846922` and `93848 46922` and replace them. Each spot is marked with a `✏️ REPLACE PHONE` comment.

> The number must be active on WhatsApp for the enquiry buttons to work. They open `wa.me` with a prefilled message.

---

## 3. Replace the address

Search `index.html` for **“TCT Building”** and update:

- the **Shop address** contact card,
- the footer **Reach us** card,
- the Google Maps link (`maps/search/?api=1&query=...`),
- the map iframe `src` query,
- the JSON-LD `PostalAddress` in `<head>`.

**Map:** the iframe currently uses a place search, so no API key is needed. For an exact pin, open Google Maps → **Share → Embed a map**, copy the iframe URL, and replace the `src` value. All map spots are marked `✏️ REPLACE MAP` / `✏️ REPLACE ADDRESS`.

The postcode `641006` is included in the template — please confirm it matches your exact location.

---

## 4. Working hours — verify before publishing

The displayed hours are **placeholders** and need to be confirmed:

- Monday – Saturday: 9:00 AM – 8:00 PM
- Sunday: 10:00 AM – 2:00 PM

They appear in the contact card, footer and the JSON-LD opening hours. Update all three if your timings differ. The page also says timings may vary on public holidays; change that line if it does not apply.

---

## 5. Social links

The Instagram and Facebook icons in the footer are intentionally marked placeholders (`href="#"`). Add your real profile URLs and update their `aria-label` text. The WhatsApp icon already points to your number.

Search `✏️ REPLACE SOCIAL LINKS` in `index.html`.

---

## 6. Replace the domain in SEO metadata

The template uses `https://www.tcttraders.example/` as a placeholder. Before publishing, search for `tcttraders.example` and replace it with your live domain in:

- `<link rel="canonical">`
- `og:url`
- structured data `url` and `image`

Also review the page `<title>`, meta description and JSON-LD business details. The local SEO keywords requested are already included; keep the copy specific and accurate to your business.

You can add a `robots.txt` and `sitemap.xml` once the final domain is known — they are not included here.

---

## Customising the design

Design tokens are at the top of `css/styles.css`:

```css
:root {
  --blue: #0b5fff;
  --orange: #ff8a1f;
  --teal: #0f9e8c;
  --ink: #0c1b33;
  --font-head: "Poppins", ...;
  --font-body: "Inter", ...;
}
```

Fonts are loaded from Google Fonts with `display=swap`, so text renders immediately. For a fully self-contained deployment, download the two font families and update the `<link>` tags.

Category accent tints (`--cat-soft`, `--cat-ink`, `--cat`) are defined per `data-category` and shared by cards, badges and product media.

## The enquiry form

The form has **no backend and stores nothing**. On submit it:

1. Validates name, a 10-digit Indian mobile number, and product category.
2. Builds a formatted message with name, phone, product, quantity and message.
3. Opens WhatsApp in a new tab with that message pre-filled.

If you ever need enquiries by email as well, add a server endpoint or a form service; the current flow intentionally keeps the site static and low-cost.

## Accessibility & performance notes

- Skip link, semantic landmarks, labelled form fields, descriptive alt text and visible focus states.
- Keyboard-friendly mobile menu; `Escape` closes it and returns focus to the toggle.
- Reduced-motion support: reveals and floating animations are disabled.
- Tap targets on primary controls are 44–48 px tall; text contrast was chosen to meet WCAG AA for body copy.
- All icons are inline SVG, product art is SVG/lightweight, below-the-fold images lazy-load, and there are no JS libraries.
- Test after replacing content: check that your new image alt text is accurate and that the phone/WhatsApp links open correctly on a real phone.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The site uses native CSS `aspect-ratio`, `translate` reveal animations, `clamp()` and `IntersectionObserver`; older browsers still show all content, just with simpler motion.
