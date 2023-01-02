// slices
import { gameActions } from "../redux/slices/GameSlice.js";
// helpers
import {
    addGridPenaltyLine,
    buildBlock,
    buildNewGrid,
    checkCollision,
    getHardDropPosition,
    rotateBlock
} from "../helpers/gameHelper.js";
// constants
import { BLOCK_LIST_ALERT_THRESHOLD } from "../constants/gameConstants.js";

// ----------------------------------------------------------------------

const gameMiddleware = socket => {
    return ( { dispatch, getState } ) => {
        socket.onAny(( eventName, payload ) => {
            const { game, room } = getState()
            switch (eventName) {
                case 'gameStarted': {
                    dispatch(gameActions.start(payload))
                    break
                }
                case 'gameRestarted': {
                    if (game.replay) dispatch(gameActions.resetGame(payload))
                    break
                }
                case 'setPenaltyLine': {
                    if (room.playerName !== payload.playerName) {
                        const newGrid = addGridPenaltyLine(game.grid, game.currentBlock)
                        if (!newGrid) return dispatch(gameActions.stopGame())
                        else return dispatch(gameActions.addPenaltyLine(newGrid))
                    }
                    break
                }
            }
        });
        return next => action => {
            const { game, room } = getState()
            switch (action.type) {
                case "game/start": {
                    let { blockList } = action.payload
                    action.payload.initialBlock = buildBlock(blockList[0])
                    action.payload.grid = buildNewGrid(game.grid, [ action.payload.initialBlock ])
                    blockList.shift()
                    return next(action)
                }
                case 'game/updateCurrentBlockPosition': {
                    if (game.gameStatus === 'inProgress') {
                        let { x, y, isHardDrop, isKeyPress } = action.payload
                        if (isHardDrop) {
                            const hardDropOffset = getHardDropPosition(game.currentBlock, game.grid) || 1
                            y = hardDropOffset
                            action.payload.y = y
                            if (hardDropOffset !== 1 && game.currentBlock.pos.y !== 1) {
                                socket.emit('updateScore', {
                                    actionType: 'hardDrop',
                                    actionValue: hardDropOffset
                                }, newScore => {
                                    if (newScore) dispatch(gameActions.updateScore(newScore))
                                })
                            }
                        }
                        const isCollided = checkCollision(game.currentBlock, game.grid, { x, y })
                        if (isCollided && isCollided !== 'out' && game.currentBlock.pos.y === 0) return dispatch(gameActions.stopGame())
                        if (!(isCollided === 'out')) {
                            if (isCollided) {
                                action.payload.collided = y > 0 && isCollided
                                action.payload.y = isHardDrop && y > 1 ? y : 0
                                action.payload.x = 0
                            }
                            next(action)
                            dispatch(gameActions.updateGrid())
                            if (y > 0 && isCollided) dispatch(gameActions.getNextBlock())
                            if (y > 0 && !isCollided && isKeyPress) socket.emit('updateScore', { actionType: 'softDrop', actionValue: null }, newScore => {
                                if (newScore) dispatch(gameActions.updateScore(newScore))
                            })
                        }
                    }
                    break
                }
                case 'game/getNextBlock': {
                    action.payload = {
                        nextBlock: buildBlock(game.blockList[0])
                    }
                    next(action)
                    dispatch(gameActions.updateCurrentBlockPosition({ x: 0, y: 0 }))
                    if (game.blockList.length < BLOCK_LIST_ALERT_THRESHOLD) {
                        socket.emit('getNextBlockList', ( nextBlockList ) => {
                            dispatch(gameActions.updateBlockList(nextBlockList))
                        })
                    }
                    break
                }
                case 'game/updateGrid': {
                    let countLineComplete = 0
                    const grid = buildNewGrid(game.grid, [ game.currentBlock ], () => countLineComplete++)
                    action.payload = {
                        grid
                    }
                    if (countLineComplete) socket.emit('completeLine')
                    if (game.currentBlock.collided) socket.emit('updateGrid', grid)
                    return next(action)
                }
                case 'game/rotateBlock': {
                    if (game.currentBlock.shape !== 'O') {
                        const block = rotateBlock(game.grid, game.currentBlock)
                        if (block) {
                            action.payload = { block }
                            next(action)
                            return dispatch(gameActions.updateGrid())
                        }
                    }
                    break
                }
                case 'game/stopGame': {
                    next(action)
                    socket.emit('gameOver', ( playerGameStatus ) => {
                        return dispatch(gameActions.setGameResult(playerGameStatus))
                    })
                    break
                }
                case 'room/setDisconnect': {
                    dispatch(gameActions.resetGame())
                    return next(action)
                }
                case 'game/restartGame': {
                    socket.emit('restartGame')
                    return next(action)
                }
                default:
                    return next(action)
            }
        }
    }
}

export default gameMiddleware
