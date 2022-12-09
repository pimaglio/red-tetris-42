import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useOverlayTriggerState } from "react-stately";
import toast from "react-hot-toast";
// slices
import { roomActions } from "../redux/slices/RoomSlice.js";
// sections
import RoomModalError from "../sections/Room/ModalError.jsx";
import GameBoard from "../sections/Room/GameBoard";
// components
import TetrisLoader from "../components/shared/Loading/TetrisLoading";


// ----------------------------------------------------------------------

export default function RoomPage() {
    let state = useOverlayTriggerState({});
    const { roomName, playerName } = useParams();
    const { isConnected, error } = useSelector(state => state.room)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) state.open()
    }, [error])

    useEffect(() => {
        if (!isConnected) dispatch(roomActions.setConnexion({roomName, playerName}))
        else if (isConnected) toast.success(`You join the ${roomName} room`)
    }, [ isConnected, playerName, roomName ])

    if (isConnected) return (
        <div className="flex flex-col items-center max-w-lg mx-auto">
            <GameBoard/>
        </div>
    )

    return (
        <div className="flex flex-col items-center max-w-lg mx-auto">
            <TetrisLoader message={'Connexion en cours...'}/>
            <RoomModalError error={error} state={state} playerName={playerName} roomName={roomName}/>
        </div>
    )
}
