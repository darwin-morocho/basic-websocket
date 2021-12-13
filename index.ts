import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('MEEDU.APP'));

const server = app.listen(process.env.PORT ?? 5000, () => console.log('running 🔥'));

const wss = new WebSocketServer({ server });

let users: string[] = [];

wss.on('connection', (ws) => {
  let username: string | null = null;
  ws.send(`connected`);

  // broadcasting to every other connected WebSocket clients, excluding itself.
  const sendToAll = (eventName: string, dataToSend: Object) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: eventName, data: dataToSend }));
      }
    });
  };

  ws.on('message', (message: string) => {
    try {
      const { event, data } = JSON.parse(message);
      if (event === 'join') {
        const tmpUsername = data as string;
        const isTaken = users.includes(tmpUsername);
        console.log(`is taken ${tmpUsername}`, isTaken);
        if (!isTaken) {
          username = tmpUsername;
          ws.send(JSON.stringify({ event: 'joined', data: { users } }));
          sendToAll('new_user', { users, user: username });
          users.push(username);
        } else {
          ws.send('username_not_available');
        }
      } else if (username != null) {
        switch (event) {
          case 'typing':
            sendToAll('typing', { user: username });
            break;
          case 'stop_typing':
            sendToAll('stop_typing', { user: username });
            break;

          case 'new_message':
            sendToAll('new_message', { user: username, message: data });
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on('close', () => {
    if (username !== null) {
      console.log('leave', username);
      users = users.filter((e) => e !== username);
      /// broadcasting to every other connected WebSocket clients, excluding itself.
      sendToAll('left', { users, user: username });
    }
  });
});
