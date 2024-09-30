const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  socket.on('sendMessage', (data) => {
    console.log(data);
    socket.to(data.roomId).emit('receiveMessage', data);
  });

  socket.on('joinRoom', (data) => {
    socket.join(data.roomId);
  });

  socket.on('setReady', (data) => {
    console.log('Ready', data);
    socket
      .to(data.roomId)
      .emit('someoneReady', { usersReady: data.usersReady });
  });
});

httpServer.listen(4000, () => {
  console.log('Server is running on port 4000');
});
