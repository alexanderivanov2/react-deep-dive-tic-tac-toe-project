import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSetActivePlayer() {
    setActivePlayer(prevActivePlayer => prevActivePlayer === "X" ? "O" : "X")
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>

        <GameBoard activePlayer={activePlayer} handleSetActivePlayer={handleSetActivePlayer}/>
      </div>
    </main>
  )
}

export default App
