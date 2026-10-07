/* Ein kleiner Treiber für Chrome über das DevTools-Protokoll.
   Kein Playwright, kein Puppeteer — Node 24 bringt einen WebSocket mit,
   und mehr braucht es nicht, um eine Seite zu laden, etwas darin
   auszuführen und sie neu zu laden. */
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import url, { fileURLToPath } from 'url';

/* Chrome steht je nach Einrichtung an verschiedenen Stellen. Gefunden wird
   die erste, die es gibt; ist keine da, sagt es das beim Start und nicht
   erst mitten im Lauf. */
const CHROME = [
    process.env.POCKETOPS_CHROME,
    process.env.LOCALAPPDATA && process.env.LOCALAPPDATA + '\Google\Chrome\Application\chrome.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean).find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });

/* Der Ordner PocketOps, vom Ort dieser Datei aus. So laufen die Proben aus
   jedem Arbeitsverzeichnis heraus — _design/pruef/ liegt zwei Ebenen tief. */
export const ORDNER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const werkzeug = name => url.pathToFileURL(path.join(ORDNER, name)).href;

export async function starteChrome({ port = 9333 } = {}) {
    if (!CHROME) throw new Error('Chrome nicht gefunden. Pfad über POCKETOPS_CHROME setzen.');
    /* Ein frisches Profil: so ist der Speicher garantiert leer und ein
       bestandener Lauf beweist, dass das Werkzeug selbst geschrieben hat. */
    const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'po-chrome-'));
    const kind = spawn(CHROME, [
        '--headless=new',
        '--remote-debugging-port=' + port,
        '--user-data-dir=' + profil,
        '--no-first-run', '--no-default-browser-check',
        '--allow-file-access-from-files',
        '--disable-gpu', '--disable-extensions',
        'about:blank'
    ], { stdio: 'ignore' });

    let version = null;
    for (let i = 0; i < 100; i++) {
        try {
            const r = await fetch(`http://127.0.0.1:${port}/json/version`);
            version = await r.json();
            break;
        } catch (e) { await new Promise(r => setTimeout(r, 150)); }
    }
    if (!version) { kind.kill(); throw new Error('Chrome antwortet nicht'); }

    return {
        port,
        profil,
        async ende() {
            try { await fetch(`http://127.0.0.1:${port}/json/close/` + 'x'); } catch (e) {}
            kind.kill();
            await new Promise(r => setTimeout(r, 300));
            try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {}
        }
    };
}

/* Eine Verbindung zu genau einem Tab. */
class Sitzung {
    constructor(ws) { this.ws = ws; this.id = 0; this.offen = new Map(); this.ereignisse = []; }

    static async neu(wsUrl) {
        const ws = new WebSocket(wsUrl);
        const s = new Sitzung(ws);
        await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('WS zu')); });
        ws.onmessage = ev => {
            const m = JSON.parse(ev.data);
            if (m.id && s.offen.has(m.id)) {
                const { res, rej } = s.offen.get(m.id);
                s.offen.delete(m.id);
                m.error ? rej(new Error(m.error.message)) : res(m.result);
            } else if (m.method) {
                s.ereignisse.push(m);
            }
        };
        return s;
    }

    ruf(method, params = {}) {
        const id = ++this.id;
        return new Promise((res, rej) => {
            this.offen.set(id, { res, rej });
            this.ws.send(JSON.stringify({ id, method, params }));
            setTimeout(() => {
                if (this.offen.has(id)) { this.offen.delete(id); rej(new Error('Zeit aus: ' + method)); }
            }, 30000);
        });
    }

    /* Ausdruck in der Seite auswerten und das Ergebnis als Wert
       zurückbekommen. await im Ausdruck ist erlaubt. */
    async werte(ausdruck) {
        const r = await this.ruf('Runtime.evaluate', {
            expression: `(async () => { ${ausdruck} })()`,
            awaitPromise: true, returnByValue: true
        });
        if (r.exceptionDetails) {
            const e = r.exceptionDetails;
            throw new Error('in der Seite: ' + (e.exception && e.exception.description || e.text));
        }
        return r.result.value;
    }

    fehlerInDerSeite() {
        return this.ereignisse
            .filter(m => m.method === 'Runtime.exceptionThrown')
            .map(m => {
                const d = m.params.exceptionDetails;
                return (d.exception && d.exception.description) || d.text;
            });
    }

    zu() { try { this.ws.close(); } catch (e) {} }
}

/* Eine Datei öffnen und warten, bis sie fertig ist. */
export async function oeffne(port, dateiUrl) {
    const r = await fetch(`http://127.0.0.1:${port}/json/new?` + encodeURIComponent('about:blank'), { method: 'PUT' });
    const ziel = await r.json();
    const s = await Sitzung.neu(ziel.webSocketDebuggerUrl);
    s.zielId = ziel.id;
    s.port = port;
    await s.ruf('Runtime.enable');
    await s.ruf('Page.enable');
    await gehZu(s, dateiUrl);
    return s;
}

export async function gehZu(s, url) {
    const fertig = new Promise(res => {
        const pruef = setInterval(() => {
            if (s.ereignisse.some(m => m.method === 'Page.loadEventFired')) { clearInterval(pruef); res(); }
        }, 50);
        setTimeout(() => { clearInterval(pruef); res(); }, 15000);
    });
    s.ereignisse = s.ereignisse.filter(m => m.method !== 'Page.loadEventFired');
    await s.ruf('Page.navigate', { url });
    await fertig;
    /* Die Werkzeuge bauen sich zum Teil erst nach load auf (window.onload,
       setTimeout). Ein kurzer Moment Ruhe, dann ist alles gestellt. */
    await new Promise(r => setTimeout(r, 450));
}

export async function neuLaden(s, url) {
    await gehZu(s, 'about:blank');
    await gehZu(s, url);
}

export async function schliesse(s) {
    try { await fetch(`http://127.0.0.1:${s.port}/json/close/${s.zielId}`); } catch (e) {}
    s.zu();
}
