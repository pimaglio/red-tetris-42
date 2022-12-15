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
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center relative bg-background">
            <div className={'absolute top-20 z-20'}>
                <h1 className={'text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 logo-title'}>RED TETRIS</h1>
                <h1 className={'font-bold text-white text-base logo-sub-title uppercase'}>Free Multiplayer Game</h1>
            </div>

            <div className={'background-gradient'}/>
            <RoomConnexionForm onSubmit={handleRoomConnexion}/>
        </div>
    )
}
