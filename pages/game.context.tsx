import { createContext } from "react";
import { ICardProps } from "@components"

export interface ICard {
    Color: ICardProps["color"];
    Number: ICardProps["number"];
}

export type GameType = {
    canDraw: boolean;
    createGame: boolean;
    gameLoading: boolean;
    gamePassword?: string;
    hand: ICard[]
    isGameStarted: boolean;
    isTurn: boolean;
    message: {
        copy: string,
        color: "green" | "red"
    };
    playerName: string;
    showMessage: {show: boolean; timer: number | null};
}

export interface IGameContext {
    game: GameType;
    closeMessage(): void;
    copyPassword(): void;
    drawCard(hand: ICard[]): void;
    inProgressError(error: string): void;
    gameCreated(pwd: string): void;
    gameJoined(joiner: string): void;
    gameStarted(hand: ICard[]): void;
    setIsTurn(isTurn: boolean): void;
    submitForm(payload: {
        createGame: boolean;
        playerName: string;
        gamePassword: string;
    }): void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext)