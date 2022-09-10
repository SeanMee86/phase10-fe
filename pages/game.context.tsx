import { createContext, Dispatch, SetStateAction } from "react";

export type GameContextType = {
    createGame: boolean;
    playerName: string;
    gamePassword?: string;
    setCreateGame?: Dispatch<SetStateAction<boolean>>;
    setPlayerName?: Dispatch<SetStateAction<string>>;
    setGamePassword?: Dispatch<SetStateAction<string>>
}

export const GameContext = createContext<GameContextType>({
    createGame: false,
    playerName: ""
})