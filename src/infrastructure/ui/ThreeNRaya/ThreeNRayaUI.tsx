import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chat } from '../Chat/Chat';
import { ThreeNRayaGame } from './ThreNRayaGame';

export function ThreeNRayaUI() {
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);

  const handleOnConnect = () => {
    if (!socket && !error) {
      const newSocket = io('http://localhost:3000/test');
      newSocket.on('connect_error', err => {
        console.error(`Connection error: ${err.message}`);
        setError(`Connection error: ${err.message}`);
        setSocket(null);
      });
      setSocket(newSocket);
    }
  };

  const handleOnDisconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const handlePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const playerName = event.target.value.trim();
    if (playerName.length === 0) {
      setError('Player name cannot be empty');
      setCurrentPlayer('');
    } else {
      setError(null);
      setCurrentPlayer(playerName);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1>ThreeNRaya Game</h1>
      {error && <div>{error}</div>}
      {socket && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          <button onClick={handleOnDisconnect}>Disconnect</button>
        </div>
      )}
      {!socket && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <input
            placeholder="Enter player name"
            value={currentPlayer || ''}
            onChange={handlePlayerName}
          />
          <button onClick={handleOnConnect}>Connect</button>
        </div>
      )}
      {socket?.active && currentPlayer && (
        <div
          style={{
            height: '200px',
            display: 'flex',
            flexDirection: 'row',
            gap: '25px',
            marginTop: '20px',
          }}
        >
          <ThreeNRayaGame currentPlayer={currentPlayer} />
          <Chat player={currentPlayer} />
        </div>
      )}
    </>
  );
}

export default ThreeNRayaUI;
