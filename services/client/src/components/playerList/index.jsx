import Grid from "../playground/Grid.jsx";
import { createGrid } from "../../helpers/gameHelper.js";

export default function PlayerList( { playerList } ) {
    const grid = createGrid()

    return (
        <div className="relative z-10 -mx-4 bg-[radial-gradient(164.75%_100%_at_50%_0%,#334155_0%,#0F172A_48.73%)] py-10 px-5 shadow-lg sm:mx-0 sm:rounded-3xl sm:px-10">
            {playerList?.map(player => (
                <div key={player.socketId} className={'flex justify-around'}>
                    {player.name}
                    <Grid grid={grid} spectra={player.spectra}/>
                </div>
            ))}
        </div>
    )
}
