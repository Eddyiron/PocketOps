/* Vier gewinnt · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Steine fallen in sieben Spalten. Wer zuerst vier in einer Reihe hat — waagrecht, senkrecht oder schräg —, gewinnt.',
        schritte: [
            'Auf eine Spalte klicken oder die Ziffer <b>1</b> bis <b>7</b> tippen. Der Stein fällt nach unten.',
            'Der Rechner wirft gleich darauf seinen Stein ein.',
            'Nach der Runde startet <b>Neues Spiel</b> die nächste. Wer anfängt, wechselt dabei.'
        ],
        tipps: [
            'Die Mitte ist mehr wert als der Rand: von dort gehen die meisten Viererreihen aus.',
            'Unter <b>Stärke</b> stellst du ein, wie weit der Gegner vorausrechnet.'
        ]
    },
    en: {
        kurz: 'Discs drop into seven columns. First to get four in a row — across, down or diagonally — wins.',
        schritte: [
            'Click a column or press <b>1</b> to <b>7</b>. The disc falls to the bottom.',
            'The computer drops its own disc right after.',
            'When the round is over, <b>New game</b> starts the next one. Who goes first alternates.'
        ],
        tipps: [
            'The middle is worth more than the edge: most rows of four run through it.',
            '<b>Strength</b> sets how far ahead the opponent calculates.'
        ]
    }
};

const PO_WB = {
    'Vier gewinnt · PocketOps': 'Connect four · PocketOps',
    'Vier gewinnt': 'Connect four',
    'Neues Spiel': 'New game',
    'Brett': 'Board',
    'Stand': 'Score',
    'Stärke': 'Strength',
    'Siege': 'Wins',
    'Remis': 'Draws',
    'Pleiten': 'Losses',

    'Leicht — sieht nur den eigenen Zug': 'Easy — sees only its own move',
    'Mittel — denkt drei Züge weit': 'Medium — thinks three moves ahead',
    'Schwer — denkt fünf Züge weit': 'Hard — thinks five moves ahead',
    'Nimmt, was gerade gut aussieht. Patzt gern.': 'Takes whatever looks good right now. Blunders readily.',
    'Baut eigene Drohungen und sieht deine kommen.': 'Builds its own threats and sees yours coming.',
    'Stellt Fallen über mehrere Züge. Gewinne sind verdient.': 'Sets traps over several moves. A win here is earned.',
    'Stärke: {}': 'Strength: {}',

    'Du bist am Zug.': 'Your turn.',
    'Spalte anklicken oder Ziffer tippen': 'Click a column or press a number',
    'Der Rechner überlegt …': 'The computer is thinking …',
    'Du hast gewonnen.': 'You won.',
    'Der Rechner hat gewonnen.': 'The computer won.',
    'Unentschieden.': 'A draw.',
    'Vier in einer Reihe. Gewonnen.': 'Four in a row. You won.',
    'Der Rechner hat vier in einer Reihe.': 'The computer has four in a row.',
    'Brett voll — unentschieden.': 'Board full — a draw.',
    'Nächste Runde beginnt du': 'You start the next round',
    'Nächste Runde beginnt der Rechner': 'The computer starts the next round',
    'Du hast begonnen': 'You went first',
    'Der Rechner hat begonnen': 'The computer went first',
    'Runde vorbei': 'Round over',
    'Siege, Remis und Pleiten werden auf null gesetzt.': 'Wins, draws and losses are set back to zero.',

    /* Hinweiskasten in Stücken */
    'Du bist': 'You are',
    'grün': 'green',
    ', der Rechner': ', the computer is',
    'rot': 'red',
    '. Spalte anklicken oder': '. Click a column or press',
    'bis': 'to',
    'tippen. Wer anfängt, wechselt nach jeder Runde.': '. Who goes first alternates each round.',

    /* Vorlesehilfen */
    'Spielfeld, sieben Spalten zu sechs Feldern': 'Board, seven columns of six',
    'Spalte {} einwerfen': 'Drop into column {}',
    'Spalte {}, voll': 'Column {}, full'
};
