// Copyright © 2026 Gregorio Pellegrini. Tutti i diritti riservati.
// Rifiuti Verona 3.0 — script principale

/* ============================================================
   STATE
   ============================================================ */
const STORAGE_KEY = "rifiuti3.state";
const TODAY = startOfDay(new Date());

const state = loadState();

function loadState() {
    const defaults = {
        language: "it",
        district: "basson",
        calendar: "azzurro",
        searchFilter: "all",
        calendarMonth: TODAY.getFullYear() * 12 + TODAY.getMonth()
    };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaults;
        return { ...defaults, ...JSON.parse(raw) };
    } catch {
        return defaults;
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            language: state.language,
            district: state.district,
            calendar: state.calendar
        }));
    } catch { /* noop */ }
}

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
    it: {
        header: { district: "Quartiere" },
        upcoming: { title: "Prossimi 7 giorni", viewAll: "Vedi calendario" },
        actions: {
            searchTitle: "Dove lo butto?",
            searchSubtitle: "Cerca un oggetto",
            infoTitle: "Info & link",
            infoSubtitle: "Guida e contatti"
        },
        search: {
            title: "Dove lo butto?",
            placeholder: "Cerca un rifiuto…",
            empty: "Inizia a digitare per cercare un oggetto.",
            noResults: "Nessun risultato per",
            countOne: "1 risultato",
            countMany: (n) => `${n} risultati`,
            filterAll: "Tutto"
        },
        district: {
            title: "Scegli il quartiere",
            placeholder: "Cerca quartiere…",
            countOne: "1 quartiere",
            countMany: (n) => `${n} quartieri`,
            noResults: "Nessun quartiere trovato"
        },
        calendar: {
            title: "Calendario completo",
            months: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
            swipeHint: "Scorri ← → per cambiare mese · tocca un giorno per i dettagli",
            today: "Oggi"
        },
        language: { title: "Lingua" },
        info: {
            title: "Informazioni",
            howTitle: "Come funziona",
            howText: "L'app mostra cosa preparare per il prossimo conferimento porta-a-porta nel tuo quartiere e ti ricorda la finestra 19:00–21:00 in cui esporre i sacchi.",
            linksTitle: "Link utili",
            l1t: "Calendari ufficiali AMIA", l1d: "Tutti i calendari porta-a-porta",
            l2t: "Dizionario rifiuti", l2d: "Dove buttare ogni oggetto",
            l3t: "Sito AMIA", l3d: "Portale principale",
            aboutTitle: "App",
            update: "Aprile 2026"
        },
        weekday: {
            shortMon: "L", shortTue: "M", shortWed: "M",
            shortThu: "G", shortFri: "V", shortSat: "S", shortSun: "D"
        },
        // Hero state
        heroDayToday: "STASERA ESPORRE",
        heroDayTomorrow: "DOMANI MATTINA",
        heroDayNoPickup: "OGGI NESSUNA RACCOLTA",
        heroNextPickup: (d) => `PROSSIMA RACCOLTA · ${d}`,
        heroInstructionPickup: "Esporre tra le 19:00 e le 21:00",
        heroInstructionRest: "Il prossimo ritiro non è oggi. Riposa, ti avviseremo al momento giusto.",
        heroNoData: "Nessun calendario disponibile",
        // Status banner
        statusOk: "Finestra di conferimento APERTA · 19–21",
        statusWarn: (h, m) => `Esci tra ${h}h${m ? ` ${m}min` : ""} · finestra 19–21`,
        statusErr: "Finestra chiusa · prepara per domani",
        statusRest: "Nessun ritiro previsto",
        // Waste types
        waste: {
            umido: "Umido",
            plastica: "Plastica e Metalli",
            carta: "Carta",
            secco: "Secco",
            vetro: "Vetro",
            ecocentro: "Ecocentro",
            ecomobile: "Ecomobile",
            indumenti: "Raccolta indumenti",
            speciali: "Rifiuti speciali"
        },
        // Suggestions chips
        suggestions: ["bottiglia", "carta", "lattina", "avanzi", "pile", "olio"],
        toastDistrict: (n) => `Quartiere impostato: ${n}`,
        clusterNames: {
            arancione: "Arancione", azzurro: "Azzurro",
            blu: "Blu", verde: "Verde", viola: "Viola"
        },
        dateLocale: "it-IT"
    },
    en: {
        header: { district: "District" },
        upcoming: { title: "Next 7 days", viewAll: "View calendar" },
        actions: {
            searchTitle: "Where do I throw it?",
            searchSubtitle: "Search an item",
            infoTitle: "Info & links",
            infoSubtitle: "Guide and contacts"
        },
        search: {
            title: "Where do I throw it?",
            placeholder: "Search waste…",
            empty: "Start typing to find an item.",
            noResults: "No results for",
            countOne: "1 result",
            countMany: (n) => `${n} results`,
            filterAll: "All"
        },
        district: {
            title: "Choose your district",
            placeholder: "Search district…",
            countOne: "1 district",
            countMany: (n) => `${n} districts`,
            noResults: "No district found"
        },
        calendar: {
            title: "Full calendar",
            months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            swipeHint: "Swipe ← → to change month · tap a day for details",
            today: "Today"
        },
        language: { title: "Language" },
        info: {
            title: "Information",
            howTitle: "How it works",
            howText: "This app shows what to prepare for the next door-to-door collection in your district and reminds you of the 7–9 PM window to put bags out.",
            linksTitle: "Useful links",
            l1t: "Official AMIA calendars", l1d: "All door-to-door schedules",
            l2t: "Waste dictionary", l2d: "Where to throw every item",
            l3t: "AMIA website", l3d: "Main portal",
            aboutTitle: "App",
            update: "April 2026"
        },
        weekday: {
            shortMon: "M", shortTue: "T", shortWed: "W",
            shortThu: "T", shortFri: "F", shortSat: "S", shortSun: "S"
        },
        heroDayToday: "PUT OUT TONIGHT",
        heroDayTomorrow: "TOMORROW MORNING",
        heroDayNoPickup: "NO COLLECTION TODAY",
        heroNextPickup: (d) => `NEXT PICKUP · ${d}`,
        heroInstructionPickup: "Put out between 7:00 and 9:00 PM",
        heroInstructionRest: "Next pickup is not today. We'll remind you when it's time.",
        heroNoData: "No calendar available",
        statusOk: "Disposal window OPEN · 7–9 PM",
        statusWarn: (h, m) => `Open in ${h}h${m ? ` ${m}min` : ""} · 7–9 PM`,
        statusErr: "Window closed · prepare for tomorrow",
        statusRest: "No pickup scheduled",
        waste: {
            umido: "Organic",
            plastica: "Plastic & Metals",
            carta: "Paper",
            secco: "Dry waste",
            vetro: "Glass",
            ecocentro: "Recycling Center",
            ecomobile: "Mobile collection",
            indumenti: "Clothing collection",
            speciali: "Special waste"
        },
        suggestions: ["bottle", "paper", "can", "leftovers", "battery", "oil"],
        toastDistrict: (n) => `District set: ${n}`,
        clusterNames: {
            arancione: "Orange", azzurro: "Sky blue",
            blu: "Blue", verde: "Green", viola: "Purple"
        },
        dateLocale: "en-GB"
    }
};

/* ============================================================
   ICONS
   ============================================================ */
const ICONS = {
    umido: "fa-solid fa-leaf",
    plastica: "fa-solid fa-recycle",
    carta: "fa-regular fa-newspaper",
    secco: "fa-solid fa-trash",
    vetro: "fa-solid fa-wine-bottle",
    ecocentro: "fa-solid fa-warehouse",
    ecomobile: "fa-solid fa-truck",
    indumenti: "fa-solid fa-shirt",
    speciali: "fa-solid fa-triangle-exclamation"
};

const PICKUP_TYPES = ["umido", "plastica", "carta", "secco", "vetro"];

/* ============================================================
   UTILS
   ============================================================ */
function startOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return startOfDay(d);
}

function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

function normalizeName(s) {
    return (s || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function t() { return I18N[state.language]; }

function getDistrict() {
    return DISTRICTS.find((d) => normalizeName(d.name) === state.district) || DISTRICTS[0];
}

function getCalendar() {
    return WASTE_CALENDARS[state.calendar] || {};
}

/* The pickup for date D is shown by looking at calendar[D+1] (you put it out
   the evening BEFORE the truck collects). */
function pickupFor(displayDate) {
    const cal = getCalendar();
    const next = addDays(displayDate, 1);
    return cal[dateKey(next)] || null;
}

function findNextPickupDate(fromDate, daysAhead = 14) {
    for (let i = 0; i < daysAhead; i++) {
        const d = addDays(fromDate, i);
        if (pickupFor(d)) return { date: d, type: pickupFor(d) };
    }
    return null;
}

function formatLongDate(date) {
    return new Intl.DateTimeFormat(t().dateLocale, {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(date);
}

function formatShortDate(date) {
    return new Intl.DateTimeFormat(t().dateLocale, {
        weekday: "short",
        day: "numeric",
        month: "short"
    }).format(date);
}

function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[m]);
}

/* ============================================================
   I18N APPLICATION
   ============================================================ */
function applyI18n() {
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const val = key.split(".").reduce((o, k) => (o ? o[k] : null), t());
        if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const val = key.split(".").reduce((o, k) => (o ? o[k] : null), t());
        if (typeof val === "string") el.placeholder = val;
    });
    const langCode = document.getElementById("lang-code");
    if (langCode) langCode.textContent = state.language.toUpperCase();
    document.querySelectorAll(".lang-option").forEach((b) => {
        b.classList.toggle("active", b.dataset.lang === state.language);
    });
}

/* ============================================================
   HERO
   ============================================================ */
function renderHero() {
    const card = document.getElementById("hero-card");
    const dayLabel = document.getElementById("hero-day");
    const iconWrap = document.getElementById("hero-icon");
    const wasteType = document.getElementById("hero-waste-type");
    const instr = document.getElementById("hero-instruction");
    const countdown = document.getElementById("hero-countdown");
    const countdownText = document.getElementById("countdown-text");

    const todayPickup = pickupFor(TODAY);
    const tomorrowPickup = pickupFor(addDays(TODAY, 1));

    let activeType = null;
    let dayLabelText = "";

    if (todayPickup) {
        activeType = todayPickup;
        dayLabelText = t().heroDayToday;
        instr.textContent = t().heroInstructionPickup;
    } else if (tomorrowPickup) {
        activeType = tomorrowPickup;
        dayLabelText = t().heroDayTomorrow;
        instr.textContent = t().heroInstructionRest;
    } else {
        const next = findNextPickupDate(addDays(TODAY, 2));
        if (next) {
            activeType = next.type;
            dayLabelText = t().heroNextPickup(formatShortDate(next.date));
            instr.textContent = t().heroInstructionRest;
        } else {
            dayLabelText = t().heroDayNoPickup;
            instr.textContent = t().heroNoData;
        }
    }

    if (activeType && PICKUP_TYPES.includes(activeType)) {
        card.dataset.type = activeType;
        card.classList.remove("no-pickup");
        iconWrap.innerHTML = `<i class="${ICONS[activeType]}" aria-hidden="true"></i>`;
        wasteType.textContent = t().waste[activeType];
    } else {
        delete card.dataset.type;
        card.classList.add("no-pickup");
        iconWrap.innerHTML = `<i class="fa-regular fa-bed" aria-hidden="true"></i>`;
        wasteType.textContent = t().heroDayNoPickup;
    }

    dayLabel.textContent = dayLabelText;

    // Countdown only for today's pickup
    renderStatus(todayPickup);
    if (todayPickup) {
        const cd = currentCountdown();
        if (cd) {
            countdown.hidden = false;
            countdownText.textContent = cd;
        } else {
            countdown.hidden = true;
        }
    } else {
        countdown.hidden = true;
    }
}

function currentCountdown() {
    // Returns a string like "Apre tra 2h 14min" or "Aperta · chiude tra 1h 5min"
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const lang = state.language;

    if (h < 19) {
        const totalMin = (19 - h) * 60 - m;
        const hh = Math.floor(totalMin / 60);
        const mm = totalMin % 60;
        return lang === "it"
            ? `Apre tra ${hh}h ${mm}min`
            : `Opens in ${hh}h ${mm}min`;
    }
    if (h < 21) {
        const totalMin = (21 - h) * 60 - m;
        const hh = Math.floor(totalMin / 60);
        const mm = totalMin % 60;
        return lang === "it"
            ? `Aperta · chiude tra ${hh}h ${mm}min`
            : `Open · closes in ${hh}h ${mm}min`;
    }
    return null;
}

function renderStatus(todayPickup) {
    const banner = document.getElementById("hero-status");
    const text = document.getElementById("status-text");
    banner.classList.remove("ok", "warn", "err");

    if (!todayPickup) {
        text.textContent = t().statusRest;
        return;
    }
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    if (h >= 19 && h < 21) {
        banner.classList.add("ok");
        text.textContent = t().statusOk;
    } else if (h < 19) {
        banner.classList.add("warn");
        const totalMin = (19 - h) * 60 - m;
        const hh = Math.floor(totalMin / 60);
        const mm = totalMin % 60;
        text.textContent = t().statusWarn(hh, mm);
    } else {
        banner.classList.add("err");
        text.textContent = t().statusErr;
    }
}

/* ============================================================
   TIMELINE (next 7 days)
   ============================================================ */
function renderTimeline() {
    const wrap = document.getElementById("timeline");
    if (!wrap) return;
    const items = [];
    for (let i = 0; i < 7; i++) {
        const d = addDays(TODAY, i);
        const pickup = pickupFor(d);
        const isToday = i === 0;
        const weekday = new Intl.DateTimeFormat(t().dateLocale, { weekday: "short" })
            .format(d).replace(".", "").toUpperCase();
        const num = d.getDate();

        const iconCls = pickup
            ? `<div class="timeline-icon ${pickup}"><i class="${ICONS[pickup]}" aria-hidden="true"></i></div>`
            : `<div class="timeline-icon"><i class="fa-regular fa-circle" aria-hidden="true"></i></div>`;

        const label = pickup
            ? escapeHTML(t().waste[pickup])
            : (state.language === "it" ? "Riposo" : "Rest");

        items.push(`
            <button class="timeline-day${isToday ? " today" : ""}" type="button" role="listitem"
                    data-action="open-calendar" aria-label="${escapeHTML(formatLongDate(d))}">
                <span class="timeline-weekday">${weekday}</span>
                <span class="timeline-day-num">${num}</span>
                ${iconCls}
                <span class="timeline-label">${label}</span>
            </button>
        `);
    }
    wrap.innerHTML = items.join("");
}

/* ============================================================
   DISTRICT
   ============================================================ */
function renderDistrictHeader() {
    const d = getDistrict();
    state.calendar = d.calendar;
    const el = document.getElementById("district-name");
    if (el) el.textContent = d.name.trim();
}

function renderDistrictList(filter = "") {
    const list = document.getElementById("district-list");
    const meta = document.getElementById("district-meta");
    if (!list) return;
    const term = filter.trim().toLowerCase();
    const rows = DISTRICTS.filter((d) => d.name.toLowerCase().includes(term));

    if (!rows.length) {
        list.innerHTML = `<div class="no-results">${t().district.noResults}</div>`;
        meta.textContent = "";
        return;
    }

    meta.textContent = rows.length === 1
        ? t().district.countOne
        : t().district.countMany(rows.length);

    list.innerHTML = rows.map((d) => {
        const norm = normalizeName(d.name);
        const sel = norm === state.district ? " selected" : "";
        return `<button class="district-item${sel}" type="button" data-district="${norm}">
            <span class="cluster-pill ${d.calendar}" aria-hidden="true"></span>
            <span class="district-name">${escapeHTML(d.name.trim())}</span>
            <span class="district-cluster-name">${escapeHTML(t().clusterNames[d.calendar] || d.calendar)}</span>
        </button>`;
    }).join("");
}

function selectDistrict(norm) {
    const match = DISTRICTS.find((d) => normalizeName(d.name) === norm);
    if (!match) return;
    state.district = norm;
    state.calendar = match.calendar;
    saveState();
    closeAllSheets();
    renderAll();
    showToast(t().toastDistrict(match.name.trim()));
}

/* ============================================================
   SEARCH
   ============================================================ */
function buildFilterChips() {
    const wrap = document.getElementById("filter-chips");
    if (!wrap) return;
    const all = ["all", ...Object.keys(t().waste)];
    wrap.innerHTML = all.map((k) => {
        const active = k === state.searchFilter ? " active" : "";
        const label = k === "all" ? t().search.filterAll : t().waste[k];
        const styleVars = k === "all" ? "" :
            ` style="--chip-bg: var(--c-${k}-bg); --chip-fg: var(--c-${k});"`;
        return `<button type="button" class="filter-chip${active}" data-filter="${k}"${styleVars}>${escapeHTML(label)}</button>`;
    }).join("");
}

function buildSuggestions() {
    const wrap = document.getElementById("suggestion-chips");
    if (!wrap) return;
    wrap.innerHTML = t().suggestions.map((s) =>
        `<button type="button" class="filter-chip" data-suggest="${escapeHTML(s)}">${escapeHTML(s)}</button>`
    ).join("");
}

function performSearch(query) {
    const target = document.getElementById("search-results");
    const meta = document.getElementById("search-meta");
    const empty = document.getElementById("search-empty");
    const term = (query || "").trim().toLowerCase();

    if (!term) {
        target.innerHTML = "";
        meta.textContent = "";
        empty.hidden = false;
        buildSuggestions();
        return;
    }
    empty.hidden = true;

    const dict = WASTE_DICTIONARY[state.language] || WASTE_DICTIONARY.it;
    const results = [];
    Object.entries(dict).forEach(([type, data]) => {
        if (state.searchFilter !== "all" && state.searchFilter !== type) return;
        (data.items || []).forEach((item) => {
            if (item.toLowerCase().includes(term)) {
                results.push({ item, type });
            }
        });
    });

    if (!results.length) {
        target.innerHTML = `<div class="no-results">${t().search.noResults} "${escapeHTML(term)}"</div>`;
        meta.textContent = "";
        return;
    }
    meta.textContent = results.length === 1
        ? t().search.countOne
        : t().search.countMany(results.length);

    target.innerHTML = results.slice(0, 200).map((r) => {
        const highlighted = highlightMatch(r.item, term);
        return `<button type="button" class="result-item" data-item="${escapeHTML(r.item)}" data-type="${r.type}">
            <span class="result-icon ${r.type}"><i class="${ICONS[r.type]}" aria-hidden="true"></i></span>
            <span class="result-text">
                <span class="result-name">${highlighted}</span>
                <span class="result-cat ${r.type}">${escapeHTML(t().waste[r.type])}</span>
            </span>
            <i class="fa-solid fa-chevron-right result-arrow" aria-hidden="true"></i>
        </button>`;
    }).join("");
}

function highlightMatch(text, term) {
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx < 0) return escapeHTML(text);
    const before = escapeHTML(text.slice(0, idx));
    const match = escapeHTML(text.slice(idx, idx + term.length));
    const after = escapeHTML(text.slice(idx + term.length));
    return `${before}<mark>${match}</mark>${after}`;
}

function showItemDetail(item, type) {
    const sheet = document.getElementById("sheet-item");
    const title = document.getElementById("item-title");
    const detail = document.getElementById("item-detail");
    title.textContent = "";
    const descMap = {
        it: {
            umido: "Conferisci nell'apposito bidone marrone con sacchetto compostabile.",
            plastica: "Sciacqua e schiaccia. Conferisci nel sacco giallo o nella campana plastica/metalli.",
            carta: "Conferisci pulita e asciutta. Rimuovi parti in plastica.",
            secco: "Sacco grigio per il secco non riciclabile.",
            vetro: "Solo bottiglie e vasi. Conferisci nella campana del vetro.",
            ecocentro: "Porta all'Ecocentro AMIA. Trova il più vicino sul sito amiavr.it.",
            ecomobile: "Aspetta il passaggio dell'Ecomobile o porta all'Ecocentro.",
            indumenti: "Conferisci nei contenitori gialli per la raccolta indumenti.",
            speciali: "Smaltimento speciale: segui le indicazioni nel nome dell'oggetto."
        },
        en: {
            umido: "Use the brown bin with a compostable bag.",
            plastica: "Rinse and crush. Use the yellow bag or plastic/metals container.",
            carta: "Must be clean and dry. Remove plastic parts.",
            secco: "Grey bag for non-recyclable dry waste.",
            vetro: "Only bottles and jars. Use the glass container.",
            ecocentro: "Take to AMIA recycling center. Find the nearest one at amiavr.it.",
            ecomobile: "Wait for the Mobile collection or go to a recycling center.",
            indumenti: "Use yellow clothing collection containers.",
            speciali: "Special disposal: follow the indication in the item name."
        }
    };
    const desc = (descMap[state.language] || descMap.it)[type] || "";

    detail.innerHTML = `
        <div class="item-detail-icon result-icon ${type}">
            <i class="${ICONS[type]}" aria-hidden="true"></i>
        </div>
        <div class="item-detail-cat">${escapeHTML(t().waste[type])}</div>
        <div class="item-detail-name">${escapeHTML(item)}</div>
        <div class="item-detail-desc">${escapeHTML(desc)}</div>
    `;
    openSheet("sheet-item");
}

/* ============================================================
   CALENDAR (full month grid)
   ============================================================ */
const CAL_TODAY_INDEX = TODAY.getFullYear() * 12 + TODAY.getMonth();
let calSelectedKey = null; // "yyyy-mm-dd"

function renderCalendar(direction = 0) {
    const wrap = document.getElementById("cal-grid");
    const label = document.getElementById("cal-month-label");
    const legend = document.getElementById("cal-legend");
    const summary = document.getElementById("cal-summary");
    if (!wrap) return;

    const yy = Math.floor(state.calendarMonth / 12);
    const mm = ((state.calendarMonth % 12) + 12) % 12;
    label.textContent = `${t().calendar.months[mm]} ${yy}`;
    label.classList.toggle("is-current", state.calendarMonth === CAL_TODAY_INDEX);

    const first = new Date(yy, mm, 1);
    const firstWeekday = (first.getDay() + 6) % 7; // Monday=0
    const daysInMonth = new Date(yy, mm + 1, 0).getDate();

    // Counts per pickup type for the month
    const counts = Object.fromEntries(PICKUP_TYPES.map((k) => [k, 0]));

    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(`<div class="cal-cell empty" aria-hidden="true"></div>`);
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(yy, mm, d);
        const pickup = pickupFor(date);
        if (pickup && counts[pickup] != null) counts[pickup] += 1;
        const isToday = isSameDay(date, TODAY);
        const key = dateKey(date);
        const isSelected = calSelectedKey === key;
        const typeAttr = pickup ? ` data-type="${pickup}"` : "";
        const cls = [
            "cal-cell",
            isToday ? "today" : "",
            isSelected ? "selected" : "",
            pickup ? "has-pickup" : ""
        ].filter(Boolean).join(" ");
        const label2 = formatLongDate(date) + (pickup ? ` · ${t().waste[pickup]}` : "");
        cells.push(
            `<button class="${cls}" type="button"${typeAttr} data-day="${key}" aria-label="${escapeHTML(label2)}">
                <span class="cal-num">${d}</span>
                ${pickup ? `<span class="cal-dot"></span>` : ""}
            </button>`
        );
    }
    // Apply slide-in animation if direction provided
    if (direction !== 0) {
        wrap.classList.remove("slide-in-l", "slide-in-r");
        // force reflow to restart animation
        void wrap.offsetWidth;
        wrap.classList.add(direction > 0 ? "slide-in-r" : "slide-in-l");
    }
    wrap.innerHTML = cells.join("");

    // Summary chips per pickup type
    if (summary) {
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        if (total === 0) {
            summary.innerHTML = `<span class="cal-summary-empty">${
                state.language === "it" ? "Nessuna raccolta in questo mese" : "No pickups this month"
            }</span>`;
        } else {
            summary.innerHTML = PICKUP_TYPES
                .filter((k) => counts[k] > 0)
                .map((k) => `
                    <span class="cal-summary-chip" style="--chip-bg: var(--c-${k}-bg); --chip-fg: var(--c-${k});">
                        <i class="${ICONS[k]}" aria-hidden="true"></i>
                        <span class="cal-summary-count">${counts[k]}</span>
                        <span class="cal-summary-label">${escapeHTML(t().waste[k])}</span>
                    </span>
                `).join("");
        }
    }

    // Day detail
    renderDayDetail();

    legend.innerHTML = PICKUP_TYPES.map((k) => `
        <span class="cal-legend-item">
            <span class="cal-legend-swatch" style="background: var(--c-${k}-bg); border:1px solid var(--c-${k});"></span>
            ${escapeHTML(t().waste[k])}
        </span>
    `).join("");
}

function renderDayDetail() {
    const detail = document.getElementById("cal-day-detail");
    if (!detail) return;
    if (!calSelectedKey) {
        detail.hidden = true;
        detail.innerHTML = "";
        return;
    }
    const [yy, mm, dd] = calSelectedKey.split("-").map(Number);
    const date = new Date(yy, mm - 1, dd);
    const pickup = pickupFor(date);
    const long = formatLongDate(date);
    const isToday = isSameDay(date, TODAY);
    const isTomorrow = isSameDay(date, addDays(TODAY, 1));
    let badge = "";
    if (isToday) badge = `<span class="cal-day-badge">${state.language === "it" ? "OGGI" : "TODAY"}</span>`;
    else if (isTomorrow) badge = `<span class="cal-day-badge">${state.language === "it" ? "DOMANI" : "TOMORROW"}</span>`;

    if (pickup) {
        detail.hidden = false;
        detail.innerHTML = `
            <div class="cal-day-detail-inner" data-type="${pickup}">
                <div class="cal-day-icon ${pickup}">
                    <i class="${ICONS[pickup]}" aria-hidden="true"></i>
                </div>
                <div class="cal-day-text">
                    <div class="cal-day-date">${escapeHTML(long)} ${badge}</div>
                    <div class="cal-day-type">${escapeHTML(t().waste[pickup])}</div>
                    <div class="cal-day-hint">${
                        state.language === "it"
                            ? "Esporre la sera precedente tra le 19:00 e le 21:00"
                            : "Put out the previous evening between 7:00 and 9:00 PM"
                    }</div>
                </div>
            </div>
        `;
    } else {
        detail.hidden = false;
        detail.innerHTML = `
            <div class="cal-day-detail-inner empty">
                <div class="cal-day-icon">
                    <i class="fa-regular fa-calendar" aria-hidden="true"></i>
                </div>
                <div class="cal-day-text">
                    <div class="cal-day-date">${escapeHTML(long)} ${badge}</div>
                    <div class="cal-day-type">${state.language === "it" ? "Nessuna raccolta" : "No pickup"}</div>
                </div>
            </div>
        `;
    }
}

function gotoMonth(delta) {
    state.calendarMonth += delta;
    renderCalendar(delta);
}

function gotoToday() {
    if (state.calendarMonth === CAL_TODAY_INDEX && calSelectedKey === dateKey(TODAY)) return;
    const delta = CAL_TODAY_INDEX - state.calendarMonth;
    state.calendarMonth = CAL_TODAY_INDEX;
    calSelectedKey = dateKey(TODAY);
    renderCalendar(delta === 0 ? 0 : (delta > 0 ? 1 : -1));
}

/* Swipe handling for the calendar viewport */
function attachCalendarSwipe() {
    const vp = document.getElementById("cal-viewport");
    if (!vp || vp.dataset.swipeBound) return;
    vp.dataset.swipeBound = "1";

    let startX = 0, startY = 0, dx = 0, dy = 0, tracking = false;
    const grid = () => document.getElementById("cal-grid");
    const THRESHOLD = 50;
    const MAX_TRANSLATE = 80;

    vp.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        startX = t.clientX; startY = t.clientY; dx = 0; dy = 0; tracking = true;
        const g = grid(); if (g) g.style.transition = "none";
    }, { passive: true });

    vp.addEventListener("touchmove", (e) => {
        if (!tracking) return;
        const t = e.touches[0];
        dx = t.clientX - startX;
        dy = t.clientY - startY;
        // Only treat as horizontal swipe if X dominates
        if (Math.abs(dx) < Math.abs(dy)) return;
        const g = grid();
        if (g) {
            const clamped = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, dx * 0.5));
            g.style.transform = `translateX(${clamped}px)`;
            g.style.opacity = String(1 - Math.min(0.3, Math.abs(dx) / 400));
        }
    }, { passive: true });

    vp.addEventListener("touchend", () => {
        if (!tracking) return;
        tracking = false;
        const g = grid();
        if (g) {
            g.style.transition = "transform .25s var(--ease), opacity .25s var(--ease)";
            g.style.transform = "";
            g.style.opacity = "";
        }
        if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            gotoMonth(dx < 0 ? 1 : -1);
        }
    });

    vp.addEventListener("touchcancel", () => {
        tracking = false;
        const g = grid();
        if (g) { g.style.transition = ""; g.style.transform = ""; g.style.opacity = ""; }
    });
}

/* ============================================================
   SHEETS
   ============================================================ */
let currentSheet = null;

function openSheet(id) {
    closeAllSheets({ skipFocus: true });
    const sheet = document.getElementById(id);
    if (!sheet) return;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    currentSheet = id;

    if (id === "sheet-search") {
        buildFilterChips();
        const input = document.getElementById("search-input");
        if (input) {
            setTimeout(() => input.focus(), 50);
            performSearch(input.value);
        }
    }
    if (id === "sheet-district") renderDistrictList("");
    if (id === "sheet-calendar") {
        if (!calSelectedKey) calSelectedKey = dateKey(TODAY);
        renderCalendar();
        attachCalendarSwipe();
    }
}

function closeAllSheets({ skipFocus } = {}) {
    document.querySelectorAll(".sheet").forEach((s) => { s.hidden = true; });
    document.body.style.overflow = "";
    currentSheet = null;
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer = null;
function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
}

/* ============================================================
   EVENTS
   ============================================================ */
function bindEvents() {
    document.addEventListener("click", (e) => {
        const action = e.target.closest("[data-action]");
        if (!action) return;
        const a = action.dataset.action;
        if (a === "open-search") return openSheet("sheet-search");
        if (a === "open-district") return openSheet("sheet-district");
        if (a === "open-language") return openSheet("sheet-language");
        if (a === "open-info") return openSheet("sheet-info");
        if (a === "open-calendar") return openSheet("sheet-calendar");
        if (a === "close-sheet") return closeAllSheets();
        if (a === "clear-search") {
            const i = document.getElementById("search-input");
            if (i) { i.value = ""; performSearch(""); document.querySelector(".search-clear").hidden = true; i.focus(); }
            return;
        }
    });

    // Search input
    let searchTimer;
    const searchInput = document.getElementById("search-input");
    searchInput?.addEventListener("input", (e) => {
        clearTimeout(searchTimer);
        const v = e.target.value;
        document.querySelector(".search-clear").hidden = !v;
        searchTimer = setTimeout(() => performSearch(v), 100);
    });

    // Filter chips delegation
    document.getElementById("filter-chips")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;
        state.searchFilter = btn.dataset.filter;
        buildFilterChips();
        performSearch(searchInput.value);
    });

    // Suggestion chips
    document.getElementById("suggestion-chips")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-suggest]");
        if (!btn) return;
        searchInput.value = btn.dataset.suggest;
        document.querySelector(".search-clear").hidden = false;
        performSearch(searchInput.value);
    });

    // Search results — open detail
    document.getElementById("search-results")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-item]");
        if (!btn) return;
        showItemDetail(btn.dataset.item, btn.dataset.type);
    });

    // District input + list
    let distTimer;
    const distInput = document.getElementById("district-input");
    distInput?.addEventListener("input", (e) => {
        clearTimeout(distTimer);
        distTimer = setTimeout(() => renderDistrictList(e.target.value), 100);
    });
    document.getElementById("district-list")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-district]");
        if (!btn) return;
        selectDistrict(btn.dataset.district);
    });

    // Language
    document.querySelectorAll("[data-lang]").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.language = btn.dataset.lang;
            saveState();
            closeAllSheets();
            renderAll();
        });
    });

    // Calendar nav
    document.getElementById("cal-prev")?.addEventListener("click", () => gotoMonth(-1));
    document.getElementById("cal-next")?.addEventListener("click", () => gotoMonth(1));
    document.getElementById("cal-month-label")?.addEventListener("click", gotoToday);

    // Calendar day selection
    document.getElementById("cal-grid")?.addEventListener("click", (e) => {
        const cell = e.target.closest(".cal-cell[data-day]");
        if (!cell) return;
        calSelectedKey = cell.dataset.day;
        // Update visual selection without re-render flicker
        document.querySelectorAll(".cal-cell.selected").forEach((c) => c.classList.remove("selected"));
        cell.classList.add("selected");
        renderDayDetail();
    });

    // Esc to close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && currentSheet) closeAllSheets();
    });

    // Re-render hero status every minute
    setInterval(() => {
        renderHero();
    }, 60 * 1000);
}

/* ============================================================
   URL deep-link (?quartiere=)
   ============================================================ */
function applyURLDistrict() {
    try {
        const p = new URLSearchParams(location.search);
        const dq = p.get("quartiere") || p.get("district");
        if (!dq) return;
        const norm = normalizeName(dq);
        const match = DISTRICTS.find((d) => normalizeName(d.name) === norm);
        if (match) {
            state.district = norm;
            state.calendar = match.calendar;
            saveState();
        }
    } catch { /* noop */ }
}

/* ============================================================
   INIT
   ============================================================ */
function renderAll() {
    applyI18n();
    renderDistrictHeader();
    renderHero();
    renderTimeline();
    if (currentSheet === "sheet-search") {
        buildFilterChips();
        performSearch(document.getElementById("search-input").value);
    }
}

function init() {
    applyURLDistrict();
    bindEvents();
    renderAll();
}

document.addEventListener("DOMContentLoaded", init);
