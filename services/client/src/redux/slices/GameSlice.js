import { createSlice } from '@reduxjs/toolkit'
// helpers
import { buildBlock, buildNewGrid, createGrid } from "../../helpers/gameHelper.js";
// constants
import { DROP_TIME, TEST_GRID_FULL } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

const initialState = {
    gameStatus: 'pending',
    currentBlock: null,
    blockList: [],
    grid: createGrid(),
    //grid: TEST_GRID_FULL,
    dropTime: 0
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
            state.playerGameStatus = null
            state.dropTime = DROP_TIME
        },
        updateBlockList: (state, action) => {
          state.blockList = [...state.blockList, ...action.payload]
        },
        updateCurrentBlock: ( state, action ) => {
            const { x, y, collided } = action.payload
            state.currentBlock.pos = { x: (state.currentBlock.pos.x += x), y: (state.currentBlock.pos.y += y) }
            state.currentBlock.collided = collided
        },
        updateGrid: (state, action) => {
            state.grid = action.payload.grid
        },
        getNextBlock: (state, action) => {
            state.currentBlock = action.payload.nextBlock
            state.blockList.shift()
        },
        setBlockCollided: (state) => {
          state.currentBlock.collided = true
        },
        rotateBlock: (state, action) => {
            state.currentBlock = action.payload.block
        },
        stopGame: (state) => {
            state.dropTime = 0
        },
        setGameStatus: (state, action) => {
            state.playerGameStatus = action.payload
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = gameSlice
export const gameActions = actions
export default reducer
