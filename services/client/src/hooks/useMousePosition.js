import React, { useEffect, useState } from 'react';

const useGridMousePosition = (gridRef, playgroundRef) => {
    const [gridPosition, setGridPosition] = useState(null)
    const {gridMousePosition, setGridMousePosition} = useState(null)
    const [
        mousePosition,
        setMousePosition
    ] = React.useState({ x: null, y: null });

    useEffect(() => {
        const isInsideGrid = () => {
            const {x, y} = mousePosition
            const {x1, y1} = gridPosition[0]
            const {x2, y2} = gridPosition[1]
            return x >= x1 && x <= x2 && y >= y1 && y <= y2;
        }

        if (gridPosition && isInsideGrid()) console.log('IS INSIDE GRID')
    }, [mousePosition, gridPosition])

    useEffect(() => {
        if (gridRef && playgroundRef) {
            const {clientHeight, clientWidth, offsetLeft, offsetTop} = gridRef
            const {offsetLeft: playgroundOffsetLeft} = playgroundRef
            setGridPosition([{x1: offsetLeft + playgroundOffsetLeft, y1: offsetTop}, {x2: offsetLeft + playgroundOffsetLeft + clientWidth, y2: offsetTop + clientHeight}])
        }
    }, [gridRef, playgroundRef])

    React.useEffect(() => {
        const updateMousePosition = ev => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, [gridPosition]);
    return gridMousePosition;
};
export default useGridMousePosition;
