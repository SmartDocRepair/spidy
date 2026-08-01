# SMT-1 · Spidey Tracer 🕷️

Web app in stile retro-pixel ispirata al "tracer" dei film: al centro una **mappa reale**
della posizione di chi apre l'app, con **segnalini rossi** (contatti-ragno, generati
dall'app) e **segnalini gialli** (segnalazioni di altri utenti, anch'esse simulate).

Solo la posizione dell'utente e la mappa sono reali (GPS + tile OpenStreetMap/CARTO);
tutto il resto è fake generato localmente.

## Come si usa

- Apri l'app da **HTTPS** (serve per il GPS) e concedi il permesso di posizione.
- Su **Android**: Chrome → menu → "Aggiungi a schermata Home" per installarla come app (PWA).
- Su **iPhone**: Safari → Condividi → "Aggiungi a Home".

## Comandi

| Controllo | Funzione |
|---|---|
| CHAT / ARCHIVE / SHARE | chat fake della rete avvistatori, registro avvistamenti, condivisione link |
| TERRAIN | alterna mappa blu "wireframe" e mappa normale |
| 3D VIEW | modulo offline (come nel tracer originale 😄) |
| CENTER LOC. | ricentra sulla tua posizione |
| PROF 1/2/3 | tutti i segnali / solo contatti rossi / solo segnalazioni gialle |
| A.1 / A.2 | anelli radar sui contatti / tracce di movimento |
| 0 / S / T | reset vista / audio on-off / tracking del contatto più vicino |
| Pulsante occhi | forza un nuovo avvistamento |

## Sviluppo

Nessuna build: è un singolo `index.html` (Leaflet via CDN) + `manifest.webmanifest`,
`sw.js` e icone. Per provarlo in locale: `python3 -m http.server` e apri
`http://localhost:8000` (il GPS su localhost funziona anche senza HTTPS).

Il deploy su GitHub Pages è automatico via `.github/workflows/pages.yml`.
