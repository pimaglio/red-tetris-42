// models
const Room = require('../models/Room')
// utils
const { loggerAction } = require("../utils");
// room database
let roomList = []

// ----------------------------------------------------------------------

const createRoom = ( roomName, gameLeader ) => {
    let room = new Room(roomName, gameLeader)
    roomList.push(room)
    return room
}

const getRoom = roomName => {return roomList.find(room => room.name === roomName)}

const removeRoom = roomName => roomList = roomList.filter(room => room.name !== roomName)

const joinRoom = ( socket, data, io ) => {
    const { roomName, playerName } = data
    loggerAction({ ...data, isGroup: true, type: 'joinRoom', message: 'try to connect' })
    let room = getRoom(roomName) ? getRoom(roomName) : createRoom(roomName, playerName)
    if (room.game.status !== 'pending') return ({error: 'room_unavailable'})
    if (!room.game.isAvailablePlayerName(playerName)) return ({error: 'user_exist'})
    let player = room.game.addPlayer({ roomName, playerName, socketId: socket.id })
    socket.join(roomName)
    socket.data.roomName = roomName
    loggerAction({ isEnd: true, message: 'connected success' })
    io.in(socket.data.roomName).emit('addPlayer', player)
    return { player, room, playerList: room.game.playerList }
}

const userDisconnect = (socket, data, io) => {
    console.log('PLAYER DISCONNECT', data)
    const room = getRoom(socket.data.roomName)
    if (room) {
        room.game.disconnectPlayer(socket.id)
        let newRoomLeader = null
        if (room.isRoomLeader(socket.id)) {
            newRoomLeader = room.game.playerList.find(player => player.socketId !== socket.id)
            if (newRoomLeader) {
                newRoomLeader = newRoomLeader.name
                room.updateRoomLeader(newRoomLeader)
            }
            else removeRoom(socket.data.roomName)
        }
        io.in(socket.data.roomName).emit('playerDisconnection', {playerList: room.game.playerList, roomLeader: newRoomLeader})
    }
}

const updateRoomLadder = (room, player, io) => {
    let roomLadder = JSON.parse(JSON.stringify(room.ladder))
    let playerAlreadyInLadder = roomLadder.find(item => item.name === player.name)
    if (playerAlreadyInLadder && playerAlreadyInLadder.score < player.scoreBoard.score) roomLadder = roomLadder.filter(item => item.name !== player.name)
    roomLadder.push({name: player.name, ...player.scoreBoard})
    roomLadder = roomLadder.sort((a, b) => b.score - a.score)
    room.updateLadder(roomLadder)

    io.in(room.name).emit('updateRoomLadder', roomLadder)
}

module.exports = {
    joinRoom,
    getRoom,
    userDisconnect,
    updateRoomLadder
}
