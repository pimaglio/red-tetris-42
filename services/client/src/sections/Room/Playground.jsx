import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useOverlayTriggerState } from "react-stately";
// components
import Grid from "../../components/playground/Grid.jsx";
import ScoreBoard from "../../components/ScoreBoard";
import { Button } from "../../components/shared/Button";
// sections
import ModalGameFinish from "./ModalGameFinish.jsx";
import PreviewNextBlockList from "./PreviewNextBlock";
// hooks
import useGame from "../../hooks/useGame.js";
import PreviewBlock from "../../components/PreviewBlock.jsx";


// ----------------------------------------------------------------------

export default function Playground() {
    let state = useOverlayTriggerState({});
    const { grid, dropTime, gameResult, scoreBoard, holdBlock, blockList } = useSelector(state => state.game)
    const { roomLeader, playerName, replayGame, roomName } = useSelector(state => state.room)
    const { handleStartGame, handleRestartGame } = useGame({ dropTime })

    useEffect(() => {
        if (!state.isOpen && gameResult) state.open()
        else if (state.isOpen && !gameResult) state.close()
    }, [ gameResult, state.isOpen ])

    const renderGrid = useMemo(() => <Grid grid={grid}/>, [ grid ])

    const renderScoreBoard = useMemo(() => <ScoreBoard {...scoreBoard} />, [scoreBoard])

    const renderHoldBlock = useMemo(() => <PreviewBlock blockShape={holdBlock}/>, [holdBlock])

    const renderNextBlockList = useMemo(() => <PreviewNextBlockList data={blockList}/>, [blockList])

    return (
        <div className={'w-3/4 outline-0 flex justify-center'} tabIndex={0}>
            <div className={'relative w-fit h-fit flex'}>
                <div className={'w-fit h-auto flex flex-col justify-between justify-between'}>
                    <div>
                        <div className="p-4 bg-container sm:rounded-2xl">
                            <h3 className={'text-sm text-gray-400 uppercase font-semibold mb-2'}>HOLD</h3>
                            {renderHoldBlock}
                        </div>
                    </div>
                    {renderScoreBoard}
                </div>
                <div className={"h-fit mx-6"}>
                    <div className="p-4 bg-container sm:rounded-2xl max-h-[90%] overflow-y-auto">
                        {renderGrid}
                    </div>
                </div>
                <div className={'w-fit h-auto flex flex-col justify-between justify-between'}>
                    <div className="p-4 bg-container sm:rounded-2xl overflow-y-auto">
                        <h3 className={'text-sm text-gray-400 uppercase font-semibold mb-2'}>Next</h3>
                        {renderNextBlockList}
                    </div>
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
