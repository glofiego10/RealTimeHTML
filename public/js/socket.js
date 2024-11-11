const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');
const token = urlParams.get('token');

async function authenticateAndTrack() {
    try {
        const response = await fetch('/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, token })
        });

        if (!response.ok) throw new Error('Authentication failed');

        const { isAuthenticated, userName } = await response.json();
        if (!isAuthenticated) {
            document.querySelector('.loading').textContent = "Access Denied: Invalid or expired token";
            return;
        }

        document.getElementById('username').textContent = `Ubicacion de ${userName}`;
        document.getElementById('loading').style.display = 'none';

        initMap();

        const socket = io();

        socket.emit('startTracking', { userId });
        socket.on('locationUpdate', (data) => {
            if (data.userId === userId) {
                updateMap(data.latitude, data.longitude);
            }
        });
    } catch (error) {
        document.querySelector('.loading').textContent = "Error: " + error.message;
    }
}

authenticateAndTrack();
