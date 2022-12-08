import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// components
import AlertDialog from "../../components/shared/AlertDialog.jsx";
import TextInput from "../../components/shared/Input.jsx";
import Modal from "../../components/shared/Modal.jsx";

// ----------------------------------------------------------------------

export function ModalUsernameExist(props) {
    const inputRef = useRef()
    const navigate = useNavigate()

    const handleSubmitUsername = (e) => {
        if (e.preventDefault) e.preventDefault()
        navigate(`/${props.roomName}[${inputRef.current.value}]`)
    }

    const handleClose = () => {
        props.state.close()
        navigate('/')
    }

    return (
        <Modal state={props.state}>
            <AlertDialog
                icon={'warning'}
                title="Username already exist"
                confirmLabel="Join room"
                variant="cta"
                onClose={handleClose}
                onConfirm={handleSubmitUsername}
            >
                <p className={'text-sm text-gray-600'}><b>{props.playerName}</b> is already used by another player in this room.</p>
                <form className={'mt-4'} onSubmit={handleSubmitUsername}>
                    <input type={'submit'} hidden/>
                    <TextInput required refInput={inputRef} label={'Choose another username'} name={'playerName'}/>
                </form>
            </AlertDialog>
        </Modal>
    )
}
