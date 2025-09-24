// =========================================
// CALENDARIO RIFIUTI VERONA - NEW DESIGN
// Basato su wireframe fornito dall'utente
// © 2025 Gregorio Pellegrini
// =========================================

// === CONFIGURAZIONE GLOBALE ===
let currentLanguage = 'it';
let currentDistrict = 'basson';
let currentCalendarType = 'azzurro';

// === DATA FISSA DELL'APP ===
// La data viene salvata una sola volta all'avvio dell'app per evitare 
// inconsistenze durante l'uso (cambio quartiere, lingua, ecc.)
// Questa data rimane costante per tutta la sessione dell'app
const APP_START_DATE = new Date(); // Data salvata all'avvio dell'app

// === TRADUZIONI COMPLETE ===
const TRANSLATIONS = {
    it: {
        appTitle: "CALENDARIO RIFIUTI VERONA",
        searchButton: "DOVE LO BUTTO",
        districtButton: "QUARTIERE", 
        languageButton: "LINGUA",
        infoButton: "INFO",
        modalTitle: "Dove lo butto?",
        searchPlaceholder: "Scrivi cosa vuoi buttare...",
        closeButton: "Chiudi",
        noResults: "Nessun risultato trovato",
        today: "OGGI",
        tomorrow: "DOMANI",
        noCollection: "Nessun conferimento",
        noPickupToday: "Nessuna consegna per oggi",
        relaxDay: "Giornata libera",
        wasteTypes: {
            umido: "UMIDO",
            plastica: "PLASTICA/METALLI", 
            carta: "CARTA",
            secco: "SECCO"
        }, 
        timeStatus: {
            rest: {
                title: "🛋️ GIORNO DI RIPOSO",
                message: "Oggi non devi preparare nessun rifiuto"
            },
            canDispose: {
                title: "✅ Puoi conferire ora", 
                message: "Porta fuori i rifiuti per il ritiro (19:00-21:00)"
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
        districtSelector: {
            title: "Seleziona il tuo quartiere",
            placeholder: "Cerca il tuo quartiere...",
            noResults: "Nessun quartiere trovato. Prova con un altro nome."
        },
        searchSuggestions: {
            bottiglia: "bottiglia",
            carta: "carta",
            lattina: "lattina", 
            avanzi: "avanzi"
        },
        detailsTitle: "Dettagli Conferimento",
        detailsDefault: "Esponi i rifiuti SOLO dalle 19:00 alle 21:00",
        infoModal: {
            title: "Informazioni",
            tabs: {
                app: "App",
                links: "Link Utili", 
                sdg: "Sostenibilità",
                about: "Info"
            },
            app: {
                title: "Come funziona l'app",
                description: "Questa app ti aiuta a gestire la raccolta differenziata a Verona. Controlla il calendario del tuo quartiere e scopri dove buttare ogni oggetto.",
                features: {
                    calendar: "Calendario personalizzato per quartiere",
                    search: "Ricerca intelligente rifiuti", 
                    schedule: "Orari di conferimento (19:00-21:00)",
                    multilang: "Supporto multilingue (IT/EN)"
                }
            },
            links: {
                title: "Link Utili AMIA",
                description: "Risorse ufficiali per approfondimenti",
                calendar: {
                    title: "Calendari Ufficiali",
                    description: "Tutti i calendari del porta a porta"
                },
                dictionary: {
                    title: "Dizionario Rifiuti", 
                    description: "Dove buttare ogni oggetto"
                },
                website: {
                    title: "Sito AMIA",
                    description: "Portale principale"
                }
            },
            sdg: {
                title: "Obiettivi Sostenibili",
                description: "Contribuisci agli SDGs delle Nazioni Unite",
                goal11: {
                    title: "Città Sostenibili",
                    description: "Rendere le città inclusive e sostenibili"
                },
                goal12: {
                    title: "Consumo Responsabile", 
                    description: "Garantire modelli sostenibili"
                },
                goal14: {
                    title: "Vita Sott'acqua",
                    description: "Conservare oceani e risorse marine"
                }
            },
            about: {
                title: "Informazioni App",
                version: "Versione",
                lastUpdate: "Ultimo aggiornamento",
                lastUpdateValue: "Settembre 2025",
                compatibility: "Compatibilità",
                compatibilityValue: "Tutti i dispositivi",
                copyright: "© 2025 Gregorio Pellegrini",
                rights: "Tutti i diritti riservati"
            }
        }
    },
    en: {
        appTitle: "WASTE CALENDAR VERONA",
        searchButton: "WHERE DO I THROW IT",
        districtButton: "DISTRICT",
        languageButton: "LANGUAGE", 
        infoButton: "INFO",
        modalTitle: "Where do I throw it?",
        searchPlaceholder: "Search for an item...",
        closeButton: "Close",
        noResults: "No results found", 
        today: "TODAY",
        tomorrow: "TOMORROW",
        noCollection: "No collection",
        noPickupToday: "No pickup for today",
        relaxDay: "Free day",
        wasteTypes: {
            umido: "ORGANIC",
            plastica: "PLASTIC/METALS",
            carta: "PAPER", 
            secco: "DRY WASTE"
        },
        timeStatus: {
            rest: {
                title: "🛋️ REST DAY",
                message: "Today you don't need to prepare any waste"
            },
            canDispose: {
                title: "✅ You can dispose now",
                message: "Take out the waste for pickup (7:00 PM - 9:00 PM)"
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
        districtSelector: {
            title: "Select your district",
            placeholder: "Search your district...",
            noResults: "No district found. Try another name."
        },
        searchSuggestions: {
            bottiglia: "bottle",
            carta: "paper",
            lattina: "can",
            avanzi: "leftovers"
        },
        detailsTitle: "Collection Details",
        detailsDefault: "Put out waste ONLY from 7:00 PM to 9:00",
        infoModal: {
            title: "Information",
            tabs: {
                app: "App",
                links: "Useful Links",
                sdg: "Sustainability", 
                about: "About"
            },
            app: {
                title: "How the app works",
                description: "This app helps you manage waste collection in Verona. Check your neighborhood calendar and discover where to throw every item.",
                features: {
                    calendar: "Personalized calendar by neighborhood",
                    search: "Smart waste search",
                    schedule: "Collection hours (7:00 PM - 9:00 PM)",
                    multilang: "Multi-language support (IT/EN)"
                }
            },
            links: {
                title: "Useful AMIA Links",
                description: "Official resources for further information",
                calendar: {
                    title: "Official Calendars",
                    description: "All door-to-door calendars"
                },
                dictionary: {
                    title: "Waste Dictionary",
                    description: "Where to throw every item"
                },
                website: {
                    title: "AMIA Website", 
                    description: "Main portal"
                }
            },
            sdg: {
                title: "Sustainable Goals",
                description: "Contribute to UN SDGs",
                goal11: {
                    title: "Sustainable Cities",
                    description: "Make cities inclusive and sustainable"
                },
                goal12: {
                    title: "Responsible Consumption",
                    description: "Ensure sustainable patterns"
                },
                goal14: {
                    title: "Life Below Water",
                    description: "Conserve oceans and marine resources"
                }
            },
            about: {
                title: "App Information",
                version: "Version",
                lastUpdate: "Last update",
                lastUpdateValue: "September 2025",
                compatibility: "Compatibility",
                compatibilityValue: "All devices",
                copyright: "© 2025 Gregorio Pellegrini",
                rights: "All rights reserved"
            }
        }
    }
};

// === ICONE RIFIUTI ===
const WASTE_ICONS = {
    umido: '<i class="fas fa-leaf"></i>',
    plastica: '<i class="fas fa-recycle"></i>',
    carta: '<i class="fas fa-newspaper"></i>',
    secco: '<i class="fas fa-trash"></i>'
};

// === UTILITY FUNCTIONS ===
function getCurrentDate() {
    const options = {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat(currentLanguage === 'it' ? 'it-IT' : 'en-US', options).format(APP_START_DATE);
}

function formatDateKey(date = APP_START_DATE) {
    return date.toISOString().split('T')[0];
}

// === GESTIONE PARAMETRI URL ===
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const quartiere = params.get('quartiere');
    
    console.log('🔗 URL Parameters detected:', { quartiere });
    
    return {
        quartiere: quartiere
    };
}

function validateDistrict(quartiereName) {
    if (!quartiereName) return null;
    
    // Converte il nome del quartiere in lowercase per il confronto
    const normalizedName = quartiereName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Cerca il quartiere nella lista
    const district = DISTRICTS.find(d => 
        d.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === normalizedName
    );
    
    if (district) {
        console.log('✅ Valid district found:', district.name, '- Calendar:', district.calendar);
        return district.name.toLowerCase();
    } else {
        console.warn('⚠️ Invalid district from URL:', quartiereName);
        return null;
    }
}

// === DEBUG UTILITIES ===
function getAppDateInfo() {
    const today = formatDateKey(APP_START_DATE);
    const tomorrow = new Date(APP_START_DATE);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowKey = formatDateKey(tomorrow);
    
    return {
        displayedDate: APP_START_DATE.toLocaleDateString(),
        todayKey: today,
        tomorrowKey: tomorrowKey,
        currentCalendar: currentCalendarType,
        todayWasteInCalendar: getWasteForDate(APP_START_DATE),
        tomorrowWasteInCalendar: getTomorrowWaste(),
        wasteToShow: getTomorrowWaste(),
        logic: "Oggi preparo il rifiuto che verrà ritirato domani",
        timeStatus: getTimeStatus()
    };
}

function testAllCalendarsForDate(dateKey) {
    const results = {};
    Object.keys(WASTE_CALENDARS).forEach(calendarType => {
        const calendar = WASTE_CALENDARS[calendarType];
        results[calendarType] = calendar[dateKey] || 'null';
    });
    return results;
}

// === FORCE UPDATE UTILITY ===
function forceUpdateAll() {
    console.log('🔄 Force updating all components...');
    updateDistrictInfo();
    updateWasteCard();
    updateDetailsSection();
    console.log('✅ Force update complete');
}

function getWasteForDate(date = APP_START_DATE) {
    const dateKey = formatDateKey(date);
    const calendar = WASTE_CALENDARS[currentCalendarType];
    return calendar ? calendar[dateKey] : null;
}

function getTomorrowWaste() {
    const tomorrow = new Date(APP_START_DATE);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getWasteForDate(tomorrow);
}

function getTimeStatus() {
    // Usa sempre il fuso orario di Roma (Europe/Rome)
    const now = new Date();
    const romeTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
    const hour = romeTime.getHours();
    
    if (hour >= 19 && hour < 21) {
        return 'canDispose';
    } else if (hour < 19) {
        return 'prepare';
    } else {
        return 'tooLate';
    }
}

// === UI UPDATE FUNCTIONS ===
function updateWasteCard() {
    const wasteCard = document.getElementById('waste-card');
    const wasteIconCircle = document.getElementById('waste-icon-circle');
    const wasteIcon = document.getElementById('waste-icon');
    const wasteTypeTitle = document.getElementById('waste-type-title');
    
    if (!wasteCard || !wasteIcon || !wasteTypeTitle) return;
    
    // Debug: log current state before updating
    console.log('🔄 Updating waste card - Calendar:', currentCalendarType, 'Date:', formatDateKey(APP_START_DATE));
    
    // La logica è: oggi preparo il rifiuto che verrà ritirato domani
    const tomorrowWaste = getTomorrowWaste();
    
    console.log('🗑️ Tomorrow waste for', currentCalendarType, 'calendar:', tomorrowWaste);
    
    // Reset classes
    wasteCard.className = 'waste-card';
    
    if (tomorrowWaste) {
        // C'è un ritiro domani, mostro cosa preparare oggi
        wasteCard.classList.add(tomorrowWaste);
        wasteIcon.innerHTML = WASTE_ICONS[tomorrowWaste];
        wasteTypeTitle.textContent = TRANSLATIONS[currentLanguage].wasteTypes[tomorrowWaste];
    } else {
        // Non c'è ritiro domani
        wasteCard.classList.add('no-pickup');
        wasteIcon.innerHTML = '<i class="fas fa-calendar-check"></i>';
        wasteTypeTitle.textContent = TRANSLATIONS[currentLanguage].noPickupToday;
    }
}

function updateDetailsSection() {
    const detailsTitle = document.getElementById('details-title');
    const detailsText = document.getElementById('details-text');
    const timeStatus = document.getElementById('time-status');
    const timeStatusText = document.getElementById('time-status-text');
    
    if (!detailsTitle || !detailsText || !timeStatus || !timeStatusText) return;
    
    // Update titles
    detailsTitle.textContent = TRANSLATIONS[currentLanguage].detailsTitle;
    detailsText.textContent = TRANSLATIONS[currentLanguage].detailsDefault;
    
    // Controlla se domani c'è un ritiro
    const tomorrowWaste = getTomorrowWaste();
    let statusKey = 'rest'; // Default status
    
    if (!tomorrowWaste) {
        // Nessun ritiro domani - mostra messaggio speciale
        statusKey = 'rest';
    } else {
        // C'è un ritiro domani - mostra info sui tempi
        statusKey = getTimeStatus();
    }
    
    const statusInfo = TRANSLATIONS[currentLanguage].timeStatus[statusKey];
    timeStatusText.textContent = statusInfo.title;
    
    // Update time status classes
    timeStatus.className = 'time-status';
    timeStatus.classList.add(statusKey.replace(/([A-Z])/g, '-$1').toLowerCase());
}

function updateDistrictInfo() {
    const districtName = document.getElementById('district-name');
    
    const district = DISTRICTS.find(d => d.name.toLowerCase() === currentDistrict.toLowerCase());
    if (district && districtName) {
        const oldCalendar = currentCalendarType;
        districtName.textContent = district.name.toUpperCase();
        currentCalendarType = district.calendar;
        
        if (oldCalendar !== currentCalendarType) {
            console.log('📅 Calendar type updated:', oldCalendar, '->', currentCalendarType);
        }
    } else {
        console.warn('⚠️ District not found or element missing:', currentDistrict);
    }
}

function updateLanguage() {
    // Update title
    const appTitle = document.querySelector('.app-title');
    if (appTitle) {
        appTitle.textContent = TRANSLATIONS[currentLanguage].appTitle;
    }
    
    // Update date
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        dateDisplay.textContent = getCurrentDate();
    }
    
    // Update navigation labels
    const navLabels = document.querySelectorAll('.nav-label');
    const navTexts = [
        TRANSLATIONS[currentLanguage].searchButton,
        TRANSLATIONS[currentLanguage].languageButton, 
        TRANSLATIONS[currentLanguage].districtButton,
        TRANSLATIONS[currentLanguage].infoButton
    ];
    
    navLabels.forEach((label, index) => {
        if (navTexts[index]) {
            label.textContent = navTexts[index];
        }
    });
    
    // Update modal titles
    const searchModalTitle = document.getElementById('search-modal-title');
    if (searchModalTitle) {
        searchModalTitle.textContent = TRANSLATIONS[currentLanguage].modalTitle;
    }
    
    const districtModalTitle = document.getElementById('district-modal-title');
    if (districtModalTitle) {
        districtModalTitle.textContent = TRANSLATIONS[currentLanguage].districtSelector.title;
    }
    
    const languageModalTitle = document.getElementById('language-modal-title');
    if (languageModalTitle) {
        languageModalTitle.textContent = currentLanguage === 'it' ? 'Seleziona Lingua' : 'Select Language';
    }
    
    const infoModalTitle = document.getElementById('info-modal-title');
    if (infoModalTitle) {
        infoModalTitle.textContent = TRANSLATIONS[currentLanguage].infoModal.title;
    }
    
    // Update search placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = TRANSLATIONS[currentLanguage].searchPlaceholder;
    }
    
    // Update district search placeholder
    const districtSearch = document.getElementById('district-search');
    if (districtSearch) {
        districtSearch.placeholder = TRANSLATIONS[currentLanguage].districtSelector.placeholder;
    }
    
    // Update search suggestions
    const searchSuggestions = document.querySelectorAll('.suggestion-chip span[data-translate]');
    searchSuggestions.forEach(suggestion => {
        const key = suggestion.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = TRANSLATIONS[currentLanguage];
        for (const k of keys) {
            translation = translation[k];
        }
        if (translation) {
            suggestion.textContent = translation;
        }
    });
    
    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === currentLanguage);
    });
    
    // Update info modal content
    updateInfoModalContent();
    
    // Update all content - IMPORTANT: updateDistrictInfo() MUST be called first
    // to update currentCalendarType before updateWasteCard() uses it
    updateDistrictInfo();
    updateWasteCard();
    updateDetailsSection();
}

// === INFO MODAL UPDATE ===
function updateInfoModalContent() {
    const t = TRANSLATIONS[currentLanguage].infoModal;
    
    // Update tab labels
    const appTab = document.querySelector('[data-tab="app"] span');
    if (appTab) appTab.textContent = t.tabs.app;
    
    const linksTab = document.querySelector('[data-tab="links"] span');
    if (linksTab) linksTab.textContent = t.tabs.links;
    
    const sdgTab = document.querySelector('[data-tab="sdg"] span');
    if (sdgTab) sdgTab.textContent = t.tabs.sdg;
    
    const aboutTab = document.querySelector('[data-tab="about"] span');
    if (aboutTab) aboutTab.textContent = t.tabs.about;
    
    // Update App tab content
    const appTabContent = document.getElementById('app-tab');
    if (appTabContent) {
        const appTitle = appTabContent.querySelector('h3');
        if (appTitle) appTitle.textContent = t.app.title;
        
        const appDescription = appTabContent.querySelector('p');
        if (appDescription) appDescription.textContent = t.app.description;
        
        const featureItems = appTabContent.querySelectorAll('.feature-item span');
        if (featureItems.length >= 4) {
            featureItems[0].textContent = t.app.features.calendar;
            featureItems[1].textContent = t.app.features.search;
            featureItems[2].textContent = t.app.features.schedule;
            featureItems[3].textContent = t.app.features.multilang;
        }
    }
    
    // Update Links tab content
    const linksTabContent = document.getElementById('links-tab');
    if (linksTabContent) {
        const linksTitle = linksTabContent.querySelector('h3');
        if (linksTitle) linksTitle.textContent = t.links.title;
        
        const linksDescription = linksTabContent.querySelector('p');
        if (linksDescription) linksDescription.textContent = t.links.description;
        
        const linkTitles = linksTabContent.querySelectorAll('.link-title');
        const linkDescriptions = linksTabContent.querySelectorAll('.link-description');
        
        if (linkTitles.length >= 3 && linkDescriptions.length >= 3) {
            linkTitles[0].textContent = t.links.calendar.title;
            linkDescriptions[0].textContent = t.links.calendar.description;
            
            linkTitles[1].textContent = t.links.dictionary.title;
            linkDescriptions[1].textContent = t.links.dictionary.description;
            
            linkTitles[2].textContent = t.links.website.title;
            linkDescriptions[2].textContent = t.links.website.description;
        }
    }
    
    // Update SDG tab content
    const sdgTabContent = document.getElementById('sdg-tab');
    if (sdgTabContent) {
        const sdgTitle = sdgTabContent.querySelector('h3');
        if (sdgTitle) sdgTitle.textContent = t.sdg.title;
        
        const sdgDescription = sdgTabContent.querySelector('p');
        if (sdgDescription) sdgDescription.textContent = t.sdg.description;
        
        const sdgItems = sdgTabContent.querySelectorAll('.sdg-item');
        if (sdgItems.length >= 3) {
            const goal11Title = sdgItems[0].querySelector('h4');
            const goal11Desc = sdgItems[0].querySelector('p');
            if (goal11Title) goal11Title.textContent = t.sdg.goal11.title;
            if (goal11Desc) goal11Desc.textContent = t.sdg.goal11.description;
            
            const goal12Title = sdgItems[1].querySelector('h4');
            const goal12Desc = sdgItems[1].querySelector('p');
            if (goal12Title) goal12Title.textContent = t.sdg.goal12.title;
            if (goal12Desc) goal12Desc.textContent = t.sdg.goal12.description;
            
            const goal14Title = sdgItems[2].querySelector('h4');
            const goal14Desc = sdgItems[2].querySelector('p');
            if (goal14Title) goal14Title.textContent = t.sdg.goal14.title;
            if (goal14Desc) goal14Desc.textContent = t.sdg.goal14.description;
        }
    }
    
    // Update About tab content
    const aboutTabContent = document.getElementById('about-tab');
    if (aboutTabContent) {
        const aboutTitle = aboutTabContent.querySelector('h3');
        if (aboutTitle) aboutTitle.textContent = t.about.title;
        
        const infoItems = aboutTabContent.querySelectorAll('.info-item strong');
        if (infoItems.length >= 3) {
            infoItems[0].textContent = t.about.version;
            infoItems[1].textContent = t.about.lastUpdate;
            infoItems[2].textContent = t.about.compatibility;
        }
        
        const infoValues = aboutTabContent.querySelectorAll('.info-item span');
        if (infoValues.length >= 3) {
            // Version stays "2.0"
            infoValues[1].textContent = t.about.lastUpdateValue;
            infoValues[2].textContent = t.about.compatibilityValue;
        }
        
        const copyrightText = aboutTabContent.querySelector('.copyright p strong');
        if (copyrightText) copyrightText.textContent = t.about.copyright;
        
        const rightsText = aboutTabContent.querySelector('.copyright p:last-child');
        if (rightsText) rightsText.textContent = t.about.rights;
    }
}

// === MODAL FUNCTIONS ===
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openSearchModal() {
    openModal('search-modal');
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
        <div class="search-result-item ${result.type}" onclick="selectSearchResult('${result.type}', '${result.item.replace(/'/g, "\\'")}')">
            <div class="result-icon ${result.type}">
                ${WASTE_ICONS[result.type]}
            </div>
            <div class="result-content">
                <div class="result-name">${result.item}</div>
                <div class="result-category">${result.category}</div>
            </div>
        </div>
    `).join('');
}

function performSearchBySuggestion(suggestionKey) {
    const translatedTerm = TRANSLATIONS[currentLanguage].searchSuggestions[suggestionKey];
    console.log(`🔍 Search suggestion clicked: ${suggestionKey} -> ${translatedTerm}`);
    
    performSearch(translatedTerm);
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = translatedTerm;
    }
}

function selectSearchResult(wasteType, item) {
    console.log(`Selezionato: ${item} - Categoria: ${wasteType}`);
    closeSearchModal();
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
        <div class="district-item" data-calendar="${district.calendar}" onclick="selectDistrict('${district.name.toLowerCase()}')">
            <div class="district-name">${district.name}</div>
        </div>
    `).join('');
}

function selectDistrict(districtName) {
    console.log('🏘️ Selecting district:', districtName);
    
    const oldCalendar = currentCalendarType;
    currentDistrict = districtName;
    
    updateLanguage(); // This will update district info and all content
    
    console.log('📊 Calendar changed from', oldCalendar, 'to', currentCalendarType);
    console.log('🔍 Updated waste info:', getAppDateInfo());
    
    closeDistrictModal();
    
    console.log('✅ District selection complete');
}

function selectLanguage(lang) {
    console.log('🌍 Changing language to:', lang);
    
    currentLanguage = lang;
    updateLanguage();
    closeLanguageModal();
    
    console.log('✅ Language changed to:', currentLanguage);
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CALENDARIO RIFIUTI VERONA - New Design Loaded');
    console.log('📊 Current Language:', currentLanguage);
    console.log('🏘️ Current District:', currentDistrict);
    console.log('📅 App Date:', APP_START_DATE.toLocaleDateString());
    console.log('🔍 Date Debug Info:', getAppDateInfo());
    console.log('📋 All calendars for tomorrow (2025-09-24):', testAllCalendarsForDate('2025-09-24'));
    
    // Initialize app
    initializeApp();
    
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
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeDistrictModal(); 
            closeLanguageModal();
            closeInfoModal();
        }
    });
    
    // Modal overlay clicks
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
});

function initializeApp() {
    console.log('🚀 Initializing Calendario Rifiuti App...');
    
    // === GESTIONE PARAMETRI URL ===
    const urlParams = getURLParams();
    
    // Imposta quartiere da URL se presente e valido
    if (urlParams.quartiere) {
        const validDistrict = validateDistrict(urlParams.quartiere);
        if (validDistrict) {
            currentDistrict = validDistrict;
            console.log('🏘️ District set from URL:', currentDistrict);
        }
    }
    
    // Set initial district info
    updateDistrictInfo();
    
    // Initialize language and all content
    updateLanguage();
    
    // Initialize info tabs - make sure first tab is active
    const firstTab = document.querySelector('.info-tab[data-tab="app"]');
    const firstContent = document.getElementById('app-tab');
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
    }
    
    console.log('✅ App initialized successfully');
    console.log('📊 Current state:', {
        district: currentDistrict,
        language: currentLanguage,
        calendar: currentCalendarType
    });
    console.log('© 2025 Gregorio Pellegrini. Tutti i diritti riservati.');
}

// Make functions globally available
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openDistrictModal = openDistrictModal;
window.closeDistrictModal = closeDistrictModal;
// === GESTIONE TAB INFO MODAL ===
function showInfoTab(tabName) {
    console.log('🔄 Switching info tab to:', tabName);
    
    // Verifica che gli elementi esistano
    const allTabs = document.querySelectorAll('.info-tab');
    const allContents = document.querySelectorAll('.info-tab-content');
    
    console.log('Found tabs:', allTabs.length, 'Found contents:', allContents.length);
    
    // Rimuovi classe active da tutti i tab
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Rimuovi classe active da tutti i contenuti
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Aggiungi classe active al tab selezionato
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
        console.log('Tab activated:', tabName);
    } else {
        console.warn('Tab not found:', tabName);
    }
    
    // Mostra il contenuto corrispondente
    const selectedContent = document.getElementById(`${tabName}-tab`);
    if (selectedContent) {
        selectedContent.classList.add('active');
        console.log('Content activated:', tabName + '-tab');
    } else {
        console.warn('Content not found:', tabName + '-tab');
    }
    
    console.log('✅ Info tab switched to:', tabName);
}

// === GENERAZIONE URL PER QR CODE ===
function generateQRCodeURLs(baseURL = 'https://tuouser.github.io/calendario-rifiuti/') {
    console.log('📱 Generating QR Code URLs for all districts...');
    
    const qrUrls = {};
    
    DISTRICTS.forEach(district => {
        const districtParam = district.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const url = `${baseURL}?quartiere=${districtParam}`;
        
        qrUrls[district.name] = {
            url: url,
            calendar: district.calendar,
            qrCodeParam: districtParam
        };
    });
    
    console.table(qrUrls);
    return qrUrls;
}

// === UTILITY PER TESTARE URL PARAMETRI ===
function testURLParams() {
    console.log('🧪 Testing URL parameters...');
    console.log('Current URL:', window.location.href);
    console.log('Current params:', getURLParams());
    console.log('Current district:', currentDistrict);
    console.log('Current calendar:', currentCalendarType);
}

window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openDistrictModal = openDistrictModal;
window.closeDistrictModal = closeDistrictModal;
window.openLanguageModal = openLanguageModal;
window.closeLanguageModal = closeLanguageModal;
window.openInfoModal = openInfoModal;
window.closeInfoModal = closeInfoModal;
window.selectLanguage = selectLanguage;
window.selectDistrict = selectDistrict;
window.performSearchBySuggestion = performSearchBySuggestion;
window.selectSearchResult = selectSearchResult;
window.forceUpdateAll = forceUpdateAll;
window.showInfoTab = showInfoTab;
window.generateQRCodeURLs = generateQRCodeURLs;
window.testURLParams = testURLParams;

// === INIZIALIZZAZIONE APP ===
// Avvia l'app quando il DOM è caricato
document.addEventListener('DOMContentLoaded', initializeApp);

// Backup: inizializza anche se il DOM è già caricato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}