const Game = require("./Game");

// ----------------------------------------------------------------------

class Room {
  constructor(roomName, roomLeader) {
    this.name = roomName
    this.roomLeader = roomLeader
    this.game = new Game()
  }

  isRoomLeader( socketId ) {
    return this.game.playerList.find(player => player.socketId === socketId && player.name === this.roomLeader)
  }
}

module.exports = Room
