import { useState } from "react"

function Player({name, symbol}) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    
    function handleInputChange(e) {
        setPlayerName(e.currentTarget.value);
    }

    function handleEditClick() {
        setIsEditing(prevIsEditing => !prevIsEditing);
    }
    return (
        <li>
            <span className="player">
                { isEditing 
                  ? 
                    <input className="player-name" value={playerName} onChange={(e) => handleInputChange(e)}/>
                  : 
                    <span className="player-name">{name}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}> { isEditing ? 'Save' : 'Edit' }</button>
        </li>
    )
}

export default Player