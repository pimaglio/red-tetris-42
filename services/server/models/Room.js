let Player = require('./Player')
const getRandomTetriminoList = require("../helpers/gameHelpers");
const { BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");
const { loggerAction } = require("../utils");

class Room {
  constructor(roomName, gameLeader) {
    this.name = roomName
    this.playerList = []
    this.gameLeader = gameLeader
    this.gameStatus = 'pending'
    this.blockList = []
  }

  isGameLeader(socketPlayerId) {
    return this.playerList.find(player => player.socket === socketPlayerId && player.username === this.gameLeader)
  }

  startGame() {
    const tetriminoList = getRandomTetriminoList()
    this.blockList = tetriminoList
    this.gameStatus = 'inProgress'
    return ({
      blockList: tetriminoList.slice(0, BLOCK_LIST_LIMIT)
    })
  }

  getPlayer(name) {
    return this.playerList.find(player => player.username === name)
  }

  getBlockList() {
    return this.blockList
  }

  addPlayer(data) {
    let newPlayer = new Player(data)
    this.playerList.push(newPlayer)
    loggerAction({type: 'room', message: 'success adding player'})
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
    let player = this.playerList.find(player => player.username === data.username)
    player.setSpectre(data.spectre)
  }

  updateListBlocks(list) {
    this.blockList = list
  }
}

module.exports = Room
