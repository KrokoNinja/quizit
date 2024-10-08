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
    socket
      .to(data.roomId)
      .emit('someoneReady', {
        usersReady: data.usersReady,
        course: data.course,
      });
  });

  socket.on('setCourse', (data) => {
    socket
      .to(data.roomId)
      .emit('courseChange', { courseData: data.courseData });
  });
});

httpServer.listen(5432, () => {
  console.log('Server is running on port 5432');
});
