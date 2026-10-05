/* Galgenmännchen · Anleitung, englische Wörterliste und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Ein Wort erraten, Buchstabe für Buchstabe. Elf Fehlversuche hast du frei — danach hängt das Männchen.',
        schritte: [
            'Über dem Wort steht die Sachgruppe — das ist der einzige Hinweis.',
            'Buchstaben anklicken oder tippen. Treffer erscheinen im Wort, Fehler zeichnen am Galgen weiter.',
            '<b>Neues Wort</b> startet die nächste Runde, Enter tut dasselbe.'
        ],
        tipps: [
            'Mit den Selbstlauten anfangen — E, N, S und R kommen im Deutschen am häufigsten vor.',
            '<b>Auflösen</b> zeigt das Wort, zählt die Runde aber als verloren.',
            'Die <b>Serie</b> zählt, wie viele Runden du hintereinander geschafft hast.'
        ]
    },
    en: {
        kurz: 'Guess a word, letter by letter. You have eleven wrong guesses — after that the figure hangs.',
        schritte: [
            'The subject above the word is the only clue you get.',
            'Click or type letters. Hits appear in the word, misses draw another part of the gallows.',
            '<b>New word</b> starts the next round, and so does Enter.'
        ],
        tipps: [
            'Start with the vowels — E, T, A and R turn up most often in English.',
            '<b>Reveal</b> shows the word but counts the round as lost.',
            'The <b>streak</b> counts how many rounds you have managed in a row.'
        ]
    }
};

/* Die englische Wörterliste. Nur A bis Z, keine Bindestriche, keine
   Leerzeichen — sonst griffe die Tastatur ins Leere. */
const PO_WOERTER_EN = [
    ['ELEPHANT', 'Animal'], ['PENGUIN', 'Animal'], ['SQUIRREL', 'Animal'],
    ['BUTTERFLY', 'Animal'], ['CROCODILE', 'Animal'], ['HEDGEHOG', 'Animal'],
    ['WALRUS', 'Animal'], ['GIRAFFE', 'Animal'], ['OTTER', 'Animal'],

    ['SPAGHETTI', 'Food'], ['PUMPKIN', 'Food'], ['CHOCOLATE', 'Food'],
    ['STRAWBERRY', 'Food'], ['BAGUETTE', 'Food'], ['HONEY', 'Food'],
    ['PANCAKE', 'Food'], ['PORRIDGE', 'Food'], ['SANDWICH', 'Food'],

    ['MEETING', 'Office'], ['STAPLER', 'Office'], ['MINUTES', 'Office'],
    ['BINDER', 'Office'], ['PRINTER', 'Office'], ['DEADLINE', 'Office'],
    ['INVOICE', 'Office'], ['WHITEBOARD', 'Office'], ['SCHEDULE', 'Office'],

    ['THUNDERSTORM', 'Nature'], ['WATERFALL', 'Nature'], ['GLACIER', 'Nature'],
    ['RAINBOW', 'Nature'], ['AVALANCHE', 'Nature'], ['SUNFLOWER', 'Nature'],
    ['MIST', 'Nature'], ['VOLCANO', 'Nature'], ['MOSS', 'Nature'],

    ['KEYBOARD', 'Technology'], ['SCREWDRIVER', 'Technology'], ['COGWHEEL', 'Technology'],
    ['BATTERY', 'Technology'], ['BINOCULARS', 'Technology'], ['CIRCUIT', 'Technology'],
    ['CABLE', 'Technology'], ['SATELLITE', 'Technology'], ['ENGINE', 'Technology'],

    ['TRUMPET', 'Music'], ['DRUMKIT', 'Music'], ['VIOLIN', 'Music'],
    ['SHEETMUSIC', 'Music'], ['ORCHESTRA', 'Music'], ['PIANO', 'Music'],
    ['HARMONICA', 'Music'], ['CHOIR', 'Music'], ['BATON', 'Music'],

    ['HANDBALL', 'Sport'], ['CLIMBING', 'Sport'], ['SKATES', 'Sport'],
    ['GYMNASIUM', 'Sport'], ['MARATHON', 'Sport'], ['SAILBOAT', 'Sport'],
    ['GOALKEEPER', 'Sport'], ['ROWING', 'Sport'], ['SKIJUMP', 'Sport'],

    ['COACH', 'Travel'], ['SUITCASE', 'Travel'], ['PLATFORM', 'Travel'],
    ['ROADMAP', 'Travel'], ['AIRPORT', 'Travel'], ['FOOTPATH', 'Travel'],
    ['FERRY', 'Travel'], ['PASSPORT', 'Travel'], ['CAMPSITE', 'Travel'],

    ['VACUUM', 'Household'], ['LAUNDRY', 'Household'], ['IRON', 'Household'],
    ['TEAPOT', 'Household'], ['BROOM', 'Household'], ['FRIDGE', 'Household'],
    ['TOWEL', 'Household'], ['DISHWASHER', 'Household'], ['CURTAIN', 'Household']
];

const PO_WB = {
    'Galgenmännchen · PocketOps': 'Hangman · PocketOps',
    'Galgenmännchen': 'Hangman',
    'Wort erraten': 'Guess the word',
    'Wort': 'Word',
    'Neues Wort': 'New word',
    'Auflösen': 'Reveal',
    'Stand': 'Score',
    'Geschafft': 'Guessed',
    'Verloren': 'Lost',
    'Serie': 'Streak',
    'Schon geraten': 'Guessed so far',
    'Noch kein Buchstabe geraten.': 'No letter guessed yet.',
    'Drin:': 'In the word:',
    'Daneben:': 'Wrong:',
    'Rate einen Buchstaben.': 'Guess a letter.',
    '{} von {} Fehlern': '{} of {} mistakes',
    'Noch {} Fehlversuche': '{} wrong guesses left',
    'Noch {} Fehlversuch': '{} wrong guess left',
    'Galgen mit {} von {} Teilen': 'Gallows with {} of {} parts',
    'Buchstabe {}': 'Letter {}',
    'Erraten: {}': 'Guessed it: {}',
    'Aufgehängt. Das Wort war: {}': 'Hanged. The word was: {}',
    'Das Wort war: {}': 'The word was: {}',
    'Das Wort war {} .': 'The word was {} .',
    'Erraten, mit {} Fehlern.': 'Guessed it, with {} mistakes.',
    'Erraten, mit {} Fehler.': 'Guessed it, with {} mistake.',
    'Enter oder „Neues Wort" für die nächste Runde': 'Enter or "New word" for the next round',
    'Das Wort wird aufgedeckt und als verloren gezählt.': 'The word will be revealed and the round counted as lost.',
    'Die Runde ist schon vorbei.': 'This round is already over.',
    'Gewonnene und verlorene Runden werden auf null gesetzt.': 'Rounds won and lost are set back to zero.',

    /* Der Hinweiskasten zerfällt an den fetten Stellen in Stücke */
    'Elf Fehlversuche, dann hängt das Männchen. Buchstaben lassen sich anklicken oder tippen,':
        'Eleven wrong guesses and the figure hangs. Letters can be clicked or typed —',
    'Ä Ö Ü': 'A to Z',
    'ebenso. Ein': 'only; there are no',
    'ß': 'accents',
    'gibt es nicht — die Wörter kommen ohne aus.': 'in the English words.'
};
