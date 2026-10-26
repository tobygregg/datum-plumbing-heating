# Datum Plumbing & Heating Ltd. — website

Single-page static site: plain HTML, Tailwind CSS v3 (compiled and committed) and vanilla JavaScript. No frameworks, no CDNs.

Live draft: https://tobygregg.github.io/datum-plumbing-heating/

## Folder layout

```
index.html              single page, sections separated by big comment banners
thanks.html             form thank-you page (FormSubmit redirects here)
assets/css/styles.css   compiled Tailwind (committed — run `npm run build` after edits)
assets/js/main.js       menu, scroll reveal, header, plant-room hotspots, gallery filter + lightbox, form
assets/fonts/           self-hosted woff2 + OFL licence files
images/brand/           logo (dark + light) and mark as SVG
images/work/            photos: name.webp (full) + name-sm.webp (~800px)
images/                 favicons, og-image.jpg, site.webmanifest
src/input.css           Tailwind source + @font-face + custom CSS/keyframes
tailwind.config.js      brand colours (named, commented) + fonts
package.json            "build" and "watch" scripts
sitemap.xml, robots.txt
_fb-pack/               the Facebook source pack (not published: underscore folders are skipped by Pages)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| navy | `#0B3369` | Logo lettering; headings, dark sections |
| navy-950 / 900 | `#050F22` / `#071A38` | Hero, plant-room and footer backgrounds |
| steel | `#95A9B8`, `#D8E3EA` | Logo greys; borders and pale backgrounds |
| copper | `#C8793A` | Pipework in the photos; kickers, pipe graphics |
| heat | `#FF6B2C` | The orange expansion vessels in the cover photo; all calls to action |
| flow | `#2F8CE6` | The blue pipework in the cover photo; "return" pipes |

Fonts: Barlow Condensed (display), Barlow (body), IBM Plex Mono (small technical labels) — all SIL OFL, self-hosted.
The supplied logo was only 232 px wide, so it was **re-drawn as SVG** (slab lettering, star, rule and "LTD"). It is a close recreation, not a trace; swap in the client's original vector if they have one.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** `tailwind.config.js`, then `npm install && npm run build`.
- **Add a work photo:** save `name.webp` (~1600px wide) and `name-sm.webp` (~800px) in `images/work/`, then copy an existing `<a class="tile …">` in the gallery grid. Set `data-cat` (`hp`, `cyl`, `ufh`, `bath`, `pf`), `data-caption`, and the `<img>` width/height/alt.
- **Plant-room hotspots (showpiece):** marker positions are `left`/`top` percentages on the `.hotspot` buttons in `#inside`; the text for each lives in the `hsData` array at the top of the hotspot section of `assets/js/main.js` (and the first one is repeated in the HTML for no-JS).
- **Gallery:** filters are the chips in `#filters`; the first 12 photos show until "Show all" is pressed (`LIMIT` in `main.js`). The lightbox picks up whatever tiles are visible.
- **Before / after:** deliberately not included — this is plumbing and heating work with no before/after pairs in the pack.

## Before going live — checklist

- [ ] Swap the GitHub Pages URL for the real domain: canonical, `og:` tags, JSON-LD, `sitemap.xml`, `robots.txt`, and the form's `_next` field.
- [ ] **If the client goes ahead:** change the form action from Toby's email (`formsubmit.co/toby1@greggs.org`) to the client's, and activate FormSubmit (first submission sends a confirmation email).
- [ ] Confirm phone (07781 122085) and email (datumph@gmail.com).
- [ ] Client signs off the services wording.
- [ ] Ask the client: opening hours, whether they offer emergency call-outs now, areas covered beyond Guernsey, and whether any accreditations/insurance should be shown (none are in the pack, so none are claimed).
- [ ] Check "in association with Duquemin & Ozanne (CI) Ltd" (from a 2021 post) is fine to show in a photo caption.

### Assumptions and out-of-date posts

- Services are taken from the posts and the page bio ("All plumbing, heating and renewables"). Hotspot descriptions in the plant-room section are general plumbing explanations written from what the cover photo shows; the client should check them.
- Stats shown: 9 services (the cards on the page) and 2 Facebook recommendations. No years-trading or job counts are claimed.
- The two recommendations have no text, so there is a "Recommended on Facebook" badge rather than quotes.
- **Ignored as out of date:** the COVID emergency-only call-out notices (2020), the Christmas/New Year closure notices (2018, 2019), the 2021 year-end thanks, and the "looking for a plumber" recruitment post.
- Two videos in the pack were not downloaded and are not used.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
