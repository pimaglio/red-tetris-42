import { useEffect } from "react";
import { useDispatch } from "react-redux";
// slices
import { gameActions } from "../redux/slices/GameSlice.js";
// hooks
import { useInterval } from "./useInterval.js";
import { roomActions } from "../redux/slices/RoomSlice.js";
import debounce from "../utils/debounce.js";
import { rotateBlock } from "../helpers/gameHelper.js";


// ----------------------------------------------------------------------

export default function useGame( { dropTime } ) {
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

    const handleMoveBlock = ( x, y ) => {
        dispatch(gameActions.updateCurrentBlock({ x, y }))
    }

    const handleRotateBlock = () => {
        dispatch(gameActions.rotateBlock())
    }

    /*useInterval(() => {
        handleMoveBlock(0, 1)
    }, dropTime)
*/

    const handleKeyActions = debounce(( { key } ) => {
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
                break;
            case 'ArrowUp':
                handleRotateBlock()
                break;
            default:
                break;
        }
    }, 2);

    return {
        handleStartGame
    }
}
