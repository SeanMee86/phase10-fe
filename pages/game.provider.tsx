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
    SET_WILL_DISCARD
} from "./game.actions"

const GameProvider: React.FC<{children: ReactNode}> = (props) => {

    const initialState: GameType = {
        canDraw: false,
        createGame: false,
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
        showMessage: {
            show: false,
            timer: null
        },
        willDiscard: false
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const closeMessage = () => {
        dispatch({type: CLOSE_MESSAGE})
    }

    const copyPassword = () => {
        dispatch({type: COPY_PASSWORD})
    }
    
    const drawCard = (hand: ICard[]) => {
        dispatch({type: DRAW_CARD, payload: hand})
    }

    const gameCreated = (password: string) => {
        dispatch({type: GAME_CREATED, payload: password})
    }

    const gameJoined = (joiner: string) => {
        dispatch({type: GAME_JOINED, payload: joiner})   
    }
    
    const gameStarted = (hand: ICard[]) => {
        dispatch({type: GAME_STARTED, payload: hand})
    }

    const inProgressError = (error: string) => {
        dispatch({type: IN_PROGRESS_ERROR, payload: error})
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
        closeMessage,
        copyPassword,
        drawCard,
        gameCreated,
        gameJoined,
        gameStarted,
        inProgressError,
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
