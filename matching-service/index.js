//const { findMatch, cancelMatch } = require('./service/matchingService');
const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require("uuid");
const { Pair } = require('./models');

app.use(express.json());
app.use(cors());

const db = require("./models");

const matchRouter = require("./routes/matchRouter");
app.use("/match", matchRouter);
const { errorHandler } = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 8081;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const socket = io.on('connection', (socket) => {

  console.log('User is connected');
  socket.on('find-match', ({ username, complexity }) => {
    console.log("socket find-match received")
    findMatch(username, complexity);
  });
  socket.on('cancel-match', (username) => {
    cancelMatch(username);
    //socket.disconnect();
  });
  socket.on('match-timeout', ({ username, complexity }) => {
    console.log(`${username} has timed out from matching for ${complexity} question.`);
    //socket.disconnect();
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('join-room', ({ room }) => {
    socket.join(room)
    console.log("joined room: " + room)
    const getNumberOfClientsInRoom = (room) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(room);
      return clientsInRoom ? clientsInRoom.size : 0;
    };
    const numberOfClients = getNumberOfClientsInRoom(room);
    if (numberOfClients === 2) {
      const message = 'The room is now ready!'
      io.in(room).emit('room-ready',{ message });
    } else {
      const message = 'Wait for your partner...'
      io.in(room).emit('wait-for-partner', {message})
    }
  })
  socket.on('message', ({ room, message }) => {
    console.log("send message " + room)
    socket.broadcast.to(room).emit('end-session', { message })
  })
  socket?.on('confirmEndSession', ({room, message}) => {
    console.log("confirm end")
    socket.broadcast.to(room).emit('confirmed', {message})
  })
  socket?.on('stay-session', ({room, message}) => {
    socket.broadcast.to(room).emit('partner-stay', {message})
  })
  socket.on('partner-disconnect', ({room, message}) => {
    socket.broadcast.to(room).emit('partner-left', {message})
  })
  socket.on('question-chosen', ({room, message}) => {
    console.log("question chosen socket received", room)
    socket.broadcast.to(room).emit('partner-chose-question', {message})
    io.in(room).emit('get-question', {message})
  })
});

db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

//const socket = io('http://localhost:8081');

/* interface UserEntry {
  username: string;
  complexity: string
} */
const queue = [];
const intervalMap = new Map();

function roomId() {
  return "room" + uuidv4();
}

var connected = false;
var pushed = false;

const endSession = async (room, message) => {
  console.log("send message " + room)
  socket.to(room).emit('end-session', { message })
}

const findMatch = async (username, complexity) => {
  console.log("find match called" + queue);
  let interval;
  interval = setInterval(async () => {
    try {
      const otherUser = queue.find((userEntry) => userEntry.complexity === complexity && userEntry.username !== username);
      if (otherUser != null) {
        console.log(queue);
        const room = roomId();

        // make a POST request to create a new room using the room id
        /* const response = await fetch(`http://localhost:3001/api/v1/rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": room,
            "defaultAccesses": ["room:write"],
            "metadata": { "color": "blue" }
          }),
        }) */
        //console.log(await response.json())

        socket.emit('match-found', { username1: username, username2: otherUser.username, complexity, room });
        console.log(`you have been matched with ${otherUser.username}`);
        await addPair(username, otherUser.username, complexity, room);
        clearInterval(interval);
        const otherId = queue.findIndex(
          (entry) => entry.username === otherUser.username
        );
        if (otherId != -1) {
          return queue.splice(otherId, 1);
        }
        const myId = queue.findIndex(
          (entry) => entry.username === username
        );
        if (myId != -1) {
          return queue.splice(myId, 1);
        }
        connected = true;
      } else if (!pushed) {
        pushed = true;
        queue.push({ username, complexity })
        console.log(queue)
        console.log("waiting for a match")
        //console.log(queue)
      }
    } catch (err) {
      console.log(err)
    }
  }, 1500);
  intervalMap.set(username, interval);
  setTimeout(async () => {
    pushed = false;
    clearInterval(interval);
    const id = queue.findIndex(
      (entry) => entry.username === username
    );
    if (id != -1) {
      return queue.splice(id, 1);
    }
    console.log("timeout!")
    socket.emit('match-timeout', { username, complexity });
    console.log(queue)
    intervalMap.delete(username);
  }, 30000);
}

const cancelMatch = async (username) => {
  const nameValue = JSON.stringify(username)
  const parsedData = JSON.parse(nameValue);
  const name = parsedData.username;
  console.log("cancel " + name);
  pushed = false;
  clearInterval(intervalMap.get(name));
  intervalMap.delete(name);
  const index = queue.findIndex((userEntry) => userEntry.username === name);
  if (index != -1) {
    queue.splice(index, 1);
  }
  console.log(queue)
}

async function addPair(username1, username2, complexity, roomId) {
  try {
    const pair = await Pair.create({
      username1: username1,
      username2: username2,
      complexity: complexity,
      isDone: false,
      roomId: roomId
      //question: qn_id,
    });
    return pair;
  } catch (err) {
    console.log(err)
  }
}
