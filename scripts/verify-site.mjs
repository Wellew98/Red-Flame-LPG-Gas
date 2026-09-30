// Site verification (2026-09-30). Run: node scripts/verify-site.mjs
// Fails (exit 1) on: JSON-LD parse errors, FAQPage schema text not present in
// visible copy, missing long-tail template phrases on suburb pages (alt text
// counts), lost pre-existing keywords, banned phone number, broken local asset
// references. Informational: em/en dashes and title lengths.
import fs from 'fs';

const EMBEDDED_KEYWORDS = [
  "14kg gas price",
  "19kg gas claremont",
  "19kg gas cylinder",
  "19kg gas price",
  "48kg gas claremont",
  "48kg gas cylinder",
  "48kg gas price",
  "5kg gas price",
  "9kg gas claremont",
  "9kg gas cylinder",
  "9kg gas price",
  "9kg gas refill bellville",
  "9kg gas refill goodwood",
  "9kg gas refill parklands",
  "9kg gas refill parow",
  "9kg gas refill table view",
  "certified gas installer woodstock",
  "claremont gas installation",
  "edgemead drive gas",
  "edgemead gas installation",
  "external gas installation",
  "free gas delivery",
  "gas big bay",
  "gas blouberg",
  "gas bosmansdam",
  "gas bottle bantry bay",
  "gas bottle pinelands",
  "gas bottle rondebosch",
  "gas bottle woodstock cape town",
  "gas bottles woodstock",
  "gas burgundy estate",
  "gas cages atlantic seaboard",
  "gas cages claremont",
  "gas cages edgemead",
  "gas cages higgovale",
  "gas cages newlands",
  "gas cages oranjezicht",
  "gas cages pinelands",
  "gas cages rondebosch",
  "gas cages woodstock",
  "gas certificate of compliance",
  "gas certificate of compliance cape town",
  "gas certificate of compliance sea point",
  "gas city bowl",
  "gas clifton cape town",
  "gas coc atlantic seaboard",
  "gas coc bellville",
  "gas coc cape town",
  "gas coc certificate",
  "gas coc claremont",
  "gas coc cost",
  "gas coc edgemead",
  "gas coc goodwood",
  "gas coc higgovale",
  "gas coc newlands",
  "gas coc oranjezicht",
  "gas coc parklands",
  "gas coc parow",
  "gas coc pinelands",
  "gas coc property transfer",
  "gas coc rondebosch",
  "gas coc table view",
  "gas coc woodstock",
  "gas compliance certificate",
  "gas cylinder claremont cape town",
  "gas delivery atlantic seaboard",
  "gas delivery bellville",
  "gas delivery cape town",
  "gas delivery claremont",
  "gas delivery edgemead",
  "gas delivery goodwood",
  "gas delivery higgovale",
  "gas delivery newlands",
  "gas delivery oranjezicht",
  "gas delivery parklands",
  "gas delivery parow",
  "gas delivery pinelands",
  "gas delivery rondebosch",
  "gas delivery sea point",
  "gas delivery table view",
  "gas delivery woodstock",
  "gas fresnaye",
  "gas geyser coc",
  "gas geyser cylinder size",
  "gas geyser installation",
  "gas geyser installation cape town",
  "gas geyser installer",
  "gas geyser maintenance",
  "gas geyser not igniting",
  "gas geyser repair near me",
  "gas geyser repairs cape town",
  "gas geyser servicing",
  "gas geyser woodstock",
  "gas hob coc",
  "gas hob installation",
  "gas hob installation cape town",
  "gas in woodstock",
  "gas installation",
  "gas installation bellville",
  "gas installation cape town",
  "gas installation goodwood",
  "gas installation higgovale",
  "gas installation parklands",
  "gas installation parow",
  "gas installation pinelands",
  "gas installation table view",
  "gas installation woodstock",
  "gas installer near me",
  "gas installers bellville",
  "gas installers cape town",
  "gas installers claremont",
  "gas installers edgemead",
  "gas installers goodwood",
  "gas installers higgovale",
  "gas installers newlands",
  "gas installers oranjezicht",
  "gas installers parklands",
  "gas installers parow",
  "gas installers pinelands",
  "gas installers rondebosch",
  "gas installers table view",
  "gas installers woodstock",
  "gas leak repair cape town",
  "gas mouille point",
  "gas northern suburbs",
  "gas northern suburbs cape town",
  "gas refill atlantic seaboard",
  "gas refill bellville",
  "gas refill camps bay",
  "gas refill cape town",
  "gas refill claremont",
  "gas refill edgemead",
  "gas refill goodwood",
  "gas refill higgovale",
  "gas refill newlands",
  "gas refill oranjezicht",
  "gas refill parklands",
  "gas refill parow",
  "gas refill pinelands",
  "gas refill rondebosch",
  "gas refill sea point",
  "gas refill table view",
  "gas refill woodstock",
  "gas shop bellville",
  "gas shop cape town",
  "gas shop claremont",
  "gas shop edgemead",
  "gas shop goodwood",
  "gas shop higgovale",
  "gas shop newlands",
  "gas shop oranjezicht",
  "gas shop parklands",
  "gas shop parow",
  "gas shop pinelands",
  "gas shop rondebosch",
  "gas shop table view",
  "gas shop woodstock",
  "gas southern suburbs",
  "gas stove connection",
  "gas stove installer cape town",
  "gas sunningdale",
  "gas sunset beach",
  "gas water heater installation",
  "gas west coast cape town",
  "hatfield street gas",
  "internal gas installation",
  "lpg bellville cape town",
  "lpg edgemead cape town",
  "lpg gas cape town",
  "lpg gas price cape town",
  "lpg goodwood cape town",
  "lpg green point cape town",
  "lpg higgovale cape town",
  "lpg newlands cape town",
  "lpg oranjezicht cape town",
  "lpg parklands cape town",
  "lpg parow cape town",
  "lpg pinelands cape town",
  "lpg refill claremont",
  "lpg refill woodstock",
  "lpg rondebosch cape town",
  "lpg table view cape town",
  "newlands avenue gas",
  "newlands gas installation",
  "oranjezicht gas installation",
  "order gas whatsapp cape town",
  "rondebosch gas installation",
  "same day gas atlantic seaboard",
  "same day gas city bowl",
  "same day gas claremont",
  "same day gas delivery",
  "same day gas pinelands",
  "same day gas southern suburbs",
  "same day gas woodstock",
  "sans 10087",
  "sans 10087 certificate",
  "sans 10087 geyser",
  "sans 10087 hob",
  "saqcc gas installer",
  "saqcc gas repairs",
  "saqcc registered installer",
  "tafelberg road gas",
  "upper orange street gas",
  "vineyard road gas",
  "woodstock gas",
];

const suburbs = {
  'woodstock.html':'woodstock','higgovale.html':'higgovale','oranjezicht.html':'oranjezicht',
  'pinelands.html':'pinelands','rondebosch.html':'rondebosch','newlands.html':'newlands',
  'claremont.html':'claremont','atlantic-seaboard.html':'atlantic seaboard','edgemead.html':'edgemead',
  'goodwood.html':'goodwood','parow.html':'parow','bellville.html':'bellville',
  'table-view.html':'table view','parklands.html':'parklands'
};
const tmpl = s => ['gas refill '+s,'gas delivery '+s,'gas installers '+s,'gas installation '+s,
  'gas shop '+s,'gas coc '+s,'gas cages '+s,'lpg '+s+' cape town','same day gas '+s,
  'gas bottle '+s,'9kg gas refill '+s];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let failures = 0; const notes = [];
const fail = msg => { failures++; console.log('FAIL  ' + msg); };

// 1. JSON-LD validity + FAQ sync + guardrails on every page
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  // terms-privacy.html is a legal page that has never carried JSON-LD
  if (!blocks.length && f !== 'terms-privacy.html') fail(f + ': no JSON-LD');
  let faq = null;
  for (const b of blocks) {
    try {
      const j = JSON.parse(b[1]);
      if (j['@type'] === 'FAQPage') faq = j;
    } catch(e) { fail(f + ': JSON-LD parse error: ' + e.message); }
  }
  if (faq) {
    for (const q of faq.mainEntity) {
      if (!visible.includes(q.acceptedAnswer.text.toLowerCase().replace(/\s+/g, ' ')))
        fail(f + ': FAQPage answer not visible: ' + q.name.slice(0, 50));
    }
  }
  if (!html.includes('Red Flame Gas Supplier')) fail(f + ': brand string missing');
  if ((html.match(/078 242 7937/g) || []).length) fail(f + ': banned phone number present');
  const noHours = html.replace(/08:00[\u2013\u2014]1?2:00/g, '').replace(/08:00[\u2013\u2014]18:00/g, '').replace(/Stage 4[\u2013\u2014]6/g, '').replace(/5[\u2013\u2014]48/g, '');
  const dashes = noHours.match(/[\u2013\u2014]/g);
  if (dashes) notes.push(f + ': ' + dashes.length + ' em/en dash(es)');
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (t.length > 65) notes.push(f + ': title ' + t.length + ' chars: ' + t);
}

// 2. Suburb template completeness (visible body OR alt text, plus meta)
let ok = 0, total = 0;
for (const [f, s] of Object.entries(suburbs)) {
  const html = fs.readFileSync(f, 'utf8');
  const low = html.toLowerCase();
  const visible = low.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<meta\s+[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const meta = (low.match(/name="keywords" content="([^"]*)"/) || [])[1] || '';
  for (const p of tmpl(s)) {
    total++;
    const inVis = visible.includes(p);
    const inAlt = low.includes('alt="') && low.includes(p);
    const inMeta = meta.includes(p);
    if ((inVis || inAlt) && inMeta) ok++;
    else fail(f + ': template phrase incomplete (meta:' + inMeta + ' visible/alt:' + (inVis || inAlt) + '): ' + p);
  }
}
console.log('Template completeness: ' + ok + '/' + total);

// 3. Keyword preservation across all pages
const all = files.map(f => fs.readFileSync(f, 'utf8')).join('\n').toLowerCase();
let lost = 0;
for (const k of EMBEDDED_KEYWORDS) if (!all.includes(k)) { fail('keyword lost: ' + k); lost++; }
console.log('Keyword preservation: ' + (EMBEDDED_KEYWORDS.length - lost) + '/' + EMBEDDED_KEYWORDS.length);

// 4. Broken local asset refs
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1])
    .concat([...html.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map(m => m[2]))
    .filter(r => r && !/^(https?:|\/\/|#|mailto:|tel:|data:|\/)/.test(r));
  for (const r of new Set(refs)) {
    const base = r.split('#')[0].split('?')[0];
    if (!base) continue;
    if (!fs.existsSync(base) && !fs.existsSync(base + '.html')) fail(f + ': broken ref ' + r);
  }
}

console.log(notes.map(n => 'NOTE  ' + n).join('\n'));
console.log(failures === 0 ? '\nALL CHECKS PASSED' : '\n' + failures + ' FAILURES');
process.exit(failures === 0 ? 0 : 1);
