const Game = require("./Game");

// ----------------------------------------------------------------------

class Room {
  constructor(roomName, playerName) {
    this.name = roomName
    this.roomLeader = playerName
    this.game = new Game()
    this.ladder = []
  }

  isRoomLeader( socketId ) {
    return this.game.playerList.find(player => player.socketId === socketId && player.name === this.roomLeader)
  }

  updateLadder(roomLadder) {
    this.ladder = roomLadder
  }

  updateRoomLeader(playerName) {
    this.roomLeader = playerName
  }
}

module.exports = Room
