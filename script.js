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
