import { useEffect, useMemo, useState } from "react";
// components
import Cell from "./playground/Cell.jsx";
// helpers
import { buildPreviewGrid, createPreviewGrid } from "../helpers/gameHelper.js";

// ----------------------------------------------------------------------

const GRID_EMPTY = createPreviewGrid()

// ----------------------------------------------------------------------

export default function PreviewBlock( { blockShape } ) {
    const [currentGrid, setCurrentGrid] = useState(null)

    useEffect(() => {
        if (blockShape) setCurrentGrid(buildPreviewGrid(JSON.parse(JSON.stringify(GRID_EMPTY)), blockShape))
        else if (!blockShape && currentGrid) setCurrentGrid(null)
    }, [blockShape])

    const renderCell = ( cell, x, y ) => useMemo(() => {
        return <Cell key={x} type={cell[0]}/>
    }, [ cell[0]])

    const renderGrid = grid => grid.map(( row, y ) => row.map(( cell, x ) => renderCell(cell, x, y)))

    return (
        <div className={`inline-grid grid-cols-4 gap-0.5`}>
            {renderGrid(currentGrid || GRID_EMPTY)}
        </div>
    )
}
