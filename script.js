const state = {
    language: "it",
    district: "basson",
    calendar: "azzurro",
    selectedDate: null
};

const TODAY = startOfDay(new Date());

const TRANSLATIONS = {
    it: {
        appTitle: "Calendario Rifiuti Verona",
        todayLabel: "OGGI PREPARA",
        todayLabelBrowsing: "DATA IN CONSULTAZIONE",
        dateStripLabel: "Data di consultazione",
        datePrevLabel: "Giorno precedente",
        dateNextLabel: "Giorno successivo",
        dateTodayButton: "Oggi",
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
            verde: "Verde",
            viola: "Viola"
        },
        languageModalTitle: "Seleziona lingua",
        infoModalTitle: "Informazioni",
        detailsTitle: "Dettagli conferimento",
        detailsDefault: "Esponi i rifiuti solo dalle 19:00 alle 21:00",
        detailsBrowsing: "Stai consultando una data diversa da oggi",
        heroDistrictPrefix: "Zona",
        heroTimeChip: "Conferimento 19:00-21:00",
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
            tooLate: "Finestra chiusa: prepara per domani",
            browsing: "Modalita consultazione calendario"
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
                cVal: "Tutti i dispositivi"
            }
        }
    },
    en: {
        appTitle: "Waste Calendar Verona",
        todayLabel: "PREPARE TODAY",
        todayLabelBrowsing: "BROWSING DATE",
        dateStripLabel: "Browse date",
        datePrevLabel: "Previous day",
        dateNextLabel: "Next day",
        dateTodayButton: "Today",
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
            verde: "Green",
            viola: "Purple"
        },
        languageModalTitle: "Select language",
        infoModalTitle: "Information",
        detailsTitle: "Collection details",
        detailsDefault: "Put waste out only from 7:00 PM to 9:00 PM",
        detailsBrowsing: "You are browsing a date different from today",
        heroDistrictPrefix: "Area",
        heroTimeChip: "Set out 7:00 PM-9:00 PM",
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
            tooLate: "Window closed: prepare for tomorrow",
            browsing: "Calendar browsing mode"
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
                cVal: "All devices"
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

function startOfDay(date) {
    const dt = new Date(date);
    dt.setHours(0, 0, 0, 0);
    return dt;
}

function addDays(baseDate, delta) {
    const dt = new Date(baseDate);
    dt.setDate(dt.getDate() + delta);
    return startOfDay(dt);
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

function formatDateForInput(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateInputValue(value) {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
}

function isViewingToday() {
    return isSameDay(state.selectedDate, TODAY);
}

function getResultsMetaText(scope, count) {
    if (state.language === "en") {
        if (scope === "district") {
            return count === 1 ? "1 district found" : `${count} districts found`;
        }
        return count === 1 ? "1 result" : `${count} results`;
    }

    if (scope === "district") {
        return count === 1 ? "1 quartiere trovato" : `${count} quartieri trovati`;
    }
    return count === 1 ? "1 risultato" : `${count} risultati`;
}

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

function getTimeStatus() {
    const now = new Date();
    const rome = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Rome" }));
    const hour = rome.getHours();

    if (hour >= 19 && hour < 21) return "canDispose";
    if (hour < 19) return "prepare";
    return "tooLate";
}

function getWasteForSelectedDate() {
    const cal = WASTE_CALENDARS[state.calendar] || {};
    const pickupDate = addDays(state.selectedDate, 1);
    return cal[getDateKey(pickupDate)] || null;
}

function getTranslatedDate() {
    const locale = state.language === "it" ? "it-IT" : "en-GB";
    return new Intl.DateTimeFormat(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(state.selectedDate);
}

function getDistrictRecord() {
    return DISTRICTS.find((d) => normalizeDistrictName(d.name) === state.district) || null;
}

function updateDistrictInfo() {
    const t = TRANSLATIONS[state.language];
    const district = getDistrictRecord();
    if (!district) return;

    state.calendar = district.calendar;

    const districtName = document.getElementById("district-name");
    const heroDistrictChip = document.getElementById("hero-district-chip");

    if (districtName) districtName.textContent = district.name.trim().toUpperCase();
    if (heroDistrictChip) heroDistrictChip.textContent = `${t.heroDistrictPrefix}: ${district.name.trim()}`;
}

function updateWasteCard() {
    const t = TRANSLATIONS[state.language];
    const card = document.getElementById("waste-card");
    const icon = document.getElementById("waste-icon");
    const title = document.getElementById("waste-type-title");

    if (!card || !icon || !title) return;

    const todayWaste = getWasteForSelectedDate();
    card.className = "waste-card";

    if (!todayWaste) {
        card.classList.add("no-pickup");
        icon.innerHTML = '<i class="fa-regular fa-calendar-check"></i>';
        title.textContent = t.noPickupToday;
        return;
    }

    card.classList.add(todayWaste);
    icon.innerHTML = WASTE_ICONS[todayWaste] || '<i class="fa-solid fa-trash"></i>';
    title.textContent = t.wasteTypes[todayWaste] || todayWaste;
}

function updateStatusPanel() {
    const t = TRANSLATIONS[state.language];
    const title = document.getElementById("details-title");
    const text = document.getElementById("details-text");

    if (!title || !text) return;

    title.textContent = t.detailsTitle;
    const selectedWaste = getWasteForSelectedDate();

    if (!isViewingToday()) {
        text.textContent = t.detailsBrowsing;
        return;
    }

    text.textContent = selectedWaste ? t.detailsDefault : t.timeStatus.rest;
}

function applyTranslations() {
    const t = TRANSLATIONS[state.language];

    const appTitle = document.getElementById("app-title");
    const todayLabel = document.getElementById("today-label");
    const dateDisplay = document.getElementById("date-display");
    const dateStripLabel = document.getElementById("date-strip-label");
    const dateTodayBtn = document.getElementById("date-today-btn");
    const datePrevBtn = document.getElementById("date-prev-btn");
    const dateNextBtn = document.getElementById("date-next-btn");

    const searchModalTitle = document.getElementById("search-modal-title");
    const districtModalTitle = document.getElementById("district-modal-title");
    const languageModalTitle = document.getElementById("language-modal-title");
    const infoModalTitle = document.getElementById("info-modal-title");

    const searchInput = document.getElementById("search-input");
    const districtSearch = document.getElementById("district-search");

    if (appTitle) appTitle.textContent = t.appTitle;
    if (todayLabel) todayLabel.textContent = isViewingToday() ? t.todayLabel : t.todayLabelBrowsing;
    if (dateDisplay) dateDisplay.textContent = getTranslatedDate();
    if (dateStripLabel) dateStripLabel.textContent = t.dateStripLabel;
    if (dateTodayBtn) dateTodayBtn.textContent = t.dateTodayButton;
    if (datePrevBtn) datePrevBtn.setAttribute("aria-label", t.datePrevLabel);
    if (dateNextBtn) dateNextBtn.setAttribute("aria-label", t.dateNextLabel);

    if (searchModalTitle) searchModalTitle.textContent = t.searchModalTitle;
    if (districtModalTitle) districtModalTitle.textContent = t.districtModalTitle;
    if (languageModalTitle) languageModalTitle.textContent = t.languageModalTitle;
    if (infoModalTitle) infoModalTitle.textContent = t.infoModalTitle;

    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    if (districtSearch) districtSearch.placeholder = t.districtPlaceholder;

    const navLabels = document.querySelectorAll(".nav-label");
    const navValues = [t.searchButton, t.districtButton, t.languageButton, t.infoButton];
    navLabels.forEach((el, idx) => {
        if (navValues[idx]) el.textContent = navValues[idx];
    });

    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (!key) return;
        const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : null), t);
        if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll(".language-option").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === state.language);
    });

    applyInfoTranslations();
    updateDateNavigationUI();
}

function updateDateNavigationUI() {
    const datePicker = document.getElementById("date-picker");
    const todayBtn = document.getElementById("date-today-btn");
    if (datePicker) {
        datePicker.value = formatDateForInput(state.selectedDate);
    }
    if (todayBtn) {
        const isToday = isViewingToday();
        todayBtn.disabled = isToday;
        todayBtn.classList.toggle("is-disabled", isToday);
    }
}

function shiftSelectedDate(days) {
    state.selectedDate = addDays(state.selectedDate, days);
    updateAll();
}

function resetToToday() {
    state.selectedDate = new Date(TODAY);
    updateAll();
}

function applyInfoTranslations() {
    const t = TRANSLATIONS[state.language];

    const tabs = document.querySelectorAll(".info-tab");
    if (tabs[0]) tabs[0].textContent = t.infoTabs.app;
    if (tabs[1]) tabs[1].textContent = t.infoTabs.links;
    if (tabs[2]) tabs[2].textContent = t.infoTabs.sdg;
    if (tabs[3]) tabs[3].textContent = t.infoTabs.about;

    const appTab = document.getElementById("app-tab");
    if (appTab) {
        appTab.querySelector("h3").textContent = t.info.app.title;
        appTab.querySelector("p").textContent = t.info.app.text;
        const li = appTab.querySelectorAll("li");
        if (li[0]) li[0].textContent = t.info.app.f1;
        if (li[1]) li[1].textContent = t.info.app.f2;
        if (li[2]) li[2].textContent = t.info.app.f3;
        if (li[3]) li[3].textContent = t.info.app.f4;
    }

    const linksTab = document.getElementById("links-tab");
    if (linksTab) {
        linksTab.querySelector("h3").textContent = t.info.links.title;
        linksTab.querySelector("p").textContent = t.info.links.text;
        const titles = linksTab.querySelectorAll(".link-title");
        const descs = linksTab.querySelectorAll(".link-description");
        if (titles[0]) titles[0].textContent = t.info.links.l1t;
        if (descs[0]) descs[0].textContent = t.info.links.l1d;
        if (titles[1]) titles[1].textContent = t.info.links.l2t;
        if (descs[1]) descs[1].textContent = t.info.links.l2d;
        if (titles[2]) titles[2].textContent = t.info.links.l3t;
        if (descs[2]) descs[2].textContent = t.info.links.l3d;
    }

    const sdgTab = document.getElementById("sdg-tab");
    if (sdgTab) {
        sdgTab.querySelector("h3").textContent = t.info.sdg.title;
        sdgTab.querySelector("p").textContent = t.info.sdg.text;
        const items = sdgTab.querySelectorAll(".sdg-item");
        if (items[0]) {
            items[0].querySelector("h4").textContent = t.info.sdg.s11t;
            items[0].querySelector("p").textContent = t.info.sdg.s11d;
        }
        if (items[1]) {
            items[1].querySelector("h4").textContent = t.info.sdg.s12t;
            items[1].querySelector("p").textContent = t.info.sdg.s12d;
        }
        if (items[2]) {
            items[2].querySelector("h4").textContent = t.info.sdg.s14t;
            items[2].querySelector("p").textContent = t.info.sdg.s14d;
        }
    }

    const aboutTab = document.getElementById("about-tab");
    if (aboutTab) {
        aboutTab.querySelector("h3").textContent = t.info.about.title;
        const rows = aboutTab.querySelectorAll(".about-list > div");
        if (rows[0]) {
            rows[0].querySelector("strong").textContent = t.info.about.v;
            rows[0].querySelector("span").textContent = "2.0";
        }
        if (rows[1]) {
            rows[1].querySelector("strong").textContent = t.info.about.u;
            rows[1].querySelector("span").textContent = t.info.about.uVal;
        }
        if (rows[2]) {
            rows[2].querySelector("strong").textContent = t.info.about.c;
            rows[2].querySelector("span").textContent = t.info.about.cVal;
        }
    }
}

function performSearch(query) {
    const target = document.getElementById("search-results");
    const meta = document.getElementById("search-results-meta");
    if (!target) return;

    const term = (query || "").trim().toLowerCase();
    if (!term) {
        target.innerHTML = "";
        if (meta) meta.textContent = "";
        return;
    }

    const dict = WASTE_DICTIONARY[state.language];
    const results = [];

    Object.entries(dict).forEach(([type, data]) => {
        data.items.forEach((item) => {
            if (item.toLowerCase().includes(term)) {
                results.push({
                    item,
                    type,
                    category: TRANSLATIONS[state.language].wasteTypes[type]
                });
            }
        });
    });

    if (!results.length) {
        target.innerHTML = `<div class="no-results"><p>${TRANSLATIONS[state.language].noResults}</p></div>`;
        if (meta) meta.textContent = getResultsMetaText("search", 0);
        return;
    }

    if (meta) meta.textContent = getResultsMetaText("search", results.length);

    target.innerHTML = results
        .slice(0, 120)
        .map((r, idx) => {
            const safe = r.item.replace(/'/g, "\\'");
            return `<button class="search-result-item ${r.type}" style="--item-index:${idx % 14};" type="button" onclick="selectSearchResult('${r.type}', '${safe}')">
                <span class="result-main">
                    <span class="result-icon ${r.type}">${WASTE_ICONS[r.type]}</span>
                    <span class="result-content">
                        <span class="result-name">${r.item}</span>
                        <span class="result-category">${r.category}</span>
                    </span>
                </span>
                <span class="result-side">
                    <span class="result-tag ${r.type}">${r.category}</span>
                    <i class="fa-solid fa-chevron-right result-arrow" aria-hidden="true"></i>
                </span>
            </button>`;
        })
        .join("");
}

function performSearchBySuggestion(key) {
    const t = TRANSLATIONS[state.language];
    const value = t.searchSuggestions[key] || key;
    const input = document.getElementById("search-input");
    if (input) input.value = value;
    performSearch(value);
}

function selectSearchResult(type, item) {
    console.log("selected", type, item);
    closeSearchModal();
}

function renderDistrictList(filter = "") {
    const list = document.getElementById("district-list");
    const meta = document.getElementById("district-results-meta");
    if (!list) return;

    const term = filter.trim().toLowerCase();
    const districtRows = DISTRICTS.filter((d) => d.name.toLowerCase().includes(term));

    if (!districtRows.length) {
        list.innerHTML = `<div class="no-results"><p>${TRANSLATIONS[state.language].noDistrictResults}</p></div>`;
        if (meta) meta.textContent = getResultsMetaText("district", 0);
        return;
    }

    if (meta) meta.textContent = getResultsMetaText("district", districtRows.length);

    list.innerHTML = districtRows
        .map((d, idx) => {
            const norm = normalizeDistrictName(d.name);
            const selected = norm === state.district ? " selected" : "";
            return `<button class="district-item ${d.calendar}${selected}" style="--item-index:${idx % 14};" type="button" onclick="selectDistrict('${norm}')">
                <span class="district-text-wrap">
                    <span class="district-name">${d.name.trim()}</span>
                </span>
            </button>`;
        })
        .join("");
}

function selectDistrict(name) {
    state.district = name;
    updateAll();
    closeDistrictModal();
}

function selectLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    state.language = lang;
    updateAll();
    closeLanguageModal();
}

function showInfoTab(tabName) {
    document.querySelectorAll(".info-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
    });

    document.querySelectorAll(".info-tab-content").forEach((section) => {
        section.classList.toggle("active", section.id === `${tabName}-tab`);
    });
}

function setActiveNav(key = "") {
    document.querySelectorAll(".dock-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.nav === key);
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

function openSearchModal() {
    setActiveNav("search");
    openModal("search-modal");
}

function closeSearchModal() {
    closeModal("search-modal");
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const meta = document.getElementById("search-results-meta");
    if (input) input.value = "";
    if (results) results.innerHTML = "";
    if (meta) meta.textContent = "";
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
    const districtParam = params.get("quartiere");
    if (!districtParam) return;

    const normalized = normalizeDistrictName(districtParam);
    const match = DISTRICTS.find((d) => normalizeDistrictName(d.name) === normalized);
    if (match) state.district = normalizeDistrictName(match.name);
}

function generateQRCodeURLs(baseURL = window.location.origin + window.location.pathname) {
    const output = {};
    DISTRICTS.forEach((district) => {
        const normalized = normalizeDistrictName(district.name);
        output[district.name.trim()] = {
            url: `${baseURL}?quartiere=${normalized}`,
            calendar: district.calendar,
            qrCodeParam: normalized
        };
    });
    return output;
}

function testURLParams() {
    return {
        currentURL: window.location.href,
        district: state.district,
        calendar: state.calendar
    };
}

function updateAll() {
    applyTranslations();
    updateDistrictInfo();
    updateWasteCard();
    updateStatusPanel();
}

function bindEvents() {
    const searchInput = document.getElementById("search-input");
    const districtInput = document.getElementById("district-search");
    const prevBtn = document.getElementById("date-prev-btn");
    const nextBtn = document.getElementById("date-next-btn");
    const todayBtn = document.getElementById("date-today-btn");
    const datePicker = document.getElementById("date-picker");

    let searchTimer = null;
    let districtTimer = null;

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => performSearch(e.target.value), 120);
        });
    }

    if (districtInput) {
        districtInput.addEventListener("input", (e) => {
            clearTimeout(districtTimer);
            districtTimer = setTimeout(() => renderDistrictList(e.target.value), 120);
        });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => shiftSelectedDate(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => shiftSelectedDate(1));
    if (todayBtn) todayBtn.addEventListener("click", resetToToday);
    if (datePicker) {
        datePicker.addEventListener("change", (e) => {
            const parsed = parseDateInputValue(e.target.value);
            if (!parsed) return;
            state.selectedDate = startOfDay(parsed);
            updateAll();
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

function initialize() {
    state.district = normalizeDistrictName(state.district);
    state.selectedDate = new Date(TODAY);
    applyUrlDistrict();
    bindEvents();
    updateAll();
}

document.addEventListener("DOMContentLoaded", initialize);

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
