/* Priorisierungsmatrix · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Themen nach drei Maßen ordnen: Wirkung, Aufwand, Machbarkeit. Zwei davon sind die Achsen, das dritte die Größe der Blase.',
        schritte: [
            'Oben ein <b>Thema</b> eintragen und hinzufügen.',
            'Je Thema die drei Werte setzen — Wirkung, Aufwand, Machbarkeit.',
            'Die Blasen ordnen sich von selbst; die Rangfolge steht daneben.'
        ],
        tipps: [
            'Der Punktwert ist <b>(Wirkung + Machbarkeit) ÷ Aufwand</b>: viel Nutzen für wenig Mühe steht oben.',
            'Welche Größe auf welche Achse kommt, lässt sich umstellen.'
        ]
    },
    en: {
        kurz: 'Sort topics by three measures: impact, effort, feasibility. Two of them are the axes, the third is the size of the bubble.',
        schritte: [
            'Enter a <b>topic</b> at the top and add it.',
            'Set the three values for each topic — impact, effort, feasibility.',
            'The bubbles arrange themselves; the ranking sits beside them.'
        ],
        tipps: [
            'The score is <b>(impact + feasibility) ÷ effort</b>: a lot of benefit for little trouble comes out on top.',
            'Which measure goes on which axis can be changed.'
        ]
    }
};

const PO_WB = {
    'Priorisierungsmatrix · PocketOps': 'Priority matrix · PocketOps',
    'Priorisierungsmatrix': 'Priority matrix',
    'Wirkung · Aufwand · Machbarkeit': 'Impact · effort · feasibility',
    'Matrix': 'Matrix',
    'Thema': 'Topic',
    'Thema hinzufügen': 'Add topic',
    'Neues Thema': 'New topic',
    'Bezeichnung': 'Name',
    'Wirkung': 'Impact',
    'Aufwand': 'Effort',
    'Machbarkeit': 'Feasibility',
    'Achsen benennen': 'Choose the axes',
    'X-Achse': 'X axis',
    'Y-Achse': 'Y axis',
    'X-Achse ·': 'X axis ·',
    'Y-Achse ·': 'Y axis ·',
    'Größe ·': 'Size ·',
    'Größe': 'Size',
    'Blasengröße': 'Bubble size',
    'Punkte': 'Score',
    'Rangfolge': 'Ranking',
    'Punktwert = (Wirkung + Machbarkeit) ÷ Aufwand': 'Score = (impact + feasibility) ÷ effort',
    'Noch keine Themen erfasst.': 'No topics entered yet.',
    '{} Themen': '{} topics',
    '{} Thema': '{} topic',
    'z. B. Schnittstelle ablösen': 'e.g. replace the interface'
};
