const { BLOCK_LIST_LIMIT } = require("../constants");

// ----------------------------------------------------------------------

class Player {
  constructor({roomName, playerName, socketId}) {
    this.name = playerName
    this.room = roomName
    this.gameStatus = ''
    this.socketId = socketId
    this.blockListIndex = 10
    this.spectra = []
  }

  setSpectra(spectra) {
    this.spectra = spectra
  }

  setGameStatus(gameStatus) {
    this.gameStatus = gameStatus
  }

  updateBlockListIndex() {
    this.blockListIndex += BLOCK_LIST_LIMIT
  }
}

module.exports = Player
