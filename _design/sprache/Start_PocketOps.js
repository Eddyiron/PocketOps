/* Übersicht · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Die Startseite der Reihe: alle Werkzeuge, nach Anlass geordnet, dazu deine eigenen Verweise.',
        schritte: [
            'Ein Werkzeug anklicken — es öffnet sich im selben Fenster. Das Markenzeichen oben links führt wieder hierher.',
            'Oben suchen: die Suche erfasst Namen, Beschreibungen und deine eigenen Verweise. <b>Enter</b> öffnet den ersten Treffer.',
            'Was du oft brauchst, mit <b>Oben anheften</b> nach ganz oben holen.'
        ],
        tipps: [
            '<b>Neue Gruppe</b> legt eine eigene Sammlung für Verweise an — Intranet, Laufwerke, Vorlagen.',
            'Gruppen lassen sich zuklappen. Angeheftetes und Zugeklapptes merkt sich der Browser.',
            'Oben links schaltest du zwischen Deutsch und Englisch um — die Wahl gilt für alle Werkzeuge.'
        ]
    },
    en: {
        kurz: 'The front page of the set: every tool, grouped by occasion, plus your own links.',
        schritte: [
            'Click a tool — it opens in the same window. The logo at the top left brings you back here.',
            'Search at the top: it covers names, descriptions and your own links. <b>Enter</b> opens the first hit.',
            'Use <b>Pin to top</b> for whatever you need often.'
        ],
        tipps: [
            '<b>New group</b> makes a collection of your own links — intranet, drives, templates.',
            'Groups can be folded away. The browser remembers what is pinned and what is folded.',
            'Top left switches between German and English — the choice holds for every tool.'
        ]
    }
};

const PO_WB = {
    'PocketOps · Übersicht': 'PocketOps · Overview',
    'Übersicht': 'Overview',
    'Werkzeuge und eigene Verweise': 'Tools and your own links',
    'Werkzeuge und eigene Verweise durchsuchen … · Enter öffnet den ersten Treffer':
        'Search tools and your own links … · Enter opens the first hit',
    'Kein Werkzeug passt dazu.': 'No tool matches that.',

    /* Gruppen */
    'Große Werkzeuge': 'The big tools',
    'ausgebaut, für längeres Arbeiten': 'fully built, for longer work',
    'Am Schreibtisch': 'At the desk',
    'allein, im täglichen Lauf': 'on your own, in the daily run of things',
    'Mit anderen': 'With other people',
    'Besprechung, Werkstatt, Abstimmung': 'meetings, workshops, getting agreement',
    'In der Pause': 'On a break',
    'fünf Minuten gegen den Rechner': 'five minutes against the computer',
    'Zum Nachlesen': 'To read up on',
    'wie die Reihe gesichert wird': 'how to keep your work safe',

    /* Werkzeuge */
    'Tagesplan': 'Day plan',
    'Aufgaben in Zeitblöcke legen': 'Put tasks into time blocks',
    'SlideCraft': 'SlideCraft',
    'Folien bauen und als PPTX ausgeben': 'Build slides and export PPTX',
    'Dokument': 'Document',
    'Schreiben und als Word ausgeben': 'Write and export to Word',
    'Mindmap': 'Mind map',
    'Gedanken verknüpfen': 'Link your thoughts',
    'Diagramm': 'Chart',
    'Zahlen als Bild, PNG heraus': 'Numbers as a picture, PNG out',
    'Whiteboard': 'Whiteboard',
    'Zeichnen und frei anordnen': 'Draw and arrange freely',
    'PDF-Werkzeuge': 'PDF tools',
    'Verkleinern, teilen, zusammenführen': 'Shrink, split, merge',
    'Kanban': 'Kanban',
    'Aufgaben in drei Spalten': 'Tasks in three columns',
    'Kanban mit Bahnen': 'Kanban with lanes',
    'Nach Vorhaben getrennt': 'Separated by project',
    'Verweise zurücksetzen': 'Reset links',
    'Eigene Verweise zurücksetzen': 'Reset your own links',
    'Ja, Verweise löschen': 'Yes, delete the links',
    'Alle eigenen Gruppen und Verweise auf dieser Übersicht werden gelöscht. Was in den Werkzeugen steckt — Kanban, Notizbuch, Roadmap und die übrigen — bleibt unberührt.':
        'All your own groups and links on this overview will be deleted. What is inside the tools — Kanban, Notebook, Roadmap and the rest — stays untouched.',
    'Eigene Verweise zurückgesetzt': 'Your own links have been reset',

    'Roadmap': 'Roadmap',
    'Vorhaben über Monate legen': 'Plan work across months',
    'Notizbuch': 'Notebook',
    'Bücher, Kapitel, Seiten': 'Books, chapters, pages',
    'Sprachmemo': 'Voice memo',
    'Kurz aufnehmen, später nachhören': 'Record briefly, listen later',
    'Markdown-Editor': 'Markdown editor',
    'Schreiben mit Vorschau': 'Write with a preview',
    'Bildausschnitt': 'Screen clip',
    'Bildschirm abgreifen und kopieren': 'Capture the screen and copy',
    'Rechner': 'Calculator',
    'Ganze Rechnung tippen': 'Type the whole calculation',
    'Timer': 'Timer',
    'Zeit im Blick behalten': 'Keep an eye on the time',
    'RACI-Matrix': 'RACI matrix',
    'Verantwortung je Aufgabe': 'Responsibility per task',
    'Entscheidungsmatrix': 'Decision matrix',
    'Optionen gewichtet vergleichen': 'Compare options by weight',
    'Priorisierungsmatrix': 'Priority matrix',
    'Wirkung, Aufwand, Machbarkeit': 'Impact, effort, feasibility',
    'Stakeholder-Karte': 'Stakeholder map',
    'Einfluss und Interesse': 'Influence and interest',
    'Team-Radar': 'Team radar',
    'Fähigkeiten im Team': 'Skills in the team',
    'Drei gewinnt': 'Tic-tac-toe',
    'Drei in einer Reihe': 'Three in a row',
    'Vier gewinnt': 'Connect four',
    'Steine einwerfen, vier in Folge': 'Drop discs, four in a row',
    'Galgenmännchen': 'Hangman',
    'Wort erraten, elf Fehler frei': 'Guess the word, eleven misses allowed',
    'Sichern & Zurückholen': 'Backups & restoring',
    'Sicherungen, Ordner, Angst nehmen': 'Backups, folders, nothing to fear',

    /* Eigene Verweise */
    'Eigene Verweise': 'Your own links',
    'Neue Gruppe': 'New group',
    'Link hinzufügen': 'Add a link',
    '+ Link': '+ Link',
    'Kategorie bearbeiten': 'Edit the group',
    'Kategorie löschen': 'Delete the group',
    'Titel / Name': 'Title / name',
    'URL / Pfad': 'URL / path',
    'https://... oder file:///C:/...': 'https://… or file:///C:/…',
    'z. B. PDF Pipeline oder Team SharePoint': 'e.g. PDF pipeline or team SharePoint',
    'Eintrag': 'Entry',
    'Anheften': 'Pin',
    'Oben anheften': 'Pin to top',
    'Sichern': 'Save',
    'Noch keine eigenen Verweise. Oben rechts auf „Neue Gruppe" legst du die erste an — hier kommen Dinge hin, die du oft brauchst: Intranet, Laufwerke, Vorlagen.':
        'No links of your own yet. "New group" at the top right creates the first one — this is the place for what you need often: intranet, drives, templates.'
};
