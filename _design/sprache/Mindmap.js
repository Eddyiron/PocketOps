/* Mindmap · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Gedanken als Karten, die miteinander verbunden sind. Die Lage rechnet die Mindmap selbst aus.',
        schritte: [
            'Doppelklick auf die freie Fläche legt eine <b>neue Karte</b> an.',
            'Karte anklicken und <b>Verbinden</b> wählen, dann die zweite Karte anklicken.',
            'Doppelklick auf eine Karte ändert ihren Text.'
        ],
        tipps: [
            'Farbe und ein Zeichen je Karte helfen beim Sortieren — Fragezeichen für Offenes, Glühbirne für Einfälle.',
            'Ziehen bewegt die Fläche, das Rad zoomt.',
            'Wer eine Gliederung braucht, nimmt die Mindmap; wer etwas frei hinwerfen will, das Whiteboard.',
            'Links stehen alle Mindmaps nebeneinander. Wer die Fläche braucht, klappt die Leiste mit « weg.'
        ]
    },
    en: {
        kurz: 'Thoughts as cards that are linked to each other. The mind map works out the layout itself.',
        schritte: [
            'Double-click the empty surface to add a <b>new card</b>.',
            'Click a card, choose <b>connect</b>, then click the second card.',
            'Double-click a card to change its text.'
        ],
        tipps: [
            'A colour and a symbol per card help to sort things — a question mark for open points, a bulb for ideas.',
            'Dragging moves the surface, the wheel zooms.',
            'If you need an outline, use the mind map; if you want to throw things down freely, use the whiteboard.',
            'All your mind maps sit side by side on the left. If you need the room, fold the sidebar away with «.'
        ]
    }
};

const PO_WB = {
    'Mindmap · PocketOps': 'Mind map · PocketOps',
    'Mindmap': 'Mind map',
    'Gedanken verknüpfen': 'Link your thoughts',
    'Neue Karte': 'New card',
    'Zentrales Thema': 'Central topic',
    'Verbinden': 'Connect',
    'Entfernen': 'Remove',
    'Löschen': 'Delete',
    'Sichern': 'Save',
    'Farbe ändern': 'Change colour',
    'Hintergrund': 'Background',
    'Emoji wählen': 'Pick a symbol',
    'Freie Eingabe': 'Type your own',
    'Reinzoomen': 'Zoom in',
    'Rauszoomen': 'Zoom out',
    'PDF exportieren': 'Export PDF',
    '(Doppelklick zum Editieren)': '(double-click to edit)',
    'Ziehen zum Bewegen · Doppelklick legt eine Karte an': 'Drag to move · double-click adds a card',

    /* Seitenleiste */
    'Mindmaps': 'Mind maps',
    'Neue Mindmap': 'New mind map',
    'Seitenleiste ausblenden': 'Hide the sidebar',
    'Mindmaps einblenden': 'Show the mind maps',
    'Mindmap löschen': 'Delete mind map',
    'Mindmaps öffnen': 'Open mind maps',
    'Ja, ersetzen': 'Yes, replace',
    '„{}“ wird gelöscht, mit {} Karten. Das lässt sich nicht rückgängig machen.':
        '“{}” will be deleted, with {} cards. This cannot be undone.',
    '{} Mindmaps werden geöffnet. Der jetzige Stand wird dabei ersetzt.':
        '{} mind maps will be opened. This replaces what is there now.',
    'Gesichert: {} Mindmaps': 'Saved: {} mind maps',
    'Geöffnet: {} Mindmaps': 'Opened: {} mind maps',
    'Die Datei enthält keine Mindmap.': 'The file does not contain a mind map.',
    'Der Stand ließ sich nicht sichern — der Browser-Speicher ist voll.':
        'The state could not be saved — the browser storage is full.',
    'Alle Karten und Verbindungen dieser Mindmap werden gelöscht. Das lässt sich nicht rückgängig machen.':
        'All cards and links of this mind map will be deleted. This cannot be undone.'
};
