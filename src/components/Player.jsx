import { useState } from "react";

function Player({name, symbol, isActive, handleEditPlayerName}) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    
    function handleInputChange(e) {
        setPlayerName(e.currentTarget.value);
    }

    function handleEditClick() {
        setIsEditing(prevIsEditing => !prevIsEditing);
        if (isEditing) {
            handleEditPlayerName(symbol, playerName)
        }
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                { isEditing 
                  ? 
                    <input className="player-name" value={playerName} onChange={handleInputChange}/>
                  : 
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}> { isEditing ? 'Save' : 'Edit' }</button>
        </li>
    )
}

export default Player