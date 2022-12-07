import { describe, expect, test, vi } from 'vitest';
import SocketMock from 'socket.io-mock';
import { socketHandler } from "./socketHandler";
import { joinRoom } from "../controllers/roomController";

describe("socketHandler", () => {
    it('Sockets should be able to talk to each other without a server', function(done) {
        let socket = new SocketMock();
        const callbackFn = vi.fn()
        socketHandler(socket, callbackFn)

        socket.socketClient.emit('joinRoom', {username: 'john', room: 'test'}, (data) => {
            console.log('RETURN joinRoom', data)
        });

        socket.socketClient.emit('getRoom', {room: 'test'}, (data) => {
            console.log('RETURN getRoom', data)
        });

        socket.socketClient.emit('initRoom', {room: 'test'}, (data) => {
            console.log('RETURN initRoom', data)
        });
    });
});
