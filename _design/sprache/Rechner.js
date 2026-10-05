/* Rechner · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Kein Tastenfeld, sondern eine Zeile: Du tippst die ganze Rechnung und bestätigst mit Enter.',
        schritte: [
            'Oben die Rechnung eintippen, etwa <b>1250 * 1,19 - 80</b>.',
            '<b>Enter</b> rechnet. Das Ergebnis wandert in den Verlauf darunter.',
            'Mit <b>ans</b> rechnest du mit dem vorigen Ergebnis weiter.'
        ],
        tipps: [
            'Komma und Punkt gelten beide als Dezimaltrenner; ein Punkt zwischen Tausendern wird erkannt.',
            '<b>19 % von 200</b> und <b>200 + 19 %</b> versteht er ebenso wie <b>^</b> für Potenzen.',
            'Die Pfeiltasten hoch und runter blättern durch frühere Rechnungen.'
        ]
    },
    en: {
        kurz: 'Not a keypad but a line: you type the whole calculation and confirm with Enter.',
        schritte: [
            'Type the calculation at the top, for example <b>1250 * 1.19 - 80</b>.',
            '<b>Enter</b> works it out. The result moves into the history below.',
            'Use <b>ans</b> to carry on with the previous result.'
        ],
        tipps: [
            'Comma and point both count as the decimal mark; a point between thousands is understood.',
            'It takes <b>19 % of 200</b> and <b>200 + 19 %</b> as readily as <b>^</b> for powers.',
            'The up and down arrow keys page through earlier calculations.'
        ]
    }
};

const PO_WB = {
    'Rechner · PocketOps': 'Calculator · PocketOps',
    'Rechner': 'Calculator',
    'Ganze Rechnung tippen': 'Type the whole calculation',
    'Rechnen': 'Calculate',
    'Verlauf': 'History',
    'Verlauf kopieren': 'Copy history',
    'Verlauf leeren': 'Clear history',
    'Zeile leeren': 'Clear the line',
    'Letztes Zeichen löschen': 'Delete the last character',
    'Noch nichts gerechnet.': 'Nothing calculated yet.',
    'Oben eine Rechnung tippen und mit Enter bestätigen.': 'Type a calculation above and confirm with Enter.',
    '{} Rechnungen': '{} calculations',
    '{} Rechnung': '{} calculation',
    'z. B. 1250 * 1,19 - 80': 'e.g. 1250 * 1.19 - 80',
    'Schreibweisen': 'How to write it',
    'Komma oder Punkt als Dezimaltrenner': 'Comma or point as the decimal mark',
    'Punkt als Tausendertrenner wird erkannt': 'A point between thousands is understood',
    'Malzeichen vor der Klammer darf fehlen': 'The times sign before a bracket may be left out',
    'Potenz, hier zehn Jahre Verzinsung': 'Power — here ten years of interest',
    '19 % von 200 → 38': '19 % of 200 → 38',
    'schlägt 19 % auf 200 auf → 238': 'adds 19 % to 200 → 238',
    'zieht 10 % von 200 ab → 180': 'takes 10 % off 200 → 180',

    /* Der Satz über die Pfeiltasten zerfällt an den fetten Stellen */
    'Das letzte Ergebnis': 'The last result',
    'ist das vorige Ergebnis': 'is the previous result',
    'blättert durch den Verlauf,': 'pages through the history,',
    'rechnet': 'calculates'
};
