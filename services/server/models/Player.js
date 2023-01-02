const { BLOCK_LIST_LIMIT, GRID_WIDTH } = require("../constants");

// ----------------------------------------------------------------------

class Player {
  constructor({roomName, playerName, socketId}) {
    this.name = playerName
    this.room = roomName
    this.gameResult = ''
    this.socketId = socketId
    this.blockListIndex = 10
    this.spectra = new Array(GRID_WIDTH).fill(-1)
    this.isConnected = true
    this.scoreBoard = {
      score: 0,
      level: 1,
      lines: 0
    }
  }

  setSpectra(spectra) {
    this.spectra = spectra
  }

  setScoreBoard(scoreType, scoreValue) {
    this.scoreBoard[scoreType] += scoreValue
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
    this.penaltyLineCount = 0
    this.spectra = []
    this.isConnected = true
  }

  disconnect() {
    this.isConnected = false
    this.gameResult = 'loser'
  }
}

module.exports = Player
