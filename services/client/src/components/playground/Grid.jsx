import { useEffect, useMemo, useState } from "react";
// components
import Cell from "./Cell";
import { GRID_HEIGHT, GRID_WIDTH } from "../../constants/gameConstants.js";

// ----------------------------------------------------------------------

export default function Grid( { grid, spectra, onMouseMove, onMouseDown } ) {
    const [mousePosition, setMousePosition] = useState({x: -1, y: -1})

    const renderCell = (cell, x, y) => useMemo(() => <Cell isSpectra={spectra} key={x} spectra={spectra && spectra[x] === y} type={cell[0]} isPrediction={cell[1] === 'prediction'} isPenalty={cell[1] === 'penalty'}/>, [cell, spectra])

    const handleMouseMove = event => {
        const container = event.currentTarget;
        // peut etre rajouter gap grid * n sur les containers
        const containerWidth = Math.round(container.clientWidth / GRID_WIDTH) // divide for more performance (throttle)
        const containerHeight = Math.round(container.clientHeight / GRID_HEIGHT) // divide for more performance (throttle)

        let x = Math.round(((event.clientX + 10) - container.offsetLeft ) / GRID_WIDTH) - 40; // 40 is padding parent container\
        x = Math.round((x / containerWidth) * GRID_WIDTH) - 1 // -1 to correspond initial grid first array value (0)

        let y = Math.floor((event.clientY - container.offsetTop) / GRID_HEIGHT); // 33 is padding parent container\
        y = Math.floor((y / containerHeight) * GRID_HEIGHT) - 1 // -1 to correspond initial grid first array value (0)

        if (!(mousePosition.x === x && mousePosition.y === y)) setMousePosition({x, y})
    }


    useEffect(() => {
        if (mousePosition && onMouseMove) onMouseMove(mousePosition)
    }, [mousePosition])

    return (
        <div onMouseDown={onMouseDown} onMouseMove={spectra ? null : handleMouseMove} className={`inline-grid grid-cols-10 ${spectra ? 'gap-px' : 'gap-0.5'}`}>
            {grid.map(( row, y ) =>
                row.map(
                    ( cell, x ) => renderCell(cell, x, y)
                )
            )}
        </div>
    )
}
