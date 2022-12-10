const Game = require("./Game");

// ----------------------------------------------------------------------

class Room {
  constructor(roomName, gameLeader) {
    this.name = roomName
    this.game = new Game(gameLeader)
  }
}

module.exports = Room
