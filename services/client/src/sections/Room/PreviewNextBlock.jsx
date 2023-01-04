
// ----------------------------------------------------------------------

import PreviewBlock from "../../components/PreviewBlock";
import { createPreviewGrid } from "../../helpers/gameHelper.js";
import { useEffect, useState } from "react";

export default function PreviewNextBlockList({data}) {
    const [blockList, setBlockList] = useState(Array(3).fill(createPreviewGrid()))

    useEffect(() => {
        if (data) setBlockList(data)
    }, [data])

    return (
        <div className="p-4 bg-container sm:rounded-2xl overflow-y-auto">
            {blockList?.length > 0 ? (
                blockList.slice(0,3).map((blockShape, id) => <div className={`${id === 1 ? 'my-6' : ''}`}><PreviewBlock blockShape={blockShape}/></div>)
            ) : null}
        </div>
    )
}
