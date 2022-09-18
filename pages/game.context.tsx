import { createContext } from "react";
import { ICardProps } from "@components"

export interface ICard {
    Number: ICardProps["number"];
    Color: ICardProps["color"];
}

export type GameType = {
    createGame: boolean;
    playerName: string;
    gamePassword?: string;
    showMessage: {show: boolean; timer: number | null};
    message: {
        copy: string,
        color: "green" | "red"
    };
    gameLoading: boolean;
    isTurn: boolean;
    isGameStarted: boolean;
    hand: ICard[]
}

export type GameContextType = {
    game: GameType;
    gameCreated: (pwd: string) => void;
    gameJoined: (payload: {
        name: string;
        password: string;
    }) => void;
    setIsTurn: (isTurn: boolean) => void;
    gameStarted: (hand: ICard[]) => void;
    updateHand: (hand: ICard[]) => void;
    submitForm: (payload: {
        createGame: boolean;
        playerName: string;
        gamePassword: string;
    }) => void;
    closeMessage: () => void;
    copyPassword: () => void;
}

export const GameContext = createContext<GameContextType>({} as GameContextType)