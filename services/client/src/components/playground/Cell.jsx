// constants
import { TETRIMINO_COLLECTION } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

export default function Cell( { type, isPenalty } ) {
    const cellColor = TETRIMINO_COLLECTION[type].color

    return (
        <div className={`p-4 ${isPenalty ? 'bg-gray-400' : cellColor}`}/>
    )
}
