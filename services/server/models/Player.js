const { BLOCK_LIST_LIMIT } = require("../constants");

// ----------------------------------------------------------------------

class Player {
  constructor({roomName, playerName, socketId}) {
    this.name = playerName
    this.room = roomName
    this.gameResult = ''
    this.socketId = socketId
    this.blockListIndex = 10
    this.spectra = []
    this.isConnected = true
  }

  setSpectra(spectra) {
    this.spectra = spectra
  }

  setGameResult(gameResult) {
    this.gameResult = gameResult
  }

  updateBlockListIndex() {
    this.blockListIndex += BLOCK_LIST_LIMIT
  }

  resetPlayer() {
    this.gameResult = ''
    this.blockListIndex = 10
    this.spectra = []
    this.isConnected = true
  }

  disconnect() {
    this.isConnected = false
  }
}

module.exports = Player
