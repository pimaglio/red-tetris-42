import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
// components
import RoomConnexionForm from "../components/forms/RoomConnexionForm.jsx";
import Logo from "../components/shared/Logo.jsx";
// slices
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
            <div className={'absolute top-20 z-1'}>
                <Logo/>
            </div>

            <div className={'background-gradient'}/>
            <RoomConnexionForm onSubmit={handleRoomConnexion}/>
        </div>
    )
}
