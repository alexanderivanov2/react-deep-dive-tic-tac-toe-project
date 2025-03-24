function GameBoard({gameBoard, onSelectSquare}) {
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