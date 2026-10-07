/* ======================================================================
   POCKETOPS · PROBE: DIE ZWEI UMFÄNGE DER SICHERUNG

       node _design/pruef/knoepfe.mjs

   Vorher hiess derselbe Knopf in sieben Werkzeugen „Sichern", in sechs
   „Speichern" und in einem „Alles sichern" — und in der Übersicht sicherte
   er nur die Übersicht. Jetzt sagt die Beschriftung den Umfang:

       Übersicht:  Speichern Gesamtsystem   alles auf einmal
       Werkzeug:   Tool speichern           nur dieses eine

   Geprüft wird, dass das überall so steht, auf Deutsch und auf Englisch,
   und dass kein Werkzeug mit einer alten Beschriftung übrig ist.
   ====================================================================== */
import fs from 'fs';
import path from 'path';
import { starteChrome, oeffne, neuLaden, schliesse, werkzeug, ORDNER } from './cdp.mjs';

let gut = 0, schlecht = 0;
const sage = (b, t) => { if (b) { gut++; console.log('  OK    ' + t); } else { schlecht++; console.log('  FEHLT ' + t); } };

/* ---------- Erst ohne Browser: steht in keiner Datei noch eine alte
   Beschriftung an einem Sicherungsknopf? ---------- */

const ALT = /<button[^>]*onclick="(?:exportJSON|sichernDatei|saveProject|exportData)\(\)"[^>]*>(?:<[^>]*>\s*)?(Sichern|Speichern|Alles sichern)</;
const reste = [];
for (const datei of fs.readdirSync(path.join(ORDNER, 'tools')).filter(f => f.endsWith('.html'))) {
    const s = fs.readFileSync(path.join(ORDNER, 'tools', datei), 'utf8');
    const m = s.match(ALT);
    if (m) reste.push(datei + ' → ' + m[1]);
}
const hub = fs.readFileSync(path.join(ORDNER, 'Start_PocketOps.html'), 'utf8');
if (ALT.test(hub)) reste.push('Start_PocketOps.html');
sage(reste.length === 0, 'Keine alte Beschriftung an einem Sicherungsknopf übrig');
reste.forEach(r => console.log('        ' + r));

/* Und umgekehrt: jedes Werkzeug mit einem Sicherungsknopf muss ihn
   „Tool speichern" nennen. */
const ERWARTET = [
    '3DMatrix', 'Diagramm', 'Dokument', 'Kanban erweitert', 'Kanban', 'Mindmap',
    'Notizbuch', 'RACI', 'Roadmap', 'SlideCraft', 'Sprachmemo', 'Stakeholdermap',
    'Tagesplan', 'TeamRadar', 'WeightedScoring', 'Whiteboard'
];
const ohne = ERWARTET.filter(n =>
    !fs.readFileSync(path.join(ORDNER, 'tools', n + '.html'), 'utf8').includes('>Tool speichern<')
 && !fs.readFileSync(path.join(ORDNER, 'tools', n + '.html'), 'utf8').includes(' Tool speichern<'));
sage(ohne.length === 0, 'Alle ' + ERWARTET.length + ' Werkzeuge mit Sicherung nennen ihn „Tool speichern"');
ohne.forEach(n => console.log('        fehlt in: ' + n));

/* ---------- Jetzt im Browser, in beiden Sprachen ---------- */

const c = await starteChrome({ port: 9411 });
const kopf = async s => (await s.werte(`return document.querySelector('.po-head-actions').innerText;`))
                            .split(/\s+/).join(' ').trim();
try {
    const s = await oeffne(c.port, werkzeug('Start_PocketOps.html'));

    let t = await kopf(s);
    sage(t.includes('Speichern Gesamtsystem'), 'Übersicht: „Speichern Gesamtsystem" steht in der Kopfzeile');
    sage(t.includes('Gesamtsystem öffnen'), 'Übersicht: „Gesamtsystem öffnen" steht daneben');
    sage(!/\bSichern\b/.test(t), 'Übersicht: kein blosses „Sichern" mehr');

    await s.werte(`poSpracheSetzen('en'); await new Promise(r => setTimeout(r, 250));`);
    t = await kopf(s);
    sage(t.includes('Save whole system'), 'Übersicht auf Englisch: „Save whole system"');
    sage(t.includes('Open whole system'), 'Übersicht auf Englisch: „Open whole system"');
    console.log('        ' + t);

    /* Ein Werkzeug: Englisch ist noch eingestellt, die Wahl gilt für alle. */
    await neuLaden(s, werkzeug('tools/Kanban.html'));
    t = await kopf(s);
    sage(t.includes('Save this tool'), 'Kanban auf Englisch: „Save this tool"');
    console.log('        ' + t);

    await s.werte(`poSpracheSetzen('de'); await new Promise(r => setTimeout(r, 250));`);
    t = await kopf(s);
    sage(t.includes('Tool speichern'), 'Kanban auf Deutsch: „Tool speichern"');

    /* Und das Werkzeug mit dem Symbol im Knopf. */
    await neuLaden(s, werkzeug('tools/SlideCraft.html'));
    sage((await s.werte(`return document.body.innerText;`)).includes('Tool speichern'),
         'SlideCraft: „Tool speichern" trotz Symbol im Knopf');

    /* Nichts darf im Wörterbuch fehlen. */
    await s.werte(`poSpracheSetzen('en'); await new Promise(r => setTimeout(r, 250));`);
    const luecken = (await s.werte(`return poLuecken();`))
        .filter(l => /speichern|Gesamtsystem|Tool|Sicherung/i.test(l));
    sage(luecken.length === 0, 'Keine Lücken im Wörterbuch bei den neuen Beschriftungen');
    luecken.forEach(l => console.log('        fehlt: ' + l.slice(0, 90)));

    await schliesse(s);
} finally { await c.ende(); }

console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
