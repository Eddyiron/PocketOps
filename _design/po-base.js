/* ======================================================================
   POCKETOPS · GEMEINSAME BAUSTEINE
   Nachschlagefassung. Die Werkzeuge laden diese Datei nicht — jedes trägt
   den Block selbst, damit es als einzelne Datei läuft.

   poToast(text)                  kurzer Hinweis unten rechts
   poConfirm(frage, opt)          Rückfrage, liefert ein Versprechen
   poAsk(titel, felder)           kleine Eingabemaske statt prompt()
                                  Feld: { name, label, wert, typ, pflicht }
                                  typ 'date', 'number', 'color' kommen vom
                                  Browser; typ 'auswahl' braucht zusätzlich
                                  optionen: [{ wert, text }] und wird zur Liste
   poEsc(text)                    Text für HTML entschärfen
   poDownload(name, text, typ)    Datei zum Herunterladen anbieten
   poReadFile(input, fn)          gewählte Datei als Text lesen
   ====================================================================== */

function poEsc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let _poToastTimer = null;
function poToast(text, dauer = 2600) {
    let t = document.getElementById('po-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'po-toast';
        t.className = 'po-toast';
        document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.display = 'block';
    clearTimeout(_poToastTimer);
    _poToastTimer = setTimeout(() => { t.style.display = 'none'; }, dauer);
}

function _poModal(innerHtml, aufbau) {
    const back = document.createElement('div');
    back.className = 'po-backdrop';
    back.innerHTML = `<div class="po-dialog" role="dialog" aria-modal="true">${innerHtml}</div>`;
    document.body.appendChild(back);
    const schliessen = () => { document.removeEventListener('keydown', aufTaste); back.remove(); };
    const aufTaste = e => { if (e.key === 'Escape') { e.preventDefault(); back.__abbruch && back.__abbruch(); } };
    document.addEventListener('keydown', aufTaste);
    back.addEventListener('mousedown', e => { if (e.target === back) back.__abbruch && back.__abbruch(); });
    aufbau(back, schliessen);
    return back;
}

function poConfirm(frage, { titel = 'Bitte bestätigen', ja = 'Ja, weiter', nein = 'Abbrechen', gefahr = false } = {}) {
    return new Promise(res => {
        _poModal(`
            <div class="po-dialog-head">${poEsc(titel)}</div>
            <div class="po-dialog-body">${poEsc(frage)}</div>
            <div class="po-dialog-foot">
                <button class="po-btn" data-nein>${poEsc(nein)}</button>
                <button class="po-btn ${gefahr ? 'po-btn--primary' : 'po-btn--go'}" data-ja>${poEsc(ja)}</button>
            </div>`, (back, schliessen) => {
            const fertig = wert => { schliessen(); res(wert); };
            back.__abbruch = () => fertig(false);
            back.querySelector('[data-nein]').onclick = () => fertig(false);
            back.querySelector('[data-ja]').onclick = () => fertig(true);
            setTimeout(() => back.querySelector('[data-ja]').focus(), 30);
        });
    });
}

/* felder: [{ name, label, wert, typ: 'text'|'number', min, max, pflicht }]
   Ergebnis: Objekt mit den Werten, oder null bei Abbruch. */
function poAsk(titel, felder, { ok = 'Hinzufügen' } = {}) {
    return new Promise(res => {
        /* typ: 'auswahl' erwartet zusätzlich optionen: [{ wert, text }] und wird
           zur Liste. Alles andere geht als type an ein <input> — 'date', 'number'
           und 'color' kommen so vom Browser, ohne eigenes Zutun. */
        const html = felder.map((f, i) => {
            const feld = f.typ === 'auswahl'
                ? `<select class="po-select" id="po-f-${i}">`
                  + (f.optionen || []).map(o =>
                        `<option value="${poEsc(o.wert)}"${String(o.wert) === String(f.wert) ? ' selected' : ''}>${poEsc(o.text)}</option>`
                    ).join('')
                  + `</select>`
                : `<input class="po-input" id="po-f-${i}" type="${f.typ || 'text'}"
                       value="${poEsc(f.wert == null ? '' : f.wert)}"
                       ${f.min != null ? `min="${f.min}"` : ''} ${f.max != null ? `max="${f.max}"` : ''}
                       ${f.platzhalter ? `placeholder="${poEsc(f.platzhalter)}"` : ''}>`;
            return `
            <div style="margin-bottom:10px">
                <label class="po-label" for="po-f-${i}">${poEsc(f.label)}</label>
                ${feld}
            </div>`;
        }).join('');
        _poModal(`
            <div class="po-dialog-head">${poEsc(titel)}</div>
            <div class="po-dialog-body"><form id="po-ask-form">${html}</form></div>
            <div class="po-dialog-foot">
                <button class="po-btn" data-nein>Abbrechen</button>
                <button class="po-btn po-btn--go" data-ja>${poEsc(ok)}</button>
            </div>`, (back, schliessen) => {
            const fertig = wert => { schliessen(); res(wert); };
            back.__abbruch = () => fertig(null);
            back.querySelector('[data-nein]').onclick = () => fertig(null);
            const senden = () => {
                const out = {};
                let fehlt = null;
                felder.forEach((f, i) => {
                    const el = back.querySelector('#po-f-' + i);
                    let v = el.value.trim();
                    if (f.typ === 'number') v = v === '' ? null : Number(v);
                    if (f.pflicht !== false && (v === '' || v === null)) fehlt = fehlt || el;
                    out[f.name] = v;
                });
                if (fehlt) { fehlt.focus(); fehlt.style.borderColor = 'var(--po-bad)'; return; }
                fertig(out);
            };
            back.querySelector('[data-ja]').onclick = senden;
            back.querySelector('#po-ask-form').onsubmit = e => { e.preventDefault(); senden(); };
            setTimeout(() => back.querySelector('#po-f-0') && back.querySelector('#po-f-0').focus(), 30);
        });
    });
}

function poDownload(name, inhalt, typ = 'application/json') {
    const blob = new Blob([inhalt], { type: typ });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

function poReadFile(input, fn) {
    const f = input.files && input.files[0];
    input.value = '';
    if (!f) return;
    const r = new FileReader();
    const melden = e => poToast('Die Datei lässt sich nicht lesen: ' + (e && e.message ? e.message : e), 4200);
    r.onerror = () => melden(new Error('Die Datei ließ sich nicht öffnen.'));
    r.onload = ev => {
        // Ein Rückruf mit async wirft nicht, er gibt ein abgelehntes Versprechen
        // zurück. Beides muss hier ankommen, sonst bleibt ein Fehler stumm.
        try {
            const p = fn(ev.target.result);
            if (p && typeof p.catch === 'function') p.catch(melden);
        } catch (e) { melden(e); }
    };
    r.readAsText(f);
}

/* Markenzeichen für die Kopfzeile — in jedem Werkzeug gleich */
const PO_MARK = '<span class="po-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5h16v8a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-8Z"/><path d="M8.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5"/><path d="M9.5 13.5h5"/></svg></span>';

/* ======================================================================
   POCKETOPS · ZWEISPRACHIGKEIT

   Die Werkzeuge sind auf Deutsch geschrieben — Beschriftungen, Hinweise,
   Meldungen, alles. Englisch entsteht nicht aus einem zweiten Satz
   Quelltext, sondern aus einem Wörterbuch: deutscher Satz → englischer
   Satz. Ein Beobachter schreibt um, was auf der Seite steht, und merkt
   sich am Knoten das Original — darum geht beim Zurückschalten nichts
   verloren, und am deutschen Quelltext ändert sich nichts.

   Je Werkzeug steht sein Wörterbuch in einem eigenen Block
   (PO-SPRACHE, Urfassung: _design/sprache/<Datei>.js) vor diesem hier.
   Gemeinsames — Kopfzeile, Dialoge, Meldungen aus dieser Datei — steht
   unten in PO_WB_BASIS.

   Platzhalter: '{}' steht für eine Stelle, die unverändert bleibt.
       '{} von {} Fehlern'  →  '{} of {} mistakes'

   Was nie übersetzt wird: was der Nutzer selbst geschrieben hat.
   Eingabefelder, Textflächen, alles unter contenteditable und alles
   unter data-po-roh bleibt unangetastet.
   ====================================================================== */

/* Gemeinsame Einträge. Gelten in jedem Werkzeug. */
const PO_WB_BASIS = {
    'Zur PocketOps-Übersicht': 'To the PocketOps overview',
    'Trinkgeld': 'Tip jar',
    'Speichern': 'Save',
    'Öffnen': 'Open',
    'Zurücksetzen': 'Reset',
    'Abbrechen': 'Cancel',
    'Ja, weiter': 'Yes, go ahead',
    'Ja, löschen': 'Yes, delete',
    'Ja, alles löschen': 'Yes, delete everything',
    'Ja, entfernen': 'Yes, remove',
    'Bitte bestätigen': 'Please confirm',
    'Hinzufügen': 'Add',
    'Drucken': 'Print',
    'Kopieren': 'Copy',
    'Anleitung': 'Help',
    'Sprache / Language': 'Sprache / Language',
    'Schließen': 'Close',
    'Die Datei lässt sich nicht lesen: {}': 'The file cannot be read: {}',
    'Die Datei ließ sich nicht öffnen.': 'The file could not be opened.',
    'Es ist noch nichts gezählt.': 'Nothing has been counted yet.',
    'Es ist nichts zu löschen.': 'There is nothing to delete.',
    'Zähler zurücksetzen': 'Reset counters',
    'Zähler zurückgesetzt': 'Counters reset',
    'Gegen den Rechner': 'Against the computer'
};

/* Text der Hilfe selbst — in beiden Sprachen, nicht über das Wörterbuch. */
const PO_HILFE_TEXTE = {
    de: {
        titel: 'Kurzanleitung',
        schritte: 'So geht es',
        tipps: 'Gut zu wissen',
        oertlich: 'Deine Arbeit bleibt auf diesem Rechner. Sie wird nirgendwohin geschickt.',
        oertlichMitNetz: 'Deine Arbeit bleibt auf diesem Rechner und wird nirgendwohin geschickt. Dieses Werkzeug lädt beim Öffnen allerdings eine Programmbibliothek nach, von: {}. Der fremde Server erfährt dabei deine IP-Adresse. Woran du arbeitest, verlässt den Rechner auch dann nicht.',
        sicherung: 'Sichern und Zurückholen',
        sicherungText: 'Mit <b>Speichern</b> legt das Werkzeug deine Arbeit als Datei neben sich — eine <b>.json</b>-Datei. Das ist nichts Gefährliches: eine Textdatei, die du mit dem Editor öffnen und lesen kannst. Mit <b>Öffnen</b> holst du sie zurück, in dieses oder in ein anderes Fenster.',
        sicherungWarum: 'Warum das wichtig ist: deine Arbeit liegt sonst nur im Browser. Räumt jemand den Browser auf, ist sie weg. Die gespeicherte Datei bleibt.',
        mehr: 'Ausführlich: Sichern &amp; Zurückholen',
        schluss: 'Verstanden'
    },
    en: {
        titel: 'Quick guide',
        schritte: 'How it works',
        tipps: 'Worth knowing',
        oertlich: 'Your work stays on this computer. It is not sent anywhere.',
        oertlichMitNetz: 'Your work stays on this computer and is not sent anywhere. This tool does fetch a code library when it opens, from: {}. That server learns your IP address. What you are working on still never leaves the machine.',
        sicherung: 'Saving and restoring',
        sicherungText: '<b>Save</b> puts your work into a file next to the tool — a <b>.json</b> file. Nothing dangerous about it: a text file you can open and read in any editor. <b>Open</b> brings it back, into this window or another one.',
        sicherungWarum: 'Why this matters: otherwise your work only lives inside the browser. If someone clears the browser, it is gone. The saved file stays.',
        mehr: 'In full: Backups &amp; restoring',
        schluss: 'Got it'
    }
};

let _poSpr = 'de';
try { if (localStorage.getItem('po_sprache') === 'en') _poSpr = 'en'; } catch (e) { /* ohne Speicher eben Deutsch */ }

const poSprache = () => _poSpr;

/* ---------- Wörterbuch ---------- */

const _poNormal = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const _poEscRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let _poExakt = null, _poMuster = null;

function _poWbBauen() {
    if (_poExakt) return;
    _poExakt = new Map();
    _poMuster = [];
    const quellen = [PO_WB_BASIS, (typeof PO_WB !== 'undefined' ? PO_WB : null)];
    for (const q of quellen) {
        if (!q) continue;
        for (const de of Object.keys(q)) {
            const en = q[de];
            if (!en) continue;
            if (de.indexOf('{}') >= 0) {
                const teile = _poNormal(de).split('{}');
                _poMuster.push({ re: new RegExp('^' + teile.map(_poEscRe).join('([\\s\\S]*?)') + '$'), en });
            } else {
                _poExakt.set(_poNormal(de), en);
            }
        }
    }
}

/* Was das Wörterbuch nicht kennt, wird hier gesammelt. Beim Pflegen einer
   Übersetzung zeigt poLuecken() im Browser, was noch fehlt. */
const _poLuecken = new Set();
function poLuecken() { return Array.from(_poLuecken).sort((a, b) => a.localeCompare(b, 'de')); }

/* Liefert die Übersetzung oder null, wenn das Wörterbuch nichts kennt. */
function _poNachschlagen(text) {
    _poWbBauen();
    const n = _poNormal(text);
    if (!n) return null;
    const treffer = _poExakt.get(n);
    if (treffer !== undefined) return treffer;
    for (const m of _poMuster) {
        const t = n.match(m.re);
        if (!t) continue;
        let i = 0;
        return m.en.replace(/\{\}/g, () => { i++; return t[i] === undefined ? '' : t[i]; });
    }
    if (_poLuecken.size < 2000) _poLuecken.add(n);
    return null;
}

/* Für Text, der nicht im Seitengerüst steht, sondern gezeichnet wird —
   auf einer Leinwand etwa. Gibt auf Deutsch den Text unverändert zurück. */
function poT(text) {
    if (_poSpr !== 'en') return text;
    const u = _poNachschlagen(text);
    return u === null ? text : u;
}

/* Die englische Fassung, unabhängig von der eingestellten Sprache. Gebraucht
   dort, wo beide Sprachen zugleich gelten müssen — etwa in einem Suchfeld,
   das auch nach dem Umschalten noch finden soll. */
function poEn(text) {
    const u = _poNachschlagen(text);
    return u === null ? text : u;
}

/* ---------- Die Seite umschreiben ---------- */

const _PO_ATTR = ['placeholder', 'title', 'aria-label', 'alt'];
const _PO_TABU = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, PRE: 1, CODE: 1, CANVAS: 1 };

function _poDarf(el) {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
        if (_PO_TABU[e.tagName]) return false;
        if (e.isContentEditable) return false;
        if (e.hasAttribute('data-po-roh')) return false;
        if (e.hasAttribute('data-po-nur')) return false;   // steht schon in seiner Sprache
    }
    return true;
}

/* Längere Texte — eine ganze Seite Erklärung etwa — zerfielen im Wörterbuch
   an jedem <b> in Stücke. Dafür gibt es den zweiten Weg: zwei Blöcke, einer
   je Sprache, ausgezeichnet mit data-po-nur="de" bzw. "en". Es wird immer
   nur einer gezeigt.
   Bewusst über style.display statt über hidden: eine Klasse mit display:flex
   gewänne sonst gegen hidden, und der Block stünde trotzdem da. */
function _poSprachbloecke() {
    document.querySelectorAll('[data-po-nur]').forEach(el => {
        el.style.display = (el.getAttribute('data-po-nur') === _poSpr) ? '' : 'none';
    });
}

function _poTextKnoten(k) {
    if (!k || !k.nodeValue || !k.nodeValue.trim()) return;
    if (k.nodeValue === k.__poEn) return;                 // steht schon auf Englisch
    if (!_poDarf(k.parentElement)) return;
    const neu = _poNachschlagen(k.nodeValue);
    if (neu === null) return;
    k.__poDe = k.nodeValue;
    k.nodeValue = k.nodeValue.match(/^\s*/)[0] + neu + k.nodeValue.match(/\s*$/)[0];
    k.__poEn = k.nodeValue;
}

function _poMerkmal(el, name) {
    if (!el || el.nodeType !== 1 || !el.hasAttribute(name)) return;
    if (!_poDarf(el)) return;
    const wert = el.getAttribute(name);
    el.__poAttrEn = el.__poAttrEn || {};
    el.__poAttrDe = el.__poAttrDe || {};
    if (wert === el.__poAttrEn[name]) return;
    const neu = _poNachschlagen(wert);
    if (neu === null) return;
    el.__poAttrDe[name] = wert;
    el.setAttribute(name, neu);
    el.__poAttrEn[name] = neu;
}

function _poAnwenden(wurzel) {
    if (_poSpr !== 'en' || !wurzel) return;
    if (wurzel.nodeType === 3) { _poTextKnoten(wurzel); return; }
    if (wurzel.nodeType !== 1) return;
    const lauf = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT);
    let k;
    while ((k = lauf.nextNode())) _poTextKnoten(k);
    const mit = [wurzel].concat(Array.from(wurzel.querySelectorAll('*')));
    for (const el of mit) for (const a of _PO_ATTR) if (el.hasAttribute && el.hasAttribute(a)) _poMerkmal(el, a);
}

function _poZurueck() {
    const lauf = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let k;
    while ((k = lauf.nextNode())) {
        if (k.__poDe !== undefined && k.nodeValue === k.__poEn) { k.nodeValue = k.__poDe; k.__poEn = undefined; }
    }
    for (const el of document.querySelectorAll('*')) {
        if (!el.__poAttrDe) continue;
        for (const a of Object.keys(el.__poAttrDe)) {
            if (el.getAttribute(a) === el.__poAttrEn[a]) el.setAttribute(a, el.__poAttrDe[a]);
        }
        el.__poAttrEn = {};
    }
}

let _poStill = false;
let _poBeob = null;

function _poBeobachten() {
    _poBeob = new MutationObserver(aenderungen => {
        if (_poStill || _poSpr !== 'en') return;
        _poStill = true;
        try {
            for (const a of aenderungen) {
                if (a.type === 'childList') a.addedNodes.forEach(n => {
                    _poAnwenden(n);
                    if (n.nodeType === 1 && n.querySelector && (n.hasAttribute('data-po-nur') || n.querySelector('[data-po-nur]'))) _poSprachbloecke();
                });
                else if (a.type === 'characterData') _poTextKnoten(a.target);
                else if (a.type === 'attributes') _poMerkmal(a.target, a.attributeName);
            }
        } finally {
            _poBeob.takeRecords();          // eigene Änderungen nicht noch einmal ansehen
            _poStill = false;
        }
    });
    _poBeob.observe(document.documentElement, {
        childList: true, subtree: true, characterData: true,
        attributes: true, attributeFilter: _PO_ATTR
    });
}

/* ---------- Umschalten ---------- */

function poSpracheSetzen(spr) {
    const neu = spr === 'en' ? 'en' : 'de';
    if (neu === _poSpr) return;
    _poSpr = neu;
    try { localStorage.setItem('po_sprache', neu); } catch (e) { /* dann eben nur für dieses Fenster */ }
    document.documentElement.lang = neu;
    /* Beide Fenster werden geschlossen statt übersetzt: ihr Inhalt steht als
       data-po-roh und geht am Wörterbuch vorbei. Beim nächsten Öffnen baut er
       sich in der neuen Sprache neu auf. Ohne das bliebe nach einem Wechsel
       bei offenem Fenster die alte Sprache stehen. */
    const hilfe = document.getElementById('po-hilfe-fenster');
    if (hilfe) hilfe.remove();
    const trinkgeld = document.getElementById('po-trinkgeld-fenster');
    if (trinkgeld) trinkgeld.remove();
    _poStill = true;
    try {
        if (neu === 'en') _poAnwenden(document.documentElement);
        else _poZurueck();
    } finally {
        if (_poBeob) _poBeob.takeRecords();
        _poStill = false;
    }
    _poSprachbloecke();
    _poKopfMalen();
    // Werkzeuge, die selbst zeichnen, müssen danach neu zeichnen.
    if (typeof poNeuZeichnen === 'function') poNeuZeichnen();
}

function _poKopfMalen() {
    document.querySelectorAll('.po-sprach button').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.spr === _poSpr));
    });
}

/* ---------- Trinkgeld ----------
   PocketOps verschenkt sich. Der Knopf ist die einzige Stelle, an der das
   Werkzeug etwas von sich aus möchte — entsprechend zurückhaltend.

   Bewusst „Trinkgeld“ und nicht „Spende“: eine Spende im steuerlichen Sinn
   kann nur eine anerkannt gemeinnützige Einrichtung entgegennehmen. Hier ist
   es eine freiwillige Zuwendung an eine Privatperson.

   Der Verweis geht an PayPal.me. Bewusst nicht an die Spendenseite mit der
   E-Mail-Adresse als Kennung: die stünde damit im Quelltext jeder der
   sechsundzwanzig Dateien und wäre, seit das Ganze öffentlich liegt, für
   Adress-Sammler maschinell abgreifbar. Der PayPal.me-Name zeigt sie nicht.

   Den Betrag gibt der Besucher selbst an — deshalb der blanke Name ohne
   angehängte Zahl. Soll sich das ändern, ist hier die eine Zeile zu ändern
   und _design/sync.mjs laufen zu lassen. */
const PO_TRINKGELD_LINK = 'https://paypal.me/JensHeitmann306';

const PO_TRINKGELD_TEXTE = {
    de: {
        titel: 'Trinkgeld',
        frei: 'PocketOps ist frei. Nimm es, gib es weiter, bau es um — es kostet nichts und wird nichts kosten.',
        arbeit: 'Darin steckt allerdings eine Menge Arbeit. Wenn dir eines der Werkzeuge den Tag leichter gemacht hat, freue ich mich über ein Trinkgeld. Wie viel, entscheidest du.',
        hinweis: 'Der Knopf öffnet PayPal in einem neuen Fenster. Hier wird nichts abgefragt und nichts mitgeschnitten.',
        knopf: 'Trinkgeld über PayPal',
        nein: 'Vielleicht später'
    },
    en: {
        titel: 'Tip jar',
        frei: 'PocketOps is free. Take it, pass it on, rebuild it — it costs nothing and it never will.',
        arbeit: 'There is a fair amount of work in it, though. If one of these tools has made your day easier, a tip would be welcome. You decide how much.',
        hinweis: 'The button opens PayPal in a new window. Nothing is asked for or recorded here.',
        knopf: 'Leave a tip via PayPal',
        nein: 'Maybe later'
    }
};

function poTrinkgeld() {
    if (document.getElementById('po-trinkgeld-fenster')) return;
    const t = PO_TRINKGELD_TEXTE[_poSpr] || PO_TRINKGELD_TEXTE.de;
    const back = _poModal(
        '<div class="po-dialog-head">' + poEsc(t.titel) + '</div>'
      + '<div class="po-dialog-body po-hilfe" data-po-roh>'
      +   '<p style="margin:0 0 12px">' + poEsc(t.frei) + '</p>'
      +   '<p style="margin:0 0 12px">' + poEsc(t.arbeit) + '</p>'
      +   '<p style="margin:0;color:var(--po-ink-3);font-size:11px">' + poEsc(t.hinweis) + '</p>'
      + '</div>'
      + '<div class="po-dialog-foot">'
      +   '<button class="po-btn" data-zu>' + poEsc(t.nein) + '</button>'
      +   '<a class="po-btn po-btn--primary" href="' + PO_TRINKGELD_LINK + '" target="_blank" rel="noopener noreferrer">'
      +     poEsc(t.knopf) + '</a>'
      + '</div>',
        (b, schliessen) => {
            b.__abbruch = schliessen;
            b.querySelector('[data-zu]').onclick = schliessen;
            /* Nach dem Sprung zu PayPal soll hier nicht noch ein Fenster offen
               stehenbleiben, auf das niemand mehr schaut. */
            b.querySelector('a.po-btn').onclick = () => setTimeout(schliessen, 150);
        });
    back.id = 'po-trinkgeld-fenster';
}

function _poKopfBauen() {
    const leiste = document.querySelector('.po-head-actions');
    if (!leiste || document.querySelector('.po-meta')) return;
    const box = document.createElement('div');
    box.className = 'po-meta';
    box.innerHTML =
        '<div class="po-sprach" role="group" aria-label="Sprache / Language">'
      + '<button type="button" data-spr="de">DE</button>'
      + '<button type="button" data-spr="en">EN</button></div>'
      + '<button type="button" class="po-trinkgeld" title="Trinkgeld" aria-label="Trinkgeld">&#9829;</button>'
      + '<button type="button" class="po-frage" title="Anleitung" aria-label="Anleitung">?</button>'
      + '<div class="po-head-sep"></div>';
    leiste.insertBefore(box, leiste.firstChild);
    box.querySelectorAll('[data-spr]').forEach(b => { b.onclick = () => poSpracheSetzen(b.dataset.spr); });
    box.querySelector('.po-frage').onclick = poHilfe;
    box.querySelector('.po-trinkgeld').onclick = poTrinkgeld;
    _poKopfMalen();
}

/* ---------- Die Anleitung ---------- */

/* Die Werkzeuge liegen im Ordner tools/, die Übersicht eine Ebene darüber.
   Woran sich das erkennen lässt: nur ein Werkzeug trägt das Markenzeichen als
   Rückverweis; auf der Übersicht selbst steht es als blosser Text. */
const _poSicherungPfad = () => document.querySelector('a.po-brand') ? 'Sicherung.html' : 'tools/Sicherung.html';

/* Die Rechner, von denen diese Seite etwas nachlädt — ohne Doppelte. */
function _poFremdquellen() {
    return [...document.querySelectorAll('script[src], link[rel="stylesheet"][href]')]
        .map(e => e.getAttribute('src') || e.getAttribute('href'))
        .filter(u => /^https?:\/\//i.test(u || ''))
        .map(u => { try { return new URL(u).hostname; } catch (e) { return null; } })
        .filter((h, i, a) => h && a.indexOf(h) === i);
}

function poHilfe() {
    if (document.getElementById('po-hilfe-fenster')) return;
    const t = PO_HILFE_TEXTE[_poSpr];
    const h = (typeof PO_HILFE !== 'undefined' && PO_HILFE && PO_HILFE[_poSpr]) ? PO_HILFE[_poSpr] : null;
    const name = (document.querySelector('.po-tool-name') || {}).textContent || 'PocketOps';

    const teile = [];
    if (h && h.kurz) teile.push('<p style="margin:0 0 12px">' + h.kurz + '</p>');
    if (h && h.schritte && h.schritte.length) {
        teile.push('<div class="po-hilfe-titel">' + t.schritte + '</div>'
                 + '<ol class="po-hilfe-liste">' + h.schritte.map(s => '<li>' + s + '</li>').join('') + '</ol>');
    }
    if (h && h.tipps && h.tipps.length) {
        teile.push('<div class="po-hilfe-teil"><div class="po-hilfe-titel">' + t.tipps + '</div>'
                 + '<ul class="po-hilfe-liste">' + h.tipps.map(s => '<li>' + s + '</li>').join('') + '</ul></div>');
    }
    teile.push('<div class="po-hilfe-teil">'
             + '<div class="po-hilfe-titel">' + t.sicherung + '</div>'
             + '<p style="margin:0 0 8px">' + t.sicherungText + '</p>'
             + '<p style="margin:0 0 8px">' + t.sicherungWarum + '</p>'
             + '<p style="margin:0"><a href="' + _poSicherungPfad() + '">' + t.mehr + '</a></p></div>');
    /* Ein paar Werkzeuge holen sich eine Programmbibliothek aus dem Netz. Der
       Hinweis liest das aus der Seite selbst aus, statt es pauschal zu
       behaupten — so bleibt er richtig, auch wenn später eine Quelle dazukommt
       oder wegfällt. */
    const fremd = _poFremdquellen();
    teile.push('<div class="po-hilfe-teil" style="color:var(--po-ink-3);font-size:11px">'
             + (fremd.length ? t.oertlichMitNetz.replace('{}', fremd.join(', ')) : t.oertlich)
             + '</div>');

    const back = _poModal(
        '<div class="po-dialog-head">' + poEsc(name) + ' — ' + t.titel + '</div>'
      + '<div class="po-dialog-body po-hilfe" data-po-roh>' + teile.join('') + '</div>'
      + '<div class="po-dialog-foot"><button class="po-btn po-btn--go" data-zu>' + t.schluss + '</button></div>',
        (b, schliessen) => {
            b.__abbruch = schliessen;
            b.querySelector('[data-zu]').onclick = schliessen;
            setTimeout(() => b.querySelector('[data-zu]').focus(), 30);
        });
    back.id = 'po-hilfe-fenster';
    back.querySelector('.po-dialog').style.maxWidth = '560px';
}

function _poStart() {
    document.documentElement.lang = _poSpr;
    _poKopfBauen();
    _poSprachbloecke();
    if (_poSpr === 'en') {
        _poStill = true;
        try { _poAnwenden(document.documentElement); } finally { _poStill = false; }
    }
    _poBeobachten();
    document.addEventListener('keydown', e => {
        if (e.key === 'F1') { e.preventDefault(); poHilfe(); }
    });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _poStart);
else _poStart();
