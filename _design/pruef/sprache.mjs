/* Englisch pruefen: Hilfefenster mit dem neuen Browser-Satz, und der
   Warnstreifen muss im Woerterbuch stehen (poLuecken zeigt, was fehlt). */
import { starteChrome, oeffne, schliesse, werkzeug } from './cdp.mjs';
const flach = t => String(t == null ? '' : t).split(/\s+/).join(' ').trim();
const u = werkzeug('tools/Kanban.html');
const c = await starteChrome({ port: 9365 });
let gut=0, schlecht=0;
const sage=(b,t)=>{ if(b){gut++;console.log('  OK    '+t);} else {schlecht++;console.log('  FEHLT '+t);} };
const s = await oeffne(c.port, u);

// Deutsch: Hilfe oeffnen, der Browser muss genannt sein
await s.werte(`poHilfe();`);
let h = flach(await s.werte(`return document.getElementById('po-hilfe-fenster').innerText;`));
sage(/augenblicklich abgelegt/.test(h), 'Hilfe sagt, dass sofort gespeichert wird');
sage(/Chrome/.test(h), 'Hilfe nennt den Browser');
sage(/anderen Browser/.test(h), 'Hilfe erklaert die Trennung der Browser');

// Englisch
await s.werte(`document.getElementById('po-hilfe-fenster').remove(); poSpracheSetzen('en'); poHilfe();`);
h = flach(await s.werte(`return document.getElementById('po-hilfe-fenster').innerText;`));
sage(/put down at once/.test(h), 'Hilfe auf Englisch: sofort gespeichert');
sage(/belongs to the browser/.test(h), 'Hilfe auf Englisch: Trennung der Browser');
await s.werte(`document.getElementById('po-hilfe-fenster').remove();`);

// Den Warnstreifen auf Englisch erzwingen und poLuecken befragen
await s.werte(`
    poLuecken().length;                                  // Zaehler vorher leeren gibt es nicht
    _poSpeicherWarnen('voll');
    await new Promise(r => setTimeout(r, 250));`);
const streifen = flach(await s.werte(`return document.getElementById('po-speicher-warnung').innerText;`));
sage(/Not saved: the browser store is full/.test(streifen), 'Streifen erscheint auf Englisch');
console.log('        ' + streifen.slice(0, 130));

for (const art of ['zu','fluechtig','fehler','ablage']) {
  await s.werte(`_poSpeicherWarnen('${art}'); await new Promise(r => setTimeout(r, 200));`);
  const t = flach(await s.werte(`return document.getElementById('po-speicher-warnung').innerText;`));
  sage(/^Not saved/.test(t), 'Grund "'+art+'" ist uebersetzt');
  if (!/^Not saved/.test(t)) console.log('        ' + t.slice(0, 120));
}

const luecken = await s.werte(`return poLuecken();`);
const relevant = luecken.filter(l => /gespeichert|Speicher|Ablage|Browser|json/i.test(l));
sage(relevant.length === 0, 'Keine Luecken im Woerterbuch bei den neuen Texten');
if (relevant.length) relevant.forEach(l => console.log('        fehlt: ' + l.slice(0, 100)));

await schliesse(s); await c.ende();
console.log(`\n${gut} bestanden, ${schlecht} nicht.`);
process.exit(schlecht ? 1 : 0);
