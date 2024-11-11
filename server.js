require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const express = require('express');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("./"));

// Generar token temporal
app.post('/generateToken', (req, res) => {
    const { userId } = req.body;
    console.log('Generating token for userId:', userId); 
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '15m' });
    console.log('Generated token:', token); 
    res.json({ token });
});

// Endpoint para autenticar
app.post('/authenticate', (req, res) => {
    const { userId, token } = req.body;
    console.log("Received userId:", userId);
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ isAuthenticated: false });
        }
        console.log("Decoded token:", decoded);
        if (decoded.userId !== userId) {
            console.error("User ID mismatch");
            return res.status(401).json({ isAuthenticated: false });
        }
        res.json({ isAuthenticated: true , userName: "German"});
    });
});

// Ruta para servir el HTML de rastreo
app.get('/track', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket para enviar actualizaciones de ubicación
io.on('connection', (socket) => {
    socket.on('startTracking', ({ userId }) => {
        console.log(`Starting tracking for user: ${userId}`);

        let latitude =  -27.80133233204205;
        let longitude = -64.24698756253196;
       
        const sendLocationUpdate = () => {
            latitude += (Math.random() - 0.5) * 0.001; 
            longitude += (Math.random() - 0.5) * 0.001; 

            const locationData = { userId, latitude, longitude };
            socket.emit('locationUpdate', locationData);
        };

        const intervalId = setInterval(sendLocationUpdate, 1000); 

        socket.on('disconnect', () => {
            clearInterval(intervalId);
            console.log(`Stopped tracking for user: ${userId}`);
        });
    });
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
