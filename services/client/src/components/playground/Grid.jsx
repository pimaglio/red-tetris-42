// components
import Cell from "./Cell";

// ----------------------------------------------------------------------

export default function Grid( { grid, isSpectrum } ) {
    return (
        <div className={'inline-grid grid-cols-10 gap-px'}>
            {grid.map(( row, y ) =>
                row.map(
                    ( cell, x ) =>
                        <div className={'blockTint'}/> && (
                            <Cell spectre={isSpectrum} key={x} type={cell[0]}/>
                        ),
                ),
            )}
        </div>
    )
}
