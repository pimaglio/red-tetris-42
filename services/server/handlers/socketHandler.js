// controllers
const { joinRoom } = require('../controllers/roomController')
const { getNextBlockList, startGame, updateSpectra, gameOver } = require("../controllers/gameController");

// ----------------------------------------------------------------------

const socketHandler = ( socket, io ) => {
    socket.on('joinRoom', ( data, callback ) => {
        callback(joinRoom(socket, data, io))
    })
    socket.on('startGame', ( data ) => {
        startGame(socket, data, io)
    })
    socket.on('getNextBlockList', ( data, callback ) => {
        callback(getNextBlockList(socket, data))
    })
    socket.on('newSpectra', data => {
        updateSpectra(socket, data)
    })
    socket.on('gameOver', (data, callback) => {
        callback(gameOver(socket, data))
    })
}

module.exports = { socketHandler }
