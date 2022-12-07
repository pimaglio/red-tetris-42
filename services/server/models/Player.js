class Player {
  constructor({roomName, playerName, socketId}) {
    this.username = playerName
    this.room = roomName
    this.socket = socketId
    this.blockListIndex = 10
    this.spectre = []
  }

  setSpectre(spectre) {
    this.spectre = spectre
  }

  updateBlockListIndex(index) {
    this.blockListIndex = index
  }
}

module.exports = Player
