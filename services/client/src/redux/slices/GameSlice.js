import { createSlice } from '@reduxjs/toolkit'
// helpers
import { buildBlock, buildNewGrid, createGrid, createGridTest } from "../../helpers/gameHelper.js";
// constants
import { DROP_TIME, TEST_GRID_FULL } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

const initialState = {
    gameStatus: 'pending',
    currentBlock: null,
    holdBlock: null,
    blockList: null,
    //grid: createGridTest('completeLine', 17),
    grid: createGrid(),
    dropTime: 0,
    gameResult: null,
    scoreBoard: {
        score: 0,
        level: 1,
        lines: 0
    }
}

// ----------------------------------------------------------------------

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setError: ( state, action ) => {
            state.error = action.payload
        },
        start: ( state, action ) => {
            state.blockList = action.payload.blockList
            state.currentBlock = action.payload.initialBlock
            state.grid = action.payload.grid
            state.gameStatus = 'inProgress'
            state.gameResult = null
            state.dropTime = DROP_TIME
            state.replay = false
        },
        restartGame: ( state, action ) => {
            state.replay = true
        },
        resetGame: () => ({ ...initialState }),
        updateBlockList: ( state, action ) => {
            state.blockList = [ ...state.blockList, ...action.payload ]
        },
        updateCurrentBlockPosition: ( state, action ) => {
            const { x, y, collided } = action.payload
            state.currentBlock.pos = { x: (state.currentBlock.pos.x += x), y: (state.currentBlock.pos.y += y) }
            state.currentBlock.collided = collided
        },
        updateGrid: ( state, action ) => {
            state.grid = action.payload.grid
        },
        addPenaltyLine: (state, action) => {
            state.grid = action.payload
        },
        getNextBlock: ( state, action ) => {
            state.currentBlock = action.payload.nextBlock
            state.blockList.shift()
        },
        setBlockCollided: ( state ) => {
            state.currentBlock.collided = true
        },
        rotateBlock: ( state, action ) => {
            state.currentBlock = action.payload.block
        },
        stopGame: ( state ) => {
            state.dropTime = 0
        },
        setGameResult: ( state, action ) => {
            state.gameResult = action.payload
            if (action.payload === 'winner') state.gameStatus = 'done'
        },
        updateScore: (state, action) => {
            for (let score of action.payload) {
                state.scoreBoard[score.scoreType] += score.scoreValue
            }
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = gameSlice
export const gameActions = actions
export default reducer
