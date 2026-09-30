// Phase 2 suburb-page normalisation (2026-09-30). Run: node scripts/phase2-suburbs.mjs
// Adds missing long-tail template phrases to the 14 suburb pages, landing each
// phrase where the build guide's page anatomy says it belongs:
//   - body copy: one services summary paragraph after the streets list
//   - FAQs: "Same day gas {suburb} delivery..." first sentence, applied to the
//     visible answer and its FAQPage schema twin together (global replace)
//   - alt text: "9kg gas refill {suburb}" on the 9 kg card, "lpg {suburb} cape town"
//     on the 48 kg card (alt text is a Part-B2-sanctioned landing spot)
//   - shop cards: size-by-city kind labels, shop H2, shop-note with gas-bottle phrase
//   - meta keywords: additions only, existing terms never removed
//   - the 5 pages whose FAQPage schema was orphaned get visible FAQ cards built
//     from the (already enriched) schema, word for word, fixing markup validity
// Idempotent: every step skips itself if its pattern is absent or already applied.
import fs from 'fs';

const pages = {
  'woodstock.html':        { S: 'Woodstock',        cohort: 'C' },
  'higgovale.html':        { S: 'Higgovale',        cohort: 'A' },
  'oranjezicht.html':      { S: 'Oranjezicht',      cohort: 'A' },
  'pinelands.html':        { S: 'Pinelands',        cohort: 'C' },
  'rondebosch.html':       { S: 'Rondebosch',       cohort: 'A' },
  'newlands.html':         { S: 'Newlands',         cohort: 'A' },
  'claremont.html':        { S: 'Claremont',        cohort: 'C' },
  'atlantic-seaboard.html': { S: 'Atlantic Seaboard', cohort: 'C' },
  'edgemead.html':         { S: 'Edgemead',         cohort: 'C' },
  'goodwood.html':         { S: 'Goodwood',         cohort: 'B' },
  'parow.html':            { S: 'Parow',            cohort: 'B' },
  'bellville.html':        { S: 'Bellville',        cohort: 'B' },
  'table-view.html':       { S: 'Table View',       cohort: 'B' },
  'parklands.html':        { S: 'Parklands',        cohort: 'B' },
};

const metaAdd = {
  'woodstock.html': ['lpg woodstock cape town', '9kg gas refill woodstock'],
  'higgovale.html': ['same day gas higgovale', 'gas bottle higgovale', '9kg gas refill higgovale'],
  'oranjezicht.html': ['gas installation oranjezicht', 'same day gas oranjezicht', 'gas bottle oranjezicht', '9kg gas refill oranjezicht'],
  'pinelands.html': ['9kg gas refill pinelands'],
  'rondebosch.html': ['gas installation rondebosch', 'same day gas rondebosch', '9kg gas refill rondebosch'],
  'newlands.html': ['gas installation newlands', 'same day gas newlands', 'gas bottle newlands', '9kg gas refill newlands'],
  'claremont.html': ['lpg claremont cape town', 'gas installation claremont', 'gas bottle claremont', '9kg gas refill claremont'],
  'atlantic-seaboard.html': ['gas installers atlantic seaboard', 'gas installation atlantic seaboard', 'gas shop atlantic seaboard', 'lpg atlantic seaboard cape town', 'gas bottle atlantic seaboard', '9kg gas refill atlantic seaboard'],
  'edgemead.html': ['gas installation edgemead', 'same day gas edgemead', 'gas bottle edgemead', '9kg gas refill edgemead'],
  'goodwood.html': ['gas cages goodwood', 'same day gas goodwood', 'gas bottle goodwood'],
  'parow.html': ['gas cages parow', 'same day gas parow', 'gas bottle parow'],
  'bellville.html': ['gas cages bellville', 'same day gas bellville', 'gas bottle bellville'],
  'table-view.html': ['gas cages table view', 'same day gas table view', 'gas bottle table view'],
  'parklands.html': ['gas cages parklands', 'same day gas parklands', 'gas bottle parklands'],
};

// First-sentence enrichment of the delivery-speed FAQ. Applied globally so the
// visible card/summary and the FAQPage schema twin change together.
const sameDay = {
  C: { find: 'Same-day delivery to {S} is standard if you WhatsApp',
       repl: 'Same day gas {S} delivery is standard if you WhatsApp' },
  A_higgovale: { find: 'Same-day is standard if you WhatsApp',
                 repl: 'Same day gas {S} delivery is standard if you WhatsApp' },
  A_oranjezicht: { find: 'Same-day, usually within hours',
                   repl: 'Same day gas {S} delivery, usually within hours' },
  A_rondebosch: { find: 'Same-day if you order before mid-afternoon',
                  repl: 'Same day gas {S} delivery if you order before mid-afternoon' },
  A_newlands: { find: 'Same-day if you WhatsApp before mid-afternoon',
                repl: 'Same day gas {S} delivery if you WhatsApp before mid-afternoon' },
  B: { find: 'Same-day is standard if you order before mid-afternoon',
       repl: 'Same day gas {S} delivery is standard if you order before mid-afternoon' },
};
const sameDayFor = {
  'higgovale.html': sameDay.A_higgovale, 'oranjezicht.html': sameDay.A_oranjezicht,
  'rondebosch.html': sameDay.A_rondebosch, 'newlands.html': sameDay.A_newlands,
  'goodwood.html': sameDay.B, 'parow.html': sameDay.B, 'bellville.html': sameDay.B,
  'table-view.html': sameDay.B, 'parklands.html': sameDay.B,
};

const summaryTpl = '<p style="margin:18px 0 0;color:#444;font-size:15px;line-height:1.6;max-width:760px">Full gas service for {S}: the daily gas refill {S} run from our Woodstock shop, same day gas {S} delivery when you WhatsApp before mid-afternoon, gas bottle {S} orders refilled or swapped from 5 kg to 48 kg, gas shop {S} collection at 170 Victoria Road when you are passing, gas installers {S} trusts for hobs, geysers and cylinder banks, gas installation {S} work certified to SANS 10087 with the COC issued on the job, gas COC {S} property transfers require, and lockable gas cages {S} homes, restaurants and guesthouses use for safe outdoor cylinder storage.</p>';

const sizes = ['5kg', '9kg', '14kg', '19kg'];
const log = [];
for (const [file, cfg] of Object.entries(pages)) {
  const S = cfg.S;
  let html = fs.readFileSync(file, 'utf8');
  const steps = [];

  const repl = (findRaw, r, label, expected = null) => {
    const find = findRaw.replaceAll('{S}', S);
    const count = html.split(find).length - 1;
    if (count === 0) { steps.push(`SKIP  ${label} (pattern absent)`); return; }
    if (expected !== null && count !== expected) { steps.push(`WARN  ${label}: found ${count}, expected ${expected}`); }
    html = html.split(find).join(r.replaceAll('{S}', S));
    steps.push(`OK    ${label} x${count}`);
  };

  // 1. Same-day FAQ sentence (visible + schema twin together)
  const sd = sameDayFor[file] || sameDay.C;
  repl(sd.find, sd.repl, 'same-day FAQ sentence');

  // 2. Cohort C: build visible FAQ cards from schema (orphan fix)
  if (cfg.cohort === 'C' && !html.includes('Gas Questions ·')) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    let faq = null;
    for (const b of blocks) { try { const j = JSON.parse(b[1]); if (j['@type'] === 'FAQPage') faq = j; } catch {} }
    if (faq) {
      const cards = faq.mainEntity
        .map(q => `    <div class="local-card"><h3>${q.name}</h3><p>${q.acceptedAnswer.text}</p></div>`)
        .join('\n');
      const section = `\n<section class="block"><div class="wrap">\n  <div class="eyebrow">Gas Questions · ${S}</div>\n  <h2>${S} Gas FAQs.</h2>\n  <div class="local-grid">\n${cards}\n  </div>\n</div></section>\n`;
      const anchor = '<section class="order">';
      const idx = html.indexOf(anchor);
      if (idx === -1) { steps.push('WARN  no order section anchor for FAQ insert'); }
      else { html = html.slice(0, idx) + section + '\n' + html.slice(idx); steps.push(`OK    visible FAQ cards built from schema x${faq.mainEntity.length}`); }
    } else steps.push('WARN  no FAQPage schema found for card build');
  }

  // 3. Services summary paragraph after the streets list
  if (!html.includes('Full gas service for')) {
    const marker = html.indexOf('class="streets"');
    if (marker === -1) steps.push('WARN  no streets list; summary not inserted');
    else {
      const close = html.indexOf('</div>', marker);
      html = html.slice(0, close + 6) + '\n  ' + summaryTpl.replaceAll('{S}', S) + html.slice(close + 6);
      steps.push('OK    services summary paragraph');
    }
  } else steps.push('SKIP  summary already present');

  // 3b. Open the summary with the gas delivery {S} phrase (visible landing spot)
  repl('Full gas service for {S}: the daily',
       'Free gas delivery {S} from our Woodstock shop, full gas service for {S}: the daily',
       'summary gas-delivery phrase');

  // 4. Shop H2
  repl(`Gas Refill Cylinders Delivered in ${S}.`,
       'Gas Bottle Refills &amp; LPG Cylinders Delivered in {S}.', 'shop H2');

  // 5. Shop-note: gas bottle {S} + exchange sentence
  repl(`exchanging a cylinder you already own, VAT included, delivered free in ${S}.`,
       'exchanging the gas bottle {S} households and businesses already own, VAT included, delivered free in {S}. Need a gas bottle exchange? We swap your empty for a full Red Flame cylinder at the shop or at your door on a delivery run.',
       'shop-note gas-bottle phrase');

  // 6. Kind labels, size by size
  let i = 0;
  html = html.replace(/<div class="kind">Refill · Any Brand Swapped<\/div>/g, () =>
    `<div class="kind">${sizes[i++]} Gas Refill ${S} · Any Brand</div>`);
  if (i > 0) steps.push(`OK    kind labels resized x${i}`);
  else steps.push('SKIP  kind labels already resized');
  repl('<div class="kind">Refill · Commercial Use</div>',
       `<div class="kind">48kg Gas Refill ${S} · Commercial</div>`, '48kg kind label', 1);

  // 7. Alt text: 9kg gas refill {S} and lpg {S} cape town
  repl(`alt="9 kg LPG gas cylinder refill ${S}, free same-day delivery from Red Flame Gas Supplier Woodstock"`,
       `alt="9kg gas refill {S}: 9 kg LPG gas cylinder, free same-day delivery from Red Flame Gas Supplier Woodstock"`,
       '9kg alt', 1);
  repl(`alt="48 kg LPG gas cylinder refill ${S}, free same-day delivery from Red Flame Gas Supplier Woodstock"`,
       `alt="LPG {S} Cape Town: 48 kg gas cylinder refill, free same-day delivery from Red Flame Gas Supplier Woodstock"`,
       '48kg alt (lpg {S} cape town)', 1);

  // 8. Meta keywords additions only
  const kwRe = /(name="keywords" content=")([^"]*)(")/;
  const m = html.match(kwRe);
  if (!m) steps.push('WARN  no keywords meta');
  else {
    const have = m[2].split(',').map(s => s.trim().toLowerCase());
    const add = metaAdd[file].filter(p => !have.includes(p));
    if (add.length) {
      html = html.replace(kwRe, (_, a, b, c) => a + b + ', ' + add.join(', ') + c);
      steps.push(`OK    meta keywords +${add.length}: ${add.join('; ')}`);
    } else steps.push('SKIP  meta keywords already complete');
  }

  fs.writeFileSync(file, html);
  log.push(`\n== ${file} ==\n` + steps.join('\n'));
}
console.log(log.join('\n'));
