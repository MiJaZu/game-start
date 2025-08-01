import { io, Socket } from 'socket.io-client';


// IA agregado
export class SimpleSocket {
  private socket: Socket | null = null;

  connect(): void {
    this.socket = io('http://localhost:3000');
    console.log('⚡ Conectando...');
  }

  onConnect(callback: () => void): void {
    this.socket?.on('⚡ connect', callback);
  }

  onUserJoined(callback: (username: string) => void): void {
    this.socket?.on('⚡ userJoined', callback);
  }

  onUserLeft(callback: (username: string) => void): void {
    this.socket?.on('⚡ userLeft', callback);
  }

  joinRoom(username: string): void {
    this.socket?.emit('⚡ joinRoom', username);
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}