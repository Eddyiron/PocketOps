/* PDF-Werkzeuge · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Sechs Handgriffe an PDF-Dateien: verkleinern, zusammenfügen, aufteilen, drehen, Bilder umwandeln, Wasserzeichen setzen.',
        schritte: [
            'Oben das Werkzeug wählen, das du brauchst.',
            'Datei hineinziehen oder über die Fläche auswählen.',
            'Einstellungen setzen und die Schaltfläche darunter drücken — die fertige Datei wird heruntergeladen.'
        ],
        tipps: [
            'Alles rechnet in diesem Browser. Keine Datei wird irgendwohin hochgeladen, und es gibt keine Größenbegrenzung.',
            'Beim Verkleinern gilt: <b>Standard</b> für den E-Mail-Versand, <b>Stark</b> nur, wenn es wirklich klein werden muss.',
            '<b>Zurück zur Übersicht</b> führt zu den anderen Werkzeugen.'
        ]
    },
    en: {
        kurz: 'Six things you can do to PDF files: shrink, merge, split, rotate, turn images into a PDF, add a watermark.',
        schritte: [
            'Pick the tool you need at the top.',
            'Drag a file in, or click the area to choose one.',
            'Set the options and press the button below — the finished file is downloaded.'
        ],
        tipps: [
            'Everything is worked out inside this browser. No file is uploaded anywhere, and there is no size limit.',
            'When shrinking: <b>Standard</b> for sending by email, <b>Strong</b> only when it really has to be small.',
            '<b>Back to the overview</b> takes you to the other tools.'
        ]
    }
};

const PO_WB = {
    'PDF-Werkzeuge · PocketOps': 'PDF tools · PocketOps',
    'PDF-Werkzeuge': 'PDF tools',
    'PDF-Werkzeuge direkt im Browser': 'PDF tools, right in the browser',
    'Alles im Browser, nichts im Netz': 'All in the browser, nothing on the net',
    'Alle Werkzeuge': 'All tools',
    'Zurück zur Übersicht': 'Back to the overview',
    'Alles rechnet auf diesem Rechner. Die Dateien verlassen den Browser nicht.':
        'Everything is worked out on this computer. The files never leave the browser.',
    'PocketOps · PDF-Werkzeuge — alle Dateien bleiben auf diesem Rechner, es wird nichts hochgeladen.':
        'PocketOps · PDF tools — every file stays on this computer, nothing is uploaded.',
    '🔒 Keine Übertragung ins Netz · keine Begrenzung der Dateigröße':
        '🔒 Nothing sent over the net · no limit on file size',

    /* Die sechs Werkzeuge */
    '🗜️ PDF Verkleinern (Komprimieren)': '🗜️ Shrink a PDF (compress)',
    'PDF Verkleinern': 'Shrink a PDF',
    'PDF Verkleinern & Speichern': 'Shrink and save the PDF',
    'Reduziere die Dateigröße durch Bildkomprimierung und Resampling für E-Mail-Versand.':
        'Cuts the file size by compressing and resampling the images, so it fits into an email.',
    '📑 PDFs Zusammenfügen': '📑 Merge PDFs',
    'PDFs Zusammenfügen': 'Merge PDFs',
    'PDFs Zusammenführen': 'Merge the PDFs',
    'Kombiniere mehrere PDF-Dateien in ein einziges strukturiertes Gesamtdokument.':
        'Combines several PDF files into one single ordered document.',
    '✂️ PDF Splitten & Extrahieren': '✂️ Split a PDF or pull pages out',
    'PDF Splitten': 'Split a PDF',
    'PDF Aufteilen & Herunterladen': 'Split and download',
    'Extrahiere bestimmte Seiten oder zerlege ein langes Dokument in einzelne Dateien.':
        'Pull out particular pages, or break a long document into single files.',
    '🔄 Seiten Drehen': '🔄 Rotate pages',
    'Seiten Drehen': 'Rotate pages',
    'Rotiere falsch ausgerichtete Seiten direkt in einer visuellen Seitenvorschau.':
        'Turn pages that face the wrong way, right in a preview of the pages.',
    'Klicke auf eine Seite, um sie um 90° zu drehen.': 'Click a page to turn it by 90°.',
    'Geändertes PDF Speichern': 'Save the changed PDF',
    '🖼️ Bilder in PDF Umwandeln': '🖼️ Turn images into a PDF',
    'Bilder zu PDF': 'Images to PDF',
    'PDF aus Bildern Erstellen': 'Make a PDF from the images',
    'Konvertiere Scans oder Fotos (PNG, JPG) direkt in ein sauberes PDF-Dokument.':
        'Turns scans or photos (PNG, JPG) straight into a clean PDF document.',
    '🏷️ Wasserzeichen Hinzufügen': '🏷️ Add a watermark',
    'Wasserzeichen': 'Watermark',
    'Wasserzeichen Anwenden': 'Apply the watermark',
    'Wasserzeichen-Text': 'Watermark text',
    'Füge vertrauliche Hinweise wie "ENTWURF", "VERTRAULICH" oder Stempel hinzu.':
        'Add a note such as "DRAFT" or "CONFIDENTIAL", or a stamp.',

    /* Dateiwahl und Einstellungen */
    'PDF-Datei auswählen': 'Choose a PDF file',
    'PDF-Datei hierher ziehen oder': 'Drag a PDF file here, or',
    'PDF-Datei zum Aufteilen hierher ziehen': 'Drag the PDF you want to split here',
    'Mehrere PDF-Dateien hierher ziehen oder': 'Drag several PDF files here, or',
    'Bilder (JPG, PNG) hierher ziehen': 'Drag images (JPG, PNG) here',
    'Klicken zum Auswählen': 'click to choose',
    'Ausgewählte Dateien': 'Chosen files',
    'Komprimierungsstufe': 'How hard to compress',
    'Standard (Gute Balance aus Qualität & Größe)': 'Standard (a good balance of quality and size)',
    'Stark (Kleine Datei, geringere Auflösung)': 'Strong (small file, lower resolution)',
    'Bildauflösung:': 'Image resolution:',
    'JPEG-Qualität:': 'JPEG quality:',
    'Splitting-Modus': 'How to split',
    'Seitenbereich auswählen': 'Choose a range of pages',
    'Seitenbereich (z. B. 1-3, 5, 8-10)': 'Page range (e.g. 1-3, 5, 8-10)',
    'Jede Seite als eigene PDF-Datei': 'Every page as its own PDF file',
    'z. B. 1-4, 7': 'e.g. 1-4, 7',
    'Schriftgröße': 'Font size',
    'Transparenz (0.1 - 1.0)': 'Transparency (0.1 – 1.0)'
};
