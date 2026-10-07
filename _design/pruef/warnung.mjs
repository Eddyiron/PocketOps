/* Prüft den Warnstreifen: läuft der Browser-Speicher über, muss das
   Werkzeug es sagen — und nicht stumm weiterzeichnen.

   Der Speicher wird dafür mit absteigenden Brocken gefüllt, bis auch ein
   kleiner Schreibvorgang nicht mehr durchgeht. Mit nur grossen Brocken
   bliebe hinter dem letzten Fehlschlag Platz für ein kleines Brett, und
   die Probe hätte nichts geprüft. */
import { starteChrome, oeffne, neuLaden, schliesse, werkzeug } from './cdp.mjs';

const FUELLEN = `
    const schreib = (i, gr) => localStorage.setItem('po_ballast_' + i, 'x'.repeat(gr));
    let i = 0;
    for (const gr of [262144, 65536, 16384, 4096, 1024, 256, 64, 16, 4]) {
        for (let n = 0; n < 400; n++) {
            try { schreib(i++, gr); } catch (e) { break; }
        }
    }
    try { localStorage.setItem('po_letzteprobe', 'x'); localStorage.removeItem('po_letzteprobe'); return 'noch Platz'; }
    catch (e) { return e.name; }`;

const LEEREN = `
    for (const k of Object.keys(localStorage)) if (k.startsWith('po_ballast_')) localStorage.removeItem(k);
    return Object.keys(localStorage).length;`;

const u = werkzeug('tools/Kanban.html');
const c = await starteChrome({ port: 9357 });
const s = await oeffne(c.port, u);

let gut = 0, schlecht = 0;
const sage = (b, t) => { if (b) { gut++; console.log('  OK    ' + t); } else { schlecht++; console.log('  FEHLT ' + t); } };

try {
    const voll = await s.werte(FUELLEN);
    sage(/Quota/i.test(voll), 'Speicher ist randvoll (' + voll + ')');

    /* Der Haken steht noch vom geglueckten Speichern beim Laden der Seite —
       erst wegnehmen, sonst prueft die naechste Zusicherung einen alten Stand. */
    await s.werte(`document.getElementById('gespeichert').classList.remove('an');
        openModal(); document.getElementById('kb-titel').value = 'Ticket bei vollem Speicher'; saveTicket();`);

    const streifen = await s.werte(`
        const w = document.getElementById('po-speicher-warnung');
        return w ? w.innerText.replace(/\\s+/g, ' ') : null;`);
    sage(!!streifen && streifen.includes('voll'), 'Streifen steht und nennt den Grund');
    if (streifen) console.log('        ' + streifen.slice(0, 120));

    sage(await s.werte(`return document.getElementById('gespeichert').classList.contains('an') === false;`),
         'Haken "gespeichert" bleibt aus');

    sage(await s.werte(`return document.body.innerText.includes('Ticket bei vollem Speicher');`),
         'Brett wird trotzdem gezeichnet, render() bricht nicht ab');

    /* Ein Winzling, der noch durchgeht, darf den Streifen nicht wegräumen,
       solange die eigentliche Arbeit weiterhin nicht gespeichert wird. */
    await s.werte(`
        for (const k of Object.keys(localStorage)) if (/po_ballast_\\d{1,2}$/.test(k)) { localStorage.removeItem(k); break; }
        poSichern('po_kleinkram', true);`);
    sage(await s.werte(`return document.getElementById('po-speicher-warnung') !== null;`),
         'Streifen bleibt, wenn nur eine Nebensache durchgeht');

    /* Bei vollem Speicher neu laden. Das Werkzeug muss weiterhin „voll"
       melden und nicht „der Browser lässt keinen Speicher zu" — dazwischen
       liegt der Unterschied zwischen aufräumen und aufgeben. Die Probe beim
       Start schreibt nämlich selbst und schlägt bei vollem Vorrat fehl. */
    await neuLaden(s, u);
    sage(await s.werte(`return _poSpeicherDa === true;`),
         'Voller Speicher gilt beim Laden als vorhanden, nicht als gesperrt');
    /* Die Schritte davor haben Platz freigemacht — erst wieder auffüllen,
       sonst ginge der nächste Schreibvorgang durch und die Zusicherung
       prüfte nichts. */
    await s.werte(FUELLEN);
    await s.werte(`openModal(); document.getElementById('kb-titel').value = 'Noch eins'; saveTicket();`);
    const nachLaden = await s.werte(`
        const w = document.getElementById('po-speicher-warnung');
        return w ? w.innerText : null;`);
    sage(!!nachLaden && nachLaden.includes('voll') && !nachLaden.includes('lässt keinen Speicher zu'),
         'Nach dem Neuladen nennt der Streifen weiterhin den vollen Speicher');

    /* Ballast weg, erneut speichern — jetzt muss er verschwinden. */
    await s.werte(LEEREN);
    await s.werte(`sichern();`);
    sage(await s.werte(`return document.getElementById('po-speicher-warnung') === null;`),
         'Streifen geht weg, sobald wieder geschrieben werden kann');
    sage(await s.werte(`return document.getElementById('gespeichert').classList.contains('an');`),
         'Haken "gespeichert" kommt wieder');

    /* Und der Stand muss jetzt wirklich drinstehen. Geprüft wird das Ticket
       von nach dem Neuladen: das erste ging mit dem vollen Speicher unter,
       und beim Laden kam das leere Brett zurück — richtig so, denn
       gespeichert war es nie. */
    sage(await s.werte(`return (poLaden('po_kanban') || []).some(t => t.title === 'Noch eins');`),
         'Das Ticket ist nach dem Aufräumen abgelegt');
} finally {
    await schliesse(s);
    await c.ende();
}

console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
