// controllers
const { joinRoom } = require('../controllers/roomController')
const { getNextBlockList, startGame, updateSpectra, gameOver } = require("../controllers/gameController");

// ----------------------------------------------------------------------

const socketHandler = ( socket, io ) => {
    socket.on('joinRoom', ( data, callback ) => {
        callback(joinRoom(socket, data, io))
    })
    socket.on('startGame', () => {
        startGame(socket, io)
    })
    socket.on('getNextBlockList', ( callback ) => {
        callback(getNextBlockList(socket))
    })
    socket.on('newSpectra', data => {
        updateSpectra(socket, data)
    })
    socket.on('gameOver', ( callback ) => {
        callback(gameOver(socket))
    })
}

module.exports = { socketHandler }
