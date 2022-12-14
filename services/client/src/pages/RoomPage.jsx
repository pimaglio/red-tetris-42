import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useOverlayTriggerState } from "react-stately";
import toast from "react-hot-toast";
// slices
import { roomActions } from "../redux/slices/RoomSlice.js";
// sections
import RoomModalError from "../sections/Room/ModalError.jsx";
import Playground from "../sections/Room/Playground.jsx";
// components
import TetrisLoader from "../components/shared/Loading/TetrisLoading";
import PlayerList from "../components/playerList/index.jsx";


// ----------------------------------------------------------------------

export default function RoomPage() {
    let state = useOverlayTriggerState({});
    const { roomName, playerName } = useParams();
    const { isConnected, error, playerList } = useSelector(state => state.room)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) state.open()
    }, [ error ])

    useEffect(() => {
        if (!isConnected) dispatch(roomActions.setConnexion({ roomName, playerName }))
        else if (isConnected) toast.success(`You join the ${roomName} room`)
    }, [ isConnected, playerName, roomName ])

    return (
        <div className="relative bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#020509_57.38%,#0F1A29_88.16%)]">
            {isConnected ? (
                <Playground/>
            ) : (
                <>
                    <TetrisLoader message={'Connexion en cours...'}/>
                    <RoomModalError error={error} state={state} playerName={playerName} roomName={roomName}/>
                </>
            )}
        </div>
    )
}
