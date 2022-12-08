require('dotenv').config()
const express = require('express');
const http = require('http');
const handler = require('./handlers/socketHandler');

const PORT = process.env.SERVER_PORT;

const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    methods: ['GET', 'POST']
  },
  pingTimeout: 60000
});

/*io.use((socket, next) => {
  console.log(
      `(SOCKET) - '${socket.id}' try to connect to room '${socket.data.room}'`,
  )
  next();
});*/

io.on('connection', (socket) => {
  handler.socketHandler(socket, io);
});

app.use(router);

server.listen(PORT, () => console.log(`Server as started on port ${PORT}`));
