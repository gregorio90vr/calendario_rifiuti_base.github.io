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

// Database completo dei rifiuti - integrato per evitare problemi CORS
const DATI_RIFIUTI_COMPLETO = {
    "Abiti usati": "Raccolta Indumenti",
    "Accendino": "Secco",
    "Acetone (contenitore vuoto e lavato)": "Plastica",
    "Acidi (contenitore sporco)": "Ecocentro",
    "Acidi (contenitore vuoto e lavato)": "Plastica",
    "Acquario": "Ecocentro",
    "Addobbi natalizi": "Secco",
    "Adesivi": "Secco",
    "Agenda": "Carta",
    "Ago con cappuccio": "Secco",
    "Alcool (contenitore vuoto)": "Plastica",
    "Alimenti avariati": "Umido",
    "Alluminio": "Plastica",
    "Amianto": "Ecocentro",
    "Ammoniaca (contenitore sporco)": "Ecocentro",
    "Annaffiatoio": "Plastica",
    "Antenna del televisore": "Ecocentro",
    "Antenna parabolica": "Ecocentro",
    "Antiparassitari (contenitore vuoto)": "Ecocentro",
    "Aquiloni": "Secco",
    "Armadi": "Ecocentro",
    "Articoli per l'edilizia (es. tubi)": "Ecocentro",
    "Asciugacapelli": "Ecocentro",
    "Aspirapolvere": "Ecocentro",
    "Asse da stiro": "Ecocentro",
    "Assorbenti": "Secco",
    "Astucci": "Secco",
    "Attaccapanni in ferro": "Plastica",
    "Attaccapanni in legno": "Ecocentro",
    "Auricolari": "Secco",
    "Avanzi di cibo": "Umido",
    "Bacinelle in plastica": "Plastica",
    "Bambole": "Secco",
    "Bambù": "Umido",
    "Asta Bandiere": "Secco",
    "Tessuto Bandiera": "Raccolta Indumenti",
    "Barattoli di vernice e solventi": "Ecocentro",
    "Barattoli in acciaio (vuoti e puliti)": "Plastica",
    "Barattoli in alluminio e acciaio (per olio, pelati, tonno, ecc.)": "Plastica",
    "Barattoli in latta (scatole di pelati, ecc.)": "Plastica",
    "Barattoli in plastica per prodotti vari": "Plastica",
    "Barattoli per alimenti in polvere": "Plastica",
    "Barattoli per articoli da cancelleria": "Plastica",
    "Barattoli per detersivi": "Plastica",
    "Barattoli per rullini fotografici": "Plastica",
    "Barattoli per salviette umide": "Plastica",
    "Barattolini di crema": "Plastica",
    "Barre da imballaggio in polistirolo espanso": "Plastica",
    "Batterie cellulare": "Ecocentro",
    "Batterie per auto": "Ecocentro",
    "Battiscopa in legno": "Ecocentro",
    "Bauli": "Ecocentro",
    "Bicchieri e coppette in materiale compostabile (ad es.cellulosa, amido di mais, ecc.)": "Umido",
    "Bicchieri in cristallo": "Secco",
    "Bicchieri in plastica": "Plastica",
    "Bicchieri di vetro": "Secco",
    "Biciclette": "Ecocentro",
    "Bilancia pesa persone": "Ecocentro",
    "Bombole del gas": "Ecocentro",
    "Bombolette spray con simbolo di pericolo T e/o F (contenitore vuoto)": "Ecocentro",
    "Bombolette spray non pericolose (contenitore vuoto)": "Plastica",
    "Borsa dell'acqua calda": "Secco",
    "Borse di Plastica": "Plastica",
    "Borse in cuoio": "Raccolta Indumenti",
    "Bottiglie di plastica per acqua, olio, succhi": "Plastica",
    "Bottiglie di vetro": "Vetro",
    "Box doccia": "Ecocentro",
    "Box per bambini": "Ecocentro",
    "Brick per succo di frutta, tè (senza cannuccia)": "Carta",
    "Brocche di vetro": "Vetro",
    "Buste di carta": "Carta",
    "Buste di plastica": "Plastica",
    "Bustine di tè": "Umido",
    "Caffettiera": "Plastica",
    "Calcinacci": "Ecocentro",
    "Calcolatrici con componenti elettroniche": "Ecocentro",
    "Calze di nylon, lana, cotone": "Raccolta Indumenti",
    "Candeggina (contenitore vuoto e lavato)": "Plastica",
    "Candela": "Secco",
    "Contenitori in plastica per candele": "Secco",
    "Canne da pesca": "Ecocentro",
    "Canne per irrigazione": "Secco",
    "Cannucce": "Secco",
    "Canovacci": "Raccolta Indumenti",
    "Capelli": "Secco",
    "Cappelli": "Raccolta Indumenti",
    "Capsule per macchinette caffè": "Secco",
    "Cards Plastificate": "Plastica",
    "Carbone spento": "Umido",
    "Carica batterie": "Ecocentro",
    "Carrozzine": "Ecocentro",
    "Carta assorbente da cucina (scottex)": "Umido",
    "Carta carbone": "Secco",
    "Carta cerata": "Secco",
    "Carta da forno": "Secco",
    "Carta delle caramelle": "Plastica",
    "Carta patinata": "Plastica",
    "Carta per affettati": "Secco",
    "Carta per formaggio": "Secco",
    "Carta sporca di colla o altre sostanze": "Secco",
    "Carta stagnola (alluminio)": "Plastica",
    "Carta umida imbevuta di liquidi organici (sugo, olio, ecc.)": "Umido",
    "Carta vetrata": "Secco",
    "Cartoncino": "Carta",
    "Cartongesso": "Ecocentro",
    "Cartone da imballaggio": "Carta",
    "Cartone della pizza": "Carta",
    "Cartone per alimenti - tetrapak (per latte, succhi di frutta, ecc.)": "Carta",
    "Cartoni pizza sporchi": "Secco",
    "Cartucce per stampanti": "Ecocentro",
    "Casco moto e bici": "Secco",
    "Cassette audio e video": "Secco",
    "Cassette di legno": "Ecocentro",
    "Cassette per ortofrutta e carni": "Plastica",
    "Cavatappi": "Ecocentro",
    "Cavi elettrici": "Ecocentro",
    "Cd e cd-rom": "Secco",
    "Cellophane": "Plastica",
    "Cenere spenta": "Umido",
    "Cera": "Secco",
    "Ceramica": "Secco",
    "Cerini": "Secco",
    "Cerotti": "Secco",
    "Chiavette usb": "Ecocentro",
    "Chiavi in metallo": "Plastica",
    "Chiodi": "Ecocentro",
    "Ciabatte": "Secco",
    "Cialde caffè con involucro non biodegradabili": "Secco",
    "Cialde caffè con ivolucro biodegradabile": "Umido",
    "Cinture in plastica, stoffa e cuoio": "Raccolta Indumenti",
    "Ciuccio": "Secco",
    "Computer": "Ecocentro",
    "Conchiglie e molluschi": "Umido",
    "Confezioni delle merendine": "Plastica",
    "Confezioni in cartoncino (ad es. della pasta,del dentifricio, dei cereali, ecc.)": "Carta",
    "Confezioni in plastica rigide o flessibili": "Plastica",
    "Contenitore borotalco": "Plastica",
    "Contenitore pasta abrasiva": "Plastica",
    "Contenitore smalto": "Plastica",
    "Contenitori per bibite (lattine)": "Plastica",
    "Coperchi metallici": "Plastica",
    "Coperchietti dei barattoli di yogurt": "Plastica",
    "Corda": "Secco",
    "Cornici in legno": "Secco",
    "Cosmetici": "Secco",
    "Cotone usato": "Secco",
    "Cotton fioc compostabile": "Umido",
    "Cover di cellulari": "Secco",
    "Cravatte": "Secco",
    "Cristallo": "Secco",
    "Cucce per animali domestici": "Secco",
    "Cuscini": "Secco",
    "Damigiane": "Plastica",
    "Dentifricio (tubetto vuoto)": "Plastica",
    "Deodorante per auto": "Secco",
    "Detersivo (sacchetto sporco)": "Secco",
    "Diapositive": "Secco",
    "Dischetti per computer": "Secco",
    "Dischi in vinile": "Secco",
    "Dvd": "Secco",
    "Elastici": "Secco",
    "Etichette adesive": "Secco",
    "Etichette di indumenti": "Secco",
    "Evidenziatori": "Secco",
    "Feltrini": "Secco",
    "Ferro": "Plastica",
    "Fiammiferi": "Umido",
    "Fili elettrici": "Plastica",
    "Filo interdentale": "Secco",
    "Fiori finti": "Secco",
    "Fiori secchi e recisi": "Umido",
    "Fitofarmaci": "Plastica",
    "Foglie": "Umido",
    "Fondi di caffè": "Umido",
    "Forbici": "Plastica",
    "Fotografie": "Secco",
    "Ganci per chiudere i sacchetti": "Secco",
    "Garze sterili": "Secco",
    "Giocattoli": "Secco",
    "Giubbetti catarifrangenti": "Secco",
    "Gommapiuma": "Secco",
    "Graffette": "Secco",
    "Guanti in pelle o lana": "Secco",
    "Guarnizioni": "Secco",
    "Gusci di crostacei": "Umido",
    "Gusci di frutta secca": "Umido",
    "Gusci d'uovo": "Umido",
    "Imballaggi in metallo": "Plastica",
    "Imballaggi in polistirolo": "Plastica",
    "Incensi": "Umido",
    "Insetticidi per uso domestico (barattoli vuoti e puliti)": "Secco",
    "Lacci per scarpe": "Secco",
    "Lamette usa e getta": "Secco",
    "Lampadine a basso consumo": "Secco",
    "Lampadine a incandescenza": "Secco",
    "Lana": "Secco",
    "Lastre raggi": "Secco",
    "Latta": "Plastica",
    "Lattine in alluminio": "Plastica",
    "Lattine in banda stagnata": "Plastica",
    "Legno": "Secco",
    "Lenti a contatto": "Secco",
    "Lenzuola": "Umido",
    "Lettiera naturale per animali": "Umido",
    "Lettiera sintetica per animali": "Secco",
    "Lische di pesce": "Umido",
    "Lucida scarpe": "Secco",
    "Lumini / Cera di lumino": "Secco",
    "Macchina fotografica": "Secco",
    "Mascherine": "Secco",
    "Matite": "Secco",
    "Mestoli di legno": "Secco",
    "Mouse": "Secco",
    "Mozziconi di sigaretta": "Secco",
    "Musicassette": "Secco",
    "Nastri per fiori": "Secco",
    "Nastro adesivo": "Secco",
    "Negativi fotografici": "Secco",
    "Neon": "Plastica",
    "Nylon": "Plastica",
    "Oggetti in gomma": "Secco",
    "Ombrelli": "Secco",
    "Ombrelloni": "Umido",
    "Ossa (avanzi di cibo)": "Umido",
    "Ovatta": "Secco",
    "Padelle": "Plastica",
    "Paglia": "Umido",
    "Paletta raccogli rifiuti": "Secco",
    "Pallets": "Secco",
    "Palline da Tennis": "Secco",
    "Palloni da gioco": "Secco",
    "Panni elettrostatici per la polvere": "Secco",
    "Pannolini": "Secco",
    "Parasole per auto": "Secco",
    "Peli": "Secco",
    "Pellicola fotografica": "Secco",
    "Pellicole per alimenti": "Plastica",
    "Peluche": "Secco",
    "Pennarelli": "Secco",
    "Penne": "Secco",
    "Pennelli": "Secco",
    "Pentole": "Carta",
    "Pergamene": "Carta",
    "Pesticidi": "Secco",
    "Pettini": "Secco",
    "Piante piccole": "Umido",
    "Piastrelle": "Secco",
    "Piastrine per zanzare": "Secco",
    "Piatti in ceramica": "Secco",
    "Pirofile": "Secco",
    "Pneumatici auto piccole quantità": "Plastica",
    "Polistirolo imballaggi": "Plastica",
    "Polistirolo pannelli": "Plastica",
    "Polveri dell'aspirapolvere": "Secco",
    "Posate in metallo": "Plastica",
    "Post-it": "Carta",
    "Profumi (contenitori vuoti)": "Plastica",
    "Profilattici": "Secco",
    "Quaderni": "Carta",
    "Quadri (cornice)": "Carta",
    "Ramaglie": "Secco",
    "Rasoi usa e getta": "Secco",
    "Righelli": "Secco",
    "Riviste": "Carta",
    "Rullino fotografico": "Secco",
    "Sacche per dialisi e per stomatizzati": "Secco",
    "Sacchetti per aspirapolvere": "Secco",
    "Sacchi per alimenti per animali": "Plastica",
    "Sacchi per detersivi": "Plastica",
    "Salviette": "Plastica",
    "Sapone in pezzi e saponette": "Secco",
    "Scarpe e scarponi usati": "Secco",
    "Scarponi da sci rotti": "Secco",
    "Scarti di cucina": "Umido",
    "Scatoloni": "Carta",
    "Sci": "Secco",
    "Scopa": "Secco",
    "Segature (piccole quantità)": "Umido",
    "Sfalcio dell'erba del giardino": "Plastica",
    "Shoppers": "Plastica",
    "Sigarette": "Carta",
    "Siringhe": "Secco",
    "Solventi (T e/o F)": "Secco",
    "Spago": "Secco",
    "Spazzole": "Secco",
    "Spazzolini": "Secco",
    "Spray (T e/o F)": "Secco",
    "Spugne": "Secco",
    "Spugne abrasive": "Secco",
    "Spugne per fiori": "Secco",
    "Spugne sintetiche": "Secco",
    "Stagnola": "Carta",
    "Stampante": "Umido",
    "Stecchi in legno per gelati": "Umido",
    "Stoffa": "Secco",
    "Stoviglie": "Secco",
    "Stracci": "Secco",
    "Stracci da cucina": "Secco",
    "Stracci unti da olio minerale": "Secco",
    "Stuzzicadenti": "Umido",
    "Tamponi per timbri": "Secco",
    "Tanica in banda stagnata": "Plastica",
    "Tappeti": "Secco",
    "Tappezzeria/tappeti": "Secco",
    "Tappi a corona": "Plastica",
    "Tappi di barattoli in metallo": "Plastica",
    "Tazze e tazzine in ceramica rotta": "Secco",
    "Tende in stoffa": "Secco",
    "Tergicristalli rotti": "Secco",
    "Terracotta": "Carta",
    "Tetra-pak": "Carta",
    "Toner": "Carta",
    "Torcia": "Carta",
    "Trielina": "Secco",
    "Trucchi": "Secco",
    "Tubetti di colore": "Plastica",
    "Tubetti di dentifricio": "Plastica",
    "Tubetti per uso alimentare": "Plastica",
    "Tubi in ferro": "Secco",
    "Tubi in gomma": "Secco",
    "Tubi in PVC per idraulico": "Secco",
    "Uncinetto": "Secco",
    "Unghie": "Secco",
    "Uova": "Umido",
    "Valigie": "Secco",
    "Vaschette e barattoli per gelati": "Plastica",
    "Vasetti degli omogeneizzati": "Secco",
    "Vasi in ceramica": "Secco",
    "Vasi in terracotta": "Secco",
    "Ventilatori": "Umido",
    "Verdura avariata": "Umido",
    "Videocassette": "Secco",
    "Zaini": "Secco",
    "Zanzariere": "Secco",
    "Zappa": "Secco",
    "Zerbino": "Secco",
    "Zoccoli": "Secco"
};

// Mappatura per normalizzare i tipi di smaltimento dal JSON ai tipi del calendario
const NORMALIZZA_TIPI = {
    "Plastica": "plastica/metalli",
    "Multi plastica / lattine": "plastica/metalli",
    "plastica": "plastica/metalli", 
    "Umido": "umido",
    "Carta": "carta",
    "Secco": "secco",
    "Vetro": "vetro",
    "Campana del Vetro": "vetro"
};

let dettagliVisibili = false;
let tipoRifiutoCorrente = null;
let dataCorrente = null; // Per tracciare quando aggiornare la data

function initializeApp() {
    console.log('🔄 Inizializzazione app...');
    console.log(`🔄 Data sistema all'avvio: ${new Date().toLocaleString('it-IT')}`);
    
    // Forza aggiornamento immediato all'avvio
    aggiornaDatiConferimento();
    
    // Aggiorna l'orario
    updateCurrentTime();
    
    // Determina logica oraria (come in app.py)
    updateTimeLogic();
    
    // Verifica cambio data ogni 30 secondi per essere più reattivo
    setInterval(verificaCambioData, 30000); // Ogni 30 secondi
    
    // Aggiorna anche dopo 2 secondi per assicurarsi che tutto sia caricato
    setTimeout(() => {
        console.log('🔄 Aggiornamento tardivo per sicurezza...');
        aggiornaDatiConferimento();
    }, 2000);
}

function aggiornaDatiConferimento() {
    // NUOVA LOGICA: mostra il conferimento del GIORNO SUCCESSIVO (come in app.py)
    const oggi = getTodayString();
    const domani = getTomorrowString();
    const tipoRifiuto = CALENDARIO_RIFIUTI[domani] || null;
    
    console.log(`📅 DEBUG DATE:`);
    console.log(`   Oggi: ${oggi}`);
    console.log(`   Domani: ${domani}`);
    console.log(`   Tipo rifiuto domani: ${tipoRifiuto || 'Nessun conferimento'}`);
    console.log(`   Calendario entry: `, CALENDARIO_RIFIUTI[domani]);
    
    // Aggiorna la card con il conferimento di domani
    updateCard(tipoRifiuto, domani);
    
    dataCorrente = oggi; // Salva la data corrente per il controllo
}

function verificaCambioData() {
    const nuovaData = getTodayString();
    console.log(`🔍 Controllo cambio data: corrente=${dataCorrente}, nuova=${nuovaData}`);
    
    if (dataCorrente !== nuovaData) {
        console.log('📅 🚨 RILEVATO CAMBIO DI DATA! Aggiornamento dati conferimento...');
        aggiornaDatiConferimento();
    } else {
        console.log('📅 ✅ Nessun cambio data rilevato');
    }
}

function getTodayString() {
    // Usa l'orario locale del sistema invece di UTC
    const oggi = new Date();
    const year = oggi.getFullYear();
    const month = String(oggi.getMonth() + 1).padStart(2, '0');
    const day = String(oggi.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    console.log(`🕐 Sistema data locale: ${dateString} (ora: ${oggi.getHours()}:${String(oggi.getMinutes()).padStart(2, '0')})`);
    return dateString;
}

function getTomorrowString() {
    // Usa l'orario locale del sistema invece di UTC
    const domani = new Date();
    domani.setDate(domani.getDate() + 1); // Aggiunge 1 giorno
    const year = domani.getFullYear();
    const month = String(domani.getMonth() + 1).padStart(2, '0');
    const day = String(domani.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    console.log(`🕐 Sistema data domani locale: ${dateString}`);
    return dateString;
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

    // Mostra la data odierna nel box
    const oggi = getTodayString();
    dateBadge.innerHTML = `
        <div style="text-align: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">Data di conferimento:</div>
            <div>${formatDate(oggi)}</div>
        </div>
    `;

    if (tipoRifiuto) {
        // Rimuovi classi precedenti
        cardHeader.className = 'card-header-custom';

        // Aggiungi classe specifica per il tipo
        const tipoClass = tipoRifiuto.replace('/', '-');
        cardHeader.classList.add(`card-header-${tipoClass}`);

        // Aggiorna icona
        emojiCircle.innerHTML = ICONE_RIFIUTI[tipoRifiuto] || EMOJI_RIFIUTI[tipoRifiuto] || '🗂️';

        // Aggiorna titolo con descrizione del tipo di rifiuto e icona info
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
                    <i class="fas fa-clock" style="color: #fffbeb; font-size: 1.8em; margin-right: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);"></i> <strong style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Conferisci solo negli orari qui indicati!</strong>
                </div>
                <div class="time-info-subtitle">
                    <div style="margin-top: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 4px 10px; display: inline-block;">
                        <strong style="font-size: 2em; color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">19:00-21:00</strong>
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
    const dettagliHeader = document.querySelector('.dettagli-header');
    const dettagliIcon = document.getElementById('dettagli-icon');
    const dettagliTitle = document.getElementById('dettagli-title');
    const dettagliDescription = document.getElementById('dettagli-description');
    const dettagliListsContainer = document.querySelector('.dettagli-lists') || document.getElementById('search-area');

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
        dettagliTitle.textContent = 'Ricerca Rifiuti';
    }
    if (dettagliDescription) {
        dettagliDescription.textContent = `Cerca un rifiuto del tipo ${tipoCapitalized} per scoprire dove smaltirlo`;
    }

    // Sostituisci le liste con la barra di ricerca
    if (dettagliListsContainer) {
        dettagliListsContainer.innerHTML = `
            <div class="search-section">
                <div class="search-input-container">
                    <input type="text" id="wasteSearchInput" class="search-input" placeholder="Cerca rifiuto (es: bottiglia, carta, ecc.)...">
                </div>
                <div id="searchResults" class="search-results"></div>
            </div>
        `;
        
        // Inizializza la ricerca dinamica
        setTimeout(() => {
            const searchInput = document.getElementById('wasteSearchInput');
            const searchResults = document.getElementById('searchResults');
            
            if (searchInput && searchResults) {
                searchInput.addEventListener('input', (event) => {
                    const query = event.target.value.trim();
                    searchResults.innerHTML = '';
                    
                    if (query.length < 2) {
                        searchResults.innerHTML = '<div class="search-hint">Digita almeno 2 caratteri per iniziare la ricerca</div>';
                        return;
                    }
                    
                    console.log('🔍 Ricerca:', query, 'Tipo:', tipoRifiuto);
                    
                    // Normalizza i tipi per il confronto
                    const normalizeType = (type) => type.toLowerCase().trim();
                    
                    // Normalizza il tipo corrente 
                    const tipoNormalizzato = normalizeType(tipoRifiuto);
                    
                    console.log('🎯 Tipo normalizzato per ricerca:', tipoNormalizzato);
                    
                    const results = Object.entries(DATI_RIFIUTI_COMPLETO)
                        .filter(([nome, destinazione]) => {
                            // Cerca nei rifiuti che contengono la query nel nome
                            const nomeMatches = normalizeType(nome).includes(normalizeType(query));
                            
                            // Normalizza la destinazione usando la mappatura
                            let destinazioneNormalizzata = normalizeType(destinazione);
                            if (NORMALIZZA_TIPI[destinazione]) {
                                destinazioneNormalizzata = normalizeType(NORMALIZZA_TIPI[destinazione]);
                            }
                            
                            // Confronto: la destinazione deve corrispondere al tipo corrente
                            const destinazioneMatches = destinazioneNormalizzata === tipoNormalizzato;
                            
                            if (nomeMatches) {
                                console.log(`   ${nome}: dest="${destinazione}" -> "${destinazioneNormalizzata}" === "${tipoNormalizzato}" ? ${destinazioneMatches}`);
                            }
                            
                            return nomeMatches && destinazioneMatches;
                        })
                        .slice(0, 20) // Limita a 20 risultati
                        .map(([nome, destinazione]) => ({ nome, destinazione }));
                    
                    console.log(`📊 Trovati ${results.length} risultati`);
                    
                    if (results.length === 0) {
                        searchResults.innerHTML = '<div class="no-results">Nessun risultato trovato per questo tipo di rifiuto</div>';
                    } else {
                        results.forEach(({ nome, destinazione }) => {
                            const resultItem = document.createElement('div');
                            resultItem.className = 'search-result-item';
                            resultItem.innerHTML = `
                                <div class="waste-name">${nome}</div>
                                <div class="waste-disposal">${destinazione}</div>
                            `;
                            searchResults.appendChild(resultItem);
                        });
                    }
                });
            }
        }, 100);
    }
}

// Funzione per mostrare/nascondere i dettagli
function toggleDettagli() {
    const dettagliSection = document.getElementById('dettagli-section');
    const cardRifiuto = document.getElementById('card-rifiuto');
    
    if (!dettagliSection) {
        console.error('Sezione dettagli non trovata');
        return;
    }

    if (dettagliVisibili) {
        // Nascondi dettagli
        dettagliSection.style.display = 'none';
        if (cardRifiuto) cardRifiuto.style.display = 'block';
        dettagliVisibili = false;
    } else {
        // Mostra dettagli
        if (tipoRifiutoCorrente) {
            populateDettagli(tipoRifiutoCorrente);
            dettagliSection.style.display = 'block';
            if (cardRifiuto) cardRifiuto.style.display = 'none';
            dettagliVisibili = true;
        }
    }
}

// Event listener per il click fuori dal modal
document.addEventListener('click', (event) => {
    const dettagliSection = document.getElementById('dettagli-section');
    const dettagliCard = document.querySelector('.dettagli-card');
    
    if (dettagliSection && dettagliVisibili && !dettagliCard.contains(event.target) && !event.target.closest('.info-button')) {
        toggleDettagli();
    }
});

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

// Aggiorna la logica oraria ogni minuto
setInterval(updateTimeLogic, 60000);
