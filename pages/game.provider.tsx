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
    SET_IS_TURN,
    SUBMIT_FORM,
    CLOSE_MESSAGE,
    COPY_PASSWORD,
    IN_PROGRESS_ERROR,
    SET_WILL_DISCARD,
    NO_DISCARD_SELECTED_MSG,
    SELECT_DISCARD,
    DISCARD_CARD,
    ARRANGE_HAND
} from "./game.actions"
import { IPlayer } from "./components";

const GameProvider: React.FC<{children: ReactNode}> = (props) => {

    const initialState: GameType = {
        canDraw: false,
        createGame: false,
        discardSelected: null,
        gameLoading: false,
        gamePassword: "",
        hand: [],
        isGameStarted: false,
        isTurn: false,
        message: {
            color: "green",
            copy: ""
        },
        playerName: "",
        players: [],
        showMessage: {
            show: false,
            timer: null
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
    
    const drawCard = (hand: ICard[]) => {
        dispatch({type: DRAW_CARD, payload: hand})
    }

    const gameCreated = (payload: {password: string; name: string;}) => {
        dispatch({type: GAME_CREATED, payload})
    }

    const gameJoined = (payload: IPlayer[]) => {
        dispatch({type: GAME_JOINED, payload})   
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

    const selectDiscard = (cardIdx: number) => {
        dispatch({type: SELECT_DISCARD, payload: cardIdx})
    }

    const setIsTurn = (isTurn: boolean) => {
        dispatch({type: SET_IS_TURN, payload: isTurn})
    }

    const setWillDiscard = (willDiscard: boolean) => {
        dispatch({type: SET_WILL_DISCARD, payload: willDiscard})
    }
    
    const submitForm = (payload: {
        createGame: boolean;
        gamePassword: string;
        playerName: string;
    }) => {
        dispatch({type: SUBMIT_FORM, payload})
    }

    const value: IGameContext = {
        game: state,
        arrangeHand,
        closeMessage,
        copyPassword,
        discardCard,
        drawCard,
        gameCreated,
        gameJoined,
        gameStarted,
        inProgressError,
        noDiscardSelectedMsg,
        selectDiscard,
        setIsTurn,
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
