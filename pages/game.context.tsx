import { createContext, Dispatch, SetStateAction } from "react";

export type GameContextType = {
    createGame: boolean;
    playerName: string;
    gamePassword?: string;
    showMessage: boolean;
    message: string;
    messageColor: "green" | "red";
    gameLoading: boolean;
    setCreateGame: Dispatch<SetStateAction<boolean>>;
    setPlayerName: Dispatch<SetStateAction<string>>;
    setGamePassword: Dispatch<SetStateAction<string>>
    setShowMessage: Dispatch<SetStateAction<boolean>>
    setMessage: Dispatch<SetStateAction<string>>
    setMessageColor: Dispatch<SetStateAction<"green" | "red">>   
    setGameLoading: Dispatch<SetStateAction<boolean>> 
}

export const GameContext = createContext<GameContextType>({} as GameContextType)