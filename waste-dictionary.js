// Copyright © 2025 Gregorio Pellegrini. Tutti i diritti riservati.
// Dizionario Rifiuti - Dati per la Ricerca "Dove lo butto"

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
                "cenere fredda di legna", "escrementi di animali", "peli di animali",
                "scarti di cucina", "verdure marce", "frutta marcia", "gusci di noce",
                "gusci di nocciole", "gusci di mandorle", "noccioli di pesca",
                "noccioli di albicocca", "noccioli di ciliegia", "torsoli di mela",
                "buccia di banana", "scorza di arancia", "scorza di limone"
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
                "tappi a corona", "bombolette spray vuote", "contenitori gelato",
                "vaschette di alluminio", "lattine bibite", "barattoli di latta",
                "tubetti dentifricio", "flaconi cosmetici", "contenitori shampoo",
                "bottiglie detergenti", "contenitori alimentari", "buste della spesa",
                "involucri di caramelle", "confezioni snack", "packaging alimentari"
            ]
        },
        carta: {
            items: [
                "giornali", "riviste", "libri", "quaderni", "scatole di cartone",
                "fogli di carta", "sacchetti di carta", "cartoni del latte", 
                "buste di carta", "scatole cereali", "cartone ondulato",
                "volantini pubblicitari", "scontrini", "biglietti autobus",
                "carta regalo", "calendari", "agende", "fumetti",
                "scatole pizza pulite", "contenitori tetrapak", "fotocopie",
                "documenti", "lettere", "buste postali", "depliant",
                "cataloghi", "opuscoli", "brochure", "manuali",
                "carta da pacco", "cartoncini", "biglietti da visita",
                "inviti", "cartoline", "poster di carta"
            ]
        },
        secco: {
            items: [
                "pannolini", "assorbenti", "ceramica rotta", "porcellana",
                "giocattoli rotti", "cd", "dvd", "spugne sporche", 
                "mozziconi sigarette", "polvere aspirapolvere", "lettiera chimica",
                "carta oleata", "carta plastificata", "scontrini termici",
                "oggetti di gomma piccoli", "preservativi", "rasoi usa e getta",
                "cotton fioc", "cerotti", "calzini strappati", "collant rotti",
                "scarpe rotte", "borse rotte", "ombrelli rotti",
                "penne scariche", "pennarelli secchi", "evidenziatori vuoti",
                "lampadine a incandescenza", "specchi rotti", "vetro temperato",
                "cristalli rotti", "bicchieri rotti", "piatti rotti"
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
                "cold wood ash", "pet waste", "animal hair", "kitchen waste",
                "rotten vegetables", "spoiled fruit", "walnut shells",
                "hazelnut shells", "almond shells", "peach pits",
                "apricot pits", "cherry pits", "apple cores",
                "banana peels", "orange peel", "lemon peel"
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
                "bottle caps", "empty spray cans", "ice cream containers",
                "aluminum trays", "soda cans", "tin cans",
                "toothpaste tubes", "cosmetic bottles", "shampoo containers",
                "detergent bottles", "food containers", "shopping bags",
                "candy wrappers", "snack packaging", "food packaging"
            ]
        },
        carta: {
            items: [
                "newspapers", "magazines", "books", "notebooks", "cardboard boxes",
                "paper sheets", "paper bags", "milk cartons", 
                "paper bags", "cereal boxes", "cardboard",
                "advertising flyers", "receipts", "bus tickets",
                "gift wrapping", "calendars", "diaries", "comics",
                "clean pizza boxes", "tetrapak containers", "photocopies",
                "documents", "letters", "envelopes", "leaflets",
                "catalogs", "brochures", "pamphlets", "manuals",
                "wrapping paper", "cardstock", "business cards",
                "invitations", "postcards", "paper posters"
            ]
        },
        secco: {
            items: [
                "diapers", "sanitary products", "broken ceramics", "porcelain",
                "broken toys", "cds", "dvds", "dirty sponges", 
                "cigarette butts", "vacuum dust", "chemical litter",
                "wax paper", "plastic-coated paper", "thermal receipts",
                "small rubber objects", "condoms", "disposable razors",
                "cotton swabs", "bandages", "torn socks", "torn pantyhose",
                "broken shoes", "broken bags", "broken umbrellas",
                "empty pens", "dried markers", "empty highlighters",
                "incandescent bulbs", "broken mirrors", "tempered glass",
                "broken crystals", "broken glasses", "broken plates"
            ]
        }
    }
};
