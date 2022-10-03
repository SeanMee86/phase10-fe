import { createContext } from "react";
import { ICardProps, IPlayer } from "@components"

export interface ICard {
    Color: ICardProps["color"];
    Number: ICardProps["number"];
    ID: number
}

export type GameType = {
    canDraw: boolean;
    createGame: boolean;
    currentPlayer: {
        position: number;
        name: string;
    };
    discardSelected: number | null;
    gameLoading: boolean;
    gamePassword?: string;
    players: IPlayer[];
    hand: ICard[];
    isGameStarted: boolean;
    isRejoin: boolean;
    isTurn: boolean;
    message: {
        copy: string,
        color: "green" | "red"
    };
    playerName: string;
    showMessage: {
        show: boolean; 
        timer: number | null;
        isRejoin: boolean;
    };
    willDiscard: boolean
}

export interface IGameContext {
    game: GameType;
    arrangeHand(newHand: ICard[]): void;
    closeMessage(): void;
    copyPassword(): void;
    discardCard(hand: ICard[]): void;
    displayInvalidErr(): void;
    drawCard(hand: ICard[]): void;
    gameCreated(payload: {password: string; name: string}): void;
    gameJoined(payload: IPlayer[]): void;
    gameRejoined(payload: IPlayer[]): void;
    gameStarted(hand: ICard[]): void;
    inProgressError(error: string): void;
    noDiscardSelectedMsg(): void;
    playerDisconnect(payload: {
        newPlayers: IPlayer[],
        lostPlayer: string
    }): void;
    rejoinGame(game: GameType): void;
    rejoinMessage(): void;
    selectDiscard(card: number): void;
    setCurrentPlayer(currentPlayer: GameType["currentPlayer"]): void;
    setWillDiscard(willDiscard: boolean): void;
    submitForm(payload: {
        createGame: boolean;
        playerName: string;
        gamePassword: string;
        isRejoin?: boolean;
    }): void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext)