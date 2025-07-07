// Copyright © 2025 XXX - Pippo
// Questo script è stato scritto da XXX - Pippo. Tutti i diritti riservati.
// Vietata la copia e la distribuzione senza autorizzazione.

// App Calendario Rifiuti - Versione Statica
// Replica la logica di app.py

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Calendario Rifiuti - App Statica caricata');
    
    // Inizializza l'app
    initializeApp();
    
    // Aggiorna l'orario ogni secondo
    setInterval(updateCurrentTime, 1000);
    
    // Mostra il copyright
    displayCopyrightNotice();
});

// Dati dei rifiuti (da app.py)
const DETTAGLI_RIFIUTI = {
    "secco": {
        "descrizione": "Rifiuti non riciclabili che non possono essere differenziati",
        "si_puo": [
            "Pannolini e assorbenti",
            "Lettiere per animali",
            "Ceramica e porcellana rotta",
            "Giocattoli rotti (non elettronici)",
            "Spugne e stracci sporchi",
            "Mozziconi di sigaretta",
            "Polvere dell'aspirapolvere",
            "Carta plastificata o oleata",
            "CD e DVD",
            "Piccoli oggetti in gomma"
        ],
        "non_si_puo": [
            "Materiali riciclabili (carta, plastica, vetro)",
            "Rifiuti organici",
            "Pile e batterie",
            "Farmaci scaduti",
            "Materiali pericolosi",
            "Elettrodomestici",
            "Oli esausti",
            "Vernici e solventi",
            "Pneumatici",
            "Materiali ingombranti"
        ]
    },
    "umido": {
        "descrizione": "Rifiuti organici biodegradabili",
        "si_puo": [
            "Avanzi di cibo cotti e crudi",
            "Bucce di frutta e verdura",
            "Ossa di pesce e carne",
            "Fondi di caffè e filtri di tè",
            "Gusci d'uovo",
            "Pane raffermo",
            "Fiori recisi e piante",
            "Tovaglioli di carta sporchi",
            "Tappi di sughero naturale",
            "Lettiere biodegradabili"
        ],
        "non_si_puo": [
            "Plastica biodegradabile",
            "Cenere di sigaretta",
            "Lettiere chimiche",
            "Oli da cucina",
            "Liquidi in generale",
            "Medicinali",
            "Escrementi di animali",
            "Materiali non organici",
            "Imballaggi anche se compostabili",
            "Legno trattato"
        ]
    },
    "plastica": {
        "descrizione": "Imballaggi e contenitori in plastica e metallo",
        "si_puo": [
            "Bottiglie di acqua e bibite",
            "Flaconi di shampoo e detergenti",
            "Contenitori per alimenti",
            "Buste e sacchetti di plastica",
            "Vaschette per alimenti",
            "Pellicole trasparenti",
            "Tappi e coperchi in plastica",
            "Lattine e barattoli in metallo",
            "Fogli e vaschette di alluminio",
            "Scatolette di metallo per alimenti"
        ],
        "non_si_puo": [
            "Giocattoli di plastica",
            "Elettrodomestici in plastica",
            "Posate di plastica nere",
            "Oggetti di plastica non imballaggio",
            "Plastica sporca di sostanze pericolose",
            "Contenitori di vernici",
            "Siringhe",
            "Oggetti in metallo non imballaggio",
            "Plastica rigida da costruzione",
            "Pentole e padelle metalliche"
        ]
    },
    "plastica/metalli": {
        "descrizione": "Imballaggi e contenitori in plastica e metallo",
        "si_puo": [
            "Bottiglie di acqua e bibite",
            "Flaconi di shampoo e detergenti",
            "Contenitori per alimenti",
            "Buste e sacchetti di plastica",
            "Vaschette per alimenti",
            "Pellicole trasparenti",
            "Tappi e coperchi in plastica",
            "Lattine e barattoli in metallo",
            "Fogli e vaschette di alluminio",
            "Scatolette di metallo per alimenti"
        ],
        "non_si_puo": [
            "Giocattoli di plastica",
            "Elettrodomestici in plastica",
            "Posate di plastica nere",
            "Oggetti di plastica non imballaggio",
            "Plastica sporca di sostanze pericolose",
            "Contenitori di vernici",
            "Siringhe",
            "Oggetti in metallo non imballaggio",
            "Plastica rigida da costruzione",
            "Pentole e padelle metalliche"
        ]
    },
    "carta": {
        "descrizione": "Carta, cartone e materiali cellulosici",
        "si_puo": [
            "Giornali e riviste",
            "Libri e quaderni",
            "Scatole di cartone",
            "Fogli e documenti",
            "Sacchetti di carta",
            "Cartoni per alimenti (latte, succhi)",
            "Confezioni di cereali",
            "Carta da regalo (non plastificata)",
            "Cartoncini e biglietti",
            "Tetrapak (dove previsto)"
        ],
        "non_si_puo": [
            "Carta plastificata o oleata",
            "Carta carbone",
            "Carta fotografica",
            "Carta da forno usata",
            "Fazzoletti usati",
            "Tovaglioli sporchi",
            "Carta igienica",
            "Scontrini termici",
            "Carta adesiva",
            "Cartoni sporchi di cibo"
        ]
    }
};

// Icone per ogni tipo di rifiuto
const ICONE_RIFIUTI = {
    "secco": "<i class='fas fa-trash'></i>",
    "umido": "<i class='fas fa-seedling'></i>", 
    "plastica": "<i class='fas fa-recycle'></i>",
    "plastica/metalli": "<i class='fas fa-recycle'></i>",
    "carta": "<i class='fas fa-newspaper'></i>",
};

// Emoji per ogni tipo di rifiuto (backup)
const EMOJI_RIFIUTI = {
    "secco": "🗑️",
    "umido": "🍌", 
    "plastica": "♻️",
    "plastica/metalli": "♻️",
    "carta": "📄",
};

// Calendario rifiuti reale (da calendario.txt)
const CALENDARIO_RIFIUTI = {
    // Formato: "YYYY-MM-DD": "tipo_rifiuto" - Dati da calendario.txt
    "2025-07-01": "umido",
    "2025-07-02": "plastica/metalli",
    "2025-07-03": "umido",
    "2025-07-04": "secco",
    "2025-07-05": "umido",
    "2025-07-06": null, // Nessun conferimento
    "2025-07-07": "carta",
    "2025-07-08": "umido",
    "2025-07-09": "plastica/metalli",
    "2025-07-10": "umido",
    "2025-07-11": "secco",
    "2025-07-12": "umido",
    "2025-07-13": null, // Nessun conferimento
    "2025-07-14": "carta",
    "2025-07-15": "umido",
    "2025-07-16": "plastica/metalli",
    "2025-07-17": "umido",
    "2025-07-18": "secco",
    "2025-07-19": "umido",
    "2025-07-20": null, // Nessun conferimento
    "2025-07-21": "carta",
    "2025-07-22": "umido",
    "2025-07-23": "plastica/metalli",
    "2025-07-24": "umido",
    "2025-07-25": "secco",
    "2025-07-26": "umido",
    "2025-07-27": null, // Nessun conferimento
    "2025-07-28": "carta",
    "2025-07-29": "umido",
    "2025-07-30": "plastica/metalli",
    "2025-07-31": "umido",
    "2025-08-01": "secco",
    "2025-08-02": "umido",
    "2025-08-03": null, // Nessun conferimento
    "2025-08-04": "carta",
    "2025-08-05": "umido",
    "2025-08-06": "plastica/metalli",
    "2025-08-07": "umido",
    "2025-08-08": "secco",
    "2025-08-09": "umido",
    "2025-08-10": null, // Nessun conferimento
    "2025-08-11": "carta",
    "2025-08-12": "umido",
    "2025-08-13": "plastica/metalli",
    "2025-08-14": "umido",
    "2025-08-15": "secco",
    "2025-08-16": "umido",
    "2025-08-17": null, // Nessun conferimento
    "2025-08-18": "carta",
    "2025-08-19": "umido",
    "2025-08-20": "plastica/metalli",
    "2025-08-21": "umido",
    "2025-08-22": "secco",
    "2025-08-23": "umido",
    "2025-08-24": null, // Nessun conferimento
    "2025-08-25": "carta",
    "2025-08-26": "umido",
    "2025-08-27": "plastica/metalli",
    "2025-08-28": "umido",
    "2025-08-29": "secco",
    "2025-08-30": "umido",
    "2025-08-31": null, // Nessun conferimento
    "2025-09-01": "carta",
    "2025-09-02": "umido",
    "2025-09-03": "plastica/metalli",
    "2025-09-04": "umido",
    "2025-09-05": "secco",
    "2025-09-06": "umido",
    "2025-09-07": null, // Nessun conferimento
    "2025-09-08": "carta",
    "2025-09-09": "umido",
    "2025-09-10": "plastica/metalli",
    "2025-09-11": "umido",
    "2025-09-12": "secco",
    "2025-09-13": "umido",
    "2025-09-14": null, // Nessun conferimento
    "2025-09-15": "carta",
    "2025-09-16": "umido",
    "2025-09-17": "plastica/metalli",
    "2025-09-18": null, // Nessun conferimento
    "2025-09-19": "secco",
    "2025-09-20": "umido",
    "2025-09-21": null, // Nessun conferimento
    "2025-09-22": "carta",
    "2025-09-23": "umido",
    "2025-09-24": "plastica/metalli",
    "2025-09-25": null, // Nessun conferimento
    "2025-09-26": "secco",
    "2025-09-27": "umido",
    "2025-09-28": null, // Nessun conferimento
    "2025-09-29": "carta",
    "2025-09-30": "umido",
    "2025-10-01": "plastica/metalli",
    "2025-10-02": null, // Nessun conferimento
    "2025-10-03": "secco",
    "2025-10-04": "umido",
    "2025-10-05": null, // Nessun conferimento
    "2025-10-06": "carta",
    "2025-10-07": "umido",
    "2025-10-08": "plastica/metalli",
    "2025-10-09": null, // Nessun conferimento
    "2025-10-10": "secco",
    "2025-10-11": "umido",
    "2025-10-12": null, // Nessun conferimento
    "2025-10-13": "carta",
    "2025-10-14": "umido",
    "2025-10-15": "plastica/metalli",
    "2025-10-16": null, // Nessun conferimento
    "2025-10-17": "secco",
    "2025-10-18": "umido",
    "2025-10-19": null, // Nessun conferimento
    "2025-10-20": "carta",
    "2025-10-21": "umido",
    "2025-10-22": "plastica/metalli",
    "2025-10-23": null, // Nessun conferimento
    "2025-10-24": "secco",
    "2025-10-25": "umido",
    "2025-10-26": null, // Nessun conferimento
    "2025-10-27": "carta",
    "2025-10-28": "umido",
    "2025-10-29": "plastica/metalli",
    "2025-10-30": null, // Nessun conferimento
    "2025-10-31": "secco",
    "2025-11-01": "umido",
    "2025-11-02": null, // Nessun conferimento
    "2025-11-03": "carta",
    "2025-11-04": "umido",
    "2025-11-05": "plastica/metalli",
    "2025-11-06": null, // Nessun conferimento
    "2025-11-07": "secco",
    "2025-11-08": "umido",
    "2025-11-09": null, // Nessun conferimento
    "2025-11-10": "carta",
    "2025-11-11": "umido",
    "2025-11-12": "plastica/metalli",
    "2025-11-13": null, // Nessun conferimento
    "2025-11-14": "secco",
    "2025-11-15": "umido",
    "2025-11-16": null, // Nessun conferimento
    "2025-11-17": "carta",
    "2025-11-18": "umido",
    "2025-11-19": "plastica/metalli",
    "2025-11-20": null, // Nessun conferimento
    "2025-11-21": "secco",
    "2025-11-22": "umido",
    "2025-11-23": null, // Nessun conferimento
    "2025-11-24": "carta",
    "2025-11-25": "umido",
    "2025-11-26": "plastica/metalli",
    "2025-11-27": null, // Nessun conferimento
    "2025-11-28": "secco",
    "2025-11-29": "umido",
    "2025-11-30": null, // Nessun conferimento
    "2025-12-01": "carta",
    "2025-12-02": "umido",
    "2025-12-03": "plastica/metalli",
    "2025-12-04": null, // Nessun conferimento
    "2025-12-05": "secco",
    "2025-12-06": "umido",
    "2025-12-07": null, // Nessun conferimento
    "2025-12-08": "carta",
    "2025-12-09": "umido",
    "2025-12-10": "plastica/metalli",
    "2025-12-11": null, // Nessun conferimento
    "2025-12-12": "secco",
    "2025-12-13": "umido",
    "2025-12-14": null, // Nessun conferimento
    "2025-12-15": "carta",
    "2025-12-16": "umido",
    "2025-12-17": "plastica/metalli",
    "2025-12-18": null, // Nessun conferimento
    "2025-12-19": "secco",
    "2025-12-20": "umido",
    "2025-12-21": null, // Nessun conferimento
    "2025-12-22": "carta",
    "2025-12-23": "umido",
    "2025-12-24": "plastica/metalli",
    "2025-12-25": null, // Nessun conferimento
    "2025-12-26": "secco",
    "2025-12-27": "umido",
    "2025-12-28": null, // Nessun conferimento
    "2025-12-29": "carta",
    "2025-12-30": "umido",
    "2025-12-31": "plastica/metalli"
};

let dettagliVisibili = false;
let tipoRifiutoCorrente = null;

function initializeApp() {
    console.log('🔄 Inizializzazione app...');
    
    // NUOVA LOGICA: mostra il conferimento del GIORNO SUCCESSIVO (come in app.py)
    const oggi = getTodayString();
    const domani = getTomorrowString();
    const tipoRifiuto = CALENDARIO_RIFIUTI[domani] || null;
    
    console.log(`📅 Oggi (${oggi}), conferimento di domani (${domani}): ${tipoRifiuto || 'Nessun conferimento'}`);
    
    // Aggiorna la card con il conferimento di domani
    updateCard(tipoRifiuto, domani);
    
    // Aggiorna l'orario
    updateCurrentTime();
    
    // Determina logica oraria (come in app.py)
    updateTimeLogic();
}

function getTodayString() {
    const oggi = new Date();
    return oggi.toISOString().split('T')[0]; // Formato YYYY-MM-DD
}

function getTomorrowString() {
    const domani = new Date();
    domani.setDate(domani.getDate() + 1); // Aggiunge 1 giorno
    return domani.toISOString().split('T')[0]; // Formato YYYY-MM-DD
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('it-IT', options);
}

function updateCard(tipoRifiuto, dataTarget) {
    tipoRifiutoCorrente = tipoRifiuto;

    const cardHeader = document.getElementById('card-header');
    const emojiCircle = document.getElementById('emoji-circle');
    const tipoTitle = document.getElementById('tipo-title');
    const dateBadge = document.getElementById('date-badge');

    // Mostra sempre "OGGI" come etichetta, ma il conferimento è di domani
    const oggi = getTodayString();
    dateBadge.textContent = `OGGI • ${formatDate(oggi)}`;

    if (tipoRifiuto) {
        // Rimuovi classi precedenti
        cardHeader.className = 'card-header-custom';

        // Aggiungi classe specifica per il tipo
        const tipoClass = tipoRifiuto.replace('/', '-');
        cardHeader.classList.add(`card-header-${tipoClass}`);

        // Aggiorna icona
        emojiCircle.innerHTML = ICONE_RIFIUTI[tipoRifiuto] || EMOJI_RIFIUTI[tipoRifiuto] || '🗂️';

        // Aggiorna titolo
        const tipoCapitalized = tipoRifiuto.charAt(0).toUpperCase() + tipoRifiuto.slice(1);
        const infoButtonHtml = `<span id="info-button" class="info-button" onclick="toggleDettagli()">
            <i class="fas fa-info"></i>
        </span>`;
        tipoTitle.innerHTML = `${tipoCapitalized} ${infoButtonHtml}`;

    } else {
        // Nessun conferimento
        cardHeader.className = 'card-header-custom card-header-nessuno';
        emojiCircle.innerHTML = '😴';
        tipoTitle.innerHTML = 'Nessun Conferimento';
    }

    // Rimuovi il box "Conferimento di domani" per una visualizzazione più pulita
    const statusAlert = document.getElementById('status-alert');
    if (statusAlert) {
        statusAlert.style.display = 'none';
    }
}

function updateTimeLogic() {
    const ora = new Date().getHours();
    const timeInfo = document.getElementById('time-info');
    const collectionNote = document.getElementById('collection-note');
    const collectionNoteText = document.getElementById('collection-note-text');

    if (tipoRifiutoCorrente) {
        // Logica oraria come in app.py - conferimento di domani
        if (ora >= 19 && ora <= 21) {
            // Ora di conferimento
            timeInfo.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            timeInfo.innerHTML = `
                <div class="time-info-title">
                    <i class="fas fa-leaf" style="color: #ecfdf5; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">È ora di conferire!</strong>
                </div>
                <div class="time-info-subtitle">
                    <span style="font-size: 1.1em; color: #ecfdf5;">Conferimento attivo</span>
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 1.5em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
                    </div>
                </div>
            `;
            
            // Stile del box delle note - Verde per ora attiva
            if (collectionNote) {
                collectionNote.style.cssText = `
                    background: none;
                    border: none;
                    margin: 15px 0;
                    padding: 0;
                `;
                collectionNote.innerHTML = `
                    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                        <div style='position: relative; z-index: 2;'>
                            <div style="width: 56px; height: 56px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(16,185,129,0.15); margin-bottom: -28px;">
                                <i class='fas fa-exclamation-triangle' style='color: white; font-size: 2em;'></i>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border: 2px solid #34d399; border-radius: 15px; box-shadow: 0 8px 25px rgba(52, 211, 153, 0.2); padding: 40px 20px 20px 20px; text-align: center; width: 100%; max-width: 100%;">
                            <h4 style='margin: 0 0 12px 0; color: #065f46; font-size: 1.25em; font-weight: bold;'>Conferimento Attivo</h4>
                            <p style='margin: 0; color: #047857; line-height: 1.5; font-size: 1.05em;'>Conferisci nel luogo prefissato, rispettando le regole per un conferimento responsabile.</p>
                        </div>
                    </div>
                `;
            }
        } else if (ora < 19) {
            // Prima dell'orario
            timeInfo.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
            timeInfo.innerHTML = `
                <div class="time-info-title">
                    <i class="fas fa-clock" style="color: #fffbeb; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Preparati per il conferimento</strong>
                </div>
                <div class="time-info-subtitle">
                    <span style="font-size: 1.1em; color: #fffbeb;">Conferimento attivo dalle</span>
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 1.5em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
                    </div>
                </div>
            `;
            
            // Stile del box delle note - Arancione per preparazione
            if (collectionNote) {
                // Wrapper per permettere al triangolo di uscire dal box
                collectionNote.style.cssText = `
                    background: none;
                    border: none;
                    margin: 15px 0;
                    padding: 0;
                `;
                collectionNote.innerHTML = `
                    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                        <div style='position: relative; z-index: 2;'>
                            <div style="width: 56px; height: 56px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(245,158,11,0.15); margin-bottom: -28px;">
                                <i class='fas fa-exclamation-triangle' style='color: white; font-size: 2em;'></i>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 15px; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.2); padding: 40px 20px 20px 20px; text-align: center; width: 100%; max-width: 100%;">
                            <h4 style='margin: 0 0 12px 0; color: #92400e; font-size: 1.25em; font-weight: bold;'>Preparazione Consegna</h4>
                            <p style='margin: 0; color: #b45309; line-height: 1.5; font-size: 1.05em;'>Prepara i rifiuti correttamente per garantire un conferimento responsabile e rispettoso dell'ambiente.</p>
                        </div>
                    </div>
                `;
            }
        } else {
            // Dopo l'orario
            timeInfo.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
            timeInfo.innerHTML = `
                <div class="time-info-title">
                    <i class="fas fa-moon" style="color: #eff6ff; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Fine conferimento</strong>
                </div>
                <div class="time-info-subtitle">
                    <span style="font-size: 1.1em; color: #eff6ff;">Conferimento attivo dalle</span>
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 1.5em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
                    </div>
                </div>
            `;
            
            // Stile del box delle note - Blu per fine conferimento (stesso stile di preparazione)
            if (collectionNote) {
                collectionNote.style.cssText = `
                    background: none;
                    border: none;
                    margin: 15px 0;
                    padding: 0;
                `;
                collectionNote.innerHTML = `
                    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                        <div style='position: relative; z-index: 2;'>
                            <div style="width: 56px; height: 56px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(99,102,241,0.15); margin-bottom: -28px;">
                                <i class='fas fa-moon' style='color: white; font-size: 2em;'></i>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); border: 2px solid #6366f1; border-radius: 15px; box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2); padding: 40px 20px 20px 20px; text-align: center; width: 100%; max-width: 100%;">
                            <h4 style='margin: 0 0 12px 0; color: #3730a3; font-size: 1.25em; font-weight: bold;'>Fine Conferimento</h4>
                            <p style='margin: 0; color: #4338ca; line-height: 1.5; font-size: 1.05em;'>Il tempo per il conferimento è terminato. Prossimo conferimento domani dalle 19:00 alle 21:00.</p>
                        </div>
                    </div>
                `;
            }
        }
    } else {
        // Nessun conferimento
        timeInfo.style.background = 'linear-gradient(135deg, #64748b, #475569)';
        timeInfo.innerHTML = `
            <div class="time-info-title">
                <i class="fas fa-star" style="color: #f1f5f9; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Giorno di riposo</strong>
            </div>
            <div class="time-info-subtitle">
                <span style="font-size: 1.2em; color: #f1f5f9;">Nessuna raccolta programmata per domani</span>
            </div>
        `;
        
        // Stile del box delle note - Grigio per riposo
        if (collectionNote) {
            collectionNote.style.cssText = `
                background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
                border: 2px solid #64748b;
                border-radius: 15px;
                padding: 20px;
                margin: 15px 0;
                box-shadow: 0 8px 25px rgba(100, 116, 139, 0.15);
                position: relative;
                overflow: hidden;
            `;
            collectionNote.innerHTML = `
                <div style="position: absolute; top: -5px; right: -5px; width: 30px; height: 30px; background: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-moon" style="color: white; font-size: 0.8em;"></i>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="background: #64748b; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-bed" style="color: white; font-size: 1.2em;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 1.1em; font-weight: bold;">Giorno di Riposo</h4>
                        <p style="margin: 0; color: #475569; line-height: 1.5; font-size: 0.95em;">Goditi il giorno di pausa dalla raccolta!</p>
                    </div>
                </div>
            `;
        }
    }
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('it-IT', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('current-time').textContent = timeString;
}

function toggleDettagli() {
    const mainContainer = document.querySelector('.main-container > .card-rifiuto');
    const dettagliSection = document.getElementById('dettagli-section');
    
    dettagliVisibili = !dettagliVisibili;
    
    if (dettagliVisibili && tipoRifiutoCorrente) {
        // Mostra dettagli
        mainContainer.style.display = 'none';
        dettagliSection.style.display = 'block';
        
        // Popola i dettagli
        populateDettagli(tipoRifiutoCorrente);
    } else {
        // Nascondi dettagli
        mainContainer.style.display = 'block';
        dettagliSection.style.display = 'none';
    }
}

function populateDettagli(tipoRifiuto) {
    const dettagli = DETTAGLI_RIFIUTI[tipoRifiuto];
    if (!dettagli) return;

    const dettagliHeader = document.querySelector('.dettagli-header');
    const dettagliIcon = document.getElementById('dettagli-icon');
    const dettagliTitle = document.getElementById('dettagli-title');
    const dettagliDescription = document.getElementById('dettagli-description');
    const dettagliSiList = document.getElementById('dettagli-si-list');
    const dettagliNoList = document.getElementById('dettagli-no-list');

    const icona = ICONE_RIFIUTI[tipoRifiuto] || EMOJI_RIFIUTI[tipoRifiuto] || '🗂️';
    const tipoCapitalized = tipoRifiuto.charAt(0).toUpperCase() + tipoRifiuto.slice(1);

    // Apply color scheme to header
    if (dettagliHeader) {
        dettagliHeader.className = 'dettagli-header';
        const tipoClass = tipoRifiuto.replace('/', '-');
        dettagliHeader.classList.add(`dettagli-header-${tipoClass}`);
    }

    // Set icon
    if (dettagliIcon) {
        dettagliIcon.innerHTML = icona;
    }

    // Set title and description
    if (dettagliTitle) {
        dettagliTitle.textContent = tipoCapitalized;
    }
    if (dettagliDescription) {
        dettagliDescription.textContent = dettagli.descrizione;
    }

    // Populate lists with staggered animation
    if (dettagliSiList) {
        dettagliSiList.innerHTML = dettagli.si_puo
            .map((item, index) => `
                <div class="dettagli-item dettagli-si" style="animation-delay: ${0.1 + index * 0.05}s;">
                    <i class="fas fa-check-circle"></i>
                    <span>${item}</span>
                </div>
            `)
            .join('');
    }

    if (dettagliNoList) {
        dettagliNoList.innerHTML = dettagli.non_si_puo
            .map((item, index) => `
                <div class="dettagli-item dettagli-no" style="animation-delay: ${0.1 + index * 0.05}s;">
                    <i class="fas fa-times-circle"></i>
                    <span>${item}</span>
                </div>
            `)
            .join('');
    }
}

// Add copyright notice to the UI
function displayCopyrightNotice() {
    const notice = document.createElement('div');
    notice.id = 'copyright-notice';
    notice.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 0.9em;
        z-index: 1000;
    `;
    notice.textContent = '© 2025 Gregorio Pellegrini. Tutti i diritti riservati.';
    document.body.appendChild(notice);
}

// Aggiorna la logica oraria ogni minuto
setInterval(updateTimeLogic, 60000);
