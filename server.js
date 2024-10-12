import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log('User connected');
    socket.on('sendMessage', (data) => {
      console.log(data);
      socket.to(data.roomId).emit('receiveMessage', data);
    });

    socket.on('joinRoom', (data) => {
      socket.join(data.roomId);
    });

    socket.on('setReady', (data) => {
      socket.to(data.roomId).emit('someoneReady', {
        usersReady: data.usersReady,
        course: data.course,
      });
    });

    socket.on('setCourse', (data) => {
      socket
        .to(data.roomId)
        .emit('courseChange', { courseData: data.courseData });
    });

    socket.on('getQuestions', (data) => {
      console.log(data);
      socket.to(data.roomId).emit('receiveQuestions', data);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
