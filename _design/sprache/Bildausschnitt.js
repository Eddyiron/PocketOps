/* Bildausschnitt · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Den Bildschirm abgreifen, einen Ausschnitt ziehen und ihn als Bild in die Zwischenablage legen.',
        schritte: [
            '<b>Quelle wählen</b> — Chrome fragt, welcher Bildschirm oder welches Fenster geteilt wird.',
            'Zum Zielfenster wechseln und <b>Aufnehmen</b> drücken; mit Verzögerung, wenn du vorher noch umschalten willst.',
            'Im Standbild ein Rechteck ziehen. Der Ausschnitt geht sofort in die Zwischenablage.'
        ],
        tipps: [
            'Die Freigabe gilt, bis du sie beendest: einmal wählen, danach beliebig oft abgreifen.',
            'Die <b>Sammlung</b> behält jeden Ausschnitt — die Zwischenablage behält immer nur den letzten.',
            'Es gibt kein Tastenkürzel von außerhalb des Browsers. Dagegen hilft die Verzögerung.'
        ]
    },
    en: {
        kurz: 'Capture the screen, drag out a section and put it on the clipboard as an image.',
        schritte: [
            '<b>Choose a source</b> — Chrome asks which screen or window is shared.',
            'Switch to the window you want and press <b>Capture</b>; use a delay if you still need to switch.',
            'Drag a rectangle in the still image. The section goes straight to the clipboard.'
        ],
        tipps: [
            'The permission lasts until you end it: choose once, then capture as often as you like.',
            'The <b>collection</b> keeps every section — the clipboard only ever keeps the last one.',
            'There is no keyboard shortcut that works from outside the browser. The delay is what helps.'
        ]
    }
};

const PO_WB = {
    'Bildausschnitt · PocketOps': 'Screen clip · PocketOps',
    'Bildausschnitt': 'Screen clip',
    'Abgreifen, zuschneiden, kopieren': 'Capture, crop, copy',
    'In zwei Schritten zum Ausschnitt': 'Two steps to a clip',
    'Quelle wählen': 'Choose a source',
    'Keine Quelle gewählt': 'No source chosen',
    'Aufnehmen': 'Capture',
    'Verzögerung': 'Delay',
    'ohne': 'none',
    '3 Sekunden': '3 seconds',
    '5 Sekunden': '5 seconds',
    '10 Sekunden': '10 seconds',
    'Jetzt zum Zielfenster wechseln': 'Switch to the window you want now',
    'Ganzes Bild nehmen': 'Take the whole image',
    'Sammlung': 'Collection',
    'Sammlung leeren': 'Empty the collection',
    'Alle löschen': 'Delete all',
    'Der Browser darf den Bildschirm nur nach ausdrücklicher Freigabe sehen. Diese Freigabe gilt, bis du sie beendest — du wählst also einmal und greifst danach beliebig oft ab.':
        'The browser may only see the screen once you have explicitly allowed it. That permission lasts until you end it — so you choose once and then capture as often as you like.',
    'Hier sammeln sich die Ausschnitte. Jeder lässt sich später wieder kopieren — anders als bei der Zwischenablage, die immer nur das Letzte behält.':
        'This is where the clips collect. Each one can be copied again later — unlike the clipboard, which only ever keeps the last one.',

    /* Die Anleitung oben zerfällt an den fetten Stellen in Stücke */
    '— Chrome fragt, welcher Bildschirm oder welches Fenster.': '— Chrome asks which screen or which window.',
    '— mit Verzögerung, wenn du vorher umschalten willst.': '— with a delay if you need to switch first.',
    'Im Standbild ein': 'Drag a',
    'Rechteck ziehen': 'rectangle in the still image',
    '. Der Ausschnitt geht sofort in die Zwischenablage und in die Sammlung.': '. The clip goes straight to the clipboard and into the collection.'
};
