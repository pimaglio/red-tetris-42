// constants
import { TETRIMINO_COLLECTION } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

export default function Cell( { type, isPenalty, spectra } ) {
    const cellColor = TETRIMINO_COLLECTION[type].color

    console.log('CELL RENDER')

    return (
        <div className={`p-4 ${isPenalty ? 'bg-gray-400' : cellColor} ${spectra ? 'bg-red-400' : ''}`}/>
    )
}
