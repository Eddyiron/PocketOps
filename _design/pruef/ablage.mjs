/* Prüft die Werkzeuge mit eigener Ablage in IndexedDB.

   Notizbuch, Dokument und SlideCraft legen nicht in localStorage ab —
   dort passen Bilder und Tonaufnahmen nicht hinein. Fällt die Ablage aus,
   stand früher ein nacktes return (Notizbuch, Dokument) oder ein
   console.warn (SlideCraft) da: das Werkzeug schrieb nichts und sagte
   nichts. Jetzt muss derselbe Streifen kommen wie bei vollem
   localStorage.

   Der Ausfall wird hergestellt, indem die Verbindung in der Seite auf null
   gesetzt wird — genau der Zustand, in dem ein privates Fenster oder eine
   gesperrte Ablage das Werkzeug zurücklässt.

       node _design/pruef/ablage.mjs
*/
import { starteChrome, oeffne, schliesse, werkzeug } from './cdp.mjs';

const FAELLE = [
    { name: 'Notizbuch', datei: 'tools/Notizbuch.html',
      kaputt: `db = null;`,
      schreib: `await sichernJetzt();` },
    { name: 'Dokument', datei: 'tools/Dokument.html',
      kaputt: `db = null;`,
      schreib: `await sichernJetzt();` },
    { name: 'SlideCraft', datei: 'tools/SlideCraft.html',
      kaputt: `scDB = null;`,
      schreib: `saveStateNow(); await new Promise(r => setTimeout(r, 200));` }
];

const c = await starteChrome({ port: 9371 });
let gut = 0, schlecht = 0;
const sage = (b, t) => { if (b) { gut++; console.log('  OK    ' + t); } else { schlecht++; console.log('  FEHLT ' + t); } };

try {
    for (const f of FAELLE) {
        let s = null;
        try {
            s = await oeffne(c.port, werkzeug(f.datei));

            /* Erst der gute Fall: ohne Streifen, solange die Ablage steht. */
            await s.werte(f.schreib);
            sage(await s.werte(`return document.getElementById('po-speicher-warnung') === null;`),
                 f.name + ': kein Streifen, solange die Ablage antwortet');

            /* Jetzt die Ablage wegnehmen und noch einmal schreiben. */
            await s.werte(f.kaputt);
            await s.werte(f.schreib);
            const streifen = await s.werte(`
                const w = document.getElementById('po-speicher-warnung');
                return w ? w.innerText : null;`);
            sage(!!streifen && streifen.includes('Ablage des Browsers'),
                 f.name + ': Streifen kommt, wenn die Ablage ausfällt');
            if (!streifen) console.log('        kein Streifen');

            /* Und wieder zurück: der Streifen muss weggehen. */
            await s.werte(`location.reload();`);
            await new Promise(r => setTimeout(r, 1200));
            await s.werte(f.schreib);
            sage(await s.werte(`return document.getElementById('po-speicher-warnung') === null;`),
                 f.name + ': Streifen geht weg, sobald die Ablage wieder schreibt');
        } catch (e) {
            schlecht++;
            console.log('  FEHLT ' + f.name + ' — ' + e.message);
        } finally {
            if (s) await schliesse(s);
        }
    }
} finally {
    await c.ende();
}

console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
