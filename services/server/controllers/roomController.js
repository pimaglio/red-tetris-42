const Room = require('../models/Room')
const { loggerAction } = require("../utils");
const roomList = []
const verbose = process.env.NODE_ENV === 'development'

const createRoom = ( roomName, gameLeader ) => {
    let room = new Room(roomName, gameLeader)
    roomList.push(room)
    return room
}

const getRoom = name => {
    return roomList.find(room => room.name === name)
}

const joinRoom = ( socket, data ) => {
    const { roomName, playerName } = data
    loggerAction({ ...data, isGroup: true, type: 'joinRoom', message: 'try to connect' })
    let room = getRoom(roomName) ? getRoom(roomName) : createRoom(roomName, playerName)
    try {
        if (room.gameStatus !== 'pending') throw new Error('roomUnavailable')
        if (room.getPlayer(playerName)) throw new Error('userExist')
        let player = room.addPlayer({ roomName, playerName, socketId: socket.id })
        socket.join(roomName)
        loggerAction({ isEnd: true, message: 'connected success' })
        return { player, room: room }
    } catch (e) {
        loggerAction({ isError: true, isEnd: true, message: e })
        return ({ error: e.message })
    }
}

const startGame = ( socket, data, io ) => {
    const { roomName } = data
    console.log('DATAAAAAA START GAME', data)
    let room = getRoom(roomName)
    if (room && room.isGameLeader(socket.id)) {
        const { blockList } = room.startGame()
        io.in(roomName).emit('gameStarted', { blockList })
        verbose && console.log('(SOCKET) - Broadcast to all players of ' + roomName + ' @gameStarted')
    }
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
    startGame,
    updateSpectre,
    getRoom,
    getNewBlocks,
}
