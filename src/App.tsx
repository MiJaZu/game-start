import { useState } from 'react';
import { GamePhaser } from './infrastructure/ui/GamePhaser';
import './App.css';
import { ThreeNRayaUI } from './infrastructure/ui/ThreeNRaya/ThreeNRayaUI';

function App() {
  const divID = 'game-container';
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  return (
    <>
      {!currentGame && (
        <>
          <h1>Game Collection</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => setCurrentGame('ThreeNRaya')}>
              ThreeNRaya
            </button>
            <button onClick={() => {
              setCurrentGame('GamePhaser');
              const test = new GamePhaser(divID);
              test.start();
            }}>
              GamePhaser
            </button>
          </div>
        </>
      )}
      <div id={divID} /> 
      {currentGame === 'ThreeNRaya' && <ThreeNRayaUI />}
    </>
  );
}

export default App;
