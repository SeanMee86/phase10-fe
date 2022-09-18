import { ReactNode, useReducer } from "react";
import reducer from "./game.reducer";
import { GameContext, GameContextType, GameType, ICard } from "./game.context";
import {
    GAME_CREATED,
    GAME_JOINED,
    GAME_STARTED,
    UPDATE_HAND,
    SET_IS_TURN,
    SUBMIT_FORM,
    CLOSE_MESSAGE,
    COPY_PASSWORD,
    IN_PROGRESS_ERROR
} from "./game.actions"

const GameProvider: React.FC<{children: ReactNode}> = (props) => {

    const initialState: GameType = {
        createGame: false,
        playerName: "",
        gamePassword: "",
        showMessage: {
            show: false,
            timer: null
        },
        message: {
            color: "green",
            copy: ""
        },
        gameLoading: false,
        isGameStarted: false,
        isTurn: false,
        hand: []
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const closeMessage = () => {
        dispatch({type: CLOSE_MESSAGE})
    }

    const copyPassword = () => {
        dispatch({type: COPY_PASSWORD})
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
    
    const submitForm = (payload: {
        createGame: boolean;
        gamePassword: string;
        playerName: string;
    }) => {
        dispatch({type: SUBMIT_FORM, payload})
    }

    const updateHand = (hand: ICard[]) => {
        dispatch({type: UPDATE_HAND, payload: hand})
    }

    const value: GameContextType = {
        game: state,
        closeMessage,
        copyPassword,
        gameCreated,
        gameJoined,
        gameStarted,
        inProgressError,
        setIsTurn,
        submitForm,
        updateHand,
    }


    return (
        <GameContext.Provider value={value} >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
