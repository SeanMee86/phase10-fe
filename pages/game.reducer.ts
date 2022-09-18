import { GameContextType } from "./game.context"
import { 
    CLOSE_MESSAGE, 
    COPY_PASSWORD, 
    GAME_CREATED, 
    GAME_JOINED, 
    GAME_STARTED, 
    IN_PROGRESS_ERROR, 
    SET_IS_TURN, 
    SUBMIT_FORM, 
    UPDATE_HAND 
} from "./game.actions"

type ActionsType = {
    type: string,
    payload?: any
}

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
        case IN_PROGRESS_ERROR:
            return {
                ...state,
                message: {
                    color: "red",
                    copy: action.payload
                },
                showMessage: {
                    show: true,
                    timer: 4
                }
            }
        case SET_IS_TURN:
            return {
                ...state,
                isTurn: action.payload
            }
        case SUBMIT_FORM:
            return {
                ...state,
                ...action.payload,
                gameLoading: true
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

export default reducer;
