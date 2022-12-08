// styles
import './TetrisLoader.css'

// ----------------------------------------------------------------------

export default function TetrisLoader({message}) {
    return (
        <div className={'h-screen w-screen overflow-hidden flex items-center justify-center'}>
            <div>
                <div className="tetris">
                    <div className="block1" />
                    <div className="block2" />
                    <div className="block3" />
                    <div className="block4" />
                </div>
                <p className={'text-sm text-gray-700'}>{message}</p>
            </div>

        </div>

    )
}
