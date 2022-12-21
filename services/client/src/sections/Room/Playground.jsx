import { useEffect, useMemo } from "react";
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
    const { grid, dropTime, gameResult } = useSelector(state => state.game)
    const { roomLeader, playerName, replayGame, roomName } = useSelector(state => state.room)
    const { handleStartGame, handleRestartGame } = useGame({ dropTime })

    useEffect(() => {
        if (!state.isOpen && gameResult) state.open()
        else if (state.isOpen && !gameResult) state.close()
    }, [ gameResult, state.isOpen ])

    const renderGrid = useMemo(() => <Grid grid={grid}/>, [ grid ])

    return (
        <div className={'w-3/4 outline-0 flex justify-center'} tabIndex={0}>
            <div className={'relative w-fit h-fit'}>
                <h3 className={'text-left mb-4 px-2 text-lg font-semibold text-white'}>{`Playground ${roomLeader}`}</h3>
                <div className="p-4 bg-container sm:rounded-2xl max-h-[90%] overflow-y-auto">
                    {renderGrid}
                </div>

                {(roomLeader === playerName && !dropTime) ? (
                    <div className={'absolute top-0 w-full h-full flex items-center justify-center'}>
                        <Button
                            onKeyDown={( e ) => e.preventDefault()}
                            variant='cta' onPress={handleStartGame}>Start game
                        </Button>
                    </div>
                ) : null}
            </div>

            <ModalGameFinish
                onRestart={handleRestartGame}
                state={state}
                replayGame={replayGame}
                gameResult={gameResult}
                isRoomLeader={roomLeader === playerName}
            />


        </div>

    )
}
