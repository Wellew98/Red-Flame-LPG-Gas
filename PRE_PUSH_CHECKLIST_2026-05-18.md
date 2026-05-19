# Pre-Push SEO Verification — Red Flame Gas
**Date:** 2026-05-18 · **Verdict:** **GREEN LIGHT — safe to push**

Every check below was run against the live files on disk. No blockers found.

---

## Files changed in this session (push list)

| File | Change |
|---|---|
| `index.html` | H1 gained "in Cape Town"; nav unchanged from original |
| `woodstock.html` | Breadcrumb schema "Gas Delivery" → "Gas Refill" |
| `higgovale.html` | Breadcrumb + H1 ("Delivery" → "Installation") |
| `pinelands.html` | Breadcrumb + H1 ("Delivery" → "Installation") |
| `rondebosch.html` | Breadcrumb schema "Gas Delivery" → "Gas Installation & Refill" |
| `atlantic-seaboard.html` | Breadcrumb schema "Gas Delivery" → "Gas Refill" |
| `claremont.html` | Breadcrumb schema "Gas Delivery" → "Gas Refill & Installation" |
| `newlands.html` | Breadcrumb + H1 ("Delivery" → "Installation") |
| `edgemead.html` | Breadcrumb "Delivery" → "Refill" (matches title) |
| `oranjezicht.html` | Breadcrumb "Delivery" → "Refill" (matches title) |
| `_redirects` | 9 `.html` → clean-URL 301s added; gardens lines kept |
| `sitemap.xml` | All 10 lastmod dates bumped to 2026-05-18 |
| `_upload/` | Folder deleted (28 stale files, duplicate-content risk gone) |

---

## Verification results

### Structural integrity (all PASS)
- **Schema JSON-LD parses cleanly** on all 10 pages (LocalBusiness + BreadcrumbList + FAQPage on index). Zero parse errors.
- **All 9 suburb breadcrumbs now mirror titles exactly** — verified with side-by-side diff. No stale "Gas Delivery [Suburb]" anywhere.
- **All 3 H1 fixes** (Pinelands, Higgovale, Newlands) hold — H1 leads with "Installation" matching the title intent.
- **Homepage H1** carries "in Cape Town" — geo modifier now in the most heavily-weighted on-page tag.
- **`_upload/` folder confirmed deleted** — duplicate canonicals to live URLs no longer exist.
- **`_redirects` syntax valid** for Cloudflare Pages (3 columns: from, to, status). 11 rules total.
- **`sitemap.xml` well-formed**, lists all 10 active URLs, lastmod all 2026-05-18.
- **`robots.txt`** unchanged — allow-all + sitemap pointer.

### Brand standards (all PASS)
- No body-text `Redflame` (one-word) anywhere. The string only appears inside JSON-LD `alternateName` arrays, which is correct per the legacy-spelling rule.
- No published prices (R175/R350/R515/R700/R1600) anywhere on site.
- No Gardens or Salt River references in user-visible copy.
- No wrong phone (078 242 7937) — only 064 510 9495 across all 10 pages.
- No wrong postcode (7915) — only 7925 across all 10 pages.
- No stale "17:00" closing time anywhere — schema hours all Mon-Fri 08:00-18:00, Sat 08:00-12:00.

### SEO baselines (all PASS on all 10 pages)
| Check | Result |
|---|---|
| COC reference present | ✓ 10/10 |
| SANS 10087 reference present | ✓ 10/10 |
| "5 kg" cylinder mention | ✓ 10/10 |
| Phone 064 510 9495 | ✓ 10/10 |
| Address 170 Victoria Road | ✓ 10/10 |
| Postcode 7925 | ✓ 10/10 |
| info@redflamegas.co.za | ✓ 10/10 |
| Meta description ends with "WhatsApp 064 510 9495" | ✓ 10/10 |
| Canonical clean URL (no .html, with www, no trailing slash) | ✓ 10/10 |
| Schema `openingHoursSpecification` correct | ✓ 10/10 |

### Cross-page consistency
Schema NAP (name/address/phone) matches across all pages and matches GBP screenshot (170 Victoria Rd, Woodstock, 7925, 064 510 9495). No drift.

---

## Non-blockers I noticed but didn't fix
These are cosmetic or small upside, not deploy-blockers. Park them for next pass.

1. **Topbar text "Mon to Sat" is vague.** Visible on every page. Technically true (you ARE open Mon-Sat), but doesn't convey that Saturday is half-day (08:00-12:00). Schema is correct, so Google understands; only human visitors might be misled. Quick fix later: `"Mon-Fri 08:00-18:00 · Sat 08:00-12:00"`.
2. **LocalBusiness schema `name` varies per suburb page** ("Red Flame Gas Supplier Atlantic Seaboard Delivery", etc.). Not wrong, but the cleaner pattern is one canonical `name` with `areaServed` doing the differentiation. Don't refactor before push — adds risk for marginal gain.
3. **Meta descriptions still template-similar.** From the main audit. Differentiate per suburb when you have 30 free minutes. Not blocking.

---

## Deploy checklist (in order)

1. **Push the workspace to Cloudflare Pages** — single commit, all 13 file changes go together.
2. **Wait 2-3 minutes for the deploy to propagate.**
3. **Smoke test in incognito browser:**
   - `https://www.redflamegas.co.za/` — homepage loads, H1 reads "Fast, Free Gas Refill & Delivery in Cape Town"
   - `https://www.redflamegas.co.za/pinelands.html` — should 301 to `/pinelands` (DevTools Network tab shows 301)
   - `https://www.redflamegas.co.za/pinelands` — page loads, H1 reads "Gas Refill & Installation in Pinelands"
   - View page source: BreadcrumbList JSON contains `"Gas Refill & Installation Pinelands"`
   - `https://www.redflamegas.co.za/_upload/woodstock.html` — should 404 (folder gone)
4. **GSC actions** (after smoke test passes):
   - Indexing → Pages → Redirect error → **Validate Fix** (this is the second click; first one from earlier today will have failed)
   - URL Inspection → Request Indexing on Higgovale, Newlands, Rondebosch (3 unindexed pages from the audit)
   - Sitemaps → Resubmit `sitemap.xml` (forces Google to re-crawl with the new lastmod dates)
5. **GBP actions** (independent of website push):
   - Click "Complete info" prompt → fill every missing field
   - Upload cylinder + delivery vehicle + COC certificate photos (skip storefront until banner/paint lands)
   - Schedule the first weekly GBP Post

---

## What success looks like in 7 days
- Redirect error count drops from 4 → 0 in GSC
- 3 unindexed pages move to "Submitted and indexed"
- At least 1-2 clicks register against the impression base (vs. current 0/78)
- GBP profile strength reaches 100%

Send the next GSC screenshot in a week and we'll measure the move.
