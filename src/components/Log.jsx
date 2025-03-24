
function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map(({ player, square }, index) => (
                <li key={index}>
                    <span>Player: {player}</span> selected <span>square: {square.row}, {square.col}</span>
                </li>
            ))}
        </ol>
    )
}

export default Log