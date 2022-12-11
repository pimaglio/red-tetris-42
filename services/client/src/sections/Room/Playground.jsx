import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOverlayTriggerState } from "react-stately";
// components
import Grid from "../../components/playground/Grid.jsx";
import { Button } from "../../components/shared/Button";
// sections
import ModalGameFinish from "./ModalGameFinish.jsx";
// hooks
import useGame from "../../hooks/useGame.js";

// ----------------------------------------------------------------------

export default function Playground() {
    let state = useOverlayTriggerState({});
    const { grid, dropTime, playerGameStatus } = useSelector(state => state.game)
    const { roomLeader, playerName } = useSelector(state => state.room)
    const { handleStartGame } = useGame({ dropTime })

    useEffect(() => {
        if (playerGameStatus) state.open()
    }, [ playerGameStatus ])

    return (
        <div className={'h-screen outline-0'} tabIndex={0}>
            <Grid grid={grid}/>
            <ModalGameFinish state={state} playerGameStatus={playerGameStatus} isRoomLeader={roomLeader === playerName}/>
            <Button variant='cta' onPress={handleStartGame}>Start game</Button>
        </div>

    )
}
