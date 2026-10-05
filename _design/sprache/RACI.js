/* RACI-Matrix · Anleitung und Wörterbuch */

const PO_HILFE = {
    de: {
        kurz: 'Wer macht was? Je Aufgabe und Rolle ein Buchstabe: R, A, C oder I.',
        schritte: [
            'Oben eine <b>Aufgabe</b> und eine <b>Rolle</b> anlegen.',
            'In der Tabelle die Felder setzen: R macht es, A verantwortet es, C wird gefragt, I wird unterrichtet.',
            'Je Aufgabe sollte genau ein <b>A</b> stehen — sonst ist die Verantwortung unklar.'
        ],
        tipps: [
            'Die Legende unter der Tabelle erklärt die vier Buchstaben.',
            '<b>PDF exportieren</b> gibt die Matrix für die Besprechung aus.'
        ]
    },
    en: {
        kurz: 'Who does what? One letter per task and role: R, A, C or I.',
        schritte: [
            'Add a <b>task</b> and a <b>role</b> at the top.',
            'Fill the cells: R does it, A answers for it, C is consulted, I is informed.',
            'Each task should carry exactly one <b>A</b> — otherwise nobody really owns it.'
        ],
        tipps: [
            'The key below the table explains the four letters.',
            '<b>Export PDF</b> produces the matrix for the meeting.'
        ]
    }
};

const PO_WB = {
    'RACI-Matrix · PocketOps': 'RACI matrix · PocketOps',
    'RACI-Matrix': 'RACI matrix',
    'Verantwortung je Aufgabe': 'Responsibility per task',
    'Matrix': 'Matrix',
    'Aufgabe': 'Task',
    'Rolle': 'Role',
    'Legende': 'Key',
    'Responsible': 'Responsible',
    'Accountable': 'Accountable',
    'Consulted': 'Consulted',
    'Informed': 'Informed',
    '— führt die Aufgabe aus': '— carries the task out',
    '— trägt die Verantwortung, genau einmal je Aufgabe': '— answers for it, exactly once per task',
    '— wird vorher gefragt': '— is consulted beforehand',
    '— wird nachher unterrichtet': '— is informed afterwards',
    'Noch nichts erfasst.': 'Nothing entered yet.',
    'Lege oben eine Aufgabe und eine Rolle an.': 'Add a task and a role above.',
    '{} Aufgaben · {} Rollen': '{} tasks · {} roles',
    'PDF exportieren': 'Export PDF',
    'z. B. Anforderungen abstimmen': 'e.g. agree the requirements',
    'z. B. Fachbereich': 'e.g. the department'
};
