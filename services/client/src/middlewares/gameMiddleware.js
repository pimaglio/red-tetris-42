// helpers
import { buildBlock, buildNewGrid, checkCollision } from "../helpers/gameHelper.js";
import { gameActions } from "../redux/slices/GameSlice.js";

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
            const { game } = getState()
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
                        if (!isCollided) next(action)
                        return dispatch(gameActions.updateGrid())
                    }
                    break
                }
                case 'game/updateGrid': {
                    console.log('CURRENT BLOCK', game.currentBlock)
                    action.payload = {
                        grid: buildNewGrid(game.grid, [game.currentBlock])
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
