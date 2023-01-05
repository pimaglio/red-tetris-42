// constants
import { TETRIMINO_COLLECTION } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

export default function Cell( { type, isPenalty, spectra, isSpectra, isPrediction } ) {
    const cellColor = TETRIMINO_COLLECTION[type].color

    if (isPrediction) console.log('CELL:', type)

    return (
        <div className={`${isSpectra ? 'p-0.5 rounded-xs' : 'p-4 rounded-sm'} ${isPenalty ? 'bg-gray-400' : cellColor} ${isPrediction ? 'opacity-20' : ''} ${spectra ? 'bg-red-400' : ''}`}/>
    )
}
