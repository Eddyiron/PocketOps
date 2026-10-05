/* Kanban mit Bahnen · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Wie Kanban, aber mit einer eigenen Bahn je Vorhaben — drei Spalten in jeder Bahn.',
        schritte: [
            '<b>Neue Bahn</b> legt eine Zeile für ein Vorhaben an; Name und Farbe lassen sich ändern.',
            '<b>Neues Ticket</b> legt ein Kärtchen in die erste Spalte der Bahn.',
            'Kärtchen mit der Maus zwischen Spalten und Bahnen ziehen.'
        ],
        tipps: [
            'Eine Bahn löschen nimmt ihre Kärtchen mit — die Rückfrage sagt vorher, wie viele es sind.',
            '<b>Sichern</b> legt alle Bahnen als eine Datei ab.'
        ]
    },
    en: {
        kurz: 'Like Kanban, but with a lane of its own for each project — three columns in every lane.',
        schritte: [
            '<b>New lane</b> adds a row for a project; name and colour can be changed.',
            '<b>New ticket</b> puts a card into the first column of that lane.',
            'Drag cards between columns and lanes with the mouse.'
        ],
        tipps: [
            'Deleting a lane takes its cards with it — the prompt says how many beforehand.',
            '<b>Save</b> puts all lanes into a single file.'
        ]
    }
};

const PO_WB = {
    'Kanban mit Bahnen · PocketOps': 'Kanban with lanes · PocketOps',
    'Kanban mit Bahnen': 'Kanban with lanes',
    'Nach Vorhaben getrennt': 'Separated by project',
    'Neues Ticket': 'New ticket',
    'Neue Bahn': 'New lane',
    'Bahn': 'Lane',
    'Bahn löschen': 'Delete lane',
    'Name der Bahn': 'Name of the lane',
    'Farbe der Bahn': 'Colour of the lane',
    'Sichern': 'Save',
    'gespeichert': 'saved',
    'leer': 'empty',
    'Zu tun': 'To do',
    'In Arbeit': 'Doing',
    'Erledigt': 'Done',
    'Hierher ziehen oder neu anlegen': 'Drag here, or make a new one'
};
