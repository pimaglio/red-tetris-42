// models
const Room = require('../models/Room')
// utils
const { loggerAction } = require("../utils");
// room database
const roomList = []

// ----------------------------------------------------------------------

const createRoom = ( roomName, gameLeader ) => {
    let room = new Room(roomName, gameLeader)
    roomList.push(room)
    return room
}

const getRoom = name => {return roomList.find(room => room.name === name)}

const joinRoom = ( socket, data ) => {
    const { roomName, playerName } = data
    loggerAction({ ...data, isGroup: true, type: 'joinRoom', message: 'try to connect' })
    let room = getRoom(roomName) ? getRoom(roomName) : createRoom(roomName, playerName)
    if (room.game.status !== 'pending') return ({error: 'room_unavailable'})
    if (!room.game.isAvailablePlayerName(playerName)) return ({error: 'user_exist'})
    let player = room.game.addPlayer({ roomName, playerName, socketId: socket.id })
    socket.join(roomName)
    socket.data.roomName = roomName
    loggerAction({ isEnd: true, message: 'connected success' })
    return { player, room }
}

module.exports = {
    joinRoom,
    getRoom,
}
