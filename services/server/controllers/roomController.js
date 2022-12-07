const Room = require('../models/Room')
const verbose = true
const roomList = []

const createRoom = data => {
    let room = new Room(data)
    roomList.push(room)
    return room
}

const getRoom = name => {
    return roomList.find(room => room.name === name)
}

const joinRoom = ( socket, data ) => {
    const { roomName, playerName } = data
    try {
        verbose && console.log(`(joinRoom) - '${playerName}' try to connect to room '${roomName}'`)
        let room = getRoom(roomName) ? getRoom(roomName) : createRoom(data)


        // TODO: fix check player exist

        if (room.getPlayer(playerName)) throw new Error('userExist')
        let player = room.addPlayer({
            roomName,
            playerName,
            socketId: socket.id
        })
        socket.join(roomName)
        verbose && console.log('(joinRoom) - ' + playerName + ' SUCCESS JOIN ' + data.roomName)

        return { player, room: room }
    } catch (e) {
        verbose && console.log('(ROOM ERROR) - ' + playerName + ' already exist in ' + roomName)
        return ({ error: e })
    }


}

const initRoom = ( socket, data ) => {
    let player = getRoom(data.room).getPlayer(data.username)
    verbose &&
    console.log(
        '(ACTION) - ' + data.username + ' create a new room:  ' + data.room,
    )
}

const startGame = ( socket, data, io ) => {
    let room = getRoom(data.room)
    const { blockList } = room.startGame(socket.id)
    io.in(data.room).emit('gameStarted', blockList)
    verbose && console.log('(SOCKET) - Broadcast to all players of ' + data.room + ' @gameStarted')
}

const updateSpectre = ( socket, data ) => {
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

const getNewBlocks = ( socket, data ) => {
    const { storeName, playerName } = data
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
