// redux
import { roomActions } from "../redux/slices/RoomSlice.js";

// ----------------------------------------------------------------------

const roomMiddleware = socket => {
    return ( { dispatch, getState } ) => {
        socket.onAny(( eventName, payload ) => {
            switch (eventName) {
                case 'gameStarted': {
                    console.log('gameStarted', payload)
                    return dispatch(roomActions.startGame(payload))
                }
                case 'playerDisconnection': {
                    dispatch(roomActions.updatePlayerList(payload.playerList))
                    if (payload.roomLeader) dispatch(roomActions.updateRoomLeader(payload.roomLeader))
                    break
                }
                case 'replayGame': {
                    return dispatch(roomActions.setReplayGame())
                }
                case 'updatePlayer': {
                    return dispatch(roomActions.updatePlayer(payload))
                }
                case 'addPlayer': {
                    const { room } = getState()
                    if (payload.name !== room.playerName) return dispatch(roomActions.addPlayer(payload))
                    break
                }
                case 'updateRoomLadder': {
                    return dispatch(roomActions.updateLadder(payload))
                }
            }
        });
        return next => action => {
            const { room, game } = getState()
            switch (action.type) {
                    case 'room/startGame': {
                    socket.emit('startGame')
                    break
                }
                case 'room/setConnexion': {
                    const { roomName, playerName } = action.payload
                    if (room.error) dispatch(roomActions.setError(null))
                    socket.emit('joinRoom', { roomName, playerName }, ( data ) => {
                        if (data.error) return dispatch(roomActions.setError(data.error))
                        action.payload = {
                            ...action.payload,
                            ...data
                        }
                        return next(action)
                    })
                    break
                }
                case 'room/setDisconnect': {
                    socket.emit('playerLeave')
                    return next(action)
                }
                default:
                    return next(action)
            }
        }
    }
}

export default roomMiddleware
