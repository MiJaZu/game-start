import { io } from 'socket.io-client';

// Conecta al servidor NestJS
const socket = io('http://localhost:3000');

export default socket;
