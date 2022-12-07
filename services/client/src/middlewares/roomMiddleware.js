import { roomActions } from "../redux/slices/RoomSlice.js";

const logger = action => {
    console.group(action.type)
    console.info('dispatching', action)
    console.groupEnd()
}

const roomMiddleware = socket => {
    return ({dispatch, getState}) => {
        socket.onAny((eventName, payload) => {
            switch (eventName) {
                case 'gameStarted': {
                    dispatch(roomActions.setGameStarted())
                    break
                }
            }
        });
        return next => action => {
            logger(action)
            switch (action.type) {
                case 'room/setRoomConnexion': {
                    const {roomName, playerName} = action.payload
                    socket.emit('joinRoom', {roomName, playerName}, ( data ) => {
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
