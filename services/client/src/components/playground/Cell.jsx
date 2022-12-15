// constants
import { TETRIMINO_COLLECTION } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

export default function Cell( { type, isPenalty, spectra, isSpectra } ) {
    const cellColor = TETRIMINO_COLLECTION[type].color

    if (!spectra) console.log('CELL RENDER', spectra)

    return (
        <div className={`${isSpectra ? 'p-0.5 rounded-xs' : 'p-4 rounded-sm'} ${isPenalty ? 'bg-gray-400' : cellColor} ${spectra ? 'bg-red-400' : ''}`}/>
    )
}
