
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';

dotenv.config();



const app = express();
app.use(cors());
// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

const server = app.listen(process.env.PORT ?? 3000, () => console.log('running 🔥'));

const wss = new WebSocketServer({ server });


let users: string[] = [];

wss.on('connection', (ws) => {
    let username: string | null = null;
    ws.send(`connected`);


    ws.on('message', (message: string) => {
        try {
            const { event, data } = JSON.parse(message);


            if (event == "join") {
                username = data as string;
                console.log(`username ${username}`);
                if (!users.includes(username)) {
                    users.push(username);
                    ws.send(JSON.stringify({ 'event': 'joined', users }));

                    /// broadcasting to every other connected WebSocket clients, excluding itself.
                    wss.clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ 'event': 'new_user', users, user: username }));
                        }
                    });
                } else {
                    ws.send('username_not_available');
                }
            }

        } catch (error) {
            console.log(error)
        }

    });
    ws.on('close', () => {
        console.log('Client disconnected')
        if (username !== null) {
            users = users.filter((e) => e !== username);
            /// broadcasting to every other connected WebSocket clients, excluding itself.
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ 'event': 'left', users, user: username }));
                }
            });
        }
    });
});