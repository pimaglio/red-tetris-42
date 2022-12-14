// controllers
const { joinRoom, userDisconnect } = require('../controllers/roomController')
const { getNextBlockList, startGame, updateSpectra, gameOver, restartGame, completeLine, onUpdateGrid } = require("../controllers/gameController");

// ----------------------------------------------------------------------

const socketHandler = ( socket, io ) => {
    socket.on('disconnect', data => {
        userDisconnect(socket, data, io)
    })
    socket.on('playerLeave', data => {
        userDisconnect(socket, data, io)
    })
    socket.on('joinRoom', ( data, callback ) => {
        callback(joinRoom(socket, data, io))
    })
    socket.on('startGame', () => {
        startGame(socket, io)
    })
    socket.on('restartGame', () => {
        restartGame(socket, io)
    })
    socket.on('getNextBlockList', ( callback ) => {
        callback(getNextBlockList(socket))
    })
    socket.on('newSpectra', data => {
        updateSpectra(socket, data)
    })
    socket.on('gameOver', callback => {
        callback(gameOver(socket, io))
    })
    socket.on('completeLine', () => {
        completeLine(socket, io)
    })
    socket.on('updateGrid', data => {
        onUpdateGrid(socket, data, io)
    })
}

module.exports = { socketHandler }
