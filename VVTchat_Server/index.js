//Model
const Messages = require('./models/messages_model');

const app = require('./app');
const http = require('http');
var socketio = require('socket.io');

//server setup
const port = process.env.PORT || 3050;
const server = http.createServer(app);
const io = socketio(server);

server.listen(port, () => {
  console.log('Running on port', port);
});

const connectedUsers = [];
const connectedSocketClients = [];

//Automatically connection event will be fired when a client is connected to sever socket.
io.on('connection', (socket) => {
  console.log('a user connected(online)');
  // console.log(socket);

  //User associated with this socket
  socket.on('user', (user) => {
    var socketUser = addUser(socket, user);
    sendExistingMessages(socketUser.chatId, socketUser.socket);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected(offline)');
  });

  socket.on('removeUser', (username) => {

    for (var i = 0; i < connectedUsers.length; i++) {
      if (username === connectedUsers[i].username) {  //user exist in connectedUsers
        connectedUsers.splice(i, 1);
        connectedSocketClients.splice(i, 1);
      }
    }
    console.log(connectedUsers, 'userconnected list after remove');
  });

  socket.on('message', (message, username) => {
    var socket = findUser(username);
    onMessageReceived(message, socket)
  });
});

function addUser(socket, user) {
  connectedUsers.push(user);
  connectedSocketClients.push(socket);
  console.log(connectedUsers, 'new user added');
  return {
    chatId: user.chatId,
    socket: socket
  }
}

function findUser(username) {
  for (var i = 0; i < connectedUsers.length; i++) {
    if (username === connectedUsers[i].username) {  //find user in connectedUsers
      return connectedSocketClients[i];
    }
    else {
      console.log('unfortunately user not found !');
    }
  }
}

function sendExistingMessages(chatId, socket) {
  console.log(chatId);
  Messages.find({ chatId: chatId })
    .then((messages) => {
      if (messages.length !== 0) {
        socket.emit('message', messages.reverse());
      }
      else {
        return;
      }
    })
    .catch(() => {
      return new Error('problem in sending existing messages');
    })
}

function onMessageReceived(message, socket) {
  sendAndSaveMessage(message, socket);
}

function sendAndSaveMessage(message, socket) {

  var messageObj = {
    text: message.text,
    user: message.user,
    createdAt: message.createdAt,
    chatId: message.chatId
  }

  Messages.create(messageObj)
    .then((message) => {
      socket.emit('message', [message]);
    });
}
