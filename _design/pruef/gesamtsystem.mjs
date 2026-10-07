/* ======================================================================
   POCKETOPS · PROBE: SICHERUNG DES GESAMTSYSTEMS

       node _design/pruef/gesamtsystem.mjs

   Der Ablauf ist der des Nutzers, nur ohne Maus:

   1. In mehreren Werkzeugen etwas anlegen — auch ein Bild im Notizbuch,
      damit die Umwandlung nach Base64 wirklich geprüft wird und nicht
      nur der einfache Fall.
   2. In der Übersicht das Gesamtsystem sichern.
   3. Chrome mit *frischem Profil* neu starten. Damit ist der Speicher
      leer wie auf einem anderen Rechner — und die Datenbanken der
      Werkzeuge gibt es dort noch gar nicht. Genau dieser Fall war beim
      Entwurf der gefährliche: ohne die Behälterform in PO_ABLAGEN wäre
      das Zurückholen stumm fehlgeschlagen.
   4. Die Sicherung einlesen und in jedem Werkzeug nachsehen.
   ====================================================================== */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { starteChrome, oeffne, neuLaden, schliesse, werkzeug } from './cdp.mjs';

const UEBERSICHT = werkzeug('Start_PocketOps.html');

let gut = 0, schlecht = 0;
const sage = (b, t) => { if (b) { gut++; console.log('  OK    ' + t); } else { schlecht++; console.log('  FEHLT ' + t); } };

/* Ein winziges, gültiges PNG — ein Pixel. Reicht, um einen Blob durch
   Base64 und zurück zu schicken. */
const PNG_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

/* ---------- 1. Etwas anlegen ---------- */

const ANLEGEN = [
    { datei: 'tools/Kanban.html', was: 'Kanban-Ticket',
      tun: `openModal(); document.getElementById('kb-titel').value = 'Gesamt-Ticket'; saveTicket();` },
    { datei: 'tools/RACI.html', was: 'RACI-Aufgabe',
      tun: `raci.tasks.push('Gesamt-Aufgabe'); sichern(); render();` },
    { datei: 'tools/Rechner.html', was: 'Rechner-Verlauf',
      tun: `verlauf.unshift({ ausdruck: '6*7', ergebnis: 42, zeit: Date.now() }); sichern();` },
    { datei: 'tools/Notizbuch.html', was: 'Notizbuch samt Bild',
      /* Das Bild muss in einer Seite stehen, nicht bloss in der Ablage
         liegen: bilderAufraeumen() wirft beim Laden weg, was in keiner
         Seite vorkommt. Das ist richtig so — ein verwaistes Bild soll den
         Vorrat nicht füllen —, aber eine Probe muss sich daran halten. */
      tun: `
        neuesBuch();
        daten.buecher[daten.buecher.length - 1].name = 'Gesamt-Buch';
        const bytes = Uint8Array.from(atob('${PNG_B64}'), c => c.charCodeAt(0));
        const id = await bildAblegen(new Blob([bytes], { type: 'image/png' }));
        /* Über das Bearbeitungsfeld, nicht über seite.html: sichernJetzt()
           ruft seiteUebernehmen(), und das holt den Inhalt aus dem Feld.
           Eine Zuweisung an seite.html wäre damit sofort wieder weg. */
        el('inhalt').innerHTML = '<p>Mit Bild: <img data-bild="' + id + '" alt=""></p>';
        await sichernJetzt();` }
];

/* ---------- 3./4. Was nach dem Zurückholen dastehen muss ---------- */

const PRUEFEN = [
    { datei: 'tools/Kanban.html', was: 'Kanban-Ticket',
      frage: `return tickets.some(t => t.title === 'Gesamt-Ticket');` },
    { datei: 'tools/RACI.html', was: 'RACI-Aufgabe',
      frage: `return raci.tasks.includes('Gesamt-Aufgabe');` },
    { datei: 'tools/Rechner.html', was: 'Rechner-Verlauf',
      frage: `return verlauf.some(v => v.ergebnis === 42);` },
    { datei: 'tools/Notizbuch.html', was: 'Notizbuch',
      frage: `return daten.buecher.some(b => b.name === 'Gesamt-Buch');` },
    { datei: 'tools/Notizbuch.html', was: 'das Bild im Notizbuch (Blob durch Base64 und zurück)',
      frage: `
        const alle = await dbLauf('bilder', 'readonly', s => s.getAll());
        if (!alle || !alle.length) return 'kein Bild in der Ablage';
        const r = alle[0];
        if (!(r.blob instanceof Blob)) return 'kein Blob, sondern ' + typeof r.blob;
        if (r.blob.type !== 'image/png') return 'falscher Typ: ' + r.blob.type;
        const bytes = new Uint8Array(await r.blob.arrayBuffer());
        if (bytes.length < 60) return 'zu kurz: ' + bytes.length + ' Byte';
        // PNG-Kennung
        if (!(bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71)) return 'keine PNG-Kennung';
        return true;` }
];

/* ---------- Durchlauf ---------- */

const ablage = fs.mkdtempSync(path.join(os.tmpdir(), 'po-gesamt-'));
let datei = null;

/* Erster Browser: anlegen und sichern. */
const c1 = await starteChrome({ port: 9401 });
try {
    const s = await oeffne(c1.port, UEBERSICHT);
    /* Etwas Fremdes in den Speicher legen. Es darf in der Sicherung nicht
       auftauchen: unter file:// liegt der Speicher aller örtlichen Seiten
       beieinander, und eine Sicherung der Reihe hat nur die Reihe zu
       enthalten. */
    await s.werte(`localStorage.setItem('irgendeine_fremde_seite', 'geht uns nichts an');`);
    for (const a of ANLEGEN) {
        await neuLaden(s, werkzeug(a.datei));
        await s.werte(a.tun);
        await s.werte(`await new Promise(r => setTimeout(r, 400));`);
        sage(true, 'angelegt: ' + a.was);
    }

    await neuLaden(s, UEBERSICHT);
    /* Was die Übersicht einsammelt, lässt sich auch ohne Herunterladen
       prüfen — der Knopf ruft dieselben Bausteine auf. */
    const roh = await s.werte(`
        const speicher = {};
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (poAblageEigen(k)) speicher[k] = localStorage.getItem(k);
        }
        const ablagen = {};
        for (const n of await _gsVorhandene()) {
            const inhalt = await _gsDbLesen(n);
            if (inhalt) ablagen[n] = inhalt;
        }
        return JSON.stringify({ pocketops: 'pocketops-gesamtsystem', fassung: 1,
                                erstellt: new Date().toISOString(), browser: poBrowser(),
                                speicher, ablagen });`);

    const d = JSON.parse(roh);
    sage(Object.keys(d.speicher).includes('po_kanban'), 'Sicherung enthält den Kanban-Schlüssel');
    sage(Object.keys(d.speicher).includes('po_raci'), 'Sicherung enthält den RACI-Schlüssel');
    sage(Object.keys(d.speicher).includes('po_rechner'), 'Sicherung enthält den Rechner-Schlüssel');
    sage(!!d.ablagen['pocketops-notizbuch'], 'Sicherung enthält die Ablage des Notizbuchs');
    const bilder = (d.ablagen['pocketops-notizbuch'] || {}).bilder || [];
    sage(bilder.length === 1 && bilder[0].w.blob && bilder[0].w.blob.__po_blob === 1,
         'Das Bild liegt als Base64 in der Sicherung');
    sage(!Object.keys(d.speicher).includes('irgendeine_fremde_seite'),
         'Nichts Fremdes in der Sicherung');

    /* Und der Knopf selbst muss durchlaufen und Bescheid geben. Die Datei
       landet im kopflosen Chrome nirgends — poDownload ist unverändert und
       wird von fünfzehn Werkzeugen benutzt. Geprüft wird hier, dass
       gesamtSichern() ohne Ausnahme durchkommt und melden kann, wie viele
       Werkzeuge und wie viel es geworden ist. */
    await s.werte(`await gesamtSichern(); await new Promise(r => setTimeout(r, 300));`);
    const meldung = await s.werte(`
        const t = document.getElementById('po-toast');
        return t ? t.textContent : null;`);
    sage(!!meldung && /Gesamtsystem gesichert: \d+ Werkzeuge/.test(meldung),
         'Der Knopf meldet, was gesichert wurde');
    console.log('        ' + meldung);

    /* Ein- und Mehrzahl. „Stand von 1 Werkzeugen" stand in der Rückfrage,
       solange die Zahl dort eingesetzt wurde. */
    sage(meldung.includes('4 Werkzeuge') && !meldung.includes('1 Werkzeuge'),
         'Die Meldung sagt die Mehrzahl richtig');
    const einzahl = await s.werte(`
        for (const k of Object.keys(localStorage)) if (poAblageEigen(k) && k !== 'po_kanban') localStorage.removeItem(k);
        for (const n of await _gsVorhandene()) await new Promise(r => { const a = indexedDB.deleteDatabase(n); a.onsuccess = r; a.onerror = r; a.onblocked = r; });
        await gesamtSichern();
        await new Promise(r => setTimeout(r, 300));
        const t = document.getElementById('po-toast');
        return t ? t.textContent : null;`);
    sage(/ein Werkzeug,/.test(einzahl) && !/1 Werkzeuge/.test(einzahl),
         'Bei einem Werkzeug steht „ein Werkzeug", nicht „1 Werkzeuge"');
    console.log('        ' + einzahl);

    /* Und auf Englisch. */
    const engl = await s.werte(`
        poSpracheSetzen('en');
        await gesamtSichern();
        await new Promise(r => setTimeout(r, 400));
        const t = document.getElementById('po-toast');
        return { meldung: t ? t.textContent : null, luecken: poLuecken().filter(l => /Gesamtsystem|Werkzeug/.test(l)) };`);
    sage(/Whole system saved: one tool/.test(engl.meldung), 'Auf Englisch: „Whole system saved: one tool"');
    sage(engl.luecken.length === 0, 'Keine Lücke im Wörterbuch bei den Meldungen');
    engl.luecken.forEach(l => console.log('        fehlt: ' + l.slice(0, 100)));
    console.log('        ' + engl.meldung);

    datei = path.join(ablage, 'gesamt.json');
    fs.writeFileSync(datei, roh);
    console.log('        Sicherung: ' + (fs.statSync(datei).size / 1024).toFixed(1).replace('.', ',') + ' kB');

    await schliesse(s);
} finally { await c1.ende(); }

/* Zweiter Browser, frisches Profil: leer wie ein neuer Rechner. */
const c2 = await starteChrome({ port: 9403 });
try {
    const s = await oeffne(c2.port, UEBERSICHT);

    sage(await s.werte(`return Object.keys(localStorage).filter(poAblageEigen).length === 0;`),
         'Der zweite Browser ist wirklich leer');

    const inhalt = fs.readFileSync(datei, 'utf8');
    const bericht = await s.werte(`
        const d = JSON.parse(${JSON.stringify(inhalt)});
        for (const [k, v] of Object.entries(d.speicher)) if (poAblageEigen(k)) localStorage.setItem(k, String(v));
        for (const [n, i] of Object.entries(d.ablagen)) if (PO_ABLAGEN.datenbanken[n]) await _gsDbSchreiben(n, i);
        return 'eingelesen';`);
    sage(bericht === 'eingelesen', 'Die Sicherung ließ sich einlesen');

    for (const p of PRUEFEN) {
        await neuLaden(s, werkzeug(p.datei));
        const r = await s.werte(p.frage);
        sage(r === true, 'wiedergefunden: ' + p.was + (r === true ? '' : ' — ' + r));
    }

    await schliesse(s);
} finally {
    await c2.ende();
    try { fs.rmSync(ablage, { recursive: true, force: true }); } catch (e) {}
}

console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
