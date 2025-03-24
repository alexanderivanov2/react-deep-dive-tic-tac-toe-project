import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function GameBoard({activePlayer, handleSetActivePlayer}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevState) => {
        const updatedBoard = [...prevState.map(innerArray => [...innerArray])];
        updatedBoard[rowIndex][colIndex] = activePlayer;
        return updatedBoard;
    });
    handleSetActivePlayer();
  }

  console.table(gameBoard)
    return (
    <ol id="game-board">
        {gameBoard.map((row, index) => (
            <li key={index}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <button key={colIndex} onClick={() => handleSelectSquare(index, colIndex)}>{playerSymbol}</button>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}

export default GameBoard