// constants
import { GAME_RESULT_LIST } from "../../constants/gameConstants.js";
// utils
import { truncate } from "../../utils/string.js";


// ----------------------------------------------------------------------

export default function RoomLadder( { playerList } ) {
    return (
        <>
            <h3 className={'px-2 text-lg font-semibold text-white'}>Room Ladder</h3>
            <div className="mt-4 bg-container sm:rounded-2xl max-h-[90%] overflow-y-auto">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg pb-2">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:border-gray-800">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Username
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Score
                            </th>
                        </tr>
                        </thead>
                        {playerList?.length > 0 ? (
                            <tbody className={''}>
                            {playerList.map(( player, id ) => (
                                <tr key={`player-${player.socketId}-${id}`}
                                    className={`hover:bg-gray-5 ${id < playerList.length - 1 ? 'border-b dark:border-gray-800' : ''}`}>
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <div className="flex items-center">
                                            <p title={player.name}>{truncate(player.name, 20)}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <span
                                            className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded`}>{player.score}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        ) : (
                            <div className={'p-4 text-center'}>
                                <p className={'text-center'}>There are no rankings yet.</p>
                            </div>
                        )}
                    </table>
                </div>
            </div>
        </>
    )
}
