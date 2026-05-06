// Variablen für das Belohnungssystem
let points = localStorage.getItem('wortPunkte') ? parseInt(localStorage.getItem('wortPunkte')) : 0;
updateScoreDisplay();

// Navigation: Menü anzeigen
function showMenu() {
    document.getElementById('menu-view').classList.remove('hidden');
    document.getElementById('game-view').classList.add('hidden');
    document.getElementById('game-content').innerHTML = ''; // Spielinhalt leeren
}

// Navigation: Spiel laden
function loadGame(gameType) {
    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('game-view').classList.remove('hidden');
    
    const container = document.getElementById('game-content');

    // PLATZHALTER FÜR DEINE SPIELE-LOGIK
    if (gameType === 'markieren') {
        container.innerHTML = '<h2>Markiere den Wortstamm</h2><p>Hier programmieren wir als nächstes das Markier-Tool...</p>';
        // Hier rufen wir später die Funktion für Spiel 1 auf
    } else if (gameType === 'labor') {
        container.innerHTML = '<h2>Willkommen im Wort-Labor</h2><p>Hier programmieren wir das Baukasten-Spiel...</p>';
        // Hier rufen wir später die Funktion für Spiel 2 auf
    }
}

// Belohnungs-Funktion: Kann von jedem Spiel aufgerufen werden
function addPoints(amount) {
    points += amount;
    localStorage.setItem('wortPunkte', points); // Speichern im Browser
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('points').innerText = points;
}
// Datenstruktur für den Fortschritt
let gameState = JSON.parse(localStorage.getItem('wortAbenteuerState')) || {
    points: 0,
    stations: [
        { id: 1, name: "Wald", status: "locked", emoji: "🌲" },
        { id: 2, name: "Höhle", status: "locked", emoji: "💎" },
        { id: 3, name: "Vulkan", status: "locked", emoji: "🔥" }
    ],
    inventory: []
};

// Initialisierung
function initMap() {
    updateUI();
    renderMap();
}

// Karte zeichnen
function renderMap() {
    const container = document.getElementById('map-container');
    if (!container) return; // Nur ausführen, wenn wir auf der Startseite sind

    container.innerHTML = gameState.stations.map(s => `
        <div class="station ${s.status}">
            <div class="icon">${s.status === 'opened' ? '🔓' : '🔒'}</div>
            <span>${s.name}</span>
            ${renderStationButton(s)}
        </div>
    `).join('');
}

function renderStationButton(s) {
    if (s.status === 'locked') {
        return `<button onclick="unlockStation(${s.id})">📍 Freikaufen (20⭐)</button>`;
    } else if (s.status === 'unlocked') {
        return `<button onclick="openChest(${s.id})">🎁 Öffnen (10⭐)</button>`;
    }
    return `<span>Gefunden: ${s.emoji}</span>`;
}

// Logik: Freischalten
function unlockStation(id) {
    if (gameState.points >= 20) {
        gameState.points -= 20;
        const s = gameState.stations.find(st => st.id === id);
        s.status = 'unlocked';
        saveAndRefresh();
    } else {
        alert("Du brauchst mehr Sterne!");
    }
}

// Logik: Truhe öffnen
function openChest(id) {
    if (gameState.points >= 10) {
        gameState.points -= 10;
        const s = gameState.stations.find(st => st.id === id);
        s.status = 'opened';
        gameState.inventory.push(s.emoji);
        saveAndRefresh();
    } else {
        alert("Nicht genug Sterne für die Truhe!");
    }
}

function saveAndRefresh() {
    localStorage.setItem('wortAbenteuerState', JSON.stringify(gameState));
    updateUI();
    renderMap();
}

function updateUI() {
    document.getElementById('points').innerText = gameState.points;
    // Hier könnte man auch das Inventar im HTML aktualisieren
}

// Starte die Karte beim Laden
window.onload = initMap;
