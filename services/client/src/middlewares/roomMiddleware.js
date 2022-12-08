// redux
import { roomActions } from "../redux/slices/RoomSlice.js";

// ----------------------------------------------------------------------

const roomMiddleware = socket => {
    return ({dispatch, getState}) => {
        socket.onAny((eventName, payload) => {
            switch (eventName) {
                case 'gameStarted': {
                    break
                }
            }
        });
        return next => action => {
            const { room } = getState()
            switch (action.type) {
                case 'room/startGame': {
                    socket.emit('startGame', {roomName: room.roomName})
                    break
                }
                case 'room/setConnexion': {
                    const {roomName, playerName} = action.payload
                    if (room.error) dispatch(roomActions.setError(null))
                    socket.emit('joinRoom', {roomName, playerName}, ( data ) => {
                        if (data.error) return dispatch(roomActions.setError(data.error))
                        action.payload = {
                            ...action.payload,
                            ...data
                        }
                        return next(action)
                    })
                    break
                }
                default: return next(action)
            }
        }
    }
}

export default roomMiddleware
