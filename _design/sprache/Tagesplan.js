/* Tagesplan · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Aufgaben in Zeitblöcke legen: links der Vorrat, rechts der Tag im Raster.',
        schritte: [
            'Unten eine <b>neue Aufgabe</b> eintippen und mit Enter in den Vorrat legen.',
            'Die Aufgabe in den Tag ziehen — dorthin, wo du sie wirklich machen willst.',
            'Mit <b>Zeit</b> läuft eine Uhr auf der Aufgabe mit.'
        ],
        tipps: [
            'Termine kommen über eine <b>.ics</b>-Datei herein, die du in Outlook selbst speicherst — eine echte Anbindung gibt es bewusst nicht.',
            'Aus einer gesicherten Kanban-Datei lassen sich Tickets direkt übernehmen.',
            'Arbeitszeit und Rasterweite stehen in den Einstellungen.'
        ]
    },
    en: {
        kurz: 'Put tasks into time blocks: the backlog on the left, the day on a grid to the right.',
        schritte: [
            'Type a <b>new task</b> at the bottom and press Enter to put it in the backlog.',
            'Drag the task into the day — to the time you really mean to do it.',
            '<b>Time</b> runs a clock on the task while you work on it.'
        ],
        tipps: [
            'Appointments come in through an <b>.ics</b> file that you save out of Outlook yourself — there is deliberately no live connection.',
            'Tickets can be taken straight out of a saved Kanban file.',
            'Working hours and the grid spacing are in the settings.'
        ]
    }
};

const PO_WB = {
    'Tagesplan · PocketOps': 'Day plan · PocketOps',
    'Tagesplan': 'Day plan',
    'Aufgaben in Zeitblöcke legen': 'Put tasks into time blocks',
    'Tag': 'Day',
    'Woche': 'Week',
    'Heute': 'Today',
    'Zurück': 'Back',
    'Vor': 'Forward',
    'Vorrat': 'Backlog',
    'Zeiten': 'Times',
    'Termine': 'Appointments',
    'Einstellungen': 'Settings',
    'Arbeitszeit und Raster': 'Working hours and grid',
    'Neue Aufgabe': 'New task',
    'Aufgabe eintippen und Enter': 'Type a task and press Enter',
    'Bearbeiten': 'Edit',
    'Löschen': 'Delete',
    'Sichern': 'Save',
    'Stopp': 'Stop',
    'Offen': 'Open',
    'Wartet': 'Waiting',
    'Dringend': 'Urgent',
    '▶ Zeit': '▶ Time',
    'Titel übernehmen und Zeit messen': 'Take the title and start timing',
    'Termine aus einer ICS-Datei einlesen': 'Read appointments from an ICS file',
    'Aus Kanban übernehmen': 'Take from Kanban',
    'Tickets aus einer gesicherten Kanban-Datei übernehmen': 'Take tickets from a saved Kanban file',
    '30 min': '30 min',
    '1 h': '1 h',
    '1 h 30 min': '1 h 30 min',

    /* Wochentage */
    'Mo': 'Mon', 'Di': 'Tue', 'Mi': 'Wed', 'Do': 'Thu', 'Fr': 'Fri', 'Sa': 'Sat', 'So': 'Sun'
};
