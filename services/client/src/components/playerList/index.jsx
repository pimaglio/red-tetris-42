import Grid from "../playground/Grid.jsx";
import { createGrid } from "../../helpers/gameHelper.js";

export default function PlayerList( { playerList } ) {
    const grid = createGrid()

    return (
        <div className="-mx-px text-left bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#0B1627_57.38%,#142133_88.16%)] p-6 shadow-2xl ring-1 ring-white/[0.15] sm:mx-0 sm:rounded-2xl sm:p-8 lg:p-10">
            <h3 className={'text-lg font-semibold text-white'}>Room player list</h3>
            {playerList?.map(player => (
                <div key={player.socketId} className={'flex justify-around'}>
                    <div className={'relative -mx-5 mt-8 flex flex-col bg-slate-700/25 py-8 px-5 ring-1 ring-slate-700/50 sm:mx-0 sm:rounded-2xl'}>
                        <p className={'font-semibold text-slate-100'}>{player.name}</p>
                    </div>

                    {/*<Grid grid={grid} spectra={player.spectra}/>*/}
                </div>
            ))}
        </div>
    )
}
