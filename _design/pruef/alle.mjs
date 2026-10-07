/* ======================================================================
   POCKETOPS · ALLE PROBEN

       node _design/pruef/alle.mjs

   Startet Chrome ohne Fenster, lädt die Werkzeuge als file://-Adressen und
   bedient sie. Es braucht kein npm install: der Treiber in cdp.mjs spricht
   das DevTools-Protokoll über den WebSocket, den Node selbst mitbringt.

   Jede Probe läuft in einem eigenen Chrome mit frischem Profil. Der
   Browser-Speicher ist damit leer, und eine bestandene Probe beweist, dass
   das Werkzeug selbst geschrieben hat — nicht, dass von früher noch etwas
   dalag.
   ====================================================================== */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const hier = path.dirname(fileURLToPath(import.meta.url));

const PROBEN = [
    ['speicher',  'Eingeben, verlassen, wieder hinein — ist es noch da?'],
    ['warnung',   'Voller Speicher: sagt das Werkzeug es, statt stumm zu bleiben?'],
    ['ablage',    'Ausgefallene IndexedDB: Notizbuch, Dokument, SlideCraft'],
    ['sicherung', 'Die Auskunft auf „Sichern & Zurückholen"'],
    ['gesamtsystem', 'Alles sichern, in frischen Browser einlesen, nachsehen'],
    ['knoepfe',      'Die zwei Umfänge: Gesamtsystem und Tool'],
    ['sprache',      'Die neuen Texte auf Englisch']
];

let schlecht = 0;
for (const [datei, was] of PROBEN) {
    console.log('\n=== ' + datei + ' — ' + was);
    const r = spawnSync(process.execPath, [path.join(hier, datei + '.mjs')], { stdio: 'inherit' });
    if (r.status !== 0) schlecht++;
}

console.log(schlecht ? `\n${schlecht} von ${PROBEN.length} Proben nicht bestanden.`
                     : `\nAlle ${PROBEN.length} Proben bestanden.`);
process.exit(schlecht ? 1 : 0);
