# Red Flame Gas Supplier — Session Handoff

**Last updated:** 2026-04-23 (shop-cylinders + prices)
**User:** Wellew (wellewfp98@gmail.com)
**User preference (critical — apply every response):** Critical thinking partner, not assistant. Default to skepticism, steel-man opposition, facts over feelings, name weak reasoning, never agree reflexively, give base rates not hope, end every substantive response with at least one devil's advocate point.

---

## Live site — READ FIRST

- **Domain:** `redflamegas.co.za` — bought on GoDaddy. NOT `redflamelpg.co.za` (which is what the prior handoff assumed; it was wrong).
- **Live URL:** https://www.redflamegas.co.za/
- **Hosting:** Cloudflare (free tier, Pages or similar).
- **GBP:** Website field already points at the live URL. The Business Profile is active and showing the site.
- **Google Search Console:** NOT yet verified. Highest-priority outstanding task.

**Canonical URL bug — FIXED 2026-04-22.** All `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, schema `@id`, schema `url`, and schema `image` entries across all 7 HTML files were updated from `https://redflamelpg.co.za` to `https://www.redflamegas.co.za`. Grep-verified zero remaining occurrences of the wrong domain in any HTML file.

**Email — RESOLVED 2026-04-22 as `tawanashechris1@gmail.com`** (Emmanuel's personal Gmail, interim). Site's `mailto:` links and display text were updated across all 7 HTML files. Note this is a trust-signal downgrade vs a custom-domain email — a later pass should set up `info@redflamegas.co.za` (Cloudflare Email Routing is free and forwards to Gmail).

---

## The client

**Red Flame Gas Supplier** — Cape Town LPG gas distribution business. Owner: **Emmanuel** (from prior session — not re-confirmed this session).
Wellew is not an employee. A mutual friend recommended Wellew as someone who could help with digital presence. Wellew closed a small engagement (see below).

**Business profile (from prior session):** 5.0★ on Google (1 review). Heavy repeat + referral business (~90%). Emmanuel wants new customers, not to fix retention.

---

## Canonical brand and NAP — USE EXACTLY

This was re-litigated and corrected multiple times. Do not drift.

- **Brand:** **Red Flame Gas Supplier** — two words "Red Flame", singular "Supplier". The one-word "Redflame" is legacy and lives only in `schema.org/alternateName` arrays to preserve SEO continuity.
- **Visual brand:**
  - Nav wordmark: "Red Flame" in Title Case. NOT all-caps "REDFLAME".
  - Logo: simple solid red flame silhouette (matching the invoice letterhead style). NOT an abstract multi-path flame.
- **Address:** 170 Victoria Road, Woodstock, Cape Town, 7915. This is the retail shop — use this everywhere. There is a separate Elsies River registered office; it is admin only and is NOT on the site.
- **Phone:** 064 510 9495 / +27645109495. ONLY this number. Do NOT add the 078 242 7937 that appears on the invoice.
- **Email (public):** `info@redflamegas.co.za` — live on the site HTML AND routed via Cloudflare Email Routing. Tested end-to-end 2026-04-22. Forwards to `tawanashechris1@gmail.com` (Emmanuel's personal Gmail). Receive-only — replies from Gmail go out as the gmail address, not info@. Upgrade path if needed: Zoho Mail free tier for a real sendable mailbox.
- **Site HTML email swap:** completed 2026-04-22 across all 7 HTML files (mailto links, display text, schema `email` field). Grep-verified zero remaining gmail references in HTML. Needs redeploy to Cloudflare Pages before it's live-visible to customers.
- **Facebook:** https://www.facebook.com/RedFlameLPGas/ — the URL still uses the legacy "RedFlame" spelling; do not rewrite the URL.

**Services (canonical 4-item list — use this wording verbatim across pages):**
1. Gas Refill and Delivery
2. Gas Installation with COC Certification
3. Gas Cages
4. All General LPG Gas Products

**Cylinder stock:** From 5 kg. Sizes run 5 kg, 9 kg, 14 kg, 19 kg, 48 kg (14 kg confirmed as real stock by user 2026-04-23). Do not list only the larger sizes.

**Published refill prices (on site as of 2026-04-23):** 5 kg R175 · 9 kg R350 · 14 kg R515 · 19 kg R700 · 48 kg R1600. Live on the homepage "Shop Cylinders" grid and embedded in Product JSON-LD schema. NERSA adjusts national max LPG price monthly — prices will drift unless maintained. Site carries a disclaimer line that current price is confirmed on WhatsApp at order.

---

## Coverage and SEO priority

**Named suburbs come first. Always.** "We deliver anywhere in Cape Town" is a small tail/side note only — a single line after the suburb list. It must NOT appear in hero, subhead, H2, or schema description. Named suburbs, especially those with their own landing page, are the SEO priority.

**Coverage list (in order):** Woodstock, Higgovale, Pinelands, Rondebosch, Atlantic Seaboard, Claremont, Observatory, Mowbray, Oranjezicht, Tamboerskloof, City Bowl, Newlands.

**Explicitly excluded:** Gardens and Salt River. Gardens is Laughtons competitor territory (the `gardens.html` file still exists because user declined deletion but is unlinked from every other page's nav and footer).

**COC keyword density is non-negotiable.** Gas Certificate of Compliance, SANS 10087, and COC must appear on every page — service card, FAQ entry, schema `makesOffer`, install section. When cleaner copy is requested, preserve keyword density and trim only filler.

---

## Strategic pivot to flag for a new chat

The prior-session brief recommended **avoiding the Atlantic Seaboard** because it's Laughtons/Simply Gas territory. The user has since reversed that: Atlantic Seaboard is now a targeted suburb with its own landing page. This is a deliberate decision, not an oversight — do not quietly revert it. If revisiting strategy, raise it with the user first; it is the single most contentious call in the current plan and the place a Laughtons counter-move is most likely.

---

## File inventory (all live in `C:\Users\DELL\OneDrive\Desktop\Red Flame Gas Supply`)

- `index.html` — homepage
- `woodstock.html` — suburb landing
- `higgovale.html` — suburb landing
- `pinelands.html` — suburb landing
- `rondebosch.html` — suburb landing
- `atlantic-seaboard.html` — suburb landing (added 2026-04-22)
- `gardens.html` — orphaned, unlinked, rebranded for consistency in case of direct hit
- `Red_Flame_LPG_Competitive_Local_SEO_Brief.docx` — prior-session deliverable; references the old Northern Suburbs tiering and the old brand spelling. **Stale.** Needs a rework pass if still client-facing.
- `invoice letterhead.png`, `not nice logo and branding.png` — reference images user uploaded.
- `Background.jpg`, `reviews.png`, `544819188_786612267079797_3701538092182089470_n.jpeg` — site assets.

All 6 HTML pages share: Title Case nav wordmark, solid flame SVG, correct NAP, `Hi%20Red%20Flame` in WhatsApp URLs, legacy "Redflame Gas Supplier" preserved only in schema `alternateName`, Atlantic Seaboard in the footer Areas list.

---

## Competitive landscape (from prior session, not re-verified)

- **Laughtons Gas** — dominates Atlantic Seaboard + City Bowl. Advertises same-day 2–4 hour delivery, R349 for 9 kg refill. Affiliate brand "Simply Gas" explicitly targets the Atlantic Seaboard. User verified the "stronghold" read as defensible. With Atlantic Seaboard now targeted, expect this to be the live competitive front.
- **Elite Gas** — mid-tier.
- **AsGas** — mid-tier.

---

## Deal status

**R2000** for: GBP polish + website launch + review collection. Paid. Work has expanded beyond original scope (six pages, multiple revision passes, logo/branding fix-ups). Not renegotiated.

---

## Open items (ordered by leverage)

1. ~~Fix canonical / og:url / schema URLs across all 7 HTML files.~~ **DONE 2026-04-22.** All URLs swapped from `redflamelpg.co.za` to `https://www.redflamegas.co.za`. Grep-verified.
2. ~~Resolve email domain.~~ **DONE 2026-04-22.** Every email reference on the site now points to `tawanashechris1@gmail.com` (Emmanuel's Gmail, interim). Later: set up `info@redflamegas.co.za` via Cloudflare Email Routing (free forwarder into the same Gmail).
3. **Google Search Console verification.** Domain is live, GBP already has the URL, canonical URLs now correct. Next step: add `redflamegas.co.za` as a GSC property (Domain property is preferred — uses Cloudflare DNS TXT record), submit sitemap, request indexing on the 6 linked pages. Leave `gardens.html` unindexed.
4. **Sitemap.xml and robots.txt.** Need both at the root of the live site. Sitemap should list the 6 linked pages only (exclude `gardens.html`). robots.txt should allow all and point to the sitemap. Required before GSC submission is meaningful.
5. **Real logo file.** The flame SVG on every page is an approximation drawn from the invoice PNG screenshot. Need Emmanuel's original SVG / high-res transparent PNG to swap in a pixel-correct mark across all 7 HTML files + favicon data URI.
6. **`Red_Flame_LPG_Competitive_Local_SEO_Brief.docx` rework.** Still has the old brand spelling, old address, old Northern Suburbs tiering, and the "avoid Atlantic Seaboard" recommendation. If the brief is still a client artefact, it needs a revision pass to match current strategy.
7. **Claremont (or Observatory / Mowbray) landing page.** Claremont is in coverage but no page. Arguable that Observatory or Mowbray beat Claremont for next-page priority because they're minutes from the Woodstock shop — proximity is the one differentiator a small operator owns. Decide based on which suburbs rank after GSC is submitted and early data comes in.
8. **GBP audit pass.** Site is in GBP, but verify NAP matches the site exactly (address, phone, hours, categories, service list). Any mismatch between GBP and the site's schema.org block suppresses local-pack rank.
9. **Review-request WhatsApp template** (link format: `g.page/r/[PlaceId]/review`).
10. **SA directory citations.** 8–10 listings with consistent NAP.
11. **On-location photos.** Especially if any old signage is still visible in what's on the site.
12. **Atlantic Seaboard competitive differentiator.** The AS page as built has no wedge against Laughtons/Simply Gas. Either add one (published price, named delivery SLA, proximity hook) or accept that this page will underperform the other suburb pages and plan accordingly.
13. **Propagate Shop Cylinders to suburb pages.** Homepage now has 5-cylinder product grid with prices and Product JSON-LD (added 2026-04-23). Suburb pages still carry only the 4-service block. Adding the same grid (with suburb-specific schema `areaServed`) to each suburb page would be a major local-price-SEO win and is the obvious next move — suburb pages are where most geo-specific traffic lands.
14. **Image filename hygiene.** Cylinder images are named with spaces (`5kg gas.png`, `48 k gas.png`). They're URL-encoded correctly in HTML but the filenames themselves are poor for image SEO. Rename to `5kg-lpg-gas-cylinder-refill.png` etc. and update refs — modest SEO gain, removes a fragility vector on some hosts.
15. **Price maintenance.** NERSA publishes new national max LPG price monthly. Site prices will drift within 4–6 weeks of any move. Options: (a) leave disclaimer + confirm-on-WhatsApp flow, (b) monthly manual update, (c) hide the number and show "From R—". Current choice: (a). Revisit if customers start complaining about price mismatches on delivery.

---

## Commitments on file (from prior session)

Wellew promised Emmanuel a "top ranking" outcome, operationalised as: #1 for branded "Gas near me" queries from nearby geo, top 3 in Google Maps for suburb-specific "gas refill [suburb]" in the target zone, page 1 for long-tail service queries. Worth noting: "top 3 in Google Maps" for Atlantic Seaboard suburbs against Laughtons is an aggressive promise. Base-rate-wise, displacing an incumbent with an affiliate brand purpose-built for that territory is harder than ranking in an uncontested zone. A new chat should not quietly dilute this commitment, but should also not plan as if it's free.

---

## Memory files (auto-loaded in every session)

- `project_redflame_site.md` — canonical brand, NAP, services, cylinder sizes, coverage, landing pages, visual brand rules.
- `feedback_seo_priority.md` — SEO trumps visual minimalism; COC/SANS 10087 keyword density required on every page.

Both were updated 2026-04-22 to reflect the "Red Flame" (two words) brand and the named-suburbs-first SEO rule.

---

## How to resume in a new chat

Read the memory files (they load automatically). Skim this handoff for strategic context, file inventory, and open items. Before making any change to the site, check which of the open items above the user is asking about — do not conflate "fix the logo" (item 1) with "rebuild the brief" (item 2) or "build Claremont" (item 3). Ask before expanding scope.

First-response sanity checks for a new chat:
- Is the user asking about a page that exists in the inventory above? If not, confirm before creating.
- Is the user's request consistent with named-suburbs-first SEO priority? If they ask to foreground "anywhere in Cape Town" again, that's a reversal — surface the conflict instead of silently complying.
- If the user provides a real logo file, the single-path flame SVG needs to be replaced in all 7 HTML files (including `gardens.html`) and the favicon data URI on each.
