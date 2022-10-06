import { ReactNode, useReducer } from "react";
import reducer from "./game.reducer";
import { 
    GameContext, 
    IGameContext, 
    GameType, 
    ICard
} from "./game.context";
import {
    GAME_CREATED,
    GAME_JOINED,
    GAME_STARTED,
    DRAW_CARD,
    SUBMIT_FORM,
    CLOSE_MESSAGE,
    COPY_PASSWORD,
    IN_PROGRESS_ERROR,
    SET_WILL_DISCARD,
    NO_DISCARD_SELECTED_MSG,
    SELECT_DISCARD,
    DISCARD_CARD,
    ARRANGE_HAND,
    DISPLAY_INVALID_ERR,
    SET_CURRENT_PLAYER,
    REJOIN_GAME,
    REJOIN_MESSAGE,
    PLAYER_DISCONNECT,
    GAME_REJOINED
} from "./game.actions"
import { IPlayer } from "./components";

const GameProvider: React.FC<{children: ReactNode}> = (props) => {

    const initialState: GameType = {
        canDraw: false,
        createGame: false,
        currentPlayer: {
            position: 0,
            name: ""
        },
        discardSelected: null,
        gameLoading: false,
        gamePassword: "",
        hand: [],
        isGameStarted: false,
        isRejoin: false,
        isTurn: false,
        message: {
            color: "green",
            copy: ""
        },
        playerName: "",
        players: [],
        showMessage: {
            show: false,
            timer: null,
            isRejoin: false
        },
        willDiscard: false
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const arrangeHand = (newHand: ICard[]) => {
        dispatch({type: ARRANGE_HAND, payload: newHand})
    }
    
    const closeMessage = () => {
        dispatch({type: CLOSE_MESSAGE})
    }

    const copyPassword = () => {
        dispatch({type: COPY_PASSWORD})
    }

    const discardCard = (hand: ICard[]) => {
        dispatch({type: DISCARD_CARD, payload: hand})
    }

    const displayInvalidErr = () => {
        dispatch({type: DISPLAY_INVALID_ERR})
    }
    
    const drawCard = (hand: ICard[]) => {
        dispatch({type: DRAW_CARD, payload: hand})
    }

    const gameCreated = (payload: {password: string; newPlayer: IPlayer;}) => {
        dispatch({type: GAME_CREATED, payload})
    }

    const gameJoined = (payload: {
        updatedPlayers: IPlayer[],
        newPlayerName: string
    }) => {
        dispatch({type: GAME_JOINED, payload})   
    }

    const gameRejoined = (payload: {
        updatedPlayers: IPlayer[],
        rejoinedPlayerName: string
    }) => {
        dispatch({type: GAME_REJOINED, payload})
    }
    
    const gameStarted = (hand: ICard[]) => {
        dispatch({type: GAME_STARTED, payload: hand})
    }

    const inProgressError = (error: string) => {
        dispatch({type: IN_PROGRESS_ERROR, payload: error})
    } 

    const noDiscardSelectedMsg = () => {
        dispatch({type: NO_DISCARD_SELECTED_MSG})
    }

    const playerDisconnect = (payload: {updatedPlayers: IPlayer[], lostPlayer: string}) => {
        dispatch({type: PLAYER_DISCONNECT, payload})
    }

    const rejoinGame = (payload: GameType) => {
        dispatch({type: REJOIN_GAME, payload})
    }

    const rejoinMessage = () => {
        dispatch({type: REJOIN_MESSAGE})
    }

    const selectDiscard = (cardIdx: number) => {
        dispatch({type: SELECT_DISCARD, payload: cardIdx})
    }

    const setCurrentPlayer = (payload: {
        currentPlayer: GameType["currentPlayer"],
        isTurn: boolean
    }) => {
        dispatch({type: SET_CURRENT_PLAYER, payload})
    }

    const setWillDiscard = (willDiscard: boolean) => {
        dispatch({type: SET_WILL_DISCARD, payload: willDiscard})
    }
    
    const submitForm = (payload: {
        createGame: boolean;
        gamePassword: string;
        playerName: string;
        isRejoin?: boolean;
    }) => {
        dispatch({type: SUBMIT_FORM, payload})
    }

    const value: IGameContext = {
        game: state,
        arrangeHand,
        closeMessage,
        copyPassword,
        discardCard,
        displayInvalidErr,
        drawCard,
        gameCreated,
        gameJoined,
        gameRejoined,
        gameStarted,
        inProgressError,
        noDiscardSelectedMsg,
        playerDisconnect,
        rejoinGame,
        rejoinMessage,
        selectDiscard,
        setCurrentPlayer,
        setWillDiscard,
        submitForm,
    }


    return (
        <GameContext.Provider value={value} >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
