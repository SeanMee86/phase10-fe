import { createContext, Dispatch, SetStateAction } from "react";

export type GameContextType = {
    createGame: boolean;
    playerName: string;
    gamePassword?: string;
    showMessage: {show: boolean; timer: number | null};
    message: string;
    messageColor: "green" | "red";
    gameLoading: boolean;
    isTurn: boolean;
    gameStarted: boolean;
    setIsTurn: Dispatch<SetStateAction<boolean>>
    setGameStarted: Dispatch<SetStateAction<boolean>>
    setCreateGame: Dispatch<SetStateAction<boolean>>;
    setPlayerName: Dispatch<SetStateAction<string>>;
    setGamePassword: Dispatch<SetStateAction<string>>
    setShowMessage: Dispatch<SetStateAction<{show: boolean; timer: number | null}>>
    setMessage: Dispatch<SetStateAction<string>>
    setMessageColor: Dispatch<SetStateAction<"green" | "red">>   
    setGameLoading: Dispatch<SetStateAction<boolean>> 
}

export const GameContext = createContext<GameContextType>({} as GameContextType)