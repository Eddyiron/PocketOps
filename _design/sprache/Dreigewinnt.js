/* Drei gewinnt · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Drei Zeichen in einer Reihe — waagrecht, senkrecht oder schräg. Du spielst ✕, der Rechner ◯.',
        schritte: [
            'Auf ein freies Feld klicken, oder die Ziffer <b>1</b> bis <b>9</b> tippen (angeordnet wie der Ziffernblock).',
            'Der Rechner antwortet nach einem Augenblick von selbst.',
            'Nach der Runde startet <b>Neues Spiel</b> die nächste. Wer anfängt, wechselt dabei.'
        ],
        tipps: [
            'Unter <b>Stärke</b> steht, wie gut der Gegner spielt. <b>Unschlagbar</b> rechnet bis zum Ende der Partie — dagegen ist kein Sieg möglich, nur ein Remis.',
            'Der Zähler rechts zählt mit, bis du ihn zurücksetzt.'
        ]
    },
    en: {
        kurz: 'Three marks in a row — across, down or diagonally. You play ✕, the computer plays ◯.',
        schritte: [
            'Click an empty square, or press <b>1</b> to <b>9</b> (laid out like the number pad).',
            'The computer answers by itself after a moment.',
            'When the round is over, <b>New game</b> starts the next one. Who goes first alternates.'
        ],
        tipps: [
            '<b>Strength</b> sets how well the opponent plays. <b>Unbeatable</b> calculates to the end of the game — you cannot win against it, only draw.',
            'The counters on the right keep going until you reset them.'
        ]
    }
};

const PO_WB = {
    /* Kopf und Gerüst */
    'Drei gewinnt · PocketOps': 'Tic-tac-toe · PocketOps',
    'Drei gewinnt': 'Tic-tac-toe',
    'Neues Spiel': 'New game',
    'Brett': 'Board',
    'Stand': 'Score',
    'Stärke': 'Strength',
    'Siege': 'Wins',
    'Remis': 'Draws',
    'Pleiten': 'Losses',

    /* Stärke */
    'Leicht — setzt nach Lust und Laune': 'Easy — plays as the mood takes it',
    'Mittel — nimmt Siege, wehrt Niederlagen ab': 'Medium — takes wins, blocks losses',
    'Unschlagbar — rechnet bis zum Ende': 'Unbeatable — calculates to the end',
    'Setzt meist blind daneben. Zum Aufwärmen.': 'Mostly plays blind. Good for warming up.',
    'Sieht den nächsten Zug, aber nicht den übernächsten.': 'Sees the next move, but not the one after.',
    'Hier ist das Remis der Sieg — mehr gibt die Stellung nicht her.': 'Here a draw is the win — the position gives no more.',
    'Stärke: {}': 'Strength: {}',

    /* Lage und Meldungen */
    'Du bist am Zug.': 'Your turn.',
    'Feld anklicken oder Ziffer tippen': 'Click a square or press a number',
    'Der Rechner überlegt …': 'The computer is thinking …',
    'Du hast gewonnen.': 'You won.',
    'Der Rechner hat gewonnen.': 'The computer won.',
    'Unentschieden.': 'A draw.',
    'Gewonnen.': 'You won.',
    'Verloren.': 'You lost.',
    'Nächste Runde beginnt du': 'You start the next round',
    'Nächste Runde beginnt der Rechner': 'The computer starts the next round',
    'Du hast begonnen': 'You went first',
    'Der Rechner hat begonnen': 'The computer went first',
    'Runde vorbei': 'Round over',
    'Siege, Remis und Pleiten werden auf null gesetzt.': 'Wins, draws and losses are set back to zero.',

    /* Hinweiskasten — der Satz zerfällt an den fetten Stellen in Stücke */
    'Du bist': 'You are',
    ', der Rechner ist': ', the computer is',
    '. Wer anfängt, wechselt nach jeder Runde. Die Tasten': '. Who goes first alternates each round. The keys',
    'bis': 'to',
    'setzen wie auf dem Ziffernblock.': 'place a mark, laid out like the number pad.',

    /* Vorlesehilfen */
    'Spielfeld, drei mal drei': 'Board, three by three',
    'Feld {}, frei': 'Square {}, empty',
    'Feld {}, deins': 'Square {}, yours',
    'Feld {}, Rechner': 'Square {}, computer'
};
