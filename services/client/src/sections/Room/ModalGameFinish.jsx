import { useNavigate } from "react-router-dom";
// components
import AlertDialog from "../../components/shared/AlertDialog.jsx";
import Modal from "../../components/shared/Modal.jsx";
import { useEffect, useState } from "react";
import { roomActions } from "../../redux/slices/RoomSlice.js";

// ----------------------------------------------------------------------

const MODAL_GAME_FINISH_LIST = {
    'winner': {
        title: 'You Win !',
        message: ( isRoomLeader, replayGame ) => {
            if (isRoomLeader) return 'Congratulations! You win the game!\n' + 'You can restart a game or choose another room'
            else if (replayGame) return 'Congratulations! You win the game!\n' + 'You can play again or choose another room'
            else return 'Congratulations! You win the game!\n' + "If you want to play in this room again, you must wait until the room leader restart the game."
        },
        confirmLabel: ( isRoomLeader, replayGame ) => {
            if (isRoomLeader) return 'Restart game'
            else if (replayGame) return 'Play again'
            else return 'Wait and play again'
        },
        cancelLabel: 'Join new room'
    },
    'loser': {
        title: 'Game over !',
        message: isRoomLeader => {
            if (isRoomLeader) return 'You lost your game. If you want to restart this game, you must wait until the end of the last player game.'
            else return 'You lost your game. If you want to play in this room again, you must wait until the end of the last player game.'
        },
        confirmLabel: isRoomLeader => {
            if (isRoomLeader) return 'Wait and restart game'
            else return 'Wait and play again'
        },
        cancelLabel: 'Join new room'
    },
}

// ----------------------------------------------------------------------

export default function ModalGameFinish( props ) {
    const navigate = useNavigate()
    const [ isLoading, setLoading ] = useState(false)

    useEffect(() => {
        if (!props.state.isOpen && isLoading) setLoading(false)
    }, [ props.state, isLoading ])

    const handleSubmit = ( e ) => {
        if (e.preventDefault) e.preventDefault()
        setLoading(true)
        props.onRestart()
    }

    const handleClose = () => {
        props.state.close()
        navigate('/')
    }

    if (!props.gameResult || !MODAL_GAME_FINISH_LIST[props.gameResult]) return null

    return (
        <Modal state={props.state}>
            <AlertDialog
                icon={'warning'}
                title={MODAL_GAME_FINISH_LIST[props.gameResult].title}
                confirmLabel={MODAL_GAME_FINISH_LIST[props.gameResult].confirmLabel(props.isRoomLeader, props.replayGame)}
                cancelLabel={MODAL_GAME_FINISH_LIST[props.gameResult].cancelLabel}
                variant="cta"
                isLoading={isLoading}
                onClose={handleClose}
                onConfirm={handleSubmit}
            >
                <p className={'text-sm text-gray-600 whitespace-pre-wrap'}>{MODAL_GAME_FINISH_LIST[props.gameResult].message(props.isRoomLeader, props.replayGame)}</p>
            </AlertDialog>
        </Modal>
    )
}
