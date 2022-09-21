import { IGameContext } from "./game.context"
import { 
    ARRANGE_HAND,
    CLOSE_MESSAGE, 
    COPY_PASSWORD, 
    DISCARD_CARD, 
    DRAW_CARD,
    GAME_CREATED, 
    GAME_JOINED, 
    GAME_STARTED, 
    IN_PROGRESS_ERROR, 
    NO_DISCARD_SELECTED_MSG, 
    SELECT_DISCARD, 
    SET_IS_TURN, 
    SET_WILL_DISCARD,
    SUBMIT_FORM, 
} from "./game.actions"

type ActionsType = {
    type: string,
    payload?: any
}

const reducer = (state: IGameContext["game"], action: ActionsType): IGameContext["game"] => {
    switch(action.type) {
        case ARRANGE_HAND:
            return {
                ...state,
                hand: [...action.payload]
            }
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
        case DISCARD_CARD:
            return {
                ...state,
                hand: [...action.payload],
                isTurn: false,
                willDiscard: false,
                discardSelected: null
            }
        case DRAW_CARD:
            return {
                ...state,
                hand: [...action.payload],
                canDraw: false
            }
        case GAME_CREATED:
            const newPlayer =  {name: action.payload.name, points: 0, position: state.players.length}
            return {
                ...state,
                gamePassword: action.payload.password,
                gameLoading: false,
                message: {
                    copy: `Game Password: ${action.payload.password}`,
                    color: "green"
                },
                showMessage: {
                    ...state.showMessage,
                    show: true
                },
                players: [...state.players, newPlayer]
            }
        case GAME_JOINED:
            const newPlayerName = action.payload[action.payload.length-1].name
            return {
                ...state,
                message: {
                    copy: `${newPlayerName} has joined the game`,
                    color: "green"
                },
                showMessage: {
                    show: true, 
                    timer: 2
                },
                gameLoading: false,
                players: [...action.payload]
            }
        case GAME_STARTED:
            return {
                ...state,
                hand: [...action.payload],
                isGameStarted: true,
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
        case NO_DISCARD_SELECTED_MSG:
            return {
                ...state,
                message: {
                    color: "red",
                    copy: "No card selected..."
                },
                showMessage: {
                    show: true,
                    timer: 3
                }
            }
        case SELECT_DISCARD:
            return {
                ...state,
                discardSelected: action.payload
            }
        case SET_IS_TURN:
            return {
                ...state,
                isTurn: action.payload,
                canDraw: action.payload
            }
        case SET_WILL_DISCARD:
            return {
                ...state,
                willDiscard: action.payload,
                discardSelected: null
            }
        case SUBMIT_FORM:
            return {
                ...state,
                ...action.payload,
                gameLoading: true
            }
        default:
            return state
    }
}

export default reducer;
