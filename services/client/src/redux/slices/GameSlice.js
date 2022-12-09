import { createSlice } from '@reduxjs/toolkit'
// helpers
import { buildBlock, buildNewGrid, createGrid } from "../../helpers/gameHelper.js";
// constants
import { DROP_TIME } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

const initialState = {
    gameStatus: 'pending',
    currentBlock: null,
    blockList: [],
    grid: createGrid(),
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
            state.dropTime = DROP_TIME
        },
        updateBlockPosition: ( state, action ) => {
            const { x, y } = action.payload
            state.currentBlock.pos = { x: (state.currentBlock.pos.x += x), y: (state.currentBlock.pos.y += y) }
        },
        updateGrid: (state, action) => {
            state.grid = action.payload.grid
        },
        getNextBlock: (state, action) => {
            state.currentBlock = action.payload.nextBlock
            state.blockList.shift()
        },
        updateCurrentBlock: (state, action) => {
            state.currentBlock = action.payload.currentBlock
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = gameSlice
export const gameActions = actions
export default reducer
