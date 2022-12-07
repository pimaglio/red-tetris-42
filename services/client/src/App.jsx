import './assets/styles/main.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
// pages
import HomePage from "./pages/HomePage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import Page404 from "./pages/404Page.jsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path='/'
                    element={<HomePage/>}
                />
                <Route path="/:roomName[:playerName]" element={<RoomPage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </HashRouter>
    )
}

export default App
