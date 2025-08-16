// Copyright © 2025 Gregorio Pellegrini. Tutti i diritti riservati.
// Calendario Rifiuti - Nuovo Design con Layout Wireframe

// === CONFIGURAZIONE GLOBALE ===
let currentLanguage = 'it';
let currentDistrict = 'basson';
let currentCalendarType = 'azzurro';

// === TRADUZIONI COMPLETE ===
const TRANSLATIONS = {
    it: {
        appTitle: "CALENDARIO RIFIUTI",
        searchButton: "DOVE LO BUTTO",
        modalTitle: "Dove lo butto?",
        searchPlaceholder: "Scrivi cosa vuoi buttare...",
        searchHint: "Es: bottiglie di plastica, giornali, scatolette di tonno",
        closeButton: "Chiudi",
        noResults: "Nessun risultato trovato",
        today: "OGGI",
        tomorrow: "DOMANI",
        noCollection: "Nessun conferimento",
        noPickupToday: "Nessuna consegna per oggi",
        relaxDay: "Giornata libera",
        wasteTypes: {
            umido: "Umido",
            plastica: "Plastica/Metalli",
            carta: "Carta",
            secco: "Secco"
        },
        timeStatus: {
            canDispose: {
                title: "✅ Puoi conferire ora",
                message: "Porta fuori i rifiuti per il ritiro di domani (19:00-21:00)"
            },
            prepare: {
                title: "⏰ Prepara i rifiuti",
                message: "Prepara i rifiuti per domani, esponili dopo le 19:00"
            },
            tooLate: {
                title: "❌ Troppo tardi",
                message: "Prepara i rifiuti per domani, esponili dalle 19.00 alle 21.00"
            }
        },
        sdgTitle: "Obiettivi di Sviluppo Sostenibile",
        sdgDescription: "Contribuisci agli SDGs 11, 12 e 14 attraverso la raccolta differenziata",
        districtSelector: {
            title: "Seleziona il tuo quartiere",
            placeholder: "Cerca il tuo quartiere...",
            noResults: "Nessun quartiere trovato. Prova con un altro nome."
        }
    },
    en: {
        appTitle: "WASTE CALENDAR",
        searchButton: "WHERE DO I THROW IT",
        modalTitle: "Where do I throw it?",
        searchPlaceholder: "Search for an item...",
        searchHint: "Ex: plastic bottles, newspapers, tuna cans",
        closeButton: "Close",
        noResults: "No results found",
        today: "TODAY",
        tomorrow: "TOMORROW",
        noCollection: "No collection",
        noPickupToday: "No pickup for today",
        relaxDay: "Free day",
        wasteTypes: {
            umido: "Organic",
            plastica: "Plastic/Metals",
            carta: "Paper",
            secco: "Dry Waste"
        },
        timeStatus: {
            canDispose: {
                title: "✅ You can dispose now",
                message: "Take out the waste for tomorrow's pickup (7:00 PM - 9:00 PM)"
            },
            prepare: {
                title: "⏰ Prepare waste",
                message: "Prepare waste for tomorrow, take them out after 7:00 PM"
            },
            tooLate: {
                title: "❌ Too late",
                message: "Prepare waste for tomorrow, take them out from 7:00 PM to 9:00 PM"
            }
        },
        sdgTitle: "Sustainable Development Goals",
        sdgDescription: "Contribute to SDGs 11, 12 and 14 through waste separation",
        districtSelector: {
            title: "Select your district",
            placeholder: "Search your district...",
            noResults: "No district found. Try another name."
        }
    }
};

// === DIZIONARIO RIFIUTI ===
const WASTE_DICTIONARY = {
    it: {
        umido: {
            items: [
                "avanzi di cibo", "bucce di frutta", "bucce di verdura", "ossa di pesce", 
                "ossa di carne", "gusci d'uovo", "fondi di caffè", "bustine di tè",
                "pane vecchio", "pasta avanzata", "riso", "fiori recisi", "foglie",
                "tovaglioli sporchi", "fazzoletti usati", "sfalci d'erba",
                "potature", "lettiera biodegradabile", "tappi di sughero naturale",
                "cenere fredda di legna", "escrementi di animali", "peli di animali"
            ]
        },
        plastica: {
            items: [
                "bottiglie di plastica", "flaconi shampoo", "contenitori yogurt", 
                "sacchetti di plastica", "vaschette alimentari", "pellicola trasparente",
                "tappi di plastica", "lattine di alluminio", "barattoli di metallo",
                "scatolette tonno", "carta stagnola", "tetra pak",
                "vaschette polistirolo", "blister medicinali", "reggette di plastica",
                "retine per frutta", "sacchetti freezer", "flaconi detersivi",
                "tappi a corona", "bombolette spray vuote"
            ]
        },
        carta: {
            items: [
                "giornali", "riviste", "libri", "quaderni", "scatole di cartone",
                "fogli di carta", "sacchetti di carta", "cartoni del latte", 
                "buste di carta", "scatole cereali", "cartone ondulato",
                "volantini pubblicitari", "scontrini", "biglietti autobus",
                "carta regalo", "calendari", "agende", "fumetti",
                "scatole pizza pulite", "contenitori tetrapak"
            ]
        },
        secco: {
            items: [
                "pannolini", "assorbenti", "ceramica rotta", "porcellana",
                "giocattoli rotti", "cd", "dvd", "spugne sporche", 
                "mozziconi sigarette", "polvere aspirapolvere", "lettiera chimica",
                "carta oleata", "carta plastificata", "scontrini termici",
                "oggetti di gomma piccoli", "preservativi", "rasoi usa e getta",
                "cotton fioc", "cerotti", "calzini strappati"
            ]
        }
    },
    en: {
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
    }
};

// === CALENDARIO RIFIUTI ESTESO ===
const WASTE_CALENDARS = {
    azzurro: {
 "2025-07-01" : "umido",
        "2025-07-02" : "plastica",
        "2025-07-03" : "umido",
        "2025-07-04" : "secco",
        "2025-07-05" : "umido",
        "2025-07-06" : null,
        "2025-07-07" : "carta",
        "2025-07-08" : "umido",
        "2025-07-09" : "plastica",
        "2025-07-10" : "umido",
        "2025-07-11" : "secco",
        "2025-07-12" : "umido",
        "2025-07-13" : null,
        "2025-07-14" : "carta",
        "2025-07-15" : "umido",
        "2025-07-16" : "plastica",
        "2025-07-17" : "umido",
        "2025-07-18" : "secco",
        "2025-07-19" : "umido",
        "2025-07-20" : null,
        "2025-07-21" : "carta",
        "2025-07-22" : "umido",
        "2025-07-23" : "plastica",
        "2025-07-24" : "umido",
        "2025-07-25" : "secco",
        "2025-07-26" : "umido",
        "2025-07-27" : null,
        "2025-07-28" : "carta",
        "2025-07-29" : "umido",
        "2025-07-30" : "plastica",
        "2025-07-31" : "umido",
        "2025-08-01" : "secco",
        "2025-08-02" : "umido",
        "2025-08-03" : null,
        "2025-08-04" : "carta",
        "2025-08-05" : "umido",
        "2025-08-06" : "plastica",
        "2025-08-07" : "umido",
        "2025-08-08" : "secco",
        "2025-08-09" : "umido",
        "2025-08-10" : null,
        "2025-08-11" : "carta",
        "2025-08-12" : "umido",
        "2025-08-13" : "plastica",
        "2025-08-14" : "umido",
        "2025-08-15" : "secco",
        "2025-08-16" : "umido",
        "2025-08-17" : null,
        "2025-08-18" : "carta",
        "2025-08-19" : "umido",
        "2025-08-20" : "plastica",
        "2025-08-21" : "umido",
        "2025-08-22" : "secco",
        "2025-08-23" : "umido",
        "2025-08-24" : null,
        "2025-08-25" : "carta",
        "2025-08-26" : "umido",
        "2025-08-27" : "plastica",
        "2025-08-28" : "umido",
        "2025-08-29" : "secco",
        "2025-08-30" : "umido",
        "2025-08-31" : null,
        "2025-09-01" : "carta",
        "2025-09-02" : "umido",
        "2025-09-03" : "plastica",
        "2025-09-04" : "umido",
        "2025-09-05" : "secco",
        "2025-09-06" : "umido",
        "2025-09-07" : null,
        "2025-09-08" : "carta",
        "2025-09-09" : "umido",
        "2025-09-10" : "plastica",
        "2025-09-11" : "umido",
        "2025-09-12" : "secco",
        "2025-09-13" : "umido",
        "2025-09-14" : null,
        "2025-09-15" : "carta",
        "2025-09-16" : "umido",
        "2025-09-17" : "plastica",
        "2025-09-18" : null,
        "2025-09-19" : "secco",
        "2025-09-20" : "umido",
        "2025-09-21" : null,
        "2025-09-22" : "carta",
        "2025-09-23" : "umido",
        "2025-09-24" : "plastica",
        "2025-09-25" : null,
        "2025-09-26" : "secco",
        "2025-09-27" : "umido",
        "2025-09-28" : null,
        "2025-09-29" : "carta",
        "2025-09-30" : "umido",
        "2025-10-01" : "plastica",
        "2025-10-02" : null,
        "2025-10-03" : "secco",
        "2025-10-04" : "umido",
        "2025-10-05" : null,
        "2025-10-06" : "carta",
        "2025-10-07" : "umido",
        "2025-10-08" : "plastica",
        "2025-10-09" : null,
        "2025-10-10" : "secco",
        "2025-10-11" : "umido",
        "2025-10-12" : null,
        "2025-10-13" : "carta",
        "2025-10-14" : "umido",
        "2025-10-15" : "plastica",
        "2025-10-16" : null,
        "2025-10-17" : "secco",
        "2025-10-18" : "umido",
        "2025-10-19" : null,
        "2025-10-20" : "carta",
        "2025-10-21" : "umido",
        "2025-10-22" : "plastica",
        "2025-10-23" : null,
        "2025-10-24" : "secco",
        "2025-10-25" : "umido",
        "2025-10-26" : null,
        "2025-10-27" : "carta",
        "2025-10-28" : "umido",
        "2025-10-29" : "plastica",
        "2025-10-30" : null,
        "2025-10-31" : "secco",
        "2025-11-01" : "umido",
        "2025-11-02" : null,
        "2025-11-03" : "carta",
        "2025-11-04" : "umido",
        "2025-11-05" : "plastica",
        "2025-11-06" : null,
        "2025-11-07" : "secco",
        "2025-11-08" : "umido",
        "2025-11-09" : null,
        "2025-11-10" : "carta",
        "2025-11-11" : "umido",
        "2025-11-12" : "plastica",
        "2025-11-13" : null,
        "2025-11-14" : "secco",
        "2025-11-15" : "umido",
        "2025-11-16" : null,
        "2025-11-17" : "carta",
        "2025-11-18" : "umido",
        "2025-11-19" : "plastica",
        "2025-11-20" : null,
        "2025-11-21" : "secco",
        "2025-11-22" : "umido",
        "2025-11-23" : null,
        "2025-11-24" : "carta",
        "2025-11-25" : "umido",
        "2025-11-26" : "plastica",
        "2025-11-27" : null,
        "2025-11-28" : "secco",
        "2025-11-29" : "umido",
        "2025-11-30" : null,
        "2025-12-01" : "carta",
        "2025-12-02" : "umido",
        "2025-12-03" : "plastica",
        "2025-12-04" : null,
        "2025-12-05" : "secco",
        "2025-12-06" : "umido",
        "2025-12-07" : null,
        "2025-12-08" : "carta",
        "2025-12-09" : "umido",
        "2025-12-10" : "plastica",
        "2025-12-11" : null,
        "2025-12-12" : "secco",
        "2025-12-13" : "umido",
        "2025-12-14" : null,
        "2025-12-15" : "carta",
        "2025-12-16" : "umido",
        "2025-12-17" : "plastica",
        "2025-12-18" : null,
        "2025-12-19" : "secco",
        "2025-12-20" : "umido",
        "2025-12-21" : null,
        "2025-12-22" : "carta",
        "2025-12-23" : "umido",
        "2025-12-24" : "plastica",
        "2025-12-25" : null,
        "2025-12-26" : "secco",
        "2025-12-27" : "umido",
        "2025-12-28" : null,
        "2025-12-29" : "carta",
        "2025-12-30" : "umido",
        "2025-12-31" : "plastica"
    },
    verde: {
                "2025-07-01" : "umido",
        "2025-07-02" : "carta",
        "2025-07-03" : "umido",
        "2025-07-04" : "secco",
        "2025-07-05" : "umido",
        "2025-07-06" : null,
        "2025-07-07" : "carta",
        "2025-07-08" : "umido",
        "2025-07-09" : "plastica",
        "2025-07-10" : "umido",
        "2025-07-11" : "secco",
        "2025-07-12" : "umido",
        "2025-07-13" : null,
        "2025-07-14" : "plastica",
        "2025-07-15" : "umido",
        "2025-07-16" : "carta",
        "2025-07-17" : "umido",
        "2025-07-18" : "secco",
        "2025-07-19" : "umido",
        "2025-07-20" : null,
        "2025-07-21" : "plastica",
        "2025-07-22" : "umido",
        "2025-07-23" : "carta",
        "2025-07-24" : "umido",
        "2025-07-25" : "secco",
        "2025-07-26" : "umido",
        "2025-07-27" : null,
        "2025-07-28" : "plastica",
        "2025-07-29" : "umido",
        "2025-07-30" : "carta",
        "2025-07-31" : "umido",
        "2025-08-01" : "secco",
        "2025-08-02" : "umido",
        "2025-08-03" : null,
        "2025-08-04" : "plastica",
        "2025-08-05" : "umido",
        "2025-08-06" : "carta",
        "2025-08-07" : "umido",
        "2025-08-08" : "secco",
        "2025-08-09" : "umido",
        "2025-08-10" : null,
        "2025-08-11" : "plastica",
        "2025-08-12" : "umido",
        "2025-08-13" : "carta",
        "2025-08-14" : "umido",
        "2025-08-15" : "secco",
        "2025-08-16" : "umido",
        "2025-08-17" : null,
        "2025-08-18" : "plastica",
        "2025-08-19" : "umido",
        "2025-08-20" : "carta",
        "2025-08-21" : "umido",
        "2025-08-22" : "secco",
        "2025-08-23" : "umido",
        "2025-08-24" : null,
        "2025-08-25" : "plastica",
        "2025-08-26" : "umido",
        "2025-08-27" : "carta",
        "2025-08-28" : "umido",
        "2025-08-29" : "secco",
        "2025-08-30" : "umido",
        "2025-08-31" : null,
        "2025-09-01" : "plastica",
        "2025-09-02" : "umido",
        "2025-09-03" : "carta",
        "2025-09-04" : "umido",
        "2025-09-05" : "secco",
        "2025-09-06" : "umido",
        "2025-09-07" : null,
        "2025-09-08" : "plastica",
        "2025-09-09" : "umido",
        "2025-09-10" : "carta",
        "2025-09-11" : "umido",
        "2025-09-12" : "secco",
        "2025-09-13" : "umido",
        "2025-09-14" : null,
        "2025-09-15" : "umido",
        "2025-09-16" : "plastica",
        "2025-09-17" : "secco",
        "2025-09-18" : "carta",
        "2025-09-19" : "umido",
        "2025-09-20" : null,
        "2025-09-21" : null,
        "2025-09-22" : "umido",
        "2025-09-23" : "plastica",
        "2025-09-24" : "secco",
        "2025-09-25" : "carta",
        "2025-09-26" : "umido",
        "2025-09-27" : null,
        "2025-09-28" : null,
        "2025-09-29" : "umido",
        "2025-09-30" : "plastica",
        "2025-10-01" : "secco",
        "2025-10-02" : "carta",
        "2025-10-03" : "umido",
        "2025-10-04" : null,
        "2025-10-05" : null,
        "2025-10-06" : "umido",
        "2025-10-07" : "plastica",
        "2025-10-08" : "secco",
        "2025-10-09" : "carta",
        "2025-10-10" : "umido",
        "2025-10-11" : null,
        "2025-10-12" : null,
        "2025-10-13" : "umido",
        "2025-10-14" : "plastica",
        "2025-10-15" : "secco",
        "2025-10-16" : "carta",
        "2025-10-17" : "umido",
        "2025-10-18" : null,
        "2025-10-19" : null,
        "2025-10-20" : "umido",
        "2025-10-21" : "plastica",
        "2025-10-22" : "secco",
        "2025-10-23" : "carta",
        "2025-10-24" : "umido",
        "2025-10-25" : null,
        "2025-10-26" : null,
        "2025-10-27" : "umido",
        "2025-10-28" : "plastica",
        "2025-10-29" : "secco",
        "2025-10-30" : "carta",
        "2025-10-31" : "umido",
        "2025-11-01" : null,
        "2025-11-02" : null,
        "2025-11-03" : "umido",
        "2025-11-04" : "plastica",
        "2025-11-05" : "secco",
        "2025-11-06" : "carta",
        "2025-11-07" : "umido",
        "2025-11-08" : null,
        "2025-11-09" : null,
        "2025-11-10" : "umido",
        "2025-11-11" : "plastica",
        "2025-11-12" : "secco",
        "2025-11-13" : "carta",
        "2025-11-14" : "umido",
        "2025-11-15" : null,
        "2025-11-16" : null,
        "2025-11-17" : "umido",
        "2025-11-18" : "plastica",
        "2025-11-19" : "secco",
        "2025-11-20" : "carta",
        "2025-11-21" : "umido",
        "2025-11-22" : null,
        "2025-11-23" : null,
        "2025-11-24" : "umido",
        "2025-11-25" : "plastica",
        "2025-11-26" : "secco",
        "2025-11-27" : "carta",
        "2025-11-28" : "umido",
        "2025-11-29" : null,
        "2025-11-30" : null,
        "2025-12-01" : "umido",
        "2025-12-02" : "plastica",
        "2025-12-03" : "secco",
        "2025-12-04" : "carta",
        "2025-12-05" : "umido",
        "2025-12-06" : null,
        "2025-12-07" : null,
        "2025-12-08" : "umido",
        "2025-12-09" : "plastica",
        "2025-12-10" : "secco",
        "2025-12-11" : "carta",
        "2025-12-12" : "umido",
        "2025-12-13" : null,
        "2025-12-14" : null,
        "2025-12-15" : "umido",
        "2025-12-16" : "plastica",
        "2025-12-17" : "secco",
        "2025-12-18" : "carta",
        "2025-12-19" : "umido",
        "2025-12-20" : null,
        "2025-12-21" : null,
        "2025-12-22" : "umido",
        "2025-12-23" : "plastica",
        "2025-12-24" : "secco",
        "2025-12-25" : "carta",
        "2025-12-26" : "umido",
        "2025-12-27" : null,
        "2025-12-28" : null,
        "2025-12-29" : "umido",
        "2025-12-30" : "plastica",
        "2025-12-31" : "secco"
    }
};

// === QUARTIERI ===
const DISTRICTS = [
    { name: "Basson", calendar: "azzurro" },
    { name: "Borgo Milano", calendar: "verde" },
    { name: "Borgo Roma", calendar: "azzurro" },
    { name: "Borgo Trento", calendar: "verde" },
    { name: "Borgo Venezia", calendar: "azzurro" },
    { name: "Cattarossola", calendar: "verde" },
    { name: "Centro Storico", calendar: "azzurro" },
    { name: "Chievo", calendar: "verde" },
    { name: "Golosine", calendar: "azzurro" },
    { name: "La Rizza", calendar: "verde" },
    { name: "Parona", calendar: "azzurro" },
    { name: "Pozzo Dipinto", calendar: "verde" },
    { name: "Quinzano", calendar: "azzurro" },
    { name: "Sacra Famiglia", calendar: "verde" },
    { name: "San Lazzaro", calendar: "azzurro" },
    { name: "San Massimo", calendar: "verde" },
    { name: "Santa Lucia", calendar: "azzurro" },
    { name: "Santo Stefano", calendar: "verde" },
    { name: "Stadio", calendar: "azzurro" },
    { name: "Tombetta", calendar: "verde" },
    { name: "Valdonega", calendar: "azzurro" },
    { name: "Veronetta", calendar: "verde" }
];

// === ICONE RIFIUTI ===
const WASTE_ICONS = {
    umido: '<i class="fas fa-seedling"></i>',
    plastica: '<i class="fas fa-recycle"></i>',  // Using recycle icon
    carta: '<i class="fas fa-newspaper"></i>',
    secco: '<i class="fas fa-trash"></i>'
};

// === UTILITY FUNCTIONS ===
function getCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat(currentLanguage === 'it' ? 'it-IT' : 'en-US', options).format(now);
}

function formatDateKey(date = new Date()) {
    return date.toISOString().split('T')[0];
}

function getWasteForDate(date = new Date()) {
    const dateKey = formatDateKey(date);
    const calendar = WASTE_CALENDARS[currentCalendarType];
    return calendar ? calendar[dateKey] : null;
}

// Ottiene il rifiuto da preparare oggi (quello di domani)
function getTomorrowWaste() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getWasteForDate(tomorrow);
}

function getNextWasteDate() {
    const calendar = WASTE_CALENDARS[currentCalendarType];
    if (!calendar) return null;

    const today = new Date();
    for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dateKey = formatDateKey(nextDate);
        if (calendar[dateKey]) {
            return { date: nextDate, waste: calendar[dateKey] };
        }
    }
    return null;
}

function getTimeStatus() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 19 && hour <= 21) {
        return 'canDispose';
    } else if (hour < 19) {
        return 'prepare';
    } else {
        return 'tooLate';
    }
}

// === UI UPDATE FUNCTIONS ===
function updateWasteCard() {
    const wasteCard = document.getElementById('waste-info-card');
    const wasteIcon = document.getElementById('waste-icon');
    const wasteType = document.getElementById('waste-type');
    const wasteDate = document.getElementById('waste-date');
    
    if (!wasteCard || !wasteIcon || !wasteType || !wasteDate) return;
    
    // La logica è: oggi preparo il rifiuto che verrà ritirato domani
    const tomorrowWaste = getTomorrowWaste();
    
    if (tomorrowWaste) {
        // C'è un ritiro domani, mostro cosa preparare oggi
        wasteCard.className = 'waste-info-card';
        wasteCard.classList.add(tomorrowWaste);
        
        wasteIcon.innerHTML = WASTE_ICONS[tomorrowWaste];
        wasteType.textContent = TRANSLATIONS[currentLanguage].wasteTypes[tomorrowWaste];
        wasteDate.textContent = TRANSLATIONS[currentLanguage].tomorrow;
    } else {
        // Non c'è ritiro domani - mostro sempre che oggi non c'è nulla da fare
        wasteCard.className = 'waste-info-card';
        wasteCard.classList.add('no-pickup'); // Classe speciale per "nessun ritiro"
        wasteIcon.innerHTML = '<i class="fas fa-calendar-check"></i>';
        wasteType.textContent = TRANSLATIONS[currentLanguage].noPickupToday;
        wasteDate.textContent = TRANSLATIONS[currentLanguage].relaxDay;
    }
}

function updateScheduleInfo() {
    const scheduleTitle = document.getElementById('time-title');
    const scheduleMessage = document.getElementById('time-message');
    const scheduleBox = document.getElementById('schedule-info-box');
    
    if (!scheduleTitle || !scheduleMessage || !scheduleBox) return;
    
    // Controlla se domani c'è un ritiro
    const tomorrowWaste = getTomorrowWaste();
    
    if (!tomorrowWaste) {
        // Nessun ritiro domani - mostra messaggio speciale
        scheduleTitle.textContent = currentLanguage === 'it' ? 
            '🛋️ Giorno di riposo' : '🛋️ Rest day';
        scheduleMessage.textContent = currentLanguage === 'it' ? 
            'Oggi non devi preparare nessun rifiuto' : 
            'Today you don\'t need to prepare any waste';
    } else {
        // C'è un ritiro domani - mostra info sui tempi
        const timeStatus = getTimeStatus();
        const statusInfo = TRANSLATIONS[currentLanguage].timeStatus[timeStatus];
        
        scheduleTitle.textContent = statusInfo.title;
        scheduleMessage.textContent = statusInfo.message;
    }
    
    // Update box color based on status
    scheduleBox.className = 'schedule-info-box';
    scheduleBox.classList.add(timeStatus);
}

function updateDistrictInfo() {
    const districtName = document.getElementById('selected-district-name');
    const calendarType = document.getElementById('selected-calendar-type');
    
    // Header elements
    const districtNameHeader = document.getElementById('selected-district-name-header');
    const calendarTypeHeader = document.getElementById('selected-calendar-type-header');
    
    const district = DISTRICTS.find(d => d.name.toLowerCase() === currentDistrict.toLowerCase());
    if (district) {
        const calendarTypeText = currentLanguage === 'it' ? 
            `Calendario ${district.calendar.charAt(0).toUpperCase() + district.calendar.slice(1)}` :
            `${district.calendar.charAt(0).toUpperCase() + district.calendar.slice(1)} Calendar`;
        
        // Update old district info (if still exists)
        if (districtName) districtName.textContent = district.name;
        if (calendarType) calendarType.textContent = calendarTypeText;
        
        // Update header district info
        if (districtNameHeader) districtNameHeader.textContent = district.name;
        if (calendarTypeHeader) {
            // Show only the calendar type without "Calendario/Calendar"
            calendarTypeHeader.textContent = district.calendar.charAt(0).toUpperCase() + district.calendar.slice(1);
        }
        
        currentCalendarType = district.calendar;
    }
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update header
    const appTitle = document.getElementById('app-title');
    if (appTitle) {
        appTitle.innerHTML = `<i class="fas fa-calendar-alt header-icon"></i>${TRANSLATIONS[currentLanguage].appTitle}`;
    }
    
    // Update navigation labels
    const searchButton = document.getElementById('search-text');
    if (searchButton) {
        searchButton.textContent = TRANSLATIONS[currentLanguage].searchButton;
    }
    
    // Update language button
    const langButton = document.querySelector('.current-lang');
    if (langButton) {
        langButton.textContent = currentLanguage === 'it' ? 'ITA/ENG' : 'ENG/ITA';
    }
    
    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === currentLanguage);
    });
    
    // Update all content
    updateWasteCard();
    updateScheduleInfo();
    updateDistrictInfo();
}

// === MODAL FUNCTIONS ===
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

function openSearchModal() {
    openModal('search-modal');
    setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
    }, 350);
}

function closeSearchModal() {
    closeModal('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
}

function openDistrictModal() {
    openModal('district-modal');
    renderDistrictList();
    setTimeout(() => {
        const districtSearch = document.getElementById('district-search');
        if (districtSearch) districtSearch.focus();
    }, 350);
}

function closeDistrictModal() {
    closeModal('district-modal');
    const districtSearch = document.getElementById('district-search');
    if (districtSearch) districtSearch.value = '';
}

function openLanguageModal() {
    openModal('language-modal');
}

function closeLanguageModal() {
    closeModal('language-modal');
}

function openInfoModal() {
    openModal('info-modal');
}

function closeInfoModal() {
    closeModal('info-modal');
}

// === SEARCH FUNCTIONS ===
function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer || !query.trim()) {
        if (resultsContainer) resultsContainer.innerHTML = '';
        return;
    }
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    const dictionary = WASTE_DICTIONARY[currentLanguage];
    
    Object.entries(dictionary).forEach(([wasteType, data]) => {
        data.items.forEach(item => {
            if (item.toLowerCase().includes(lowerQuery)) {
                results.push({
                    item: item,
                    category: TRANSLATIONS[currentLanguage].wasteTypes[wasteType],
                    type: wasteType
                });
            }
        });
    });
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>${TRANSLATIONS[currentLanguage].noResults}</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = results.map(result => `
        <div class="search-result-item ${result.type}">
            <div class="search-result-title">${result.item}</div>
            <div class="search-result-category">${result.category}</div>
        </div>
    `).join('');
}

// === DISTRICT FUNCTIONS ===
function renderDistrictList(filter = '') {
    const districtList = document.getElementById('district-list');
    if (!districtList) return;
    
    const filteredDistricts = DISTRICTS.filter(district => 
        district.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredDistricts.length === 0) {
        districtList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-map-marker-alt"></i>
                <p>${TRANSLATIONS[currentLanguage].districtSelector.noResults}</p>
            </div>
        `;
        return;
    }
    
    districtList.innerHTML = filteredDistricts.map(district => `
        <div class="district-item" onclick="selectDistrict('${district.name.toLowerCase()}')">
            <div class="district-calendar-icon ${district.calendar}"></div>
            <div class="district-item-info">
                <div class="district-item-name">${district.name}</div>
                <div class="district-item-calendar">Calendario ${district.calendar.charAt(0).toUpperCase() + district.calendar.slice(1)}</div>
            </div>
        </div>
    `).join('');
}

function selectDistrict(districtName) {
    currentDistrict = districtName;
    updateDistrictInfo();
    updateWasteCard();
    updateScheduleInfo();
    closeDistrictModal();
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Calendario Rifiuti - Nuovo Design Caricato');
    
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = getCurrentDate();
    }
    
    // Update every minute
    setInterval(() => {
        updateWasteCard();
        updateScheduleInfo();
    }, 60000);
    
    // Navigation event listeners
    document.getElementById('search-button')?.addEventListener('click', openSearchModal);
    document.getElementById('district-button')?.addEventListener('click', openDistrictModal);
    document.getElementById('language-button')?.addEventListener('click', openLanguageModal);
    document.getElementById('info-button')?.addEventListener('click', openInfoModal);
    
    // Modal close buttons
    document.getElementById('close-btn')?.addEventListener('click', closeSearchModal);
    document.getElementById('district-close-btn')?.addEventListener('click', closeDistrictModal);
    document.getElementById('language-close-btn')?.addEventListener('click', closeLanguageModal);
    document.getElementById('info-close-btn')?.addEventListener('click', closeInfoModal);
    
    // Modal overlays
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Search input
    let searchTimeout;
    document.getElementById('search-input')?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => performSearch(e.target.value), 300);
    });
    
    // District search input
    let districtSearchTimeout;
    document.getElementById('district-search')?.addEventListener('input', (e) => {
        clearTimeout(districtSearchTimeout);
        districtSearchTimeout = setTimeout(() => renderDistrictList(e.target.value), 300);
    });
    
    // Language options
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            switchLanguage(option.dataset.lang);
            closeLanguageModal();
        });
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeDistrictModal();
            closeLanguageModal();
            closeInfoModal();
        }
    });
    
    // Initialize app
    switchLanguage('it');
    updateDistrictInfo();
    updateWasteCard();
    updateScheduleInfo();
    
    console.log('© 2025 Gregorio Pellegrini. Tutti i diritti riservati.');
});
