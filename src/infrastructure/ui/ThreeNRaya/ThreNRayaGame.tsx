import { useState } from "react";
import { Cell } from "./Cell";

interface ThreeNRayaGameProps {
  currentPlayer: string;
}

export const ThreeNRayaGame = ({ currentPlayer }: ThreeNRayaGameProps) => {
  const [winner, setWinner] = useState<string | null>(null);
  const [game, setGame] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);

  const handlePlayAgain = () => {
    setGame([["", "", ""], ["", "", ""], ["", "", ""]]);
    // setCurrentPlayer('X');
    setWinner(null);
  }


  const checkWinner = (game: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (game[i][0] && game[i][0] === game[i][1] && game[i][0] === game[i][2]) {
        return game[i][0];
      }
      if (game[0][i] && game[0][i] === game[1][i] && game[0][i] === game[2][i]) {
        return game[0][i];
      }
    }
    if (game[0][0] && game[0][0] === game[1][1] && game[0][0] === game[2][2]) {
      return game[0][0];
    }
    if (game[0][2] && game[0][2] === game[1][1] && game[0][2] === game[2][0]) {
      return game[0][2];
    }
    return null;
  };



  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    console.log(`Cell clicked at row ${rowIndex}, cell ${cellIndex}`);
    const newGame = [...game];
    newGame[rowIndex][cellIndex] = currentPlayer;
    const winner = checkWinner(game);
    if (winner) {
      console.log(`Player ${winner} wins!`);
      setWinner(winner);
    }
    setGame(prevGame => {
      const newGame = [...prevGame];
      newGame[rowIndex][cellIndex] = currentPlayer;
      // setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      return newGame;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '20px',
          }}
        >
          {winner ? (
            <button
              onClick={handlePlayAgain}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              Play again
            </button>
          ) : (
            <h2> {`Current Player: ${currentPlayer}`}</h2>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {winner && (
            <span
              style={{
                height: '100%',
                color: 'white',
                fontSize: '30px',
                position: 'absolute',
                top: '20px',
              }}
            >{`Player ${winner} wins!`}</span>
          )}
          {game.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              {row.map((cell, cellIndex) => (
                <Cell
                  key={`${rowIndex}-${cellIndex}`}
                  value={cell}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
