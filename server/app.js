const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

const io = new Server(server);
app.set('io', io);

io.on('connection', (socket) => {
  console.log('用户连接：', socket.id);

  // 实时同步输入框
  socket.on('typing_author', (val) => {
    io.emit('sync_author', val);
  });
  socket.on('typing_title', (val) => {
    io.emit('sync_title', val);
  });

  socket.on('disconnect', () => {
    console.log('用户断开：', socket.id);
  });
});

const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);

server.listen(5000, () => {
  console.log('服务器运行在 http://localhost:5000');
});