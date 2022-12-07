import {configureStore} from '@reduxjs/toolkit'
import { io } from "socket.io-client";
// slices
import roomSlice from "./slices/RoomSlice.js";
// middlewares
import roomMiddleware from "../middlewares/roomMiddleware.js";

export const socket = io(`http://127.0.0.1:${import.meta.env.VITE_SERVER_PORT}`);

export const store = configureStore({
    reducer: {
        room: roomSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(roomMiddleware(socket))
})
