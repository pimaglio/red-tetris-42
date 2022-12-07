import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isConnected: false,
    gameStatus: 'pending'
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoomConnexion: ( state, action ) => {
            //const { roomName, playerName } = action.payload
            console.log('setRoomConnexionPayload', action.payload)
            state.isConnected = true
        },
        setGameStarted: (state, action) => {
            state.gameStatus = 'inProgress'
        }
    }
})

const { actions, reducer } = roomSlice
export const roomActions = actions
export default reducer
