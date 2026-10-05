/* Diagramm · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Zahlen eintragen, Diagramm herausbekommen — als Bild für Folien, Berichte oder E-Mails.',
        schritte: [
            'Oben die <b>Diagrammart</b> wählen.',
            'Unten in der Tabelle Beschriftungen und Zahlen eintragen. Das Diagramm folgt sofort.',
            '<b>Kopieren</b> legt das Bild in die Zwischenablage, <b>PNG speichern</b> als Datei.'
        ],
        tipps: [
            'Aus Excel geht es schneller: Bereich kopieren und über <b>Aus Excel einfügen</b> hineingeben.',
            'Der Haken <b>Tabelle ins Bild</b> stellt die Zahlen mit unter das Diagramm.',
            'Leere Felder sind Lücken, keine Nullen: im Balken fehlt der Balken, die Linie bricht auf.'
        ]
    },
    en: {
        kurz: 'Put numbers in, get a chart out — as a picture for slides, reports or emails.',
        schritte: [
            'Pick the <b>chart type</b> at the top.',
            'Enter labels and numbers in the table below. The chart follows at once.',
            '<b>Copy</b> puts the picture on the clipboard, <b>Save PNG</b> into a file.'
        ],
        tipps: [
            'From Excel it is quicker: copy the range and bring it in with <b>Paste from Excel</b>.',
            'The tick <b>Table in the picture</b> puts the numbers underneath the chart.',
            'Empty fields are gaps, not zeros: the bar is missing, the line breaks.'
        ]
    }
};

const PO_WB = {
    'Diagramm · PocketOps': 'Chart · PocketOps',
    'Diagramm': 'Chart',
    'Zahlen zum Bild': 'Numbers into a picture',
    'Diagrammart': 'Chart type',
    'Diagrammart wählen': 'Choose a chart type',
    'Daten': 'Data',
    'Beschriftung': 'Label',
    'Überschrift': 'Title',
    'Einheit': 'Unit',
    'PNG speichern': 'Save PNG',
    'Tabelle ins Bild': 'Table in the picture',
    'Werte am Diagramm anschreiben': 'Write the values on the chart',
    'Hilfslinien zeigen': 'Show grid lines',
    '+ Zeile': '+ Row',
    '+ Reihe': '+ Series',
    'Zeile entfernen': 'Remove row',
    'Reihe entfernen': 'Remove series',
    'Aus Excel einfügen': 'Paste from Excel',
    'Übernehmen': 'Use this',
    'Zahlen stehen in der Tabelle darunter': 'The numbers are in the table below',
    'Bild: {} × {} Punkte': 'Picture: {} × {} pixels',
    'Bild: {} × {} Punkte · mit Tabelle': 'Picture: {} × {} pixels · with table',

    /* Diagrammarten */
    'Balken': 'Bars',
    'Balken liegend': 'Bars across',
    'Gestapelt': 'Stacked',
    'Linie': 'Line',
    'Fläche': 'Area',
    'Torte': 'Pie',
    'Ring': 'Ring',
    'Werte nebeneinander vergleichen': 'Compare values side by side',
    'Platz für lange Beschriftungen': 'Room for long labels',
    'Anteile an einer Summe': 'Parts of a total',
    'Verlauf über die Zeit': 'Change over time',
    'Verlauf mit Gewicht': 'Change, with weight',
    'Anteile am Ganzen': 'Shares of the whole',
    'Anteile, Summe in der Mitte': 'Shares, total in the middle',

    /* Erklärungen zur gewählten Art */
    'Balken vergleichen Größen. Sie beginnen immer bei Null — sonst täuscht die Länge.':
        'Bars compare sizes. They always start at zero — otherwise the length deceives.',
    'Dasselbe wie Balken, nur quer. Die richtige Wahl, wenn die Beschriftungen lang sind.':
        'The same as bars, but sideways. The right choice when the labels are long.',
    'Zeigt die Summe und woraus sie besteht. Einzelne Teile lassen sich darin schlecht vergleichen — dafür lieber Balken nebeneinander.':
        'Shows the total and what it is made of. Single parts are hard to compare in it — use bars side by side for that.',
    'Für Verläufe. Die Achse beginnt hier nicht zwingend bei Null, damit kleine Bewegungen sichtbar bleiben.':
        'For movement over time. The axis need not start at zero here, so small changes stay visible.',
    'Eine Linie mit Füllung. Bei mehreren Reihen liegen die Flächen übereinander — ab drei wird es unübersichtlich.':
        'A line with a fill. With several series the areas overlap — beyond three it gets muddled.',
    'Nur sinnvoll, wenn die Teile ein Ganzes ergeben, und nur bei wenigen Teilen. Verwendet die erste Reihe; Werte bis Null bleiben außen vor. Ab dem achten Stück wird der Rest zu „Übrige" zusammengefasst.':
        'Only worth it when the parts add up to a whole, and only with few parts. Uses the first series; values of zero or less are left out. From the eighth slice onwards the rest is gathered into "Other".',
    'Wie die Torte, mit der Summe in der Mitte. Verwendet die erste Reihe; Werte bis Null bleiben außen vor. Ab dem achten Stück wird der Rest zu „Übrige" zusammengefasst.':
        'Like the pie, with the total in the middle. Uses the first series; values of zero or less are left out. From the eighth slice onwards the rest is gathered into "Other".',

    /* Hinweise unter der Tabelle */
    'Leer gelassene Felder sind Lücken, keine Nullen: im Balken fehlt der Balken, in der Linie bricht sie auf. Komma oder Punkt als Dezimaltrennung — beides wird verstanden.':
        'Empty fields are gaps, not zeros: the bar is missing, the line breaks. Comma or point as the decimal mark — both are understood.',
    'Torte und Ring zeigen die erste Reihe . Die weiteren bleiben erhalten und kommen bei jeder anderen Art wieder zum Vorschein.':
        'Pie and ring show the first series . The others are kept and come back with any other chart type.',
    'Acht Reihen sind die Grenze. Mehr Farben lassen sich nicht mehr sicher unterscheiden; dann besser zwei Diagramme.':
        'Eight series is the limit. Beyond that the colours can no longer be told apart for certain; better to use two charts.',
    'Die {} größten Stücke stehen einzeln, der Rest als {} .': 'The {} largest slices stand on their own, the rest as {} .',

    /* Einfügen aus Excel */
    'Bereich in Excel markieren, kopieren, hier einfügen. Die erste Spalte wird zur Beschriftung; steht in der ersten Zeile Text, werden daraus die Namen der Reihen.':
        'Select the range in Excel, copy it, paste it here. The first column becomes the labels; if the first row holds text, it becomes the names of the series.',
    'Erste Zeile enthält die Namen der Reihen': 'First row holds the names of the series',
    'Der Haken wird geraten. Stehen in der ersten Zeile Jahreszahlen, ist das nicht eindeutig — dann hier nachsehen.':
        'The tick is a guess. If the first row holds years it is not clear-cut — so check it here.',
    'Darin stecken keine zwei Spalten. Beschriftung links, Werte rechts.':
        'There are no two columns in that. Labels on the left, values on the right.',
    'Außer der Kopfzeile stand nichts darin.': 'There was nothing in it apart from the header row.',
    'In den Spalten rechts stand keine Zahl.': 'There was no number in the columns on the right.',
    'Übernommen: {} Zeilen · Reihen: {}': 'Taken over: {} rows · series: {}',
    'Übernommen: {} Zeilen · Reihen: {} — mehr war zu viel und blieb draußen':
        'Taken over: {} rows · series: {} — the rest was too much and stayed out',
    'Mehr als {} Zeilen nimmt das Werkzeug nicht.': 'The tool does not take more than {} rows.',
    'Acht Reihen sind die Grenze — mehr Farben lassen sich nicht sicher unterscheiden.':
        'Eight series is the limit — beyond that the colours cannot be told apart for certain.',

    /* Meldungen */
    'Es ist noch nichts eingetragen.': 'Nothing has been entered yet.',
    'Das Bild ließ sich nicht erzeugen.': 'The picture could not be produced.',
    'Kopiert · {} × {} — mit Strg+V einfügen': 'Copied · {} × {} — paste with Ctrl+V',
    'Kopiert · {} × {} mit Tabelle — mit Strg+V einfügen': 'Copied · {} × {} with table — paste with Ctrl+V',
    'Das Kopieren hat der Browser abgelehnt — das Bild wurde stattdessen gespeichert.':
        'The browser refused to copy — the picture was saved instead.',
    'Gespeichert · {} × {}': 'Saved · {} × {}',
    'Gespeichert · {} × {} mit Tabelle': 'Saved · {} × {} with table',
    'Diagramm gespeichert': 'Chart saved',
    'Die Datei enthält kein Diagramm.': 'This file does not contain a chart.',
    'Geöffnet: {} Zeilen, {} Reihen': 'Opened: {} rows, {} series',
    'Geöffnet: {} Zeilen, {} Reihe': 'Opened: {} rows, {} series',
    'Beschriftungen, Reihen und alle Werte werden gelöscht. Das lässt sich nicht rückgängig machen.':
        'Labels, series and all values will be deleted. This cannot be undone.',
    'Diagramm zurücksetzen': 'Reset the chart',
    'Diagramm zurückgesetzt': 'Chart reset',
    'Die Zeile {} und ihre Werte werden gelöscht.': 'Row {} and its values will be deleted.',
    'Die Reihe „{}" und alle ihre Werte werden gelöscht.': 'The series "{}" and all its values will be deleted.',
    'Zeile entfernen': 'Remove row',

    /* Auf der Leinwand gezeichnet */
    'Werte in die Tabelle eintragen — das Diagramm folgt sofort.': 'Enter values in the table — the chart follows at once.',
    'Für Torte und Ring braucht es Werte über Null.': 'Pie and ring need values above zero.',
    'Summe': 'Total',
    'BESCHRIFTUNG': 'LABEL',
    'Übrige ({} Zeilen)': 'Other ({} rows)',

    /* Felder und Vorlesehilfen */
    'Zeile {}': 'Row {}',
    'Beschriftung Zeile {}': 'Label for row {}',
    'Name der Reihe {}': 'Name of series {}',
    '{} bei {}': '{} at {}',
    'Diagramm der eingegebenen Werte': 'Chart of the values entered',
    'z. B. Umsatz je Quartal': 'e.g. revenue per quarter',
    'z. B. €, %, Stück': 'e.g. €, %, units',
    'Ohne Namen': 'Unnamed',
    '{} — {}, {} Reihen, {} Zeilen. Die Werte stehen in der Tabelle darunter.':
        '{} — {}, {} series, {} rows. The values are in the table below.',
    '{} — {}, {} Reihe, {} Zeilen. Die Werte stehen in der Tabelle darunter.':
        '{} — {}, {} series, {} rows. The values are in the table below.'
};
