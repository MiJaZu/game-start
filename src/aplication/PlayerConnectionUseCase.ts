import type { SimpleSocket } from "../infrastructure/sockets/gameSocket";

export class PlayerConnectionUseCase {
  private connectedUsers: string[] = [];
  private socket: SimpleSocket;

  constructor(socket: SimpleSocket) {
    this.socket = socket;
    console.log('⚡ PlayerConnectionUseCase initialized');
    this.setupEvents();
  }

  private setupEvents(): void {
    this.socket.onConnect(() => {
      console.log('⚡ Conectado al servidor');
    });

    this.socket.onUserJoined((username: string) => {
      console.log('⚡ Usuario conectado:', username);
      this.connectedUsers.push(username);
    });

    this.socket.onUserLeft((username: string) => {
      console.log('⚡ Usuario desconectado:', username);
      this.connectedUsers = this.connectedUsers.filter(u => u !== username);
    });
  }

  async joinGame(username: string): Promise<void> {
    console.log('⚡ Uniéndose como:', username);
    this.socket.connect();
    this.socket.joinRoom(username);
  }

  getConnectedUsers(): string[] {
    return this.connectedUsers;
  }

  leave(): void {
    this.socket.disconnect();
    this.connectedUsers = [];
  }
}