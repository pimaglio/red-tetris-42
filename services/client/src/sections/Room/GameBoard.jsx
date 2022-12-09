import { useEffect } from "react";
import { useSelector } from "react-redux";
// components
import Grid from "../../components/gameBoard/Grid.jsx";
import { Button } from "../../components/shared/Button";
// hooks
import useGame from "../../hooks/useGame.js";

// ----------------------------------------------------------------------

export default function GameBoard() {
    const { grid, dropTime } = useSelector(state => state.game)
    const { handleStartGame } = useGame({ dropTime })

    return (
        <div className={'h-screen outline-0'} tabIndex={0}>
            <Grid grid={grid}/>
            <Button variant='cta' onPress={handleStartGame}>Start game</Button>
        </div>

    )
}
