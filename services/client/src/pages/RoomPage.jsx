import { useEffect } from "react";
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
import Logo from "../components/shared/Logo.jsx";


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
        <div className="relative bg-background">
            <div className={'background-gradient room'}/>
            <div className={'absolute top-8 left-8'}>
                <Logo/>
            </div>
            {isConnected ? (
                <div className={'h-screen p-5 flex justify-center'}>
                    <Playground/>
                    <PlayerList playerList={playerList}/>
                </div>
            ) : (
                <>
                    <TetrisLoader message={'Connexion en cours...'}/>
                    <RoomModalError error={error} state={state} playerName={playerName} roomName={roomName}/>
                </>
            )}
        </div>
    )
}
