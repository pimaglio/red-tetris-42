// models
const Piece = require("./Piece");
const Player = require("./Player");
// constants
const { loggerAction } = require("../utils");

// ----------------------------------------------------------------------

class Game {
    constructor() {
        this.status = 'pending'
        this.playerList = []
        this.blockList = []
        this.restartGame = false
    }

    isGameWinnerBySocketId( socketId ) {
        return this.playerList.find(player => player.socketId === socketId && player.gameResult === 'winner')
    }

    isGameWinner() {
        return this.playerList.filter(player => player.gameResult === 'loser').length === this.playerList.length - 1
    }

    isAvailablePlayerName( playerName ) {
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

    disconnectPlayer( socketId ) {
        const player = this.getPlayer(socketId)
        player.disconnect()
    }

    startGame() {
        const { gameBlockList, playerBlockList } = Piece.createBlockList()
        this.blockList = gameBlockList
        this.status = 'inProgress'
        return ({ playerBlockList })
    }

    setRestartGame() {
        this.restartGame = true
    }

    resetGame() {
        this.status = 'pending'
        this.playerList.forEach(player => player.resetPlayer())
    }

    stopGame() {
        this.status = 'done'
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
