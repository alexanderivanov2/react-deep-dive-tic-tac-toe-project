import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns[0] && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);

    let activePlayer = deriveActivePlayer(gameTurns);

    function onSelectSquare(rowIndex, colIndex) {
        handleSelectSquare(rowIndex, colIndex);
    }

    function handleSelectSquare(rowIndex, colIndex) {
        if (gameTurns.find(({square}) => square.row === rowIndex && square.col === colIndex)) return;

        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);
           
            return [{
                player: currentPlayer, square: {
                    row: rowIndex, col: colIndex
                }
            }, ...prevTurns]
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
                    <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
                </ol>

                <GameBoard turns={gameTurns} onSelectSquare={onSelectSquare} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
