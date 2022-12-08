import {useNavigate} from "react-router-dom"
// components
import RoomConnexionForm from "../components/forms/RoomConnexionForm.jsx";

// ----------------------------------------------------------------------

export default function HomePage() {
    const navigate = useNavigate()

    const handleRoomConnexion = ({roomName, playerName}) => {
        navigate(`/${roomName}[${playerName}]`)
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
            <RoomConnexionForm onSubmit={handleRoomConnexion}/>
        </div>
    )
}
