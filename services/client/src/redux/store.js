import {configureStore} from '@reduxjs/toolkit'
import { io } from "socket.io-client";
// slices
import roomSlice from "./slices/RoomSlice.js";
import gameSlice from "./slices/GameSlice.js";
// middlewares
import roomMiddleware from "../middlewares/roomMiddleware.js";
import gameMiddleware from "../middlewares/gameMiddleware.js";


export const socket = io(`http://127.0.0.1:${import.meta.env.VITE_SERVER_PORT}`);

export const store = configureStore({
    reducer: {
        room: roomSlice,
        game: gameSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(roomMiddleware(socket)).concat(gameMiddleware(socket))
})
