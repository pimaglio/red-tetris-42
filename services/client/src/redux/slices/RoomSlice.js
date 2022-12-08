import { createSlice } from '@reduxjs/toolkit'

// ----------------------------------------------------------------------

const initialState = {
    isConnected: false,
    error: null,
    roomName: null,
    playerName: null,
    gameLeader: null,
    playerList: null
}

// ----------------------------------------------------------------------

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setError: (state,action) => {
          state.error = action.payload
        },
        startGame: () => {

        },
        setConnexion: ( state, action ) => {
            const { gameLeader, playerList, name } = action.payload.room
            state.isConnected = true
            state.playerList = playerList
            state.roomName = name
            state.playerName = action.payload.playerName
            state.gameLeader = gameLeader
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = roomSlice
export const roomActions = actions
export default reducer
