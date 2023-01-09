import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// slices
import { gameActions } from "../redux/slices/GameSlice.js";
import { roomActions } from "../redux/slices/RoomSlice.js";
// hooks
import { useInterval } from "./useInterval.js";
// utils
import debounce from "../utils/debounce.js";


// ----------------------------------------------------------------------

export default function useGame( { dropTime, game, grid } ) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (dropTime) window.addEventListener("keydown", handleKeyActions);
        else if (!dropTime) window.removeEventListener("keydown", handleKeyActions)
        return () => {
            window.removeEventListener("keydown", handleKeyActions);
        };
    }, [dropTime]);

    const handleStartGame = () => {
        dispatch(roomActions.startGame())
    }

    const handleRestartGame = () => {
        dispatch(gameActions.restartGame())
    }

    const handleMoveBlock = ( x, y ) => {
        dispatch(gameActions.updateCurrentBlockPosition({ x, y, isKeyPress: true }))
    }

    const handleHardDrop = () => {
        dispatch(gameActions.updateCurrentBlockPosition({ x: 0, y: 0, isHardDrop: true}))
    }

    const handleRotateBlock = () => {
        dispatch(gameActions.rotateBlock())
    }

    const handleHoldBlock = () => {
        dispatch(gameActions.holdBlock())
    }

    const handleMouseMove = (movePos) => {
        dispatch(gameActions.onMouseMove(movePos))
    }

/*    useInterval(() => {
        handleMoveBlock(0, 1)
    }, dropTime)*/


    const handleKeyActions = debounce(( { key } ) => {
        console.log('KEY', key)
        switch (key) {
            case 'ArrowLeft':
                handleMoveBlock(-1, 0)
                break;
            case 'ArrowRight':
                handleMoveBlock(1, 0)
                break;
            case 'ArrowDown':
                handleMoveBlock(0, 1)
                break;
            case ' ':
                handleHardDrop()
                break;
            case 'ArrowUp':
                handleRotateBlock()
                break;
            case 'c':
                handleHoldBlock()
                break
            default:
                break;
        }
    }, 2);

    return {
        handleStartGame,
        handleRestartGame,
        handleMouseMove,
        handleHardDrop
    }
}
