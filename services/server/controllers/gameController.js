// controllers
const { getRoom } = require("./roomController");
// constants
const { verbose, BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");
const { buildGridSpectra } = require("../helpers/gameHelpers");

// ----------------------------------------------------------------------

const startGame = ( socket, io ) => {
    const room = getRoom(socket.data.roomName)
    if (room.game && room.game.status === 'pending' && room.isRoomLeader(socket.id)) {
        const { playerBlockList } = room.game.startGame()
        io.in(socket.data.roomName).emit('gameStarted', { blockList: playerBlockList })
        verbose && console.log('(SOCKET) - Broadcast to all players of ' + socket.data.roomName + ' @gameStarted')
    }
}

const restartGame = ( socket, io ) => {
    const room = getRoom(socket.data.roomName)
    const isRoomLeader = room.isRoomLeader(socket.id)
    const isGameWinner = room.game.isGameWinnerBySocketId(socket.id)
    console.log('GAME RESULT', isGameWinner)
    if (isGameWinner && isRoomLeader) {
        room.game.resetGame()
        io.in(socket.data.roomName).emit('gameRestarted')
    } else if (!isGameWinner && isRoomLeader) {
        room.game.setRestartGame()
        io.in(socket.data.roomName).emit('replayGame')
    }
    else socket.emit('gameRestarted')
}

const getNextBlockList = ( socket ) => {
    const { game } = getRoom(socket.data.roomName)
    const player = game.getPlayer(socket.id)
    const blockList = Array.from({ length: BLOCK_LIST_LIMIT }, ( v, k ) => game.blockList[k + player.blockListIndex])
    player.updateBlockListIndex()
    if (game.blockList.length - player.blockListIndex < BLOCK_LIST_LIMIT_THRESHOLD) game.addMoreBlockList()
    return blockList
}

const updateSpectra = ( socket, data ) => {
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

const gameOver = ( socket, io ) => {
    const room = getRoom(socket.data.roomName)
    const player = room.game.getPlayer(socket.id)
    const gameResult = room.game.isGameWinner() ? 'winner' : 'loser'

    player.setGameResult(gameResult)
    if (gameResult === 'winner') {
        room.game.stopGame()
        if (room.game.restartGame) {
            room.game.resetGame()
            io.in(socket.data.roomName).emit('gameRestarted')
        }
    }
    return gameResult
}

const completeLine = (socket, io) => {
    const room = getRoom(socket.data.roomName)
    const player = room.game.getPlayer(socket.id)
    io.in(socket.data.roomName).emit('setPenaltyLine', {playerName: player.name})
}

const onUpdateGrid = (socket, data, io) => {
    const room = getRoom(socket.data.roomName)
    const player = room.game.getPlayer(socket.id)
    const spectra = buildGridSpectra(data)
    player.setSpectra(spectra)
    io.in(socket.data.roomName).emit('updatePlayer', player)
}

module.exports = {
    startGame,
    restartGame,
    updateSpectra,
    getNextBlockList,
    gameOver,
    completeLine,
    onUpdateGrid
}
