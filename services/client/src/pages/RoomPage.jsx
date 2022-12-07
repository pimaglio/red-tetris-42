import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { roomActions } from "../redux/slices/RoomSlice.js";

export default function RoomPage() {
    const { roomName, playerName } = useParams();
    const { isConnected } = useSelector(state => state.room)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isConnected) {
            dispatch(roomActions.setRoomConnexion({roomName, playerName}))
        }
    }, [ isConnected ])

    if (!isConnected) return (
        <div>WAITING ROOM CONNEXION...</div>
    )

    return (
        <div className="App">
            HELLO {playerName} , you're in {roomName} room
        </div>
    )
}
