// slices
import { gameActions } from "../redux/slices/GameSlice.js";
// helpers
import { buildBlock, buildNewGrid, checkCollision } from "../helpers/gameHelper.js";
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
                case 'game/updateBlockPosition': {
                    if (game.gameStatus === 'inProgress') {
                        const { x, y } = action.payload
                        const isCollided = checkCollision(game.currentBlock, game.grid, { x, y })

                        console.group('MOVE BLOCK')
                        console.log('POS: ', game.currentBlock.pos.x + x, game.currentBlock.pos.y + y)
                        console.log('CHECK COLLISION: ', isCollided)
                        console.groupEnd()

                        if (!isCollided) {
                            next(action)
                            dispatch(gameActions.updateGrid())
                        } else dispatch(gameActions.getNextBlock())
                    }
                    break
                }
                case 'game/getNextBlock': {
                    action.payload = {
                        nextBlock: buildBlock(game.blockList[0])
                    }
                    next(action)
                    dispatch(gameActions.updateBlockPosition({ x: 0, y: 0 }))
                    if (game.blockList.length < BLOCK_LIST_ALERT_THRESHOLD) {
                        socket.emit('getMoreBlocks', { roomName: room.roomName, playerName: room.playerName },
                            ( nextBlockList ) => dispatch(gameActions.updateBlocklist(nextBlockList)))
                    }
                    break
                }
                case 'game/updateGrid': {
                    action.payload = {
                        grid: buildNewGrid(game.grid, [ game.currentBlock ])
                    }
                    return next(action)
                }
                default:
                    return next(action)
            }
        }
    }
}

export default gameMiddleware
