let Player = require('./Player')
const getRandomTetriminoList = require("../helpers/gameHelpers");
const { BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");

class Room {
  constructor(room, username) {
    this.name = room
    this.players = []
    this.gameLeader = username
    this.isStarted = false
    this.blockList = []
  }


  startGame(socketPlayerId) {
    if (this.players.find(player => player.socket === socketPlayerId && player.username === this.gameLeader)) {
      const tetriminoList = getRandomTetriminoList()
      this.blockList = tetriminoList
      this.isStarted = true
      return ({
        blockList: tetriminoList.slice(0, BLOCK_LIST_LIMIT)
      })
    }
  }

  getPlayer(name) {
    return this.players.find(player => player.username === name)
  }

  getBlockList() {
    return this.blockList
  }

  addPlayer(player, socket) {
    let newPlayer = new Player(player.username, player.room, socket)
    this.players.push(newPlayer)
    console.log(
      `(ROOM) - Success adding player '${player.username}' to room '${player.room}'`,
    )
    return newPlayer
  }

  getMoreBlocks(playerName) {
    let nextBlockList = []
    let currentPlayer = this.getPlayer(playerName)
    for (let i = currentPlayer.blockListIndex; i < BLOCK_LIST_LIMIT + currentPlayer.blockListIndex; i++) {
      nextBlockList.push(this.blockList[i])
    }
    currentPlayer.updateBlockListIndex(currentPlayer.blockListIndex + BLOCK_LIST_LIMIT)
    if (this.blockList.length - currentPlayer.blockListIndex < BLOCK_LIST_LIMIT_THRESHOLD ) {
      this.addBlocks(getRandomTetriminoList())
    }
    return nextBlockList
  }

  addBlocks(newBlockList) {
    this.blockList = [...this.blockList, ...newBlockList]
  }

  updateSpectre(data) {
    let player = this.players.find(player => player.username === data.username)
    player.setSpectre(data.spectre)
  }

  updateListBlocks(list) {
    this.blockList = list
  }
}

module.exports = Room
