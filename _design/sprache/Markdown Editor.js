/* Markdown-Editor · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Links schreiben, rechts sofort sehen, wie es aussieht.',
        schritte: [
            'Links in das Feld schreiben. Rechts läuft die Vorschau mit.',
            'Eine fertige <b>.md</b>-Datei lässt sich auch einfach ins Fenster ziehen.',
            '<b>Herunterladen</b> gibt den Text wieder als <b>.md</b>-Datei heraus.'
        ],
        tipps: [
            'Der <b>Spickzettel</b> oben zeigt die wichtigsten Schreibweisen.',
            'Gedruckt wird nur die Vorschau, nicht das Schreibfeld.',
            'Der Text bleibt im Browser, auch wenn du das Fenster schließt.'
        ]
    },
    en: {
        kurz: 'Write on the left, see straight away on the right how it will look.',
        schritte: [
            'Write in the field on the left. The preview follows on the right.',
            'An existing <b>.md</b> file can simply be dragged into the window.',
            '<b>Download</b> gives the text back as an <b>.md</b> file.'
        ],
        tipps: [
            'The <b>cheat sheet</b> at the top shows the notation you need most.',
            'Printing gives you the preview only, not the editing field.',
            'The text stays in the browser, even when you close the window.'
        ]
    }
};

/* Steht nur beim allerersten Start im Feld. */
const PO_BEISPIEL_EN = `# Welcome

Write on the left, read along on the right. An \`.md\` file can also
simply be **dragged into this window**.

- The text is kept in the browser
- Printing gives you the preview only
- The cheat sheet at the top right shows the notation
`;

const PO_WB = {
    'Markdown-Editor · PocketOps': 'Markdown editor · PocketOps',
    'Markdown-Editor': 'Markdown editor',
    'Schreiben mit Vorschau': 'Write with a preview',
    'Markdown': 'Markdown',
    'Vorschau': 'Preview',
    'wird beim Drucken ausgegeben': 'this is what printing gives you',
    'Spickzettel': 'Cheat sheet',
    'Herunterladen': 'Download',
    'Leeren': 'Clear',
    '{} Wörter · {} Zeichen': '{} words · {} characters',
    '{} Wort · {} Zeichen': '{} word · {} characters'
};
