import { createSlice } from '@reduxjs/toolkit'

// ----------------------------------------------------------------------

const initialState = {
    isConnected: false,
    error: null,
    roomName: null,
    playerName: null,
    roomLeader: null,
    playerList: null,
    replayGame: false
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
            const { roomLeader, playerList, name } = action.payload.room
            state.isConnected = true
            state.playerList = playerList
            state.roomName = name
            state.playerName = action.payload.playerName
            state.roomLeader = roomLeader
        },
        setDisconnect: () => ({...initialState}),
        updateRoomLeader: (state, action) => {
            state.roomLeader = action.payload
        },
        updatePlayerList: (state,action) => {
            state.playerList = action.payload
        },
        setReplayGame: (state, action) => {
            state.replayGame = true
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = roomSlice
export const roomActions = actions
export default reducer
