import { ReactNode, useState } from "react";
import { GameContext } from "./game.context";

const GameProvider: React.FC<{children: ReactNode}> = (props) => {
    const [createGame, setCreateGame] = useState<boolean>(true)
    const [playerName, setPlayerName] = useState<string>("")
    const [gamePassword, setGamePassword] = useState<string>("")
    const ctx = {
        createGame,
        playerName,
        gamePassword,
        setCreateGame,
        setPlayerName,
        setGamePassword
    }
    return (
        <GameContext.Provider value={ctx} >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
