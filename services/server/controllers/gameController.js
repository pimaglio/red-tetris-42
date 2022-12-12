// controllers
const { getRoom } = require("./roomController");
// constants
const { verbose, BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");

// ----------------------------------------------------------------------

const startGame = ( socket, io ) => {
    const room = getRoom(socket.data.roomName)
    if (room.game && room.game.status === 'pending' && room.isRoomLeader(socket.id)) {
        const { playerBlockList } = room.game.startGame()
        io.in(socket.data.roomName).emit('gameStarted', { blockList: playerBlockList })
        verbose && console.log('(SOCKET) - Broadcast to all players of ' + socket.data.roomName + ' @gameStarted')
    }
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

const gameOver = ( socket ) => {
    const { game } = getRoom(socket.data.roomName)
    const player = game.getPlayer(socket.id)
    const playerGameStatus = game.isGameWinner(socket.id) ? 'winner' : 'loser'
    player.setGameStatus(playerGameStatus)
    if (playerGameStatus === 'winner') game.stopGame()
    return playerGameStatus
}

module.exports = {
    startGame,
    updateSpectra,
    getNextBlockList,
    gameOver
}
