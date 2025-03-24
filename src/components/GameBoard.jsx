const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function GameBoard({turns, onSelectSquare}) {
    let gameBoard = initialGameBoard;

    turns.forEach(({square, player}) => {
        gameBoard[square.row][square.col] = player;
    });

    return (
    <ol id="game-board">
        {gameBoard.map((row, index) => (
            <li key={index}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <button key={colIndex} onClick={() => onSelectSquare(index, colIndex)}>{playerSymbol}</button>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}

export default GameBoard