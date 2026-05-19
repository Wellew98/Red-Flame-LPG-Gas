# Red Flame Gas — SEO TODO

Last updated: 2026-05-18 · Lead target: 30–60 leads/month by August 2026

Reference docs in this folder:
- `SEO_AUDIT_2026-05-18.md` — full deep audit with prioritized findings
- `PRE_PUSH_CHECKLIST_2026-05-18.md` — what changed in this session, smoke-test commands

---

## 🚀 Push the deploy (user, today)

- [ ] Push all current workspace changes to Cloudflare Pages (single commit covers 13 files)
- [ ] Wait 2–3 minutes for propagation
- [ ] Smoke test in incognito:
  - [ ] `https://www.redflamegas.co.za/` loads, H1 reads "Fast, Free Gas Refill & Delivery"
  - [ ] `https://www.redflamegas.co.za/pinelands.html` → 301 to `/pinelands` (check DevTools Network tab)
  - [ ] `https://www.redflamegas.co.za/pinelands` loads, H1 reads "Gas Refill & Installation in Pinelands"
  - [ ] `https://www.redflamegas.co.za/_upload/woodstock.html` returns 404

## 🔍 Google Search Console (user, after push)

- [ ] Indexing → Pages → Redirect error → press **Validate Fix** (this is the second click; the first one from 2026-05-18 14:14 will fail because the fix wasn't deployed yet)
- [ ] URL Inspection → Request Indexing on Higgovale, Newlands, Rondebosch
- [ ] Sitemaps → Resubmit `sitemap.xml` (forces re-crawl with fresh 2026-05-18 lastmod dates)
- [ ] Open the 5 redirect errors detail → screenshot any remaining ones after 7 days, share for diagnosis

## 📍 Google Business Profile (user, this week)

- [ ] Click "Complete info" → fill every missing field (highest-leverage single action on the whole audit)
- [ ] Upload photos: cylinder stock, delivery vehicle, installer at work, interior of shop, close-up of COC certificate
- [ ] Skip storefront photo until banner or paint job is in place — do NOT use AI-edited photos (GBP policy violation, suspension risk)
- [ ] Start weekly GBP Posts ("Same-day refill in [suburb] today", offer, service highlight)
- [ ] Ask 10 existing customers for a Google review using the GBP "Ask for reviews" tile

## 🏪 Storefront (user, this month — real-world)

- [ ] Get a vinyl banner printed: "Red Flame Gas Supplier · 064 510 9495" (R400–R800 at any Woodstock sign shop)
- [ ] Hang the banner on the building front
- [ ] Photograph it for GBP + website hero/Background asset
- [ ] Longer-term: paint and brand the storefront properly

---

## 📊 Measurement gate — wait 7 days before next session

- [ ] On 2026-05-25 or after, take a fresh GSC Performance screenshot (Top queries, 7 days)
- [ ] Take a fresh GSC Indexing → Pages screenshot
- [ ] Share both in next Claude session to measure whether on-site fixes moved the 0-click number

**Success criteria after 7 days:**
- Redirect error count: 4 → 0
- 3 unindexed pages indexed
- At least 1–2 clicks against impression base (vs current 0 / 78+)
- GBP profile strength: 100%

---

## ✍️ Next-pass on-site work (can be done with Claude, ~1 hour)

- [ ] Differentiate the 9 suburb meta descriptions so they don't all read like a template (~45 min)
- [ ] Add a Pinelands-specific paragraph + photo to capitalize on the +165% impression surge
- [ ] Tighten topbar text from "Mon to Sat" → "Mon–Fri 08:00–18:00 · Sat 08:00–12:00" (clearer to visitors, matches GBP exactly)
- [ ] Add an LPG-explainer paragraph to homepage to better intercept the broad "lpg gas" query (9 imp)

---

## 💸 Paid ads — decision pending (user)

- [ ] Decide whether to use the R6,000 Google Ads credit (visible in GBP)
  - Covers ~2–3 weeks of focused Cape Town gas-refill ads at typical local-services CPC
  - Targets to consider: `gas refill cape town`, `gas refill woodstock`, `same day gas delivery cape town`
  - Send clicks to matching suburb page or homepage — do NOT build new landing pages
  - This is the single biggest lever for the August 30–60 leads target that doesn't require waiting on SEO compounding
- [ ] If yes: set up the campaign (1 day of work)

---

## 🗺️ Coverage decisions (user)

- [ ] Decide whether to build a `/southern-suburbs.html` hub page
  - GSC shows "gas delivery southern suburbs cape town" 4 imp, no dedicated page
  - Question to answer first: is your delivery scope actually "Southern Suburbs as a unit"?
- [ ] Decide on Goodwood / Parow / Zonnebloem pages
  - Currently 1–3 impressions each = noise
  - Stay de-prioritized until higher-priority items land
  - Re-evaluate after 28 days of fresh GSC data

---

## ⭐ Ongoing cadence (user, indefinite)

- [ ] Ask for +5 Google reviews per month (review velocity matters for local pack ranking)
- [ ] Upload 2–3 fresh GBP photos per week (GBP weights photo recency heavily)
- [ ] Publish 1 GBP Post per week (Posts decay after 7 days; treat like a feed)

---

## ✅ Done in 2026-05-18 session (for context)

- Deep SEO audit written (see `SEO_AUDIT_2026-05-18.md`)
- 7 suburb-page schema breadcrumbs fixed (no more "Gas Delivery [Suburb]" mismatches)
- 2 additional breadcrumbs cleaned up (Edgemead, Oranjezicht)
- 3 H1s fixed (Pinelands, Higgovale, Newlands now lead with "Installation")
- Homepage H1 kept punchy ("Fast, Free Gas Refill & Delivery") — geo signal already covered by eyebrow + title + meta + schema
- `_upload/` duplicate-content folder deleted (28 stale files removed)
- `_redirects` file rebuilt with 9 explicit `.html` → clean-URL 301s + gardens lines kept
- `sitemap.xml` all 10 lastmod dates bumped to 2026-05-18
- Full pre-push verification run — green light to deploy
