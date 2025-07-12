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

    // Aggiungi icona Obiettivo 11 dentro l'app con un timeout per aspettare che il DOM sia pronto
    setTimeout(() => {
        addSDGFooterToApp();
    }, 100);
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

// DATI_RIFIUTI_COMPLETO: generato automaticamente da dizionario_rifiuti_completo_definitivo.csv
// Struttura: ogni rifiuto ha descrizione e array delle categorie applicabili
const DATI_RIFIUTI_COMPLETO = {
  "Abiti usati": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Accendino": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Acetone (contenitore vuoto e lavato)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Acidi (contenitore sporco)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Acidi (contenitore vuoto e lavato)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Acquario": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Addobbi natalizi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Adesivi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Agenda": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Ago con cappuccio": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Alcool (contenitore vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Alimenti avariati": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Umido": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Alluminio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Amianto": {
    descrizione: "Chiedi informazioni al numero verde AMIA",
    categorie: ["altre categorie"]
  },
  "Ammoniaca (contenitore sporco)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Annaffiatoio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Antenna del televisore": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Antenna parabolica": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Antiparassitari (contenitore vuoto)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Aquiloni": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Armadi": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Articoli per l edilizia (es. tubi) piccole quantit ": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Asciugacapelli": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Aspirapolvere": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Asse da stiro": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Assorbenti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Astucci": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Attaccapanni in ferro": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Attaccapanni in legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Auricolari": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Avanzi di cibo": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Bacinelle in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Bambole": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Bamb ": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Asta Bandiere": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Tessuto Bandiera": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Barattoli di vernice e solventi": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Barattoli in acciaio (vuoti e puliti)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli in alluminio e acciaio (per olio, pelati, tonno, ecc.)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli in latta (scatole di pelati, ecc.)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli in plastica per prodotti vari": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli per alimenti in polvere": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli per articoli da cancelleria": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli per detersivi": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli per rullini fotografici": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattoli per salviette umide": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barattolini di crema": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Barre da imballaggio in polistirolo espanso": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Batterie cellulare": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Batterie per auto": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Battiscopa in legno": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Bauli": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Bicchieri e coppette in materiale compostabile (ad es.cellulosa, amido di mais, ecc.)": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Bicchieri in cristallo": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Bicchieri in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Bicchieri di vetro": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Biciclette": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Bilancia pesa persone": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Bombole del gas": {
    descrizione: "Fornitori e rivenditori autorizzati",
    categorie: ["altre categorie"]
  },
  "Bombolette spray con simbolo di pericolo T e/o F (contenitore vuoto)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Bombolette spray non pericolose (contenitore vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Borsa dell acqua calda": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Borse di Plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Borse in cuoio": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Bottiglie di plastica per acqua, olio, succhi": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Bottiglie di vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Box doccia": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Box per bambini": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Brick per succo di frutta, t  (senza cannuccia)": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Brocche di vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Buste di carta": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Buste di plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Bustine di t ": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Caffettiera": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Calcinacci piccole quantit ": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Calcolatrici con componenti elettroniche": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Calze di nylon, lana, cotone": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Candeggina (contenitore vuoto e lavato)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Candela": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Contenitori in plastica per candele": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Canne da pesca": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Canne per irrigazione": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cannucce": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Canovacci": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Capelli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cappelli": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Capsule per macchinette caff ": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cards Plastificate": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Carbone spento": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Carica batterie": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Carrozzine": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Carta assorbente da cucina (scottex)": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Carta carbone": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta cerata": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta da forno": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta delle caramelle": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Carta patinata": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Carta per affettati": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta per formaggio": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta sporca di colla o altre sostanze": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Carta stagnola (alluminio)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Carta umida imbevuta di liquidi organici (sugo, olio, ecc.)": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Carta vetrata": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cartoncino": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Cartongesso": {
    descrizione: "Centri di smaltimento autorizzati",
    categorie: ["altre categorie"]
  },
  "Cartone da imballaggio": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Cartone della pizza": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Cartone per alimenti - tetrapak (per latte, succhi di frutta, ecc.)": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Cartoni pizza sporchi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cartucce per stampanti": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Casco moto e bici": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cassette audio e video": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cassette di legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Cassette per ortofrutta e carni": {
    descrizione: "plastica e metallo oppure Ecocentro",
    categorie: ["plastica/metalli", "ecocentro"]
  },
  "Cavatappi": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Cavi elettrici": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Cd e cd-rom": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cellophane": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Cenere spenta": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Cera": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Ceramica": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Cerini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cerotti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Chiavette usb": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Chiavi in metallo": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Chiodi": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Ciabatte": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cialde caff  con involucro non biodegradabili": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cialde caff  con ivolucro biodegradabile": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Cinture in plastica, stoffa e cuoio": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Ciuccio": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Computer": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti oppure Ecomobile",
    categorie: ["ecocentro", "ecomobile", "altre categorie"]
  },
  "Conchiglie e molluschi": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Confezioni delle merendine": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Confezioni in cartoncino (ad es. della pasta,del dentifricio, dei cereali, ecc.)": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Confezioni in plastica rigide o flessibili": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Congelatori": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Contenitore borotalco": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Contenitore pasta abrasiva": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Contenitore smalto": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Contenitori in plastica (bacinelle e terrine)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Contenitori per alimenti in alluminio e acciaio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Contenitori per alimenti in vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Contenitori per bibite (lattine)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Coperchi metallici": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Coperchietti dei barattoli di yogurt": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Coperte usate": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Copertoni di automobili": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Coppette del gelato di carta pulite": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Coppette del gelato di plastica pulite": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Corda": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cornici in legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Cosmetici": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cosmetici (contenitore plastica)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Cotone usato": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cotton fioc compostabile": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Cotton fioc in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Cover di cellulari": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cravatte": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Cristallo": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Cucce per animali domestici": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Cuscini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Custodie per cd, musicassette, videocassette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Damigiane": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Dentifricio (tubetto vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Deodorante per auto": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Deodorante personale con contenitore in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Deodorante personale con contenitore in vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Detersivo (flaccone vuoto e pulito)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Detersivo (imballaggio cartone)": {
    descrizione: "carta",
    categorie: ["carta"]
  },
  "Detersivo (sacchetto sporco)": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Detersivo (sacchetto vuoto e pulito)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Diapositive": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Dischetti per computer": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Dischi in vinile": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Diserbanti e disinfettanti": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Dispensatori per alimenti vuoti e puliti (creme, salse, yogurt)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Divano": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Dvd": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Elastici": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Elettrodomestici": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Estintori": {
    descrizione: "Rivenditori autorizzati",
    categorie: ["altre categorie"]
  },
  "Eternit": {
    descrizione: "Chiedi informazioni al numero verde AMIA",
    categorie: ["altre categorie"]
  },
  "Etichette adesive": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Etichette di indumenti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Evidenziatori": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Farmaci": {
    descrizione: "Contenitori presso le Farmacie",
    categorie: ["altre categorie"]
  },
  "Fazzoletti di carta sporchi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Feltrini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Ferro": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Fiale in plastia vuote": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Fiammiferi": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Fili elettrici": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Film e pellicole da imballaggio in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Filo interdentale": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Filtri del the, t , caff  e camomilla": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Finestre piccole quantit ": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Fiori finti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Fiori secchi e recisi": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Fitofarmaci": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Flacconi di plastica vuoti (detersivi e saponi)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Flacconi per alimenti vuoti (creme e salse)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Fogli di carta e cartone": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Fogli di protezione in alluminio delle cioccolate": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Fogli in alluminio per uso domestico": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Foglie": {
    descrizione: "Bidone del verde o ecocentro",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Fondi di caff ": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Forbici": {
    descrizione: "plastica e metallo (Nelle zone servite dal porta a porta, Ecocentro oppure Ecomobile)",
    categorie: ["plastica/metalli", "ecocentro", "ecomobile"]
  },
  "Fotografie": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Frigoriferi": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Ganci per chiudere i sacchetti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Garze sterili": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Giocattoli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Girello per bambini": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Giubbetti catarifrangenti": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Gommapiuma": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Graffette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Grattugia in plastica per alimenti": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Guaina catramata": {
    descrizione: "Centri di smaltimento autorizzati",
    categorie: ["altre categorie"]
  },
  "Guanti in pelle o lana": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Guanti in gomma, lattice, usa e getta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Guarnizioni": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Gusci di crostacei": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Gusci di frutta secca": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Gusci d uovo": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Imballaggi in carta e cartone": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Imballaggi in metallo": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Imballaggi in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Imballaggi in polistirolo": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Incensi": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Inerti in piccola quantit  (ad es. ceramica, terracotta, piastrelle, mattoni, ecc.)": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Infissi piccole quantit ": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Insetticidi per uso domestico (barattoli vuoti e puliti)": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Insetticidi per uso domestico (sporchi)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lacche (contenitore vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Lacci per scarpe": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Lamette usa e getta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lampadari": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Lampade": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lampadine a basso consumo": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lampadine a incandescenza": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lampadine a led": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lampadine alogene": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lana": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Lana di roccia": {
    descrizione: "Centri di smaltimento autorizzati",
    categorie: ["altre categorie"]
  },
  "Lana di vetro": {
    descrizione: "Centri di smaltimento autorizzati",
    categorie: ["altre categorie"]
  },
  "Lastre di Vetro piccole dimensioni": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Lastre raggi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Latta": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Lattine in alluminio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Lattine in banda stagnata": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Lavastoviglie": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Lavatrice": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Lenti a contatto": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lenti occhiali": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lenzuola": {
    descrizione: "Raccolta Indumenti",
    categorie: ["altre categorie"]
  },
  "Lettiera naturale per animali": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Lettiera sintetica per animali": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lische di pesce": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Lucida scarpe": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lumini oppure Cera di lumino": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Lumini oppure Contenitori in plastica per lumini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Macchina da cucire": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Macchina fotografica": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Mascherine": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Materassi": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Matite": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Mattonelle di ceramica piccole quantit ": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Mattoni piccole quantit ": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Medicinali scaduti": {
    descrizione: "Contenitori presso le farmacie oppure Ecomobile",
    categorie: ["ecomobile", "altre categorie"]
  },
  "Mercurio (termometri)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Mestoli di legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Microonde": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Mobili e mensole in legno": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Mollette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Monitor": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Motorini": {
    descrizione: "Autodemolizioni",
    categorie: ["altre categorie"]
  },
  "Mouse": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Mozziconi di sigaretta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Musicassette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Nastri per fiori": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Nastro adesivo": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Negativi fotografici": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Neon": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Nylon": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Occhiali o Montatura occhiali": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Oggetti in gomma": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Olio alimentare usato": {
    descrizione: "Ecocentro oppure Ecomobile oppure Contenitori circoscrizioni/consultare sito AMIA www.amiavr.it/Raccolta-differenziata/Raccolta-olio-alimentare",
    categorie: ["ecocentro", "ecomobile", "altre categorie"]
  },
  "Olio per automobili e macchinari": {
    descrizione: "Raccoglitori autorizzati oppure Ecocentro",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Ombrelli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Ombrelloni": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Ossa (avanzi di cibo)": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Ovatta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pacchetti di sigarette senza parti in plastica": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Padelle": {
    descrizione: "plastica e metallo (Nelle zone servite dal porta a, Ecocentrooppure Ecomobile)",
    categorie: ["plastica/metalli", "ecocentro", "ecomobile"]
  },
  "Paglia": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Paletta raccogli rifiuti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pallets": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Palline da Tennis": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Palloni da gioco": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Panni elettrostatici per la polvere": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pannolini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Parasole per auto": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Paste abrasive (contenitotre sporco)": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Paste abrasive (contenitotre vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Peli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pellicola fotografica": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pellicole per alimenti": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Peluche": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pennarelli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Penne": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pennelli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pentole": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Pergamene": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Persiane": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Pesticidi": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Pettini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Piante piccole": {
    descrizione: "Umido/Ecocentro",
    categorie: ["umido", "ecocentro"]
  },
  "Piastra per i capelli": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Piastrelle": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Piastrine per zanzare": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Piatti e posate in materiale compostabile": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Piatti in ceramica": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Piccoli attrezzi in metallo": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Pile": {
    descrizione: "Contenitori per pile presso rivenditori oppure Ecomobile",
    categorie: ["ecomobile", "altre categorie"]
  },
  "Pirofile": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Pneumatici auto piccole quantit ": {
    descrizione: "Ecocentro o telefona 045 8069213",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Polistirolo imballaggi": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Polistirolo pannelli": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Polveri dell aspirapolvere": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Poltrone": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Portadocumenti e cartellette in plastica": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Posacenere in vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Posate in metallo": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Posate in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Post-it": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Profumi (contenitori vuoti)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Profilattici": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Quaderni": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Quadri (cornice)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Raccoglitore dossier senza parti metalliche": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Radio": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Ramaglie": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Rasoi usa e getta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Reggette per legatura pacchi (in plastica)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Reti in plastica per frutta e verdura": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Reti per letti": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Righelli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Riviste": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Rotolo interno alla carta igienica": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Rullino fotografico": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Sacche per dialisi e per stomatizzati": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Sacchetti di carta con interno plasticato": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sacchetti di plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sacchetti per aspirapolvere": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Sacchi e sacchetti in plastica (fuorch  per materiale edile)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sacchi per alimenti per animali": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sacchi per detersivi": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sacchi per prodotti di giardinaggio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Salviette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Salviette di carta unte": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Salviette pulite": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Sanitari": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Sapone in pezzi e saponette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Scaffali in ferro": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Scaffali in legno": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Scale pieghevoli": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Scarpe e scarponi usati in buono stato": {
    descrizione: "Raccolta indumenti",
    categorie: ["altre categorie"]
  },
  "Scarpe e scarponi usati in cattivo stato": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Scarponi da sci rotti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Scarti di cucina": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Scatola in cartone per pizza (se sporchi pulire con una salvietta)": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Scatolette per tonno e altri alimenti": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Scatoloni": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Schermo del computer": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Sci": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Scolapasta in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Scontrini in carta chimica": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Scopa": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Sdraio": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Secchielli in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sedie": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Segature (piccole quantit )": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Sfalcio dell erba del giardino": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Shoppers": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Sigarette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Siringhe (con l apposito cappuccio inserito sull ago)": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Smalti (T e/o F)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Solventi (T e/o F)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Spago": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Spazzole": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Spazzolini": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Specchio": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Spray (T e/o F)": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Spugne": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Spugne abrasive": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Spugne per fiori": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Spugne sintetiche": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Stagnola": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Stampante": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Stecchi in legno per gelati": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Stendini": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Stereo": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Stoffa": {
    descrizione: "Raccolta indumenti",
    categorie: ["altre categorie"]
  },
  "Stoviglie": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Stracci": {
    descrizione: "Raccolta indumenti",
    categorie: ["altre categorie"]
  },
  "Stracci da cucina": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Stracci unti da olio minerale": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Stracci unti da sostanze chimiche": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Strumenti musicali": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Stuzzicadenti": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Sughero": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Sveglie": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tablet": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tagliere in legno": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tagliere in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Taglierini": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tamponi per timbri": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Tanica in banda stagnata": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Taniche per uso domestico (no benzina meno 5lt)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Taniche per uso domestico (no benzina pi  5lt)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tappeti": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Tappezzeria/tappeti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Tappi a corona": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Tappi di barattoli in metallo": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Tappi in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Tappi sughero": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tastiera del computer": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tavolo": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Tazze e tazzine in ceramica rotta": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Telefono": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Televisore": {
    descrizione: "Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti oppure Ecomobile",
    categorie: ["ecocentro", "ecomobile", "altre categorie"]
  },
  "Tende in stoffa": {
    descrizione: "Raccolta indumenti",
    categorie: ["altre categorie"]
  },
  "Tergicristalli rotti": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Termometro": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Termometro mercurio digitale": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Terracotta": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Tetra-pak": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Tintura per abiti, scarpe, capelli (contenitore pieno)": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tintura per abiti, scarpe, capelli (contenitore vuoto)": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Toner": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Torcia": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tovaglioli di carta puliti": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Tovaglioli di carta usati": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Triciclo": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Trielina": {
    descrizione: "Ecocentro oppure Ditta specializzata",
    categorie: ["ecocentro", "altre categorie"]
  },
  "Trucchi": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Truciolati o residui di lavorazione del legno (piccole quantit )": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Trucioli di tempera della matita o pastelli": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Tubetti di colore": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tubetti di dentifricio": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Tubetti per uso alimentare": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Tubi fluorescenti": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Tubi in alluminio": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Tubi in ferro": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Tubi in gomma": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Tubi in PVC per idraulico": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Uncinetto": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Unghie": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Uova": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Umido": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Valigie": {
    descrizione: "Secco oppure Ecocentro oppure telefona al numero 045 8069213 per ritiro rifiuti ingombranti oppure Ecomobile",
    categorie: ["secco", "ecocentro", "ecomobile", "altre categorie"]
  },
  "Vaschette e barattoli per gelati": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Vaschette in alluminio per alimenti": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Vaschette in carta portauova": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Vaschette in plastica portauova": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Vasetti degli omogeneizzati": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Vasi in ceramica": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Vasi in plastica": {
    descrizione: "plastica e metallo",
    categorie: ["plastica/metalli"]
  },
  "Vasi in terracotta": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Vasi in vetro": {
    descrizione: "Campana del Vetro",
    categorie: ["vetro"]
  },
  "Vassoi e confezioni in cartoncino": {
    descrizione: "Carta",
    categorie: ["carta"]
  },
  "Veneziane": {
    descrizione: "Ecocentro",
    categorie: ["ecocentro"]
  },
  "Ventilatori": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Verdura avariata": {
    descrizione: "Umido",
    categorie: ["umido"]
  },
  "Vernici": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Videocassette": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Videogiochi": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Videoregistratore": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Zaini": {
    descrizione: "Raccola indumenti",
    categorie: ["altre categorie"]
  },
  "Zanzariere": {
    descrizione: "Secco o Ecocentro",
    categorie: ["secco", "ecocentro"]
  },
  "Zappa": {
    descrizione: "Ecocentro o Ecomobile",
    categorie: ["ecocentro", "ecomobile"]
  },
  "Zerbino": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
  "Zoccoli": {
    descrizione: "Secco",
    categorie: ["secco"]
  },
};




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
    updateTimeLogic(tipoRifiuto);
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

    const cardHeader = document.getElementById('card-header');
    const emojiCircle = document.getElementById('emoji-circle');
    const tipoTitle = document.getElementById('tipo-title');
    const dateBadge = document.getElementById('date-badge');

    // Non mostrare alcuna data di riferimento
    dateBadge.style.display = 'none';

    if (tipoRifiuto) {
        // Rimuovi classi precedenti
        cardHeader.className = 'card-header-custom';

        // Aggiungi classe specifica per il tipo
        const tipoClass = tipoRifiuto.replace('/', '-');
        cardHeader.classList.add(`card-header-${tipoClass}`);

        // Aggiorna icona
        emojiCircle.innerHTML = ICONE_RIFIUTI[tipoRifiuto] || EMOJI_RIFIUTI[tipoRifiuto] || '🗂️';

    // Aggiorna titolo senza icona info
    const tipoCapitalized = tipoRifiuto.charAt(0).toUpperCase() + tipoRifiuto.slice(1);
    tipoTitle.innerHTML = tipoCapitalized;

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

function updateTimeLogic(tipoRifiuto) {
    // Usa sempre il fuso orario italiano (Europe/Rome) che gestisce automaticamente ora legale/solare
    const oraItaliana = new Date().toLocaleString('it-IT', { 
        timeZone: 'Europe/Rome', 
        hour: 'numeric', 
        hour12: false 
    });
    const ora = parseInt(oraItaliana);
    
    const timeInfo = document.getElementById('time-info');
    const collectionNote = document.getElementById('collection-note');
    const collectionNoteText = document.getElementById('collection-note-text');

    if (tipoRifiuto) {
        // Logica oraria: conferimento attivo dalle 19:00 alle 20:59 (fino alle 21:00 escluse)
        if (ora >= 19 && ora < 21) {
            // Ora di conferimento (dalle 19:00 alle 20:59)
            timeInfo.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            timeInfo.innerHTML = `
                <div class="time-info-title">
                    <i class="fas fa-leaf" style="color: #ecfdf5; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Ora puoi consegnare i rifiuti!</strong>
                </div>
                <div class="time-info-subtitle">
                    <span style="font-size: 1.1em; color: #ecfdf5;">Rispetta gli orari: </span>
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 2em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
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
                            <p style='margin: 0; color: #047857; line-height: 1.5; font-size: 1.05em;'>Porta i rifiuti nel luogo prefissato e alle ore previste. <br>Rispetta le regole per una maggiore tutela ambientale.</p>
                        </div>
                    </div>
                `;
            }
        } else if (ora < 19) {
            // Prima dell'orario
            timeInfo.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
            timeInfo.innerHTML = `
                <div class="time-info-title">
                    <i class="fas fa-clock" style="color: #fffbeb; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Oggi ${new Date().toLocaleDateString('it-IT', { timeZone: 'Europe/Rome' })} porta i rifiuti nei seguenti orari:</strong>
                </div>
                <div class="time-info-subtitle">
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 2em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
                    </div>
                </div>
            `;
            
            // Stile del box delle note - Arancione per preparazione
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
                            <div style="width: 56px; height: 56px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(245,158,11,0.15); margin-bottom: -28px;">
                                <i class='fas fa-exclamation-triangle' style='color: white; font-size: 2em;'></i>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 15px; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.2); padding: 40px 20px 20px 20px; text-align: center; width: 100%; max-width: 100%;">
                            <h4 style='margin: 0 0 12px 0; color: #92400e; font-size: 1.25em; font-weight: bold;'>Preparazione Consegna</h4>
                            <p style='margin: 0; color: #b45309; line-height: 1.5; font-size: 1.05em;'>Prepara solamente i rifiuti ammessi. <br>Conferisci esclusivamente negli orari riportati e nei punti di raccolta prestabiliti, evitando la dispersione nell'ambiente. <br> <strong>TUTTI <strong> siamo chiamati a contribuire alla protezione dell'ambiente in cui viviamo.</p>
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
                    <span style="font-size: 1.1em; color: #eff6ff;">Conferimento attivo solo dalle</span>
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 2em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
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
                            <p style='margin: 0; color: #4338ca; line-height: 1.5; font-size: 1.05em;'>Il tempo per il conferimento è terminato, non consegnare i rifiuti fuori dalle fasce orarie prestabilite. <br> Consulta il calendario per il prossimo conferimento.</p>
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
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="background: #64748b; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="fas fa-bed" style="color: white; font-size: 1.2em;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 1.1em; font-weight: bold;">Nessuna consegna prevista per la giornata</h4>
                        <p style="margin: 0; color: #475569; line-height: 1.5; font-size: 0.95em;">Consulta il calendario nei giorni successivi, non disperdere rifiuti nell'ambiente!</p>
                    </div>
                </div>
            `;
        }
    }
}

function updateCurrentTime() {
    // Usa sempre il fuso orario italiano (Europe/Rome)
    const now = new Date();
    const timeString = now.toLocaleString('it-IT', { 
        timeZone: 'Europe/Rome',
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = timeString;
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
    notice.textContent = '© 2025 Autore: Gregorio Pellegrini.';
    document.body.appendChild(notice);
}

// Aggiunge il footer SDG 11 all'interno dell'app
function addSDGFooterToApp() {
    // Cerca il container principale dell'app
    const mainContainer = document.querySelector('.main-container');
    if (!mainContainer) return;

    // Crea il footer SDG
    const sdgFooter = document.createElement('div');
    sdgFooter.id = 'sdg-footer-app';
    sdgFooter.style.cssText = `
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        border: 1px solid #10b981;
        border-radius: 12px;
        padding: 16px;
        margin: 20px 0 10px 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        box-shadow: 0 4px 12px rgba(16,185,129,0.1);
    `;
    
    sdgFooter.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: 100%;
        ">
            <div style="
                background: linear-gradient(135deg, #10b981, #059669);
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 3px 10px rgba(16,185,129,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 52px;
                height: 52px;
                flex-shrink: 0;
            ">
                <img src='sdg11.png' alt='Obiettivo 11' style='
                    width: 32px;
                    height: 32px;
                    border-radius: 4px;
                    object-fit: cover;
                '>
            </div>
            <div style="
                flex: 1;
                text-align: left;
                line-height: 1.4;
            ">
                <div style="
                    font-size: 0.8em;
                    color: #10b981;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    margin-bottom: 3px;
                ">Agenda 2030 SDGs</div>
                <div style="
                    font-size: 0.95em;
                    color: #065f46;
                    font-weight: 600;
                    line-height: 1.3;
                ">Obiettivo 11: Città e comunità sostenibili</div>
                <div style="
                    font-size: 0.75em;
                    color: #047857;
                    margin-top: 2px;
                    font-style: italic;
                ">Questa app sostiene l'Obiettivo 11 dell'Agenda ONU 2030, favorendo lo sviluppo di comunità sostenibili tramite la gestione responsabile dei rifiuti e la corretta differenziazione, riducendo l'impatto ambientale.</div>
            </div>
        </div>
    `;
    
    // Inserisce il footer alla fine del container principale
    mainContainer.appendChild(sdgFooter);
}

// Funzioni essenziali per il Modal di Ricerca
function openSearchModal() {
    const modal = document.getElementById('searchModal');
    const searchInput = document.getElementById('modalSearchInput');
    const searchResults = document.getElementById('modalSearchResults');
    
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
                if (searchResults) {
                    searchResults.innerHTML = '<div class="search-hint">Inizia a digitare per cercare un rifiuto...</div>';
                }
            }
        }, 100);
        
        initializeModalSearch();
    }
}

function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    const searchInput = document.getElementById('modalSearchInput');
    const searchResults = document.getElementById('modalSearchResults');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
}

function initializeModalSearch() {
    const searchInput = document.getElementById('modalSearchInput');
    const searchResults = document.getElementById('modalSearchResults');
    
    if (searchInput && searchResults && !searchInput.hasAttribute('data-initialized')) {
        searchInput.setAttribute('data-initialized', 'true');
        
        // Database rifiuti completo
        const wasteDB = DATI_RIFIUTI_COMPLETO;
        
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.trim().toLowerCase();
            searchResults.innerHTML = '';
            
            if (query.length === 0) {
                searchResults.innerHTML = '<div class="search-hint">Inizia a digitare per cercare un rifiuto...</div>';
                return;
            }
            
            if (query.length < 2) {
                searchResults.innerHTML = '<div class="search-hint">Digita almeno 2 caratteri</div>';
                return;
            }
            
            const results = Object.entries(wasteDB)
                .filter(([name]) => name.toLowerCase().includes(query))
                .slice(0, 12)
                .map(([name, data]) => ({ nome: name, destinazione: data.descrizione }));
            
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="no-results">Nessun risultato trovato</div>';
            } else {
                results.forEach(({ nome, destinazione }) => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <div class="waste-name">${nome}</div>
                        <div class="waste-disposal">${destinazione}</div>
                    `;
                    searchResults.appendChild(item);
                });
            }
        });
        
        // Supporto tasto ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeSearchModal();
        });
    }
}

// Versione semplificata - rimosso codice ridondante
function aggiornaDatiConferimento() {
    const oggi = getTodayString();
    const domani = getTomorrowString();
    
    let tipoRifiuto = null;
    let dataTarget = oggi;
    
    // Controlla il tipo di rifiuto di oggi
    if (CALENDARIO_RIFIUTI[oggi]) {
        tipoRifiuto = CALENDARIO_RIFIUTI[oggi];
        dataTarget = oggi;
    } else if (CALENDARIO_RIFIUTI[domani]) {
        tipoRifiuto = CALENDARIO_RIFIUTI[domani];
        dataTarget = domani;
    }
    
    updateCard(tipoRifiuto, dataTarget);
    updateTimeLogic(tipoRifiuto);
}

function verificaCambioData() {
    // Versione semplificata
    const nuovaData = getTodayString();
    if (dataCorrente !== nuovaData) {
        dataCorrente = nuovaData;
        aggiornaDatiConferimento();
    }
}

// Aggiorna la logica oraria ogni minuto usando sempre l'orario italiano
setInterval(() => {
    const oggi = getTodayString();
    const domani = getTomorrowString();
    let tipoRifiuto = null;
    
    tipoRifiuto = CALENDARIO_RIFIUTI[domani]
    
    updateTimeLogic(tipoRifiuto);
    updateCurrentTime(); // Aggiorna anche l'orario visualizzato
}, 60000);
