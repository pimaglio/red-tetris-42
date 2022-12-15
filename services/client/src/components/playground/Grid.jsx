// components
import Cell from "./Cell";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export default function Grid( { grid, spectra } ) {

    const renderCell = (cell, x, y) => useMemo(() => <Cell isSpectra={spectra} key={x} spectra={spectra && spectra[x] === y} type={cell[0]} isPenalty={cell[1] === 'penalty'}/>, [cell[0], spectra])

    return (
        <div className={`inline-grid grid-cols-10 ${spectra ? 'gap-px' : 'gap-0.5'}`}>
            {grid.map(( row, y ) =>
                row.map(
                    ( cell, x ) => renderCell(cell, x, y)
                )
            )}
        </div>
    )
}
