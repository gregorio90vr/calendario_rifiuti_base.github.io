let currentLanguage = "it";
let currentDistrict = "basson";
let currentCalendarType = "azzurro";

const APP_DATE = new Date();

const TRANSLATIONS = {
    it: {
        appTitle: "Calendario Rifiuti Verona",
        todayLabel: "OGGI PREPARA",
        headerSubtitle: "Servizio raccolta porta a porta",
        wasteBadge: "Raccolta di domani",
        searchButton: "DOVE LO BUTTO",
        languageButton: "LINGUA",
        districtButton: "QUARTIERE",
        infoButton: "INFO",
        searchModalTitle: "Dove lo butto?",
        searchPlaceholder: "Scrivi cosa vuoi buttare...",
        districtModalTitle: "Seleziona il tuo quartiere",
        districtPlaceholder: "Cerca il tuo quartiere...",
        clusterLegendTitle: "Cluster calendario",
        cluster: {
            arancione: "Arancione",
            azzurro: "Azzurro",
            blu: "Blu",
            verde: "Verde"
        },
        languageModalTitle: "Seleziona lingua",
        infoModalTitle: "Informazioni",
        detailsTitle: "Dettagli conferimento",
        detailsDefault: "Esponi i rifiuti solo dalle 19:00 alle 21:00",
        noResults: "Nessun risultato trovato",
        noDistrictResults: "Nessun quartiere trovato",
        noPickupToday: "Nessun conferimento",
        wasteTypes: {
            umido: "UMIDO",
            plastica: "PLASTICA/METALLI",
            carta: "CARTA",
            secco: "SECCO"
        },
        searchSuggestions: {
            bottiglia: "bottiglia",
            carta: "carta",
            lattina: "lattina",
            avanzi: "avanzi"
        },
        timeStatus: {
            rest: "Nessun ritiro domani: giornata libera",
            canDispose: "Puoi conferire ora (19:00-21:00)",
            prepare: "Prepara oggi per domani, esponi dopo le 19:00",
            tooLate: "Finestra chiusa: prepara per domani"
        },
        infoTabs: {
            app: "App",
            links: "Link Utili",
            sdg: "Sostenibilita",
            about: "Info"
        },
        info: {
            app: {
                title: "Come funziona l'app",
                text: "Questa app ti aiuta a gestire la raccolta differenziata a Verona.",
                f1: "Calendario personalizzato per quartiere",
                f2: "Ricerca intelligente rifiuti",
                f3: "Orari di conferimento (19:00-21:00)",
                f4: "Supporto multilingue (IT/EN)"
            },
            links: {
                title: "Link Utili AMIA",
                text: "Risorse ufficiali per approfondimenti",
                l1t: "Calendari Ufficiali",
                l1d: "Tutti i calendari del porta a porta",
                l2t: "Dizionario Rifiuti",
                l2d: "Dove buttare ogni oggetto",
                l3t: "Sito AMIA",
                l3d: "Portale principale"
            },
            sdg: {
                title: "Obiettivi Sostenibili",
                text: "Contribuisci agli SDGs delle Nazioni Unite",
                s11t: "Citta Sostenibili",
                s11d: "Rendere le citta inclusive e sostenibili",
                s12t: "Consumo Responsabile",
                s12d: "Garantire modelli sostenibili",
                s14t: "Vita Sott'acqua",
                s14d: "Conservare oceani e risorse marine"
            },
            about: {
                title: "Informazioni App",
                v: "Versione",
                u: "Ultimo aggiornamento",
                c: "Compatibilita",
                uVal: "Marzo 2026",
                cVal: "Tutti i dispositivi",
                rights: "Tutti i diritti riservati"
            }
        }
    },
    en: {
        appTitle: "Waste Calendar Verona",
        todayLabel: "PREPARE TODAY",
        headerSubtitle: "Door-to-door collection service",
        wasteBadge: "Collection tomorrow",
        searchButton: "WHERE DO I THROW IT",
        languageButton: "LANGUAGE",
        districtButton: "DISTRICT",
        infoButton: "INFO",
        searchModalTitle: "Where do I throw it?",
        searchPlaceholder: "Type what you want to dispose...",
        districtModalTitle: "Select your district",
        districtPlaceholder: "Search your district...",
        clusterLegendTitle: "Calendar clusters",
        cluster: {
            arancione: "Orange",
            azzurro: "Sky blue",
            blu: "Blue",
            verde: "Green"
        },
        languageModalTitle: "Select language",
        infoModalTitle: "Information",
        detailsTitle: "Collection details",
        detailsDefault: "Put waste out only from 7:00 PM to 9:00 PM",
        noResults: "No results found",
        noDistrictResults: "No district found",
        noPickupToday: "No collection",
        wasteTypes: {
            umido: "ORGANIC",
            plastica: "PLASTIC/METALS",
            carta: "PAPER",
            secco: "DRY WASTE"
        },
        searchSuggestions: {
            bottiglia: "bottle",
            carta: "paper",
            lattina: "can",
            avanzi: "leftovers"
        },
        timeStatus: {
            rest: "No pickup tomorrow: free day",
            canDispose: "You can dispose now (7:00 PM - 9:00 PM)",
            prepare: "Prepare today for tomorrow, take out after 7:00 PM",
            tooLate: "Window closed: prepare for tomorrow"
        },
        infoTabs: {
            app: "App",
            links: "Useful Links",
            sdg: "Sustainability",
            about: "About"
        },
        info: {
            app: {
                title: "How the app works",
                text: "This app helps you manage waste collection in Verona.",
                f1: "Personalized calendar by district",
                f2: "Smart waste search",
                f3: "Collection hours (7:00 PM - 9:00 PM)",
                f4: "Multi-language support (IT/EN)"
            },
            links: {
                title: "Useful AMIA Links",
                text: "Official resources for further information",
                l1t: "Official Calendars",
                l1d: "All door-to-door calendars",
                l2t: "Waste Dictionary",
                l2d: "Where to throw every item",
                l3t: "AMIA Website",
                l3d: "Main portal"
            },
            sdg: {
                title: "Sustainable Goals",
                text: "Contribute to United Nations SDGs",
                s11t: "Sustainable Cities",
                s11d: "Make cities inclusive and sustainable",
                s12t: "Responsible Consumption",
                s12d: "Ensure sustainable patterns",
                s14t: "Life Below Water",
                s14d: "Conserve oceans and marine resources"
            },
            about: {
                title: "App Information",
                v: "Version",
                u: "Last update",
                c: "Compatibility",
                uVal: "March 2026",
                cVal: "All devices",
                rights: "All rights reserved"
            }
        }
    }
};

const WASTE_ICONS = {
    umido: '<i class="fa-solid fa-leaf"></i>',
    plastica: '<i class="fa-solid fa-recycle"></i>',
    carta: '<i class="fa-regular fa-newspaper"></i>',
    secco: '<i class="fa-solid fa-trash"></i>'
};

function normalizeDistrictName(name) {
    return (name || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function getDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function getTomorrowDate() {
    const dt = new Date(APP_DATE);
    dt.setDate(dt.getDate() + 1);
    return dt;
}

function getTimeStatus() {
    const now = new Date();
    const rome = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Rome" }));
    const hour = rome.getHours();

    if (hour >= 19 && hour < 21) return "canDispose";
    if (hour < 19) return "prepare";
    return "tooLate";
}

function getTomorrowWaste() {
    const cal = WASTE_CALENDARS[currentCalendarType] || {};
    return cal[getDateKey(getTomorrowDate())] || null;
}

function getTranslatedDate() {
    const locale = currentLanguage === "it" ? "it-IT" : "en-GB";
    return new Intl.DateTimeFormat(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(APP_DATE);
}

function updateWasteCard() {
    const card = document.getElementById("waste-card");
    const icon = document.getElementById("waste-icon");
    const title = document.getElementById("waste-type-title");

    if (!card || !icon || !title) return;

    const tomorrowWaste = getTomorrowWaste();

    card.className = "waste-card";

    if (!tomorrowWaste) {
        card.classList.add("no-pickup");
        icon.innerHTML = '<i class="fa-regular fa-calendar-check"></i>';
        title.textContent = TRANSLATIONS[currentLanguage].noPickupToday;
        return;
    }

    card.classList.add(tomorrowWaste);
    icon.innerHTML = WASTE_ICONS[tomorrowWaste] || '<i class="fa-solid fa-trash"></i>';
    title.textContent = TRANSLATIONS[currentLanguage].wasteTypes[tomorrowWaste] || tomorrowWaste;
}

function updateDetails() {
    const t = TRANSLATIONS[currentLanguage];
    const detailsTitle = document.getElementById("details-title");
    const detailsText = document.getElementById("details-text");
    const status = document.getElementById("time-status");
    const statusText = document.getElementById("time-status-text");

    if (!detailsTitle || !detailsText || !status || !statusText) return;

    detailsTitle.textContent = t.detailsTitle;
    detailsText.textContent = t.detailsDefault;

    const tomorrowWaste = getTomorrowWaste();
    const statusKey = tomorrowWaste ? getTimeStatus() : "rest";

    status.className = "time-status";
    status.classList.add(statusKey.replace(/([A-Z])/g, "-$1").toLowerCase());
    statusText.textContent = t.timeStatus[statusKey];
}

function resolveDistrictFromState() {
    const district = DISTRICTS.find((d) => normalizeDistrictName(d.name) === currentDistrict);
    if (!district) return null;
    return district;
}

function updateDistrictInfo() {
    const district = resolveDistrictFromState();
    const districtNameEl = document.getElementById("district-name");

    if (!district) return;

    currentCalendarType = district.calendar;
    if (districtNameEl) districtNameEl.textContent = district.name.toUpperCase().trim();
}

function applyTranslations() {
    const t = TRANSLATIONS[currentLanguage];

    const appTitle = document.querySelector(".app-title");
    const todayLabel = document.getElementById("today-label");
    const headerSubtitle = document.getElementById("header-subtitle");
    const badge = document.querySelector(".waste-badge");
    const dateDisplay = document.getElementById("date-display");
    const searchModalTitle = document.getElementById("search-modal-title");
    const districtModalTitle = document.getElementById("district-modal-title");
    const languageModalTitle = document.getElementById("language-modal-title");
    const infoModalTitle = document.getElementById("info-modal-title");
    const searchInput = document.getElementById("search-input");
    const districtSearch = document.getElementById("district-search");

    if (appTitle) appTitle.textContent = t.appTitle;
    if (todayLabel) todayLabel.textContent = t.todayLabel;
    if (headerSubtitle) headerSubtitle.textContent = t.headerSubtitle;
    if (badge) badge.textContent = t.wasteBadge;
    if (dateDisplay) dateDisplay.textContent = getTranslatedDate();
    if (searchModalTitle) searchModalTitle.textContent = t.searchModalTitle;
    if (districtModalTitle) districtModalTitle.textContent = t.districtModalTitle;
    if (languageModalTitle) languageModalTitle.textContent = t.languageModalTitle;
    if (infoModalTitle) infoModalTitle.textContent = t.infoModalTitle;
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    if (districtSearch) districtSearch.placeholder = t.districtPlaceholder;

    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (!key) return;
        const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : null), t);
        if (typeof value === "string") el.textContent = value;
    });

    const navLabels = document.querySelectorAll(".nav-label");
    const navText = [t.searchButton, t.languageButton, t.districtButton, t.infoButton];
    navLabels.forEach((el, idx) => {
        if (navText[idx]) el.textContent = navText[idx];
    });

    document.querySelectorAll(".suggestion-chip span[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (!key) return;
        const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : null), t);
        if (value) el.textContent = value;
    });

    document.querySelectorAll(".language-option").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === currentLanguage);
    });

    applyInfoTranslations();
}

function applyInfoTranslations() {
    const t = TRANSLATIONS[currentLanguage];

    const infoTabs = document.querySelectorAll(".info-tab");
    if (infoTabs[0]) infoTabs[0].textContent = t.infoTabs.app;
    if (infoTabs[1]) infoTabs[1].textContent = t.infoTabs.links;
    if (infoTabs[2]) infoTabs[2].textContent = t.infoTabs.sdg;
    if (infoTabs[3]) infoTabs[3].textContent = t.infoTabs.about;

    const appTab = document.getElementById("app-tab");
    if (appTab) {
        const h3 = appTab.querySelector("h3");
        const p = appTab.querySelector("p");
        const features = appTab.querySelectorAll(".feature-item span");
        if (h3) h3.textContent = t.info.app.title;
        if (p) p.textContent = t.info.app.text;
        if (features[0]) features[0].textContent = t.info.app.f1;
        if (features[1]) features[1].textContent = t.info.app.f2;
        if (features[2]) features[2].textContent = t.info.app.f3;
        if (features[3]) features[3].textContent = t.info.app.f4;
    }

    const linksTab = document.getElementById("links-tab");
    if (linksTab) {
        const h3 = linksTab.querySelector("h3");
        const p = linksTab.querySelector("p");
        const titles = linksTab.querySelectorAll(".link-title");
        const descs = linksTab.querySelectorAll(".link-description");
        if (h3) h3.textContent = t.info.links.title;
        if (p) p.textContent = t.info.links.text;
        if (titles[0]) titles[0].textContent = t.info.links.l1t;
        if (descs[0]) descs[0].textContent = t.info.links.l1d;
        if (titles[1]) titles[1].textContent = t.info.links.l2t;
        if (descs[1]) descs[1].textContent = t.info.links.l2d;
        if (titles[2]) titles[2].textContent = t.info.links.l3t;
        if (descs[2]) descs[2].textContent = t.info.links.l3d;
    }

    const sdgTab = document.getElementById("sdg-tab");
    if (sdgTab) {
        const h3 = sdgTab.querySelector("h3");
        const p = sdgTab.querySelector("p");
        const items = sdgTab.querySelectorAll(".sdg-item");
        if (h3) h3.textContent = t.info.sdg.title;
        if (p) p.textContent = t.info.sdg.text;
        if (items[0]) {
            const h = items[0].querySelector("h4");
            const d = items[0].querySelector("p");
            if (h) h.textContent = t.info.sdg.s11t;
            if (d) d.textContent = t.info.sdg.s11d;
        }
        if (items[1]) {
            const h = items[1].querySelector("h4");
            const d = items[1].querySelector("p");
            if (h) h.textContent = t.info.sdg.s12t;
            if (d) d.textContent = t.info.sdg.s12d;
        }
        if (items[2]) {
            const h = items[2].querySelector("h4");
            const d = items[2].querySelector("p");
            if (h) h.textContent = t.info.sdg.s14t;
            if (d) d.textContent = t.info.sdg.s14d;
        }
    }

    const aboutTab = document.getElementById("about-tab");
    if (aboutTab) {
        const h3 = aboutTab.querySelector("h3");
        const rows = aboutTab.querySelectorAll(".info-item");
        const rights = aboutTab.querySelector(".copyright p:last-child");
        if (h3) h3.textContent = t.info.about.title;
        if (rows[0]) {
            rows[0].querySelector("strong").textContent = t.info.about.v;
            rows[0].querySelector("span").textContent = "3.0";
        }
        if (rows[1]) {
            rows[1].querySelector("strong").textContent = t.info.about.u;
            rows[1].querySelector("span").textContent = t.info.about.uVal;
        }
        if (rows[2]) {
            rows[2].querySelector("strong").textContent = t.info.about.c;
            rows[2].querySelector("span").textContent = t.info.about.cVal;
        }
        if (rights) rights.textContent = t.info.about.rights;
    }
}

function performSearch(query) {
    const target = document.getElementById("search-results");
    if (!target) return;

    const trimmed = (query || "").trim().toLowerCase();
    if (!trimmed) {
        target.innerHTML = "";
        return;
    }

    const dictionary = WASTE_DICTIONARY[currentLanguage];
    const results = [];

    Object.entries(dictionary).forEach(([type, data]) => {
        data.items.forEach((item) => {
            if (item.toLowerCase().includes(trimmed)) {
                results.push({
                    item,
                    type,
                    category: TRANSLATIONS[currentLanguage].wasteTypes[type]
                });
            }
        });
    });

    if (!results.length) {
        target.innerHTML = `<div class="no-results"><i class="fa-solid fa-magnifying-glass"></i><p>${TRANSLATIONS[currentLanguage].noResults}</p></div>`;
        return;
    }

    const html = results
        .slice(0, 120)
        .map((result) => {
            const safeItem = result.item.replace(/'/g, "\\'");
            return `
                <button class="search-result-item ${result.type}" type="button" onclick="selectSearchResult('${result.type}', '${safeItem}')">
                    <span class="result-icon ${result.type}">${WASTE_ICONS[result.type]}</span>
                    <span class="result-content">
                        <span class="result-name">${result.item}</span>
                        <span class="result-category">${result.category}</span>
                    </span>
                </button>
            `;
        })
        .join("");

    target.innerHTML = html;
}

function performSearchBySuggestion(suggestionKey) {
    const t = TRANSLATIONS[currentLanguage];
    const term = t.searchSuggestions[suggestionKey] || suggestionKey;
    const input = document.getElementById("search-input");
    if (input) input.value = term;
    performSearch(term);
}

function selectSearchResult(type, item) {
    console.log("search result", type, item);
    closeSearchModal();
}

function renderDistrictList(filter = "") {
    const list = document.getElementById("district-list");
    if (!list) return;

    const normalizedFilter = (filter || "").trim().toLowerCase();

    const districts = DISTRICTS.filter((d) => d.name.toLowerCase().includes(normalizedFilter));

    if (!districts.length) {
        list.innerHTML = `<div class="no-results"><i class="fa-solid fa-location-dot"></i><p>${TRANSLATIONS[currentLanguage].noDistrictResults}</p></div>`;
        return;
    }

    list.innerHTML = districts
        .map((d) => {
            const normalized = normalizeDistrictName(d.name);
            const selected = normalized === currentDistrict ? " selected" : "";
            return `
                <button class="district-item ${d.calendar}${selected}" type="button" onclick="selectDistrict('${normalized}')">
                    <span class="district-color-dot ${d.calendar}" aria-hidden="true"></span>
                    <span class="district-text-wrap">
                        <span class="district-name">${d.name.trim()}</span>
                    </span>
                </button>
            `;
        })
        .join("");
}

function selectDistrict(districtName) {
    currentDistrict = districtName;
    updateDistrictInfo();
    updateWasteCard();
    updateDetails();
    applyTranslations();
    closeDistrictModal();
}

function selectLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLanguage = lang;
    applyTranslations();
    updateDistrictInfo();
    updateWasteCard();
    updateDetails();
    closeLanguageModal();
}

function showInfoTab(tabName) {
    document.querySelectorAll(".info-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
    });

    document.querySelectorAll(".info-tab-content").forEach((content) => {
        content.classList.toggle("active", content.id === `${tabName}-tab`);
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

function setActiveNav(navKey = "") {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.nav === navKey);
    });
}

function openSearchModal() {
    setActiveNav("search");
    openModal("search-modal");
}
function closeSearchModal() {
    closeModal("search-modal");
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    if (input) input.value = "";
    if (results) results.innerHTML = "";
    setActiveNav("");
}

function openDistrictModal() {
    setActiveNav("district");
    renderDistrictList();
    openModal("district-modal");
}

function closeDistrictModal() {
    closeModal("district-modal");
    const input = document.getElementById("district-search");
    if (input) input.value = "";
    setActiveNav("");
}

function openLanguageModal() {
    setActiveNav("language");
    openModal("language-modal");
}
function closeLanguageModal() {
    closeModal("language-modal");
    setActiveNav("");
}
function openInfoModal() {
    setActiveNav("info");
    openModal("info-modal");
}
function closeInfoModal() {
    closeModal("info-modal");
    setActiveNav("");
}

function applyUrlDistrict() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("quartiere");
    if (!q) return;

    const normalizedParam = normalizeDistrictName(q);
    const match = DISTRICTS.find((d) => normalizeDistrictName(d.name) === normalizedParam);

    if (match) {
        currentDistrict = normalizeDistrictName(match.name);
    }
}

function generateQRCodeURLs(baseURL = window.location.origin + window.location.pathname) {
    const out = {};
    DISTRICTS.forEach((district) => {
        const normalized = normalizeDistrictName(district.name);
        out[district.name.trim()] = {
            url: `${baseURL}?quartiere=${normalized}`,
            calendar: district.calendar,
            qrCodeParam: normalized
        };
    });
    return out;
}

function testURLParams() {
    return {
        currentURL: window.location.href,
        currentDistrict,
        currentCalendarType
    };
}

function bindEvents() {
    const searchInput = document.getElementById("search-input");
    const districtSearchInput = document.getElementById("district-search");

    let searchTimer = null;
    let districtTimer = null;

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => performSearch(e.target.value), 120);
        });
    }

    if (districtSearchInput) {
        districtSearchInput.addEventListener("input", (e) => {
            clearTimeout(districtTimer);
            districtTimer = setTimeout(() => renderDistrictList(e.target.value), 120);
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        closeSearchModal();
        closeDistrictModal();
        closeLanguageModal();
        closeInfoModal();
    });
}

function initializeApp() {
    currentDistrict = normalizeDistrictName(currentDistrict);
    applyUrlDistrict();
    updateDistrictInfo();
    bindEvents();
    applyTranslations();
    updateWasteCard();
    updateDetails();
}

document.addEventListener("DOMContentLoaded", initializeApp);

window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openDistrictModal = openDistrictModal;
window.closeDistrictModal = closeDistrictModal;
window.openLanguageModal = openLanguageModal;
window.closeLanguageModal = closeLanguageModal;
window.openInfoModal = openInfoModal;
window.closeInfoModal = closeInfoModal;
window.performSearchBySuggestion = performSearchBySuggestion;
window.selectSearchResult = selectSearchResult;
window.selectDistrict = selectDistrict;
window.selectLanguage = selectLanguage;
window.showInfoTab = showInfoTab;
window.generateQRCodeURLs = generateQRCodeURLs;
window.testURLParams = testURLParams;
