import React, { useRef } from "react";
// components
import TextInput from "../shared/Input.jsx";
import { Button } from "../shared/Button.jsx";

export default function RoomConnexionForm( props ) {
    const roomNameInputRef = useRef()
    const playerNameInputRef = useRef()

    const handleSubmit = ( e ) => {
        props.onSubmit({ roomName: roomNameInputRef.current.value, playerName: playerNameInputRef.current.value })
    }

    return (
        <div className="mt-5 md:col-span-2 md:mt-0">
            <h2 className="text-lg font-bold pb-2 text-white">
                Create or join room
            </h2>
            <form onSubmit={handleSubmit} className="overflow-hidden shadow sm:rounded-md mt-2 bg-container">
                <div className="px-4 py-5 sm:p-6 border-b dark:border-gray-800">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                required
                                refInput={roomNameInputRef}
                                label={'Room'}
                                name='roomName'
                                id={'roomName'}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                required
                                refInput={playerNameInputRef}
                                label={'Username'}
                                id={'playerName'}
                                name='playerName'
                            />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6 flex justify-end">
                    <Button variant={'cta'} type={'submit'}>Join room</Button>
                </div>
            </form>
        </div>
    )
}
