const Room = require('../models/Room')
const verbose = true
const roomList = []
let socketDATA = []

const createRoom = data => {
  let room = new Room(data.room, data.username)
  roomList.push(room)
  return room
}

const getRoom = name => {
  return roomList.find(room => room.name === name)
}

const joinRoom = (socket, data) => {
  verbose && console.log(`(SOCKET) - '${data.username}' try to connect to room '${data.room}'`,)
  let room = getRoom(data.room) ? getRoom(data.room) : createRoom(data)
  if (room.getPlayer(data.username)) {
    verbose && console.log('(ROOM ERROR) - ' + data.username + ' already exist in ' + data.room)
    return 'userExist'
  }
  let player = room.addPlayer(data, socket.id)
  // [BUG?]
  socket.join(data.room)
  socketDATA = socket
  verbose && console.log('(ROOM) - ' + data.username + ' JOIN ' + data.room)
  return {
    player: player,
    room: room,
  }
}

const initRoom = (socket, data) => {
  let player = getRoom(data.room).getPlayer(data.username)
  verbose &&
    console.log(
      '(ACTION) - ' + data.username + ' create a new room:  ' + data.room,
    )
}

const startGame = (socket, data, io) => {
  let room = getRoom(data.room)
  const {blockList} = room.startGame(socket.id)
  io.in(data.room).emit('gameStarted', blockList)
  verbose && console.log('(SOCKET) - Broadcast to all players of ' + data.room + ' @gameStarted')
}

const updateSpectre = (socket, data) => {
  let room = getRoom(data.room)
  room.updateSpectre(data)
  verbose &&
    console.log(
      '(SOCKET) - ' +
        data.username +
        ' Broadcast to all players of ' +
        data.room +
        ' @SpectreUpdate',
    )
  socket.broadcast.to(data.room).emit('spectreUpdate', {
    room,
  })
  return data
}

const getNewBlocks = (socket, data) => {
  const {storeName, playerName} = data
  let room = getRoom(storeName)
  return room.getMoreBlocks(playerName)
}

module.exports = {
  joinRoom,
  initRoom,
  startGame,
  updateSpectre,
  getRoom,
  getNewBlocks,
}
