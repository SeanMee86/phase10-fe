import { createContext } from "react";
import { ICardProps, IPlayer } from "@components"

export interface ICard {
    Color: ICardProps["color"];
    Number: ICardProps["number"];
    ID: ICardProps["ID"]
}

export type GameType = {
    canDraw: boolean;
    createGame: boolean;
    discardSelected: number | null;
    gameLoading: boolean;
    gamePassword?: string;
    players: IPlayer[];
    hand: ICard[];
    isGameStarted: boolean;
    isTurn: boolean;
    message: {
        copy: string,
        color: "green" | "red"
    };
    playerName: string;
    showMessage: {show: boolean; timer: number | null};
    willDiscard: boolean
}

export interface IGameContext {
    game: GameType;
    closeMessage(): void;
    copyPassword(): void;
    discardCard(hand: ICard[]): void;
    drawCard(hand: ICard[]): void;
    gameCreated(payload: {password: string; name: string}): void;
    gameJoined(payload: IPlayer[]): void;
    gameStarted(hand: ICard[]): void;
    inProgressError(error: string): void;
    noDiscardSelectedMsg(): void;
    selectDiscard(card: number): void;
    setIsTurn(isTurn: boolean): void;
    setWillDiscard(willDiscard: boolean): void;
    submitForm(payload: {
        createGame: boolean;
        playerName: string;
        gamePassword: string;
    }): void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext)