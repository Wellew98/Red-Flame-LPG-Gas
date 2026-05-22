# Red Flame Gas — SEO TODO

Last updated: 2026-05-22 · Lead target: 30–60 leads/month by August 2026

Reference docs in this folder:

- `SEO_AUDIT_2026-05-22.md` — current audit, priorities and full context
- `RESULTS_PLAN_2026-05-12.md` — the 30/60/90 lead plan

---

## ✅ P0 — Deploy the repaired site — DONE 2026-05-22

All 10 repaired files deployed and verified live — woodstock, higgovale and the homepage render complete (footer, floating WhatsApp button and mobile sticky call bar present; pages end cleanly). Side benefit: with the files whole again, the Cloudflare beacon no longer injects mid-element.

- [ ] Follow-up: URL-inspect 2–3 clean suburb URLs in GSC → Request Indexing, so Google recrawls the corrected pages

## 📊 Finish GA4 analytics (user, this week)

The GA4 tag + lead tracking are live on every page, but leads won't actually *count* until:

- [ ] GA4 → Admin → Events → mark `lead_call` and `lead_whatsapp` as Key Events
- [ ] Open the live site in incognito, click a WhatsApp button, confirm `lead_whatsapp` appears in GA4 → Realtime
- [ ] After ~48h, check GA4 → Reports → Engagement → Landing page to see leads per page

## ☁️ Disable Cloudflare Web Analytics (user, quick)

- [ ] Cloudflare dashboard → turn off Web Analytics / Insights. Its beacon is injecting into your pages and mangling HTML. You already run GA4, so it's redundant.

## 📍 Google Business Profile (user)

Profile info and asking customers for reviews are done. Still open:

- [ ] Upload real photos — cylinder stock, delivery vehicle, installer at work, shop interior, close-up of a COC certificate. No AI-edited storefront photos.
- [ ] Start a weekly GBP Post ("Same-day refill in [suburb]", an offer, a service highlight). Posts decay after 7 days — treat it like a feed.

## ⭐ Reviews — make it systematic (user, ongoing)

You've started asking customers. Turn it into a repeatable habit:

- [ ] Set a fixed review-request flow: a saved WhatsApp message + your GBP review link, sent within ~4 hours of every delivery/install
- [ ] Keep a steady pace — aim for roughly +5 reviews/month

## 💸 Paid ads — decision needed (user)

- [ ] Decide: use the R6,000 Google Ads credit? Google Search targets people actively searching for gas refills — a better fit than Facebook for an urgent-need product. Audit recommendation: spend the Google credit first, revisit Facebook later.
- [ ] If yes: set up one Search campaign (~1 day) on `gas refill cape town`, `gas refill woodstock`, `same-day gas delivery cape town`

## 🏪 Storefront (user, this month — real-world)

- [ ] Get a branded vinyl banner printed and hung ("Red Flame Gas Supplier · 064 510 9495")
- [ ] Photograph it for GBP and the website

## ✍️ Suburb-page content (with Claude, after the deploy)

- [ ] Apply the zero-click / "8-points" structure to the 9 suburb pages — question-style H2s, a 40–60 word direct answer opening each section, and a *visible* FAQ block (suburb FAQs currently live only in schema, invisible to humans). The homepage already has this; the suburb pages don't.

## 🗺️ Coverage decisions (user — still on hold)

- [ ] Southern Suburbs hub page — only if your delivery scope is genuinely "Southern Suburbs as a unit"
- [ ] Goodwood / Parow / Zonnebloem pages — still <5 impressions each (noise). Leave until the items above land.

## 📈 Measurement gate

- [ ] On/after ~2026-05-28 (once the repaired site has been recrawled), pull a fresh GSC Performance + Indexing screenshot and share it — measure whether the 0-click problem has moved.

---

*Removed as completed: file repair + 2026-05-22 audit, breadcrumb fixes, meta differentiation, GA4 install, suburb schema rebuild, homepage "8-points" content; GBP profile info; GBP review-asking started; GSC new validation + indexing requests + sitemap resubmit.*
