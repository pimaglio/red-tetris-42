// slices
import { gameActions } from "../redux/slices/GameSlice.js";
// helpers
import { buildBlock, buildNewGrid, checkCollision, rotateBlock } from "../helpers/gameHelper.js";
// constants
import { BLOCK_LIST_ALERT_THRESHOLD } from "../constants/gameConstants.js";

// ----------------------------------------------------------------------

const gameMiddleware = socket => {
    return ( { dispatch, getState } ) => {
        socket.onAny(( eventName, payload ) => {
            switch (eventName) {
                case 'gameStarted': {
                    console.log('SOCKET EVENT GAME STARTED')
                    dispatch(gameActions.start(payload))
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
                case "game/restart": {
                    break
                }
                case 'game/updateCurrentBlock': {
                    if (game.gameStatus === 'inProgress') {
                        const { x, y } = action.payload
                        const isCollided = checkCollision(game.currentBlock, game.grid, { x, y })
                        if (isCollided && game.currentBlock.pos.y === 0) return dispatch(gameActions.stopGame())

                        if (!(isCollided === 'out')) {
                            if (isCollided) {
                                action.payload.collided = y > 0 && isCollided
                                action.payload.y = 0
                                action.payload.x = 0
                            }
                            next(action)
                            dispatch(gameActions.updateGrid())

                            if (isCollided && y > 0) {
                                dispatch(gameActions.getNextBlock())
                            }
                        }
                    }
                    break
                }
                case 'game/getNextBlock': {
                    action.payload = {
                        nextBlock: buildBlock(game.blockList[0])
                    }
                    next(action)
                    dispatch(gameActions.updateCurrentBlock({ x: 0, y: 0 }))
                    if (game.blockList.length < BLOCK_LIST_ALERT_THRESHOLD) {
                        socket.emit('getNextBlockList', ( nextBlockList ) => {
                            dispatch(gameActions.updateBlockList(nextBlockList))
                        })
                    }
                    break
                }
                case 'game/updateGrid': {
                    action.payload = {
                        grid: buildNewGrid(game.grid, [ game.currentBlock ])
                    }
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
                        return dispatch(gameActions.setGameStatus(playerGameStatus))
                    })
                    break
                }
                default:
                    return next(action)
            }
        }
    }
}

export default gameMiddleware
