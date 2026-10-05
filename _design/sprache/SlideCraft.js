/* SlideCraft · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Folien bauen aus fertigen Bausteinen — und am Ende eine echte PowerPoint-Datei.',
        schritte: [
            'Links in der <b>Element-Bibliothek</b> einen Baustein wählen und auf die Folie legen.',
            'Auf ein Element klicken und es rechts unter <b>Eigenschaften</b> einstellen; Doppelklick ändert den Text.',
            '<b>Neue Folie</b> legt die nächste an, <b>PPTX exportieren</b> gibt alles als Datei heraus.'
        ],
        tipps: [
            '<b>Color</b> setzt ein Farbthema für das ganze Projekt; Elemente mit eigener Farbe behalten sie.',
            '<b>Zwischenstand speichern</b> (Strg+S) legt die Arbeit als Datei ab — das ist die Sicherungskopie.',
            'Über <b>JSON einfügen</b> lässt sich eine ganze Präsentation aus der Antwort eines Sprachmodells übernehmen.'
        ]
    },
    en: {
        kurz: 'Build slides from ready-made blocks — and get a real PowerPoint file at the end.',
        schritte: [
            'Pick a block from the <b>element library</b> on the left and drop it on the slide.',
            'Click an element and set it up under <b>properties</b> on the right; double-click changes the text.',
            '<b>New slide</b> adds the next one, <b>Export PPTX</b> gives you the whole thing as a file.'
        ],
        tipps: [
            '<b>Color</b> sets a colour theme for the whole project; elements with a colour of their own keep it.',
            '<b>Save progress</b> (Ctrl+S) puts the work into a file — that is your backup.',
            '<b>Paste JSON</b> takes a whole presentation out of a language model’s answer.'
        ]
    }
};

const PO_WB = {
    'SlideCraft · PocketOps': 'SlideCraft · PocketOps',
    'Folien & PPTX-Export': 'Slides & PPTX export',
    'Präsentation erzeugen': 'Build a presentation',
    'PPTX exportieren': 'Export PPTX',
    'Neue Folie': 'New slide',
    'Folie': 'Slide',
    'Folie {}': 'Slide {}',
    'Folien (': 'Slides (',
    'Titel der Folie': 'Title of the slide',
    'Vorschau': 'Preview',
    'Vorschaugröße': 'Preview size',
    'Zwischenstand als Datei speichern (Strg+S)': 'Save progress as a file (Ctrl+S)',
    'Gespeicherten Zwischenstand öffnen (Strg+O)': 'Open saved progress (Ctrl+O)',
    'Schließen (Esc)': 'Close (Esc)',
    'Löschen': 'Delete',
    'Duplizieren': 'Duplicate',
    'Auf Folie einfügen': 'Put on the slide',
    'Klicken zum Bearbeiten': 'Click to edit',
    '[Entf] löscht ausgewähltes Element': '[Del] removes the selected element',
    'Auswahl aufheben': 'Clear the selection',
    'Alle sichtbaren auswählen': 'Select all visible',
    '+ Hinzufügen': '+ Add',

    /* Bibliothek */
    'Element-Bibliothek': 'Element library',
    'Bibliothek': 'Library',
    'Bibliothek leeren': 'Empty the library',
    'Text & Aufzählung': 'Text & bullets',
    'Aufzählung': 'Bullet list',
    'Freitext': 'Free text',
    'Frei formatierbarer Textabschnitt': 'A block of text you format yourself',
    'Überschrift': 'Heading',
    'Kernbotschaft': 'Key message',
    'Hervorgehobene zentrale Aussage': 'One central statement, set out clearly',
    'Kennzahlen & Layouts': 'Figures & layouts',
    'Kennzahl / Stat': 'Figure / stat',
    'Große Zahl mit Beschreibung': 'A big number with a caption',
    'KPI-Reihe': 'Row of figures',
    '2–5 Kennzahlen mit Trend': '2–5 figures with a trend',
    'Karten & Raster': 'Cards & grid',
    'Card Element': 'Card',
    'Flexibles Raster (1–12 Cards)': 'A flexible grid (1–12 cards)',
    'Spalten-Container': 'Columns',
    'Elemente nebeneinander (2–3 Spalten)': 'Elements side by side (2–3 columns)',
    'Tabelle': 'Table',
    'Zeilen & Spalten, frei editierbar': 'Rows & columns, freely editable',
    'Statusampel': 'Status lights',
    'Termine, Budget, Qualität, Risiken': 'Dates, budget, quality, risks',
    'Roadmap / Zeitstrahl': 'Roadmap / timeline',
    'Meilensteine & Ablauf': 'Milestones & sequence',
    'Icons & Illustrationen': 'Icons & illustrations',
    'Liste mit Icon-Auswahl & (+)': 'A list with icons to choose from & (+)',
    'Bilder & Grafiken': 'Pictures & graphics',
    'Bilder aus lokalem Ordner, frei platzierbar': 'Pictures from a local folder, placed freely',
    'Einzelne Dateien': 'Single files',
    'Ordner importieren': 'Import a folder',
    'Importiere …': 'Importing …',
    'Dateiname suchen …': 'Search file names …',

    /* Eigenschaften und Farben */
    'Eigenschaften': 'Properties',
    'Klicke auf ein Element auf der Folie, um dessen spezielle Eigenschaften zu bearbeiten.':
        'Click an element on the slide to edit the settings that belong to it.',
    'Folien-Einstellungen': 'Slide settings',
    'Folien-Kopf': 'Slide header',
    'Folien-Hintergrund': 'Slide background',
    'Hintergrund-Stil': 'Background style',
    'Eigene Hintergrundfarbe': 'Your own background colour',
    'Freie Hintergrundfarbe': 'Free background colour',
    'nicht gesetzt (Stil oben gilt)': 'not set (the style above applies)',
    'Farben': 'Colours',
    'Farbthema für alle Elemente voreinstellen': 'Set a colour theme for every element',
    'Schlicht Weiß': 'Plain white',
    'Schlicht Weiß (#FFFFFF)': 'Plain white (#FFFFFF)',
    'Hintergrund: Schlicht Weiß': 'Background: plain white',
    'Frost Glow': 'Frost Glow',
    'Frost Glow (Sanfter Verlauf)': 'Frost Glow (a soft gradient)',
    'Hintergrund: Frost Glow': 'Background: Frost Glow',
    'Frost Dots': 'Frost Dots',
    'Frost Dots (Punkte-Muster)': 'Frost Dots (a pattern of dots)',
    'Schiefer Dots': 'Slate Dots',
    'Schiefer Dots (Graues Raster)': 'Slate Dots (a grey grid)',
    'Viridian Glow': 'Viridian Glow',
    'Viridian Glow (Grünlicher Verlauf)': 'Viridian Glow (a greenish gradient)',

    /* JSON aus dem Sprachmodell */
    'JSON einfügen': 'Paste JSON',
    'JSON einfügen, z. B. aus einem Sprachmodell': 'Paste JSON, for example from a language model',
    'Antwort deines LLM komplett hineinkopieren – Codeblock-Markierungen und Begleittext werden automatisch entfernt':
        'Paste the whole answer from your language model – code fences and any surrounding text are stripped out automatically',

    /* Beispielinhalt beim ersten Start */
    'Strategische Initiativen 2026/2027': 'Strategic initiatives 2026/2027'
};
