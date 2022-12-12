import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
// components
import RoomConnexionForm from "../components/forms/RoomConnexionForm.jsx";
// slices
import { gameActions } from "../redux/slices/GameSlice.js";
import { roomActions } from "../redux/slices/RoomSlice.js";

// ----------------------------------------------------------------------

export default function HomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isConnected } = useSelector(state => state.room)

    useEffect(() => {
        if (isConnected) dispatch(roomActions.setDisconnect())
    }, [isConnected])

    const handleRoomConnexion = ({roomName, playerName}) => {
        navigate(`/${roomName}[${playerName}]`)
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
            <RoomConnexionForm onSubmit={handleRoomConnexion}/>
        </div>
    )
}
