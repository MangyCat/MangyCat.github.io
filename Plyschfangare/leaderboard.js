//can be ngrok url, anything, just that it connects to backend port in some shape or form at the end of the day
const backendUrl = 'https://hff1bx-ip-31-217-43-75.tunnelmole.net';

// submit score
async function submitScore() { //spam if you hate tacos
    const name = document.getElementById('player-name').value;
    if (!name || typeof score === 'undefined') { // check if score is defined
        alert('Enter a name and get a score to be submitted');
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/submit-score`, { //send data
            method: 'POST',
            mode: 'no-cors', // Add this line
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, score })
        });

        if (response.ok) { //error checking
            alert('Score submitted!');
            loadLeaderboard();
        } else {
            alert('Error submitting score.');
        }
    } catch (error) {
        console.error('Error submitting score:', error);
    }
}

// load leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch(`${backendUrl}/leaderboard`, {
            method: 'GET',
            mode: 'no-cors', // Add this line
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const leaderboard = await response.json();
            const leaderboardList = document.getElementById('leaderboardList');
            leaderboardList.innerHTML = '';

            leaderboard.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = `${player.name}: ${player.score}`;
                leaderboardList.appendChild(listItem);
            });
        } else {
            console.error('Error loading leaderboard:', response.status);
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

// ui open leaderboard
function openLeaderboard() {
    document.getElementById('leaderboard').style.display = 'block';
    loadLeaderboard();
}

// closes
function closeLeaderboard() {
    document.getElementById('leaderboard').style.display = 'none';
}

// Load leaderboard on page load
window.onload = loadLeaderboard;
