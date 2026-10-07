/* Prüft den Kasten auf der Seite „Sichern & Zurückholen": nennt er den
   Browser, meldet er einen leeren Speicher als leer, führt er auf, was
   wirklich drinsteht, und geht er beim Umschalten der Sprache mit? */
import { starteChrome, oeffne, neuLaden, schliesse, werkzeug } from './cdp.mjs';

/* Die Normalisierung bleibt hier in Node. In der Seite wäre sie ein
   Rückwärtsstrich in einer Vorlage in einer Vorlage, und genau das ist
   beim ersten Versuch schiefgegangen: aus /\s+/ wurde /s+/, das Skript
   strich jedes s aus dem Text und zwei Zusicherungen schlugen scheinbar
   fehl, obwohl die Seite stimmte. */
const flach = t => String(t == null ? '' : t).split(/\s+/).join(' ').trim();

const seite = werkzeug('tools/Sicherung.html');
const kanban = werkzeug('tools/Kanban.html');

const c = await starteChrome({ port: 9361 });
let gut = 0, schlecht = 0;
const sage = (b, t) => { if (b) { gut++; console.log('  OK    ' + t); } else { schlecht++; console.log('  FEHLT ' + t); } };
const kasten = async s => flach(await s.werte(`return document.getElementById('si-speicher').innerText;`));

try {
    const s = await oeffne(c.port, seite);
    sage(s.fehlerInDerSeite().length === 0, 'Seite lädt ohne Fehler');

    let txt = await kasten(s);
    sage(/nichts/.test(txt), 'Leerer Speicher wird als leer gemeldet');
    sage(/Chrome/.test(txt), 'Der Browser wird namentlich genannt');
    sage(/anderen Browser/.test(txt), 'Der Hinweis auf den anderen Browser steht da');

    /* Jetzt wirklich etwas anlegen und wieder nachsehen. */
    await neuLaden(s, kanban);
    await s.werte(`openModal(); document.getElementById('kb-titel').value = 'Probe'; saveTicket();`);
    await neuLaden(s, seite);

    txt = await kasten(s);
    sage(/Kanban/.test(txt), 'Das benutzte Werkzeug steht in der Liste');
    sage(/belegt/.test(txt), 'Die Belegung wird genannt');
    sage(!/po_kanban/.test(txt), 'Es steht der Werkzeugname da, nicht der Schlüssel');
    sage(!/Spracheinstellung/.test(txt) || !/nichts/.test(txt), 'Die Spracheinstellung gilt nicht als Arbeitsstand');
    console.log('        ' + txt.slice(0, 170));

    /* Und beim Umschalten muss der Kasten mitgehen. */
    await s.werte(`poSpracheSetzen('en'); await new Promise(r => setTimeout(r, 250));`);
    txt = await kasten(s);
    sage(/in use/.test(txt) && /in this browser/.test(txt), 'Nach dem Umschalten steht der Kasten auf Englisch');
    console.log('        ' + txt.slice(0, 140));

    await schliesse(s);
} finally {
    await c.ende();
}

console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
