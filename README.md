# Capital Watches

A luxury watch store front-end in black and gold. Plain HTML, CSS and JavaScript, with no build step.

## Features
- 3D watch in the hero (Three.js): real-time hands, mouse-follow tilt, exploded view while the hero is pinned
- Product carousels with tabs, quick view with zoom, side-by-side compare, wishlist
- Cart drawer with quantities and totals (prices in Egyptian pounds)
- Testimonials slider, category cards, news cards, newsletter form
- Respects `prefers-reduced-motion`; adapts quality automatically on slower devices

## Run it
Open `index.html` in a browser. An internet connection is needed for the CDN libraries (Three.js, GSAP, Font Awesome, Google Fonts).

For a local server instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project structure
```
index.html        Page markup
css/              Stylesheets, loaded in numeric order (later files refine earlier ones)
js/               Scripts, loaded in numeric order
  01-core.js        helpers, product data, currency
  02-cards.js       product cards and the carousel
  03-overlays.js    quick view, compare, cart drawer
  04-events.js      click delegation and keyboard shortcuts
  05-sections.js    carousels, testimonials, news, categories
  06-hero3d.js      the 3D watch
  07-motion.js      scroll animations and the intro
  08-ui.js          nav rings, newsletter, clock, card tilt, heart
assets/           Images (cut-outs are in assets/cut/)
```

## Prices
Prices are stored in USD in `js/01-core.js` and shown in Egyptian pounds. Change the `USD_EGP` constant to update the exchange rate for the whole site.

## Credits
Product, lifestyle and portrait images were generated with Gemini. Libraries: Three.js, GSAP, Font Awesome. Fonts: Chakra Petch and Hanken Grotesk (Google Fonts).
