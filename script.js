/**
 * DATENSTRUKTUR & INITIALISIERUNG
 * Wir laden den Spielstand oder erstellen einen neuen, falls keiner existiert.
 */
let gameState = JSON.parse(localStorage.getItem('wortAbenteuerState')) || {
    points: 0,
    stations: [
        { id: 1, name: "Schiff", status: "locked", emoji: "🚢", top: "88%", left: "25%" },
        { id: 2, name: "Strand", status: "locked", emoji: "🐚", top: "76%", left: "65%" },
        { id: 3, name: "Wald", status: "locked", emoji: "🌳", top: "62%", left: "45%" },
        { id: 4, name: "Höhle", status: "locked", emoji: "💎", top: "45%", left: "30%" }
        // Hier können weitere Stationen basierend auf der Grafik ergänzt werden
    ],
    inventory: []
};

/**
 * NAVIGATION
 */
function showMenu() {
    document.getElementById('menu-view').classList.remove('hidden');
    document.getElementById('game-view').classList.add('hidden');
    document.getElementById('game-content').innerHTML = '';
    renderMap(); // Karte neu zeichnen, falls sich etwas geändert hat
}

function loadGame(gameType) {
    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('game-view').classList.remove('hidden');
    
    const container = document.getElementById('game-content');

    if (gameType === 'markieren') {
        container.innerHTML = '<h2>🔍 Wortstamm markieren</h2><p>Markiere den Stamm! (Bald verfügbar)</p>';
        // Hier folgt später der Aufruf: startMarkierSpiel();
    } else if (gameType === 'labor') {
        container.innerHTML = '<h2>🧪 Wort-Labor</h2><p>Baue Wörter! (Bald verfügbar)</p>';
    }
}

/**
 * SCHATZKARTEN-LOGIK
 */
function renderMap() {
    const container = document.getElementById('map-container');
    if (!container) return;

    container.innerHTML = gameState.stations.map((s) => `
        <div class="station ${s.status}" 
             id="station-${s.id}" 
             style="top: ${s.top}; left: ${s.left};"
             onclick="handleStationClick(${s.id})">
            <div class="icon-layer">
                ${s.status === 'opened' ? s.emoji : (s.status === 'unlocked' ? '🎁' : '🔒')}
            </div>
            <span class="station-label">${s.name}</span>
        </div>
    `).join('');
}

function handleStationClick(id) {
    const s = gameState.stations.find(st => st.id === id);
    if (s.status === 'locked') unlockStation(id);
    else if (s.status === 'unlocked') openChest(id);
}

/**
 * BELOHNUNGSSYSTEM (TRANSAKTIONEN)
 */
function addPoints(amount) {
    gameState.points += amount;
    saveAndRefresh();
}

function unlockStation(id) {
    if (gameState.points >= 20) {
        gameState.points -= 20;
        gameState.stations.find(st => st.id === id).status = 'unlocked';
        saveAndRefresh();
    } else {
        alert("Sammle noch mehr Sterne in den Spielen!");
    }
}

function openChest(id) {
    if (gameState.points >= 10) {
        gameState.points -= 10;
        const s = gameState.stations.find(st => st.id === id);
        s.status = 'opened';
        gameState.inventory.push(s.emoji);
        saveAndRefresh();
    } else {
        alert("Du brauchst 10 Sterne für diese Truhe!");
    }
}

/**
 * HILFSFUNKTIONEN
 */
function saveAndRefresh() {
    localStorage.setItem('wortAbenteuerState', JSON.stringify(gameState));
    updateUI();
    renderMap();
}

function updateUI() {
    // Sterne im Header
    const pointsDisplay = document.getElementById('points');
    if (pointsDisplay) pointsDisplay.innerText = gameState.points;

    // Inventar (Tasche)
    const invList = document.getElementById('inventory-list');
    if (invList) {
        invList.innerHTML = gameState.inventory.length > 0 
            ? gameState.inventory.map(emoji => `<span class="item-slot">${emoji}</span>`).join('')
            : "<p>Deine Tasche ist noch leer. Öffne Truhen!</p>";
    }
}

// Startet die App, sobald das Fenster geladen wurde
window.onload = function() {
    updateUI();
    renderMap();
};
