import { createSlice } from '@reduxjs/toolkit'

// ----------------------------------------------------------------------

const initialState = {
    isConnected: false,
    error: null,
    roomName: null,
    playerName: null,
    roomLeader: null,
    playerList: [],
    replayGame: false,
    ladder: []
}

// ----------------------------------------------------------------------

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setError: ( state, action ) => {
            state.error = action.payload
        },
        startGame: (state, action) => {
            console.log('startGame', action)
        },
        setConnexion: ( state, action ) => {
            const { roomLeader, playerList, name } = action.payload.room
            state.isConnected = true
            state.playerList = action.payload.playerList
            state.roomName = name
            state.playerName = action.payload.playerName
            state.roomLeader = roomLeader
        },
        setDisconnect: () => ({ ...initialState }),
        updateRoomLeader: ( state, action ) => {
            state.roomLeader = action.payload
        },
        updatePlayerList: ( state, action ) => {
            state.playerList = action.payload
        },
        updatePlayer: ( state, action ) => {
            let playerIndex = state.playerList.findIndex(player => player.socketId === action.payload.socketId)
            if (playerIndex > -1) state.playerList[playerIndex] = action.payload
        },
        addPlayer: (state, action) => {
          state.playerList.push(action.payload)
        },
        setReplayGame: ( state, action ) => {
            state.replayGame = true
        },
        updateLadder: (state, action) => {
            state.ladder = action.payload
        }
    }
})

// ----------------------------------------------------------------------

const { actions, reducer } = roomSlice
export const roomActions = actions
export default reducer
