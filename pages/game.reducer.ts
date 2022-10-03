import { IGameContext } from "./game.context"
import {
    ARRANGE_HAND,
    CLOSE_MESSAGE,
    COPY_PASSWORD,
    DISCARD_CARD,
    DISPLAY_INVALID_ERR,
    DRAW_CARD,
    GAME_CREATED,
    GAME_JOINED,
    GAME_REJOINED,
    GAME_STARTED,
    IN_PROGRESS_ERROR,
    NO_DISCARD_SELECTED_MSG,
    PLAYER_DISCONNECT,
    REJOIN_GAME,
    REJOIN_MESSAGE,
    SELECT_DISCARD,
    SET_CURRENT_PLAYER,
    SET_WILL_DISCARD,
    SUBMIT_FORM,
} from "./game.actions"
import { IPlayer } from "./components"

type ActionsType = {
    type: string,
    payload?: any
}

const reducer = (state: IGameContext["game"], action: ActionsType): IGameContext["game"] => {
    switch (action.type) {
        case ARRANGE_HAND:
            return {
                ...state,
                hand: [...action.payload]
            }
        case CLOSE_MESSAGE:
            return {
                ...state,
                showMessage: {
                    ...state.showMessage,
                    timer: null,
                    show: false,
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
        case DISPLAY_INVALID_ERR:
            return {
                ...state,
                message: {
                    color: "red",
                    copy: "No funny business please, hand resetting..."
                },
                showMessage: {
                    show: true,
                    timer: 3,
                    isRejoin: false
                }
            }
        case DRAW_CARD:
            return {
                ...state,
                hand: [...action.payload],
                canDraw: false
            }
        case GAME_CREATED:
            const newPlayer = { name: action.payload.name, points: 0, position: state.players.length }
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
                    isRejoin: false,
                    show: true
                },
                players: [...state.players, newPlayer]
            }
        case GAME_JOINED:
            const newPlayerName = action.payload[action.payload.length - 1].name
            return {
                ...state,
                message: {
                    copy: `${newPlayerName} has joined the game`,
                    color: "green"
                },
                showMessage: {
                    show: true,
                    timer: 2,
                    isRejoin: false
                },
                gameLoading: false,
                players: [...action.payload]
            }
        case GAME_REJOINED:
            const rejoinedPlayerName = (action.payload as (IPlayer & {isRejoin: boolean})[])
                .find(player => player.isRejoin)
                ?.name
            return {
                ...state,
                message: {
                    copy: `${rejoinedPlayerName} has rejoined the game`,
                    color: "green"
                },
                showMessage: {
                    show: true,
                    timer: 2,
                    isRejoin: false
                },
                gameLoading: false,
                players: [...action.payload]
            }
        case GAME_STARTED:
            return {
                ...state,
                hand: [...action.payload],
                isGameStarted: true,
                currentPlayer: {
                    position: 0,
                    name: state.players[0].name
                }
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
                    timer: 4,
                    isRejoin: false
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
                    timer: 3,
                    isRejoin: false
                }
            }
        case PLAYER_DISCONNECT:
            return {
                ...state,
                message: {
                    color: "red",
                    copy: `${action.payload.lostPlayer} has disconnected, waiting for reconnect...`
                },
                showMessage: {
                    show: true,
                    timer: 3,
                    isRejoin: false
                },
                players: [...action.payload.newPlayers]
            }
        case REJOIN_GAME:            
            const {
                Player: {
                    Cards, 
                    CardDrawn, 
                    IsTurn,
                    Name
                }, 
                CurrentPlayer,
                GameStarted
            } = action.payload            
            return {
                ...state,
                hand: [...Cards],
                canDraw: !CardDrawn,
                isTurn: IsTurn,
                currentPlayer: {
                    position: CurrentPlayer,
                    name: state.players[CurrentPlayer].name
                },
                isGameStarted: GameStarted
            }
        case REJOIN_MESSAGE:
            return {
                ...state,
                message: {
                    color: "green",
                    copy: `Would you like to rejoin your last game?`,
                },
                showMessage: {
                    show: true,
                    timer: null,
                    isRejoin: true
                }
            }
        case SELECT_DISCARD:
            return {
                ...state,
                discardSelected: action.payload
            }
        case SET_CURRENT_PLAYER:
            const isTurn = state.players[action.payload.position].name === state.playerName
            return {
                ...state,
                isTurn,
                canDraw: isTurn,
                currentPlayer: {
                    position: action.payload.position,
                    name: action.payload.name
                }
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
                gameLoading: true,
                isRejoin: action.payload.isRejoin || false
            }
        default:
            return state
    }
}

export default reducer;
