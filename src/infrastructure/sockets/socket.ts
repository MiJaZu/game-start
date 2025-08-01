    // import { io, Socket } from 'socket.io-client';
    // import { SOCKET_EVENTS } from './socketEvents';

    // const SOCKET_URL = 'http://localhost:3000';

    // export class SocketClientManager {
    // private socket: Socket;

    // constructor(url: string = SOCKET_URL) {
    //   this.socket = io(url);
    //   this.socket.on(SOCKET_EVENTS.CONNECT, () => {
    //     console.log(`⚡ Socket connected: ${this.socket.id}`);
    //   });
    // }

    // disconnect(): void {
    //   if (this.socket) {
    //     this.socket.disconnect();
    //     console.log('⚡ Socket disconnected');
    //   }
    // }

    // getSocket(): Socket {
    //   if (!this.socket) {
    //     throw new Error('🔌 Socket is not connected');
    //   }
    //   return this.socket;
    // }
    // }

    // export const socket = new SocketClientManager();
