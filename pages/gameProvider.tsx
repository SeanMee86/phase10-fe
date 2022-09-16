import { ReactNode, useState } from "react";
import { GameContext } from "./game.context";

const GameProvider: React.FC<{children: ReactNode}> = (props) => {
    const [createGame, setCreateGame] = useState<boolean>(true)
    const [playerName, setPlayerName] = useState<string>("")
    const [gamePassword, setGamePassword] = useState<string>("")
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [isTurn, setIsTurn] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<{show: boolean; timer: number | null}>({
        show: false,
        timer: null
    });
    const [message, setMessage] = useState<string>("");
    const [messageColor, setMessageColor] = useState<"green" | "red">("green")
    const [gameLoading, setGameLoading] = useState<boolean>(true)
    const ctx = {
        createGame,
        playerName,
        gamePassword,
        showMessage,
        message,
        messageColor,
        gameLoading,
        gameStarted,
        isTurn,
        setIsTurn,
        setGameStarted,
        setCreateGame,
        setPlayerName,
        setGamePassword,
        setShowMessage,
        setMessage,
        setMessageColor,
        setGameLoading
    }
    return (
        <GameContext.Provider value={ctx} >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
