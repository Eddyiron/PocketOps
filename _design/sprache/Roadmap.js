/* Roadmap · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Vorhaben auf einer Zeitachse, nach Bahnen getrennt. Zeigt, was von wann bis wann läuft.',
        schritte: [
            '<b>Doppelklick</b> auf eine Bahn legt dort ein Vorhaben an.',
            'Den Balken in der Mitte ziehen verschiebt ihn, an der <b>Kante</b> ziehen ändert die Dauer.',
            'Senkrecht ziehen bringt ein Vorhaben in eine andere Bahn. Doppelklick darauf öffnet Bahn, Daten und Farbe.'
        ],
        tipps: [
            'Woche, Monat und Quartal ändern nur den Maßstab — die Daten bleiben auf den Tag genau.',
            'Ein Meilenstein ist ein Tag ohne Dauer, etwa eine Abnahme oder ein Messetermin.',
            'Kanban zeigt, was gerade in Arbeit ist; die Roadmap zeigt, wann es läuft. Beides nebeneinander ist kein Widerspruch.'
        ]
    },
    en: {
        kurz: 'Plans on a timeline, kept apart in streams. Shows what runs from when to when.',
        schritte: [
            '<b>Double-click</b> a stream to add a plan there.',
            'Dragging the middle of a bar moves it, dragging an <b>edge</b> changes how long it runs.',
            'Dragging up or down moves a plan into another stream. Double-click it to set stream, dates and colour.'
        ],
        tipps: [
            'Week, month and quarter only change the scale — the dates stay accurate to the day.',
            'A milestone is a single day without duration, such as a sign-off or a trade fair.',
            'Kanban shows what is in progress; the roadmap shows when it runs. Having both is no contradiction.'
        ]
    }
};

const PO_WB = {
    'Roadmap · PocketOps': 'Roadmap · PocketOps',
    'Roadmap': 'Roadmap',
    'Vorhaben über Monate legen': 'Plan work across months',

    /* Seitenleiste */
    'Roadmaps': 'Roadmaps',
    'Neue Roadmap': 'New roadmap',
    'Seitenleiste ausblenden': 'Hide the sidebar',
    'Roadmaps einblenden': 'Show the roadmaps',
    'Roadmap löschen': 'Delete roadmap',
    'Roadmaps öffnen': 'Open roadmaps',

    /* Leiste */
    'Nach links': 'Scroll left',
    'Nach rechts': 'Scroll right',
    'Heute': 'Today',
    'Woche': 'Week',
    'Monat': 'Month',
    'Quartal': 'Quarter',
    '+ Vorhaben': '+ Plan',
    '+ Meilenstein': '+ Milestone',
    '+ Bahn': '+ Stream',
    'Rückgängig (Strg+Z)': 'Undo (Ctrl+Z)',
    'Wiederholen (Strg+Y)': 'Redo (Ctrl+Y)',
    'Sichern': 'Save',
    'Leeren': 'Clear',
    'Löschen': 'Delete',
    'Als Bild speichern': 'Save as image',
    'Neues Vorhaben': 'New plan',

    /* Fläche */
    'Bahn': 'Stream',
    'Nach oben': 'Move up',
    'Nach unten': 'Move down',
    'Bahn löschen': 'Delete stream',
    'Neue Bahn': 'New stream',
    'Name': 'Name',
    'Vorhaben': 'Plan',
    'Vorhaben löschen': 'Delete plan',
    'Meilenstein': 'Milestone',
    'Meilenstein löschen': 'Delete milestone',
    'Titel': 'Title',
    'Farbe': 'Colour',
    'Von': 'From',
    'Bis': 'To',
    'Am': 'On',
    'Notiz (eine Zeile)': 'Note (one line)',
    'Übernehmen': 'Apply',

    /* Der Hinweis auf der leeren Fläche steht wegen des <b> in drei Stücken. */
    'Noch nichts geplant.': 'Nothing planned yet.',
    'Doppelklick': 'Double-click',
    'auf eine Bahn legt ein Vorhaben an.': 'on a stream adds a plan.',

    /* Meldungen */
    'Ja, löschen': 'Yes, delete',
    'Ja, leeren': 'Yes, clear',
    'Ja, ersetzen': 'Yes, replace',
    'Roadmap leeren': 'Clear roadmap',
    'Die letzte Bahn lässt sich nicht löschen.': 'The last stream cannot be deleted.',
    'Die Roadmap ist schon leer.': 'The roadmap is already empty.',
    'Auf dieser Roadmap ist nichts zu sehen.': 'There is nothing to see on this roadmap.',
    'Die Datei enthält keine Roadmaps.': 'The file does not contain any roadmaps.',
    'Der Stand ließ sich nicht sichern — der Browser-Speicher ist voll.':
        'The state could not be saved — the browser storage is full.',
    '„{}“ wird gelöscht.': '“{}” will be deleted.',
    '„{}“ wird gelöscht, mit {} Vorhaben. Das lässt sich nicht rückgängig machen.':
        '“{}” will be deleted, with {} plans. This cannot be undone.',
    'Die Bahn „{}“ wird gelöscht.': 'The stream “{}” will be deleted.',
    'Die Bahn „{}“ wird gelöscht, mit {} Einträgen darin.':
        'The stream “{}” will be deleted, with {} entries in it.',
    'Alle {} Einträge dieser Roadmap werden entfernt. Die Bahnen bleiben.':
        'All {} entries of this roadmap will be removed. The streams stay.',
    '{} Roadmaps werden geöffnet. Der jetzige Stand wird dabei ersetzt.':
        '{} roadmaps will be opened. This replaces what is there now.',
    'Gesichert: {} Roadmaps': 'Saved: {} roadmaps',
    'Geöffnet: {} Roadmaps': 'Opened: {} roadmaps',
    'Bild gespeichert · {} × {} Punkte': 'Image saved · {} × {} pixels',

    /* Die obere Kopfzeile schreibt bei der Stufe Woche „Monat Jahr“ in einem
       Stück — deshalb als Muster und nicht als blosser Monatsname. */
    'Januar {}': 'January {}', 'Februar {}': 'February {}', 'März {}': 'March {}',
    'April {}': 'April {}', 'Mai {}': 'May {}', 'Juni {}': 'June {}',
    'Juli {}': 'July {}', 'August {}': 'August {}', 'September {}': 'September {}',
    'Oktober {}': 'October {}', 'November {}': 'November {}', 'Dezember {}': 'December {}',

    /* Die kurzen Namen stehen für sich in der unteren Kopfzeile. */
    'Jan': 'Jan', 'Feb': 'Feb', 'Mär': 'Mar', 'Apr': 'Apr', 'Mai': 'May', 'Jun': 'Jun',
    'Jul': 'Jul', 'Aug': 'Aug', 'Sep': 'Sep', 'Okt': 'Oct', 'Nov': 'Nov', 'Dez': 'Dec'
};
