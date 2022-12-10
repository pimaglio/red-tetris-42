// controllers
const { getRoom } = require("./roomController");
// constants
const { verbose, BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");

// ----------------------------------------------------------------------

const startGame = ( socket, data, io ) => {
    const { roomName } = data
    const { game } = getRoom(roomName)
    if (game && game.status === 'pending' && game.isGameLeader(socket.id)) {
        const { playerBlockList } = game.startGame()
        io.in(roomName).emit('gameStarted', { blockList: playerBlockList })
        verbose && console.log('(SOCKET) - Broadcast to all players of ' + roomName + ' @gameStarted')
    }
}

const getNextBlockList = ( socket, roomName ) => {
    const { game } = getRoom(roomName)
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

module.exports = {
    startGame,
    updateSpectra,
    getNextBlockList,
}
