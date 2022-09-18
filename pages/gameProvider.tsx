import { ReactNode, useReducer } from "react";
import { GameContext, GameContextType, GameType, ICard } from "./game.context";
import {
    GAME_CREATED,
    GAME_JOINED,
    GAME_STARTED,
    UPDATE_HAND,
    SET_IS_TURN,
    SUBMIT_FORM,
    CLOSE_MESSAGE,
    COPY_PASSWORD
} from "./game.actions"

type ActionsType = {
    type: string,
    payload?: any
}

// Game Password needs to be added to Game Joined Action


const reducer = (state: GameContextType["game"], action: ActionsType): GameContextType["game"] => {
    switch(action.type) {
        case CLOSE_MESSAGE:
            return {
                ...state,
                showMessage: {
                    timer: null,
                    show: false
                }
            }
        case COPY_PASSWORD:
            return {
                ...state,
                message: {
                    copy: "Password Copied!",
                    color: "green"
                },
                showMessage: {
                    ...state.showMessage,
                    timer: 2
                }
            }
        case GAME_CREATED:
            return {
                ...state,
                gamePassword: action.payload,
                gameLoading: false,
                message: {
                    copy: `Game Password: ${action.payload}`,
                    color: "green"
                },
                showMessage: {
                    ...state.showMessage,
                    show: true
                }
            }
        case GAME_JOINED:
            return {
                ...state,
                message: {
                    copy: `${action.payload} has joined the game`,
                    color: "green"
                },
                showMessage: {
                    show: true, 
                    timer: 2
                },
                gameLoading: false,
            }
        case GAME_STARTED:
            return {
                ...state,
                hand: [...action.payload],
                isGameStarted: true
            }
        case SET_IS_TURN:
            return {
                ...state,
                isTurn: action.payload
            }
        case SUBMIT_FORM:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_HAND:
            return {
                ...state,
                hand: [...action.payload]
            }
        default:
            return state
    }
}

const GameProvider: React.FC<{children: ReactNode}> = (props) => {
    const initialState: GameType = {
        createGame: true,
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
        gameLoading: true,
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
        gameCreated,
        gameJoined,
        setIsTurn,
        gameStarted,
        updateHand,
        submitForm,
        closeMessage,
        copyPassword
    }


    return (
        <GameContext.Provider value={value} >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
