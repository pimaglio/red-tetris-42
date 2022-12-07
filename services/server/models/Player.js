class Player {
  constructor(username, room, socket) {
    this.username = username
    this.room = room
    this.socket = socket
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
