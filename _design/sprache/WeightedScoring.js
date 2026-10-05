/* Entscheidungsmatrix · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Mehrere Möglichkeiten nach mehreren Kriterien vergleichen — und die Kriterien unterschiedlich schwer gewichten.',
        schritte: [
            'Oben ein <b>Kriterium</b> anlegen und ihm ein Gewicht von 1 bis 10 geben.',
            'Eine <b>Option</b> anlegen — das ist eine der Möglichkeiten, zwischen denen du wählst.',
            'In der Tabelle jede Option je Kriterium mit 1 bis 10 bewerten.',
            'Die Rangfolge rechts rechnet sich dabei von selbst aus.'
        ],
        tipps: [
            'Das Gewicht sagt, wie wichtig ein Kriterium ist — nicht, wie gut eine Option darin abschneidet.',
            'Steht die Rangfolge erst einmal, lohnt die Gegenprobe: Gewichte ändern und sehen, ob sie sich dreht.'
        ]
    },
    en: {
        kurz: 'Compare several options against several criteria — and give the criteria different weights.',
        schritte: [
            'Add a <b>criterion</b> at the top and give it a weight from 1 to 10.',
            'Add an <b>option</b> — one of the choices you are deciding between.',
            'In the table, rate every option against every criterion from 1 to 10.',
            'The ranking on the right works itself out as you go.'
        ],
        tipps: [
            'The weight says how important a criterion is — not how well an option does on it.',
            'Once you have a ranking, test it: change the weights and see whether it turns around.'
        ]
    }
};

const PO_WB = {
    'Entscheidungsmatrix · PocketOps': 'Decision matrix · PocketOps',
    'Entscheidungsmatrix': 'Decision matrix',
    'Optionen gewichtet vergleichen': 'Compare options by weight',
    'Kriterium': 'Criterion',
    'Kriterium mit Gewichtung': 'Criterion with a weight',
    'Gewicht': 'Weight',
    'Gewichtung 1–10': 'Weight 1–10',
    'Option': 'Option',
    'Bewertung': 'Rating',
    'Gewichtetes Ergebnis': 'Weighted result',
    'Rangfolge': 'Ranking',
    '1 = schlecht · 10 = sehr gut': '1 = poor · 10 = very good',
    'Noch nichts erfasst.': 'Nothing entered yet.',
    'Lege oben ein Kriterium und eine Option an.': 'Add a criterion and an option above.',
    'Sobald Kriterien und Optionen stehen, erscheint hier die Rangfolge.': 'Once criteria and options are in place, the ranking appears here.',
    'z. B. Betriebskosten': 'e.g. running costs',
    'z. B. Anbieter A': 'e.g. supplier A'
};
