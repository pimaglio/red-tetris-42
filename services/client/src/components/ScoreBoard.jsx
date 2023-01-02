// ----------------------------------------------------------------------

export default function ScoreBoard({score, level, lines}) {

    const renderTitle = title => <h3 className={'text-sm text-gray-400 uppercase font-semibold mb-2'}>{title}</h3>
    const renderCount = count => <div className={"text-lg font-semibold px-2.5 py-0.5 rounded bg-slate-100/[.06] text-slate-100"}>{count}</div>

    return (
        <div className="p-4 bg-container sm:rounded-2xl overflow-y-auto">
            <div className={"mb-2"}>
                {renderTitle('Score')}
                {renderCount(score)}
            </div>
            <div className={"mb-2"}>
                {renderTitle('Level')}
                {renderCount(level)}
            </div>
            <div className={"mb-2"}>
                {renderTitle('Lines')}
                {renderCount(lines)}
            </div>
        </div>
    )
}
