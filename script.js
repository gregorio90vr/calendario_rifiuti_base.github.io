// Copyright © 2025 XXX - Pippo. Tutti i diritti riservati.
// Calendario Rifiuti - Versione Migliorata con UX ottimizzata

// === CONFIGURAZIONE GLOBALE ===
let currentLanguage = 'it';

// === TRADUZIONI COMPLETE ===
const TRANSLATIONS = {
    it: {
        appTitle: "📅 Calendario Rifiuti",
        searchButton: "🔍 Dove lo butto?",
        modalTitle: "🔍 Dove lo butto?",
        searchPlaceholder: "Cerca un oggetto...",
        searchHint: "Es: bottiglia di plastica, carta, lattina...",
        closeButton: "Chiudi",
        noResults: "Nessun risultato trovato",
        today: "OGGI",
        tomorrow: "DOMANI",
        noCollection: "Nessun conferimento",
        wasteTypes: {
            umido: "Umido",
            plastica: "Plastica/Metalli", 
            carta: "Carta",
            secco: "Secco"
        },
        timeStatus: {
            canDispose: {
                title: "✅ Puoi conferire ora",
                message: "È il momento giusto per portare fuori i rifiuti (19:00-21:00)"
            },
            prepare: {
                title: "⏰ Prepara i rifiuti",
                message: "Prepara i rifiuti per il conferimento dalle 🕖 19:00 alle 🕘 21:00"
            },
            tooLate: {
                title: "❌ Troppo tardi",
                message: "Non consegnare i rifiuti oltre l'orario 19.00 - 21.00."
            }
        },
        sdgTitle: "Obiettivi di Sviluppo Sostenibile",
        sdgDescription: "Contribuisci agli SDGs 11, 12 e 14 attraverso la raccolta differenziata",
        calendarLink: "📅 Calendario AMIA",
        dictionaryLink: "📖 Dizionario Rifiuti"
    },
    en: {
        appTitle: "📅 Waste Calendar",
        searchButton: "🔍 Where do I throw it?",
        modalTitle: "🔍 Where do I throw it?",
        searchPlaceholder: "Search for an item...",
        searchHint: "Ex: plastic bottle, paper, can...",
        closeButton: "Close",
        noResults: "No results found",
        today: "TODAY",
        tomorrow: "TOMORROW", 
        noCollection: "No collection",
        wasteTypes: {
            umido: "Organic",
            plastica: "Plastic/Metals",
            carta: "Paper", 
            secco: "Dry Waste"
        },
        timeStatus: {
            canDispose: {
                title: "✅ You can dispose now",
                message: "It's the right time to take out waste (7:00 PM - 9:00 PM)"
            },
            prepare: {
                title: "⏰ Prepare waste",
                message: "Prepare waste for collection from 🕖 7:00 PM to 🕘 9:00 PM"
            },
            tooLate: {
                title: "❌ Too late",
                message: "Don't dispose of waste after hours 7:00 PM - 9:00 PM."
            }
        },
        sdgTitle: "Sustainable Development Goals",
        sdgDescription: "Contribute to SDGs 11, 12 and 14 through waste separation",
        calendarLink: "📅 AMIA Calendar",
        dictionaryLink: "📖 Waste Dictionary"
    }
};

// === DATABASE COMPLETO RIFIUTI ITALIANI ===
const WASTE_DATA_IT = {
    umido: {
        items: [
            "avanzi di cibo", "bucce di frutta", "bucce di verdura", "ossa di pesce", 
            "ossa di carne", "gusci d'uovo", "fondi di caffè", "filtri del tè",
            "pane vecchio", "pasta avanzata", "riso", "fiori recisi", "foglie",
            "tovaglioli sporchi", "fazzoletti di carta usati", "sfalci d'erba",
            "potature", "lettiere biodegradabili", "tappi di sughero naturale",
            "cenere di legna spenta", "escrementi di animali domestici", "pelo di animali"
        ]
    },
    plastica: {
        items: [
            "bottiglie di plastica", "flaconi shampoo", "contenitori yogurt", 
            "buste di plastica", "vaschette alimentari", "pellicola trasparente",
            "tappi di plastica", "lattine di alluminio", "barattoli di metallo",
            "scatolette di tonno", "fogli di alluminio", "tetrapak",
            "vassoi di polistirolo", "blister farmaci", "reggette di plastica",
            "reti per frutta", "sacchetti freezer", "contenitori detersivi",
            "tappi corona", "bombolette spray vuote"
        ]
    },
    carta: {
        items: [
            "giornali", "riviste", "libri", "quaderni", "scatole di cartone",
            "fogli di carta", "buste di carta", "cartoni del latte", 
            "sacchetti di carta", "scatole di cereali", "cartoncini",
            "volantini pubblicitari", "scontrini", "biglietti autobus",
            "carta da regalo", "calendari", "agende", "fumetti",
            "cartoni della pizza puliti", "contenitori tetrapak"
        ]
    },
    secco: {
        items: [
            "pannolini", "assorbenti", "ceramica rotta", "porcellana",
            "giocattoli rotti", "cd", "dvd", "spugne sporche", 
            "mozziconi di sigaretta", "polvere aspirapolvere", "lettiere chimiche",
            "carta oleata", "carta plastificata", "scontrini termici",
            "piccoli oggetti in gomma", "preservativi", "rasoi usa e getta",
            "cotton fioc", "cerotti", "calze rotte"
        ]
    }
};

// === DATABASE COMPLETO RIFIUTI INGLESI ===
const WASTE_DATA_EN = {
    umido: {
        items: [
            "food scraps", "fruit peels", "vegetable peels", "fish bones", 
            "meat bones", "eggshells", "coffee grounds", "tea bags",
            "old bread", "leftover pasta", "rice", "cut flowers", "leaves",
            "dirty napkins", "used tissues", "grass clippings",
            "prunings", "biodegradable litter", "natural cork stoppers",
            "cold wood ash", "pet waste", "animal hair"
        ]
    },
    plastica: {
        items: [
            "plastic bottles", "shampoo bottles", "yogurt containers", 
            "plastic bags", "food trays", "plastic wrap",
            "plastic caps", "aluminum cans", "metal jars",
            "tuna cans", "aluminum foil", "tetra pak",
            "polystyrene trays", "medicine blisters", "plastic straps",
            "fruit nets", "freezer bags", "detergent containers",
            "bottle caps", "empty spray cans"
        ]
    },
    carta: {
        items: [
            "newspapers", "magazines", "books", "notebooks", "cardboard boxes",
            "paper sheets", "paper bags", "milk cartons", 
            "paper bags", "cereal boxes", "cardboard",
            "advertising flyers", "receipts", "bus tickets",
            "gift wrapping", "calendars", "diaries", "comics",
            "clean pizza boxes", "tetrapak containers"
        ]
    },
    secco: {
        items: [
            "diapers", "sanitary products", "broken ceramics", "porcelain",
            "broken toys", "cds", "dvds", "dirty sponges", 
            "cigarette butts", "vacuum dust", "chemical litter",
            "wax paper", "plastic-coated paper", "thermal receipts",
            "small rubber objects", "condoms", "disposable razors",
            "cotton swabs", "bandages", "torn socks"
        ]
    }
};

// === CALENDARIO RIFIUTI AGGIORNATO ===
const WASTE_CALENDAR = {
    "2025-08-01": "secco",
    "2025-08-02": "umido", 
    "2025-08-03": null,
    "2025-08-04": "carta",
    "2025-08-05": "umido",
    "2025-08-06": "plastica",
    "2025-08-07": "umido",
    "2025-08-08": "secco",
    "2025-08-09": "umido",
    "2025-08-10": null,
    "2025-08-11": "carta", 
    "2025-08-12": "umido",
    "2025-08-13": "plastica",
    "2025-08-14": "umido",
    "2025-08-15": null,
    "2025-08-16": "umido",
    "2025-08-17": null,
    "2025-08-18": "carta",
    "2025-08-19": "umido", 
    "2025-08-20": "plastica",
    "2025-08-21": "umido",
    "2025-08-22": "secco",
    "2025-08-23": "umido",
    "2025-08-24": null,
    "2025-08-25": "carta",
    "2025-08-26": "umido",
    "2025-08-27": "plastica",
    "2025-08-28": "umido",
    "2025-08-29": "secco",
    "2025-08-30": "umido",
    "2025-08-31": null,
    "2025-09-01": "carta",
    "2025-09-02": "umido",
    "2025-09-03": "plastica",
    "2025-09-04": "umido",
    "2025-09-05": "secco"
};

// === FUNZIONI UTILITÀ ===
function getTodayString() {
    // Crea una data specifica per il fuso orario di Roma
    const now = new Date();
    const romeTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Rome"}));
    
    // Formattiamo manualmente per evitare problemi di conversione
    const year = romeTime.getFullYear();
    const month = String(romeTime.getMonth() + 1).padStart(2, '0');
    const day = String(romeTime.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function getTomorrowString() {
    // Crea una data specifica per il fuso orario di Roma
    const now = new Date();
    const romeTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Rome"}));
    
    // Aggiungi un giorno
    romeTime.setDate(romeTime.getDate() + 1);
    
    // Formattiamo manualmente per evitare problemi di conversione
    const year = romeTime.getFullYear();
    const month = String(romeTime.getMonth() + 1).padStart(2, '0');
    const day = String(romeTime.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    const now = new Date();
    // Usa il fuso orario di Roma
    return now.toLocaleTimeString('it-IT', { 
        timeZone: 'Europe/Rome',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}

function getCurrentDate() {
    const now = new Date();
    // Usa il fuso orario di Roma e la lingua corrente
    const locale = currentLanguage === 'it' ? 'it-IT' : 'en-GB';
    return now.toLocaleDateString(locale, { 
        timeZone: 'Europe/Rome',
        weekday: 'long',
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
    });
}

function getWasteIcon(wasteType) {
    const icons = {
        umido: "🌿",
        plastica: "♻️", 
        carta: "📄",
        secco: "🗑️"
    };
    return icons[wasteType] || "❌";
}

// === FUNZIONI PRINCIPALI ===
function updateWasteCard() {
    const today = getTodayString();
    const tomorrow = getTomorrowString();
    
    // DEBUG: Log delle date per verificare
    console.log('DEBUG - Oggi:', today);
    console.log('DEBUG - Domani:', tomorrow);
    console.log('DEBUG - Calendario oggi:', WASTE_CALENDAR[today]);
    console.log('DEBUG - Calendario domani:', WASTE_CALENDAR[tomorrow]);
    
    let wasteType = null;
    let displayDate = null;
    
    // Il conferimento avviene la sera prima del ritiro
    // Quindi mostriamo il rifiuto di domani come "rifiuto del giorno"
    if (WASTE_CALENDAR[tomorrow]) {
        wasteType = WASTE_CALENDAR[tomorrow];
        displayDate = TRANSLATIONS[currentLanguage].today; // Mostra "OGGI" perché è il giorno del conferimento
        console.log('DEBUG - Mostro rifiuto di domani:', wasteType);
    }
    // Se domani non c'è ritiro, non mostrare nulla
    else {
        console.log('DEBUG - Nessun ritiro domani:', tomorrow);
        wasteType = null;
        displayDate = null;
    }
    
    const card = document.getElementById('waste-card');
    const icon = document.getElementById('waste-icon');
    const date = document.getElementById('waste-date');
    const type = document.getElementById('waste-type');
    
    if (wasteType) {
        // Aggiorna contenuto
        icon.textContent = getWasteIcon(wasteType);
        date.textContent = displayDate;
        type.textContent = TRANSLATIONS[currentLanguage].wasteTypes[wasteType];
        
        // Aggiorna stile
        card.className = `waste-card ${wasteType}`;
        console.log('DEBUG - Card aggiornata con:', wasteType, displayDate);
    } else {
        // Nessun conferimento
        icon.textContent = "❌";
        date.textContent = TRANSLATIONS[currentLanguage].today;
        type.textContent = TRANSLATIONS[currentLanguage].noCollection;
        card.className = "waste-card no-collection";
        console.log('DEBUG - Nessun conferimento');
    }
    
    // Passa true per isToday se stiamo mostrando il conferimento di oggi
    updateTimeStatus(wasteType, displayDate === TRANSLATIONS[currentLanguage].today);
}

function updateTimeStatus(wasteType, isToday) {
    // Usa il fuso orario di Roma per determinare l'ora corrente
    const now = new Date();
    const romeTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Rome"}));
    const hour = romeTime.getHours();
    
    const statusElement = document.getElementById('time-status');
    const titleElement = document.getElementById('time-title');
    const messageElement = document.getElementById('time-message');
    
    let status, title, message;
    
    if (wasteType && isToday) {
        // C'è conferimento oggi
        if (hour >= 19 && hour <= 21) {
            // Ora di conferimento (19:00-21:00)
            status = "green";
            title = TRANSLATIONS[currentLanguage].timeStatus.canDispose.title;
            message = TRANSLATIONS[currentLanguage].timeStatus.canDispose.message;
        } else if (hour < 19 && hour >= 0) {
            // Prima dell'orario
            status = "orange";
            title = TRANSLATIONS[currentLanguage].timeStatus.prepare.title;
            message = TRANSLATIONS[currentLanguage].timeStatus.prepare.message;
        } else {
            // Dopo l'orario
            status = "red";
            title = TRANSLATIONS[currentLanguage].timeStatus.tooLate.title;
            message = TRANSLATIONS[currentLanguage].timeStatus.tooLate.message;
        }
    } else {
        // Nessun conferimento oggi
        status = "red";
        title = TRANSLATIONS[currentLanguage].timeStatus.tooLate.title;
        message = TRANSLATIONS[currentLanguage].timeStatus.tooLate.message;
    }
    
    statusElement.className = `time-status ${status}`;
    titleElement.textContent = title;
    messageElement.textContent = message;
}

function updateLanguage() {
    // Aggiorna tutti i testi dell'interfaccia
    document.getElementById('app-title').textContent = TRANSLATIONS[currentLanguage].appTitle;
    document.getElementById('search-text').textContent = TRANSLATIONS[currentLanguage].searchButton;
    document.getElementById('modal-title').textContent = TRANSLATIONS[currentLanguage].modalTitle;
    document.getElementById('search-input').placeholder = TRANSLATIONS[currentLanguage].searchPlaceholder;
    document.getElementById('close-btn').textContent = TRANSLATIONS[currentLanguage].closeButton;
    document.getElementById('sdg-title').textContent = TRANSLATIONS[currentLanguage].sdgTitle;
    document.getElementById('sdg-description').textContent = TRANSLATIONS[currentLanguage].sdgDescription;
    
    // Aggiorna etichetta orologio
    const timeLabel = document.getElementById('time-label');
    if (timeLabel) {
        timeLabel.textContent = currentLanguage === 'it' ? 'Ora Attuale' : 'Current Time';
    }
    
    // Aggiorna data con nuova lingua
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = getCurrentDate();
    }
    
    // Aggiorna link utili
    const calendarLinkText = document.getElementById('calendar-link-text');
    if (calendarLinkText) {
        calendarLinkText.textContent = TRANSLATIONS[currentLanguage].calendarLink;
    }
    
    const dictionaryLinkText = document.getElementById('dictionary-link-text');
    if (dictionaryLinkText) {
        dictionaryLinkText.textContent = TRANSLATIONS[currentLanguage].dictionaryLink;
    }
    
    // Aggiorna suggestions se modal aperto
    if (document.getElementById('search-modal').style.display === 'block') {
        updateSearchSuggestions();
    }
    
    // Aggiorna la card dei rifiuti
    updateWasteCard();
    
    // Riperforma ricerca se presente
    const searchInput = document.getElementById('search-input');
    if (searchInput.value.trim()) {
        performSearch(searchInput.value);
    } else {
        document.getElementById('search-results').innerHTML = '';
    }
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Aggiorna bottoni lingua
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Aggiorna indicatore lingua selezionata
    const langIndicator = document.getElementById('selected-lang-text');
    if (langIndicator) {
        langIndicator.textContent = lang === 'it' ? '🇮🇹 Italiano selezionato' : '🇬🇧 English selected';
    }
    
    // Aggiorna interfaccia
    updateLanguage();
}

// === RICERCA AVANZATA MOBILE-FIRST ===
function performSearch(query) {
    if (!query || query.length < 2) {
        document.getElementById('search-results').innerHTML = '';
        return;
    }

    const searchQuery = query.toLowerCase().trim();
    const wasteData = currentLanguage === 'it' ? WASTE_DATA_IT : WASTE_DATA_EN;
    const resultsContainer = document.getElementById('search-results');
    
    let results = [];
    
    // Ricerca ottimizzata con score per rilevanza
    Object.keys(wasteData).forEach(wasteType => {
        wasteData[wasteType].items.forEach(item => {
            const itemLower = item.toLowerCase();
            let score = 0;
            
            // Corrispondenza esatta ha priorità massima
            if (itemLower === searchQuery) {
                score = 100;
            }
            // Inizia con la query
            else if (itemLower.startsWith(searchQuery)) {
                score = 80;
            }
            // Contiene la query
            else if (itemLower.includes(searchQuery)) {
                score = 60;
            }
            // Ricerca per parole (split spaces)
            else {
                const queryWords = searchQuery.split(' ');
                const matchedWords = queryWords.filter(word => 
                    word.length > 1 && itemLower.includes(word)
                );
                if (matchedWords.length > 0) {
                    score = 40 + (matchedWords.length / queryWords.length) * 20;
                }
            }
            
            if (score > 0) {
                results.push({
                    name: item,
                    type: wasteType,
                    typeName: TRANSLATIONS[currentLanguage].wasteTypes[wasteType],
                    score: score
                });
            }
        });
    });
    
    // Ordina per score e rimuovi duplicati
    results = results
        .sort((a, b) => b.score - a.score)
        .filter((item, index, arr) => 
            arr.findIndex(t => t.name === item.name) === index
        )
        .slice(0, 20); // Limita a 20 risultati

    // Rendering risultati con animazioni scaglionate
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div style="font-size: 48px; margin-bottom: 16px;">🤔</div>
                <div style="font-size: 18px; margin-bottom: 8px;">${TRANSLATIONS[currentLanguage].noResults}</div>
                <div style="font-size: 14px; opacity: 0.7;">Prova con termini più generici come "bottiglia" o "carta"</div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = results.map((result, index) => {
            const categoryIcon = getCategoryIcon(result.type);
            return `
                <div class="search-result" style="animation-delay: ${index * 0.05}s">
                    <div class="result-header">
                        <div class="result-name">
                            <span class="result-category-icon">${categoryIcon}</span>
                            ${highlightMatch(result.name, searchQuery)}
                        </div>
                        <span class="result-type ${result.type}">${result.typeName}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Funzione per evidenziare i match nella ricerca
function highlightMatch(text, query) {
    if (!query || query.length < 2) return text;
    
    const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--amia-light); color: var(--amia-dark-green); padding: 1px 3px; border-radius: 3px; font-weight: 700;">$1</mark>');
}

// Icone per categorie
function getCategoryIcon(type) {
    const icons = {
        umido: "🌿",
        plastica: "♻️", 
        carta: "📄",
        secco: "🗑️"
    };
    return icons[type] || "📦";
}

// Gestione suggestions intelligenti
function updateSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions) return;
    
    const currentSuggestions = currentLanguage === 'it' 
        ? ['bottiglia', 'carta', 'lattina', 'avanzi', 'giornale']
        : ['bottle', 'paper', 'can', 'food scraps', 'newspaper'];
    
    suggestions.innerHTML = currentSuggestions.map(suggestion => 
        `<div class="suggestion-chip" onclick="searchFromSuggestion('${suggestion}')">${getCategoryIcon(getWasteTypeForItem(suggestion))} ${suggestion}</div>`
    ).join('');
}

// Ricerca da suggestion con focus input
function searchFromSuggestion(query) {
    const input = document.getElementById('search-input');
    input.value = query;
    input.focus();
    performSearch(query);
}

// Determina il tipo di rifiuto per un item (per icone suggestions)
function getWasteTypeForItem(item) {
    const wasteData = currentLanguage === 'it' ? WASTE_DATA_IT : WASTE_DATA_EN;
    for (const [type, data] of Object.entries(wasteData)) {
        if (data.items.some(dataItem => dataItem.toLowerCase().includes(item.toLowerCase()))) {
            return type;
        }
    }
    return 'secco';
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'block';
    
    // Aggiorna suggestions per lingua corrente
    updateSearchSuggestions();
    
    // Focus automatico dopo animazione
    setTimeout(() => {
        const input = document.getElementById('search-input');
        input.focus();
    }, 300);
}

function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
}

// === INIZIALIZZAZIONE ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Calendario Rifiuti - App Migliorata Caricata');
    
    // Aggiorna orario e data ogni secondo
    setInterval(() => {
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();
        
        timeElement.textContent = currentTime;
        timeElement.setAttribute('data-time', currentTime);
        
        if (dateElement) {
            dateElement.textContent = currentDate;
        }
    }, 1000);
    
    // Aggiorna card rifiuti ogni minuto
    setInterval(updateWasteCard, 60000);
    
    // Setup eventi lingua
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // Setup eventi search
    document.getElementById('search-button').addEventListener('click', openSearchModal);
    document.getElementById('close-btn').addEventListener('click', closeSearchModal);
    
    // Search input con debounce
    let searchTimeout;
    document.getElementById('search-input').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    // Chiudi modal con ESC o click fuori
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearchModal();
    });
    
    document.getElementById('search-modal').addEventListener('click', (e) => {
        if (e.target.id === 'search-modal') closeSearchModal();
    });
    
    // Inizializza app
    switchLanguage('it');
    
    // Copyright notice
    console.log('© 2025 XXX - Pippo. Tutti i diritti riservati.');
});
