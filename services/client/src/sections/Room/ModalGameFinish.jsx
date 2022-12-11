import { useNavigate } from "react-router-dom";
// components
import AlertDialog from "../../components/shared/AlertDialog.jsx";
import Modal from "../../components/shared/Modal.jsx";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const MODAL_GAME_FINISH_LIST = {
    'winner': {
        title: 'You Win !',
        message: (isRoomLeader) => {
            if (isRoomLeader) return 'Congratulations! You win the game!\n' + 'You can restart a game or choose another room'
            else return 'Congratulations! You win the game!\n' + "If you want to play in this room again, you must wait until the room leader restart the game."
        },
        confirmLabel: 'Wait and play again',
        cancelLabel: 'Join new room'
    },
    'loser': {
        title: 'Game over !',
        message: () => 'You lost your game. If you want to play in this room again, you must wait until the end of the last player game.',
        confirmLabel: 'Wait and play again',
        cancelLabel: 'Join new room'
    },
}

// ----------------------------------------------------------------------

export default function ModalGameFinish(props) {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        return () => {
            if (isLoading) setLoading(false)
        }
    }, [])

    const handleSubmit = (e) => {
        if (e.preventDefault) e.preventDefault()
        setLoading(true)
        props.onRestart()
    }

    const handleClose = () => {
        props.state.close()
        navigate('/')
    }

    if (!props.playerGameStatus || !MODAL_GAME_FINISH_LIST[props.playerGameStatus]) return null

    return (
        <Modal state={props.state}>
            <AlertDialog
                icon={'warning'}
                title={MODAL_GAME_FINISH_LIST[props.playerGameStatus].title}
                confirmLabel={MODAL_GAME_FINISH_LIST[props.playerGameStatus].confirmLabel}
                cancelLabel={MODAL_GAME_FINISH_LIST[props.playerGameStatus].cancelLabel}
                variant="cta"
                isLoading={isLoading}
                onClose={handleClose}
                onConfirm={handleSubmit}
            >
                <p className={'text-sm text-gray-600 whitespace-pre-wrap'}>{MODAL_GAME_FINISH_LIST[props.playerGameStatus].message(props.isRoomLeader)}</p>
            </AlertDialog>
        </Modal>
    )
}
