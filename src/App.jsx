import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

        if ((firstSquareSymbol && secondSquareSymbol && thirdSquareSymbol)
        && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
    gameTurns.forEach(({square, player}) => {
        gameBoard[square.row][square.col] = player;
    });
    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = deriveGameBoard(gameTurns);
    let winner = deriveWinner(gameBoard, players);

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

    function handleRestart() {
        setGameTurns([]);
    }

    function handleEditPlayerName(symbol, newName) {
          setPlayers(prevPlayers => ({
            ...prevPlayers,
            [symbol]: newName,
        }))
    }

    return (
        <main>
            <div id="game-container">
                { players["O"]}
                <br />
                {players["X"]}
                <ol id="players" className="highlight-player">
                    <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} handleEditPlayerName={handleEditPlayerName}/>
                    <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} handleEditPlayerName={handleEditPlayerName}/>
                </ol>
                { (winner || hasDraw) &&  <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard gameBoard={gameBoard} onSelectSquare={onSelectSquare} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
