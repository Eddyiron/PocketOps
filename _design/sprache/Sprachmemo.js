/* Sprachmemo · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Kurz etwas aufsprechen und später wieder anhören. Die Aufnahmen bleiben auf diesem Rechner.',
        schritte: [
            'Auf den roten Knopf tippen — die Aufnahme läuft.',
            'Noch einmal tippen beendet sie. Sie erscheint in der Liste darunter.',
            'In der Liste anhören, umbenennen, herunterladen oder löschen.'
        ],
        tipps: [
            'Ton lässt sich nicht in die Zwischenablage legen — das erlaubt kein Browser. Darum gibt es <b>Herunterladen</b>.',
            '<b>Mitschreiben</b> tippt das Gesprochene mit. Dafür schickt Chrome den Ton an einen Dienst von Google; ohne den Haken bleibt alles hier.'
        ]
    },
    en: {
        kurz: 'Speak something quickly and listen to it later. The recordings stay on this computer.',
        schritte: [
            'Tap the red button — recording starts.',
            'Tap again to stop. The recording appears in the list below.',
            'From the list you can play, rename, download or delete it.'
        ],
        tipps: [
            'Audio cannot be put on the clipboard — no browser allows it. That is what <b>Download</b> is for.',
            '<b>Transcribe</b> types out what you say. For that Chrome sends the audio to a Google service; without the tick everything stays here.'
        ]
    }
};

const PO_WB = {
    'Sprachmemo · PocketOps': 'Voice memo · PocketOps',
    'Sprachmemo': 'Voice memo',
    'Kurz aufnehmen, später nachhören': 'Record briefly, listen later',
    'Aufnahme starten': 'Start recording',
    'Aufnahmen': 'Recordings',
    '{} Aufnahmen': '{} recordings',
    '{} Aufnahme': '{} recording',
    'Noch keine Aufnahme.': 'No recording yet.',
    'Oben auf den roten Knopf tippen.': 'Tap the red button above.',
    'Bereit — auf den Knopf tippen': 'Ready — tap the button',
    'Alle löschen': 'Delete all',
    'Alles sichern': 'Save all',
    'Mitschreiben': 'Transcribe',
    'tippt gesprochenen Text mit': 'types out what is spoken',
    'Der gesprochene Text erscheint hier …': 'The spoken text appears here …',
    'Mitschreiben geht über diesen Rechner hinaus.': 'Transcribing leaves this computer.',
    'Chrome schickt den Ton dafür an einen Dienst von Google. Die Aufnahme selbst bleibt hier — nur fürs Mitschreiben verlässt sie den Rechner. Ohne diesen Haken geschieht alles örtlich.':
        'Chrome sends the audio to a Google service for it. The recording itself stays here — only transcribing takes it off this computer. Without the tick, everything happens locally.'
};
