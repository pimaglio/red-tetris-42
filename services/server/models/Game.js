// models
const Piece = require("./Piece");
const Player = require("./Player");
// constants
const { BLOCK_LIST_LIMIT, BLOCK_LIST_LIMIT_THRESHOLD } = require("../constants");
const { loggerAction } = require("../utils");

// ----------------------------------------------------------------------

class Game {
    constructor( gameLeader ) {
        this.leader = gameLeader
        this.status = 'pending'
        this.playerList = []
        this.blockList = []
    }

    isGameLeader( socketId ) {
        return this.playerList.find(player => player.socketId === socketId && player.name === this.leader)
    }

    isAvailablePlayerName(playerName) {
        return !this.playerList.find(player => player.name === playerName)
    }

    getPlayer( socketId ) {
        return this.playerList.find(player => player.socketId === socketId)
    }

    addPlayer( data ) {
        let newPlayer = new Player(data)
        this.playerList.push(newPlayer)
        loggerAction({ type: 'room', message: 'success adding player' })
        return newPlayer
    }

    startGame() {
        const { gameBlockList, playerBlockList } = Piece.createBlockList()
        this.blockList = gameBlockList
        this.status = 'inProgress'
        return ({ playerBlockList })
    }

    addMoreBlockList() {
        const { gameBlockList } = Piece.createBlockList()
        this.blockList = [ ...this.blockList, ...gameBlockList ]
    }

    updateSpectre( data ) {
        let player = this.playerList.find(player => player.socketId === data.socketId)
        player.setSpectra(data.spectre)
    }
}

module.exports = Game
