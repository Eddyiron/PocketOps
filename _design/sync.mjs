/* ======================================================================
   POCKETOPS · GEMEINSAME BLÖCKE NACHZIEHEN

       node _design/sync.mjs

   Jedes Werkzeug ist eine einzelne, für sich lauffähige Datei und trägt
   die gemeinsame Gestaltung selbst. Damit die Blöcke nicht auseinander-
   laufen, stehen sie hier als Urfassung. Dieses Skript schreibt sie in
   jede Datei zwischen die Marken:

       /* PO-TOKENS:ANFANG * /  …  /* PO-TOKENS:ENDE * /
       /* PO-BASE:ANFANG * /    …  /* PO-BASE:ENDE * /

   Das Produktzeichen steht im Kopf, also in HTML-Kommentaren:

       <!-- PO-ICON:ANFANG -->  …  <!-- PO-ICON:ENDE -->

   Alles ausserhalb der Marken bleibt unberührt.
   ====================================================================== */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const hier   = path.dirname(fileURLToPath(import.meta.url));
const ordner = path.join(hier, '..');

/* Die Übersicht liegt oben, die Werkzeuge in tools/ — damit beim Auspacken
   sofort zu sehen ist, was man anklicken soll. Beide Orte werden durchgesehen. */
const orte = [ordner, path.join(ordner, 'tools')].filter(o => fs.existsSync(o));
const alleDateien = orte.flatMap(o =>
    fs.readdirSync(o).filter(f => f.endsWith('.html')).map(f => ({ name: f, pfad: path.join(o, f) })));

const tokens = fs.readFileSync(path.join(hier, 'po-tokens.css'), 'utf8').trimEnd();
const base   = fs.readFileSync(path.join(hier, 'po-base.js'), 'utf8').trimEnd();
const zeichen = fs.readFileSync(path.join(hier, 'po-icon.svg'), 'utf8');

/* Das Produktzeichen wird keine eigene Datei, sondern eine data:-Adresse im
   Kopf — nur so trägt es jedes Werkzeug für sich. Dafür: Kommentare der
   Urfassung heraus, Zeilenumbrüche zu Leerzeichen, und die Zeichen ersetzen,
   die in einem HTML-Attribut stolpern würden. Anführungszeichen werden zu
   Hochkommas, Raute und spitze Klammern umschrieben. Mehr nicht — so bleibt
   die Zeile im Kopf noch lesbar. */
const alsDatenAdresse = svg => svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim()
    .replace(/%/g, '%25')
    .replace(/"/g, "'")
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');

const zeichenBlock =
    '<link rel="icon" href="data:image/svg+xml,' + alsDatenAdresse(zeichen) + '">';

const bloecke = [
    { name: 'PO-TOKENS', inhalt: tokens,       einzug: '        ' },
    { name: 'PO-BASE',   inhalt: base,         einzug: '        ' },
    { name: 'PO-ICON',   inhalt: zeichenBlock, einzug: '  ', html: true }
];

/* Das Wörterbuch ist das einzige, was sich von Datei zu Datei unterscheidet:
   _design/sprache/<Datei>.js gehört in den Block PO-SPRACHE von <Datei>.html. */
const spracheOrdner = path.join(hier, 'sprache');

const einruecken = (text, einzug) =>
    text.split('\n').map(z => (z.trim() ? einzug + z : '')).join('\n');

const marke = b => b.html
    ? new RegExp(`([ \\t]*<!-- ${b.name}:ANFANG[^\\n]*-->\\n)[\\s\\S]*?([ \\t]*<!-- ${b.name}:ENDE -->)`)
    : new RegExp(`([ \\t]*/\\* ${b.name}:ANFANG[^\\n]*\\*/\\n)[\\s\\S]*?([ \\t]*/\\* ${b.name}:ENDE \\*/)`);

let geaendert = 0, geprueft = 0, fehlend = [], ohneWoerterbuch = [], ohneZeichen = [];

for (const eintrag of alleDateien) {
    const datei = eintrag.name;
    const pfad = eintrag.pfad;
    let s = fs.readFileSync(pfad, 'utf8');
    const vorher = s;
    let hatMarke = false;

    const wbPfad = path.join(spracheOrdner, datei.replace(/\.html$/, '.js'));
    const eigene = fs.existsSync(wbPfad)
        ? [{ name: 'PO-SPRACHE', inhalt: fs.readFileSync(wbPfad, 'utf8').trimEnd(), einzug: '        ' }]
        : [];
    if (!eigene.length && /PO-SPRACHE:ANFANG/.test(s)) ohneWoerterbuch.push(datei);
    if (!/PO-ICON:ANFANG/.test(s)) ohneZeichen.push(datei);

    for (const b of bloecke.concat(eigene)) {
        const re = marke(b);
        if (!re.test(s)) continue;
        hatMarke = true;
        s = s.replace(re, (_, anfang, ende) => anfang + einruecken(b.inhalt, b.einzug) + '\n' + ende);
    }

    geprueft++;
    if (!hatMarke) { fehlend.push(datei); continue; }
    if (s !== vorher) { fs.writeFileSync(pfad, s); geaendert++; console.log('  aktualisiert: ' + datei); }
}

console.log(`\n${geprueft} Dateien geprüft, ${geaendert} aktualisiert.`);
if (fehlend.length) console.log('ohne Marken (übersprungen): ' + fehlend.join(', '));
if (ohneWoerterbuch.length) console.log('ohne Wörterbuch in _design/sprache: ' + ohneWoerterbuch.join(', '));
if (ohneZeichen.length) console.log('ohne Produktzeichen im Kopf: ' + ohneZeichen.join(', '));
