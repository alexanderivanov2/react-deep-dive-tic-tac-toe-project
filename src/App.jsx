import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns[0] && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = setGameBoard();
    gameTurns.forEach(({square, player}) => {
        gameBoard[square.row][square.col] = player;
    });

    const winner = hasWinnerCompute();

    function hasWinnerCompute() {
        if (gameTurns.length < 5) return;

        for (const combination of WINNING_COMBINATIONS) {
            const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
            const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
            const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

            if ((firstSquareSymbol && secondSquareSymbol && thirdSquareSymbol)
            && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
                return firstSquareSymbol;
            }
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

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

    function setGameBoard() {
        return initialGameBoard.map(row => [...row]);
    }

    function handleRestart() {
        setGameTurns([]);
        gameBoard = setGameBoard();
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
                    <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
                </ol>
                { (winner || hasDraw) &&  <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard gameBoard={gameBoard} onSelectSquare={onSelectSquare} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
