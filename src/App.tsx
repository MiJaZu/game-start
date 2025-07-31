import { useEffect, useRef } from 'react';
import './App.css';
// import startGame from '././Infrastructure/GamePhaser
import { GamePhaser } from './infrastructure/GamePhaser';

function App() {
  const divID = 'game-container';
  const game = useRef<GamePhaser | null>(null);

  useEffect(() => {
    if (!game.current) {
      game.current = new GamePhaser(divID);
      game.current.start();
    }
  }, []);

  return <div id={divID} />;
}

export default App;
