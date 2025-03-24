import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState("X");

    function onSelectSquare(rowIndex, colIndex) {
        handleSelectSquare(rowIndex, colIndex);
    }

    function handleSelectSquare(rowIndex, colIndex) {
        setActivePlayer(prevActivePlayer => prevActivePlayer === "X" ? "O" : "X");
        setGameTurns(prevTurns => {
            let currentPlayer = "X";
            if (prevTurns[0] && prevTurns[0].player === "X") {
                currentPlayer = "O"
            }
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
                <Log />
            </div>
        </main>
    )
}

export default App
