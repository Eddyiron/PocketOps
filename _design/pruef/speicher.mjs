/* Prüft, was der Nutzer gemeldet hat: etwas eingeben, das Werkzeug
   verlassen, wieder hineingehen — ist die Eingabe noch da?

   Der Lauf startet Chrome mit einem frischen Profil. Der Speicher ist
   damit leer, und ein bestandener Lauf beweist, dass das Werkzeug selbst
   geschrieben hat.

       node _design/pruef/speicher.mjs
       node _design/pruef/speicher.mjs Kanban         nur die passenden
*/
import { starteChrome, oeffne, neuLaden, schliesse, werkzeug } from './cdp.mjs';

const nurDiese = process.argv.slice(2);

/* Je Werkzeug: etwas eingeben (eingabe), danach prüfen (pruefung).
   Beides läuft in der Seite. Die Prüfung muss true liefern. */
const PROBEN = [

{ name: 'Kanban', datei: 'tools/Kanban.html',
  eingabe: `openModal(); document.getElementById('kb-titel').value = 'Probe-Ticket'; saveTicket();`,
  pruefung: `return document.body.innerText.includes('Probe-Ticket') && tickets.length === 1;` },

{ name: 'Kanban mit Bahnen', datei: 'tools/Kanban erweitert.html',
  eingabe: `openModal(); document.getElementById('kb-titel').value = 'Probe-Ticket'; saveTicket();`,
  pruefung: `return document.body.innerText.includes('Probe-Ticket') && tickets.length === 1;` },

{ name: 'Markdown-Editor', datei: 'tools/Markdown Editor.html',
  eingabe: `const e = document.getElementById('editor'); e.value = '# Probe-Überschrift'; e.dispatchEvent(new Event('input'));`,
  pruefung: `return document.getElementById('editor').value === '# Probe-Überschrift';` },

{ name: 'RACI-Matrix', datei: 'tools/RACI.html',
  eingabe: `raci.tasks.push('Probe-Aufgabe'); sichern(); render();`,
  pruefung: `return raci.tasks.includes('Probe-Aufgabe');` },

{ name: 'Team-Radar', datei: 'tools/TeamRadar.html',
  eingabe: `topics = ['Probe-Thema']; members = [{ name: 'Probe-Person', skills: [4] }]; sichern(); render();`,
  pruefung: `return topics[0] === 'Probe-Thema' && members[0].name === 'Probe-Person';` },

{ name: 'Stakeholder-Karte', datei: 'tools/Stakeholdermap.html',
  eingabe: `leute.push({ name: 'Probe-Person', x: 0.4, y: 0.6 }); sichern(); render();`,
  pruefung: `return leute.some(l => l.name === 'Probe-Person');` },

{ name: 'Entscheidungsmatrix', datei: 'tools/WeightedScoring.html',
  eingabe: `data.criteria.push({ name: 'Probe-Kriterium', w: 7 }); data.values.push(data.options.map(() => 5)); sichern(); render();`,
  pruefung: `return data.criteria.some(c => c.name === 'Probe-Kriterium');` },

{ name: 'Priorisierungsmatrix', datei: 'tools/3DMatrix.html',
  eingabe: `themes.push({ id: 'p1', name: 'Probe-Thema', x: 5, y: 5, z: 5 }); updateView();`,
  pruefung: `return themes.some(t => t.name === 'Probe-Thema');` },

{ name: 'Diagramm', datei: 'tools/Diagramm.html',
  eingabe: `d.titel = 'Probe-Diagramm'; sichern();`,
  pruefung: `return d.titel === 'Probe-Diagramm';` },

{ name: 'Mindmap', datei: 'tools/Mindmap.html',
  eingabe: `maps[0].name = 'Probe-Mindmap'; saveToStorage();`,
  pruefung: `return maps[0].name === 'Probe-Mindmap';` },

{ name: 'Roadmap', datei: 'tools/Roadmap.html',
  eingabe: `roadmaps[0].name = 'Probe-Roadmap'; sichern();`,
  pruefung: `return roadmaps[0].name === 'Probe-Roadmap';` },

{ name: 'Tagesplan', datei: 'tools/Tagesplan.html',
  eingabe: `daten.aufgaben.push({ id: 'pa1', titel: 'Probe-Aufgabe', text: '', status: 'offen', dauer: 60, angelegt: Date.now() }); sichern();`,
  pruefung: `return daten.aufgaben.some(a => a.titel === 'Probe-Aufgabe');` },

{ name: 'Whiteboard', datei: 'tools/Whiteboard.html',
  eingabe: `bretter[0].name = 'Probe-Brett'; sichern();`,
  pruefung: `return bretter[0].name === 'Probe-Brett';` },

{ name: 'Rechner', datei: 'tools/Rechner.html',
  eingabe: `verlauf.unshift({ ausdruck: '7*6', ergebnis: 42, zeit: Date.now() }); sichern();`,
  pruefung: `return verlauf.some(v => v.ergebnis === 42);` },

{ name: 'Bildausschnitt', datei: 'tools/Bildausschnitt.html',
  eingabe: `document.getElementById('verzug').value = '3'; verzugSichern();`,
  pruefung: `return document.getElementById('verzug').value === '3';` },

{ name: 'Drei gewinnt', datei: 'tools/Dreigewinnt.html',
  eingabe: `stand.siege = 3; sichern();`,
  pruefung: `return stand.siege === 3;` },

{ name: 'Vier gewinnt', datei: 'tools/Viergewinnt.html',
  eingabe: `stand.siege = 4; sichern();`,
  pruefung: `return stand.siege === 4;` },

{ name: 'Galgenmännchen', datei: 'tools/Galgenmaennchen.html',
  eingabe: `stand.gewonnen = 5; sichern();`,
  pruefung: `return stand.gewonnen === 5;` },

/* Die vier mit eigener Ablage in IndexedDB */
{ name: 'Notizbuch', datei: 'tools/Notizbuch.html',
  eingabe: `neuesBuch(); daten.buecher[daten.buecher.length - 1].name = 'Probe-Buch'; await sichernJetzt();`,
  pruefung: `return daten.buecher.some(b => b.name === 'Probe-Buch');` },

{ name: 'Dokument', datei: 'tools/Dokument.html',
  eingabe: `document.getElementById('blatt').innerHTML = '<p>Probe-Absatz</p>'; geaendert(); await sichernJetzt();`,
  pruefung: `return document.getElementById('blatt').innerHTML.includes('Probe-Absatz');` },

{ name: 'SlideCraft', datei: 'tools/SlideCraft.html',
  eingabe: `state.slides[0].title = 'Probe-Folie'; saveStateNow(); await new Promise(r => setTimeout(r, 400));`,
  pruefung: `return state.slides[0].title === 'Probe-Folie';` },

/* Die Übersicht selbst */
{ name: 'Übersicht (Anheften)', datei: 'Start_PocketOps.html',
  eingabe: `anheften('tools/Kanban.html');`,
  pruefung: `return angeheftet.includes('tools/Kanban.html');` }
];

const proben = nurDiese.length
    ? PROBEN.filter(p => nurDiese.some(n => p.name.toLowerCase().includes(n.toLowerCase())))
    : PROBEN;

const chrome = await starteChrome();
let gut = 0, schlecht = 0;
const berichte = [];

try {
    for (const p of proben) {
        const u = werkzeug(p.datei);
        let s = null;
        try {
            s = await oeffne(chrome.port, u);
            const ladeFehler = s.fehlerInDerSeite();
            if (ladeFehler.length) throw new Error('Fehler beim Laden: ' + ladeFehler[0].split('\n')[0]);

            await s.werte(p.eingabe);
            /* Dem Werkzeug Zeit lassen, falls es gebündelt schreibt. */
            await s.werte(`await new Promise(r => setTimeout(r, 800));`);
            /* Und so verlassen, wie der Nutzer es tut. */
            await s.werte(`document.dispatchEvent(new Event('visibilitychange'));`);

            const warnung = await s.werte(`
                const w = document.getElementById('po-speicher-warnung');
                return w ? w.innerText.replace(/\\s+/g, ' ').slice(0, 90) : null;`);
            if (warnung) throw new Error('Streifen stand schon vor dem Neuladen: ' + warnung);

            await neuLaden(s, u);

            const nachFehler = s.fehlerInDerSeite();
            const da = await s.werte(p.pruefung);
            if (da !== true) throw new Error('nach dem Neuladen nicht wiedergefunden'
                + (nachFehler.length ? ' (Seitenfehler: ' + nachFehler[0].split('\n')[0] + ')' : ''));

            gut++;
            berichte.push('  OK    ' + p.name);
        } catch (e) {
            schlecht++;
            berichte.push('  FEHLT ' + p.name + ' — ' + e.message);
        } finally {
            if (s) await schliesse(s);
        }
    }
} finally {
    await chrome.ende();
}

console.log(berichte.join('\n'));
console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
