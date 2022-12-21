import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// components
import AlertDialog from "../../components/shared/AlertDialog.jsx";
import TextInput from "../../components/shared/Input.jsx";
import Modal from "../../components/shared/Modal.jsx";

// ----------------------------------------------------------------------

const ROOM_ERROR_LIST = {
    'user_exist': {
        title: 'Username already exist',
        message: (props) => <><b>{props.playerName}</b> is already used by another player in this room.</>,
        inputLabel: 'Choose another username',
        inputName: 'playerName'
    },
    'room_unavailable': {
        title: 'Room unavailable',
        message: (props) => <>The room <b>{props.roomName}</b> is currently unavailable</>,
        inputLabel: 'Choose another room',
        inputName: 'roomName'
    },
}

// ----------------------------------------------------------------------

export default function RoomModalError(props) {
    const inputRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        if (e.preventDefault) e.preventDefault()
        if (props.error === 'user_exist') navigate(`/${props.roomName}[${inputRef.current.value}]`)
        else navigate(`/${inputRef.current.value}[${props.playerName}]`)
    }

    const handleClose = () => {
        props.state.close()
        navigate('/')
    }

    if (!props.error || !ROOM_ERROR_LIST[props.error]) return null

    return (
        <Modal state={props.state}>
            <AlertDialog
                icon={'warning'}
                title={ROOM_ERROR_LIST[props.error].title}
                confirmLabel="Join Room"
                variant="cta"
                onClose={handleClose}
                onConfirm={handleSubmit}
            >
                <p className={'text-sm text-gray-300'}>{ROOM_ERROR_LIST[props.error].message(props)}</p>
                <form className={'mt-4'} onSubmit={handleSubmit}>
                    <input type={'submit'} hidden/>
                    <TextInput required refInput={inputRef} label={ROOM_ERROR_LIST[props.error].inputLabel} name={ROOM_ERROR_LIST[props.error].inputName}/>
                </form>
            </AlertDialog>
        </Modal>
    )
}
