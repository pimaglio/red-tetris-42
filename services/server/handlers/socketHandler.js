const {
  joinRoom,
  startGame,
  updateSpectre,
  getRoom,
  getNewBlocks,
} = require('../controllers/roomController')

// ----------------------------------------------------------------------

const socketHandler = (socket, io) => {
  socket.on('joinRoom', (data, callback) => {
    callback(joinRoom(socket, data, io))
  })
  socket.on('getRoom', (data, callback) => {
    callback(getRoom(data.room))
  })
  socket.on('startGame', (data) => {
    startGame(socket, data, io)
  })
  socket.on('newSpectre', data => {
    updateSpectre(socket, data.data)
  })
  socket.on('getMoreBlocks', (data, callback) => {
    callback(getNewBlocks(socket, data, io))
  })
}

module.exports = { socketHandler }
