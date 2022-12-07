const {
  joinRoom,
  initRoom,
  startGame,
  updateSpectre,
  getRoom,
  getNewBlocks,
} = require('../controllers/roomController')

const verbose = true

const socketHandler = (socket, io) => {
  socket.on('joinRoom', (data, callback) => {
    callback(joinRoom(socket, data, io))
  })
  socket.on('getRoom', (data, callback) => {
    callback(getRoom(data.room))
  })
  socket.on('startGame', (data, callback) => {
    verbose && console.log(`(SOCKET) - Game will start in '${data.room}'`)
    startGame(socket, data, io)
  })
  socket.on('initRoom', (data, callback) => {
    callback(initRoom(socket, data))
  })
  socket.on('newSpectre', data => {
    updateSpectre(socket, data.data)
  })
  socket.on('getMoreBlocks', (data, callback) => {
    const nextBlockList = getNewBlocks(socket, data, io)
    callback(nextBlockList)
  })
}

module.exports = { socketHandler }
