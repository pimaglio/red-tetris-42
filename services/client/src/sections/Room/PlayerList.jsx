// components
import Grid from "../../components/playground/Grid.jsx";
// helpers
import { createGrid } from "../../helpers/gameHelper.js";
// constants
import { GAME_RESULT_LIST } from "../../constants/gameConstants.js";
// utils
import { truncate } from "../../utils/string.js";


// ----------------------------------------------------------------------

export default function PlayerList( { playerList } ) {
    const grid = createGrid()

    console.log('PLAYER LIST UPDATE', playerList)

    return (
        <div className={'w-1/5 text-left min-w-fit'}>
            <h3 className={'px-2 text-lg font-semibold text-white'}>All players ({playerList.length})</h3>
            <div className="mt-4 bg-container sm:rounded-2xl max-h-[90%] overflow-y-auto">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg pb-2">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:border-gray-800">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-center">
                                Spectra
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Username
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Result
                            </th>
                        </tr>
                        </thead>
                        <tbody className={''}>
                        {playerList?.map(( player, id ) => (
                            <tr key={`player-${player.socketId}-${id}`} className={`hover:bg-gray-5 ${id < playerList.length - 1 ? 'border-b dark:border-gray-800' : ''}`}>
                                <td>
                                    <div className={'max-w-xs flex justify-center py-2'}>
                                        <Grid grid={grid} spectra={player.spectra}/>
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full ${player.isConnected ? 'bg-green-400' : 'bg-red-500'} mr-2`}></div>
                                        <p title={player.name}>{truncate(player.name, 20)}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                <span
                                    className={`${GAME_RESULT_LIST[player.gameResult].color} ${GAME_RESULT_LIST[player.gameResult].textColor} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded`}>{GAME_RESULT_LIST[player.gameResult].text}</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
