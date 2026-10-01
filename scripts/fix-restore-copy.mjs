// Corrective pass (2026-09-30). Run: node scripts/fix-restore-copy.mjs
// Restores each page's original unique copy:
//   - 5 service pages: removes the Phase-3 refill bridges, restores exact original sentences
//   - 14 suburb pages: deletes the template "full gas service" summary paragraphs,
//     restores each page's own delivery-speed FAQ sentence (visible + schema twin
//     via global replace) and its original shop-note line
// Keeps: meta keyword additions, card labels, alt texts, shop H2, rebuilt FAQ sections,
// overlap fixes, homepage Phase 1. Exits 1 if any expected replacement misses.
import fs from 'fs';

const log = [];
let errors = 0;

const suburbs = {
  'woodstock.html': 'Woodstock', 'higgovale.html': 'Higgovale', 'oranjezicht.html': 'Oranjezicht',
  'pinelands.html': 'Pinelands', 'rondebosch.html': 'Rondebosch', 'newlands.html': 'Newlands',
  'claremont.html': 'Claremont', 'atlantic-seaboard.html': 'Atlantic Seaboard', 'edgemead.html': 'Edgemead',
  'goodwood.html': 'Goodwood', 'parow.html': 'Parow', 'bellville.html': 'Bellville',
  'table-view.html': 'Table View', 'parklands.html': 'Parklands',
};

// Each page's ORIGINAL delivery-speed sentence start (before Phase 2), used for restore.
const originalSameDay = {
  'woodstock.html':        'Same-day delivery to Woodstock is standard if you WhatsApp',
  'higgovale.html':        'Same-day is standard if you WhatsApp',
  'oranjezicht.html':      'Same-day, usually within hours',
  'pinelands.html':        'Same-day delivery to Pinelands is standard if you WhatsApp',
  'rondebosch.html':       'Same-day if you order before mid-afternoon',
  'newlands.html':         'Same-day if you WhatsApp before mid-afternoon',
  'claremont.html':        'Same-day delivery to Claremont is standard if you WhatsApp',
  'atlantic-seaboard.html':'Same-day delivery to Atlantic Seaboard is standard if you WhatsApp',
  'edgemead.html':         'Same-day delivery to Edgemead is standard if you WhatsApp',
  'goodwood.html':         'Same-day is standard if you order before mid-afternoon',
  'parow.html':            'Same-day is standard if you order before mid-afternoon',
  'bellville.html':        'Same-day is standard if you order before mid-afternoon',
  'table-view.html':       'Same-day is standard if you order before mid-afternoon',
  'parklands.html':        'Same-day is standard if you order before mid-afternoon',
};

// What Phase 2 turned each of those into (to find and replace).
const stuffedSameDay = {
  'woodstock.html':        'Same day gas Woodstock delivery is standard if you WhatsApp',
  'higgovale.html':        'Same day gas Higgovale delivery is standard if you WhatsApp',
  'oranjezicht.html':      'Same day gas Oranjezicht delivery, usually within hours',
  'pinelands.html':        'Same day gas Pinelands delivery is standard if you WhatsApp',
  'rondebosch.html':       'Same day gas Rondebosch delivery if you order before mid-afternoon',
  'newlands.html':         'Same day gas Newlands delivery if you WhatsApp before mid-afternoon',
  'claremont.html':        'Same day gas Claremont delivery is standard if you WhatsApp',
  'atlantic-seaboard.html':'Same day gas Atlantic Seaboard delivery is standard if you WhatsApp',
  'edgemead.html':         'Same day gas Edgemead delivery is standard if you WhatsApp',
  'goodwood.html':         'Same day gas Goodwood delivery is standard if you order before mid-afternoon',
  'parow.html':            'Same day gas Parow delivery is standard if you order before mid-afternoon',
  'bellville.html':        'Same day gas Bellville delivery is standard if you order before mid-afternoon',
  'table-view.html':       'Same day gas Table View delivery is standard if you order before mid-afternoon',
  'parklands.html':        'Same day gas Parklands delivery is standard if you order before mid-afternoon',
};

const check = (file, label, count, expected = 1) => {
  if (count === expected) log.push(`OK    ${file}: ${label} x${count}`);
  else { errors++; log.push(`FAIL  ${file}: ${label} x${count} (expected ${expected})`); }
};

// ---- 1. Suburb pages ----
for (const [file, S] of Object.entries(suburbs)) {
  let html = fs.readFileSync(file, 'utf8');

  // 1a. Delete the template summary paragraph (inserted after the streets list).
  const paraRe = /\n  <p style="margin:18px 0 0;color:#444;font-size:15px;line-height:1\.6;max-width:760px">[\s\S]*?<\/p>/;
  const paraCount = (html.match(paraRe) || []).length;
  html = html.replace(paraRe, '');
  check(file, 'template summary paragraph deleted', paraCount, 1);

  // 1b. Restore the page's own delivery-speed sentence (visible + schema twin).
  const sdCount = html.split(stuffedSameDay[file]).length - 1;
  html = html.split(stuffedSameDay[file]).join(originalSameDay[file]);
  check(file, 'original same-day sentence restored', sdCount, 2);

  // 1c. Restore the original shop-note.
  const stuffedNote = `exchanging the gas bottle ${S} households and businesses already own, VAT included, delivered free in ${S}. Need a gas bottle exchange? We swap your empty for a full Red Flame cylinder at the shop or at your door on a delivery run.`;
  const originalNote = `exchanging a cylinder you already own, VAT included, delivered free in ${S}.`;
  const noteCount = html.split(stuffedNote).length - 1;
  html = html.split(stuffedNote).join(originalNote);
  check(file, 'original shop-note restored', noteCount, 1);

  fs.writeFileSync(file, html);
}

// ---- 2. Service pages: exact reverts ----
const serviceReverts = {
  'gas-installation-cape-town.html': [[
    `Two cylinders on an auto-changeover means nobody gets caught mid-shower, and a 19kg gas refill delivered free from our Woodstock shop keeps it that way. Cylinder prices sit on the <a href="/#shop" style="color:#C21A1B;font-weight:700">shop grid</a>.`,
    `Two cylinders on an auto-changeover means nobody gets caught mid-shower.`,
  ]],
  'gas-geyser-installation-cape-town.html': [[
    `Once the geyser is running we keep it running: a 19kg gas refill delivered free across our Cape Town area, on your schedule, with 48kg and twin-cylinder banks for bigger households. Today's cylinder prices are on the <a href="/#shop" style="color:#C21A1B;font-weight:700">shop grid</a>.`,
    `Once the geyser is running we deliver 19kg and 48kg refills free across our Cape Town area, on your schedule.`,
  ]],
  'gas-hob-stove-installation-cape-town.html': [[
    ` No plug points may sit in the same partition as the cylinder. It stays out of sight and the cupboard door is the only access anyone needs. When it runs dry, a 9kg gas refill delivered free from our Woodstock shop is a WhatsApp message away.`,
    ` No plug points may sit in the same partition as the cylinder. It stays out of sight and the cupboard door is the only access anyone needs.`,
  ], [
    `Bigger cylinders mean longer between swaps, and nobody has to enter the house to change one. Cylinder prices for both setups are on the <a href="/#shop" style="color:#C21A1B;font-weight:700">shop grid</a>.`,
    `Bigger cylinders mean longer between swaps, and nobody has to enter the house to change one.`,
  ]],
  'gas-geyser-repairs-cape-town.html': [[
    `Most faults are a straightforward part repair. Age and parts availability are what usually tip a job toward replacement instead. Worth ruling out first: an undersized or almost-empty cylinder causes many "broken geyser" callouts, and a 19kg gas refill delivered free from our Woodstock shop is the cheaper fix. Current cylinder prices are on the <a href="/#shop" style="color:#C21A1B;font-weight:700">shop grid</a>.`,
    `Most faults are a straightforward part repair. Age and parts availability are what usually tip a job toward replacement instead.`,
  ]],
  'gas-coc-cape-town.html': [[
    `<li>Cylinder condition, cylinders are inspected separately by the gas supplier. Sizing, swaps and a 19kg gas refill delivered free are covered by us as your supplier, with cylinder prices on the <a href="/#shop" style="color:#C21A1B;font-weight:700">shop grid</a></li>`,
    `<li>Cylinder condition, cylinders are inspected separately by the gas supplier</li>`,
  ]],
};
for (const [file, pairs] of Object.entries(serviceReverts)) {
  let html = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const c = html.split(from).length - 1;
    html = html.split(from).join(to);
    check(file, 'service copy reverted', c, 1);
  }
  fs.writeFileSync(file, html);
}

// ---- 3. Confirm nothing else keeps the refill-bridge phrases ----
for (const f of Object.keys(serviceReverts)) {
  const html = fs.readFileSync(f, 'utf8');
  const leaked = (html.match(/19kg gas refill delivered free|9kg gas refill delivered free|href="\/#shop"/g) || []).length;
  check(f, 'no bridge phrases remain', leaked, 0);
}

console.log(log.join('\n'));
console.log(errors === 0 ? '\nRESTORE CLEAN' : `\n${errors} RESTORE FAILURES`);
process.exit(errors === 0 ? 0 : 1);
