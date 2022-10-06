import { NextPage } from "next"
import { 
    useContext, 
    useEffect, 
    useState 
} from "react"
import Layout from "./layout"
import { 
    Hand, 
    IPlayer, 
    LoadingSpinner,
    PlayerContainer 
} from "@components"
import { GameContext, ICard } from "./game.context" 
import { useRouter } from "next/router"
import styles from "@styles/Game.module.css"

let socket: WebSocket;
let socketJoined = false;

const Game: NextPage = () => {
    const router = useRouter()
    const [host, setHost] = useState<boolean>(false)
    const {
        game,
        arrangeHand,
        discardCard,
        displayInvalidErr,
        drawCard,
        gameCreated,
        gameJoined,
        gameRejoined,
        gameStarted,
        inProgressError,
        playerDisconnect,
        rejoinGame,
        setCurrentPlayer,
    } = useContext(GameContext)

    const {
        hand,
        createGame, 
        isRejoin,
        playerName, 
        gamePassword,
        gameLoading,
        isGameStarted,
        discardSelected,
        players
    } = game

    useEffect(() => {
        if(!playerName) {
            router.push("/")
            return
        }
        if(socketJoined) return;
        socketInitializer()
        const socketInterval = setInterval(() => {
            if(socket.readyState === 1) {
                createGame ? createGameHandler() : joinGameHandler()
                clearInterval(socketInterval)
            }
        }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(!isGameStarted) return;
        if(host) {
            setHost(false)
            setCurrentPlayer({
                currentPlayer: {
                    position: 0,
                    name: playerName
                },
                isTurn: true
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameStarted])

    useEffect(() => {
        if(!socket) return;
        socket.addEventListener("message", onSocketMessage)
        return () => {
            socket.removeEventListener("message", onSocketMessage)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game, socket])

    const socketInitializer = () => {
        socket = new WebSocket("ws://localhost:3001")
        socketJoined = true
    }

    const onSocketMessage = (ev: MessageEvent) => {
        try {
            const serverData = JSON.parse(ev.data)
            const { data } = serverData
            switch(serverData.event) {
                case "CARD_DISCARDED":
                    onCardDiscarded(data)
                    break;
                case "CARD_DRAWN":
                    onCardDrawn(data)
                    break;
                case "GAME_CREATED":
                    onGameCreated(data)
                    break;
                case "GAME_JOINED":
                    onGameJoined(data)
                    break;
                case "GAME_REJOINED":
                    onGameRejoined(data)
                    break;
                case "GAME_STARTED":
                    onGameStarted(data)
                    break;
                case "HAND_ARRANGED":
                    onHandArranged(data)
                    break;
                case "INVALID_HAND":
                    onInvalidHand(data)
                    break;
                case "ERR_GAME_IN_PROGRESS":
                    onInProgressError(data);
                    break;
                case "NEXT_PLAYER_SET":
                    onNextPlayerSet(data)
                    break;
                case "PLAYER_DISCONNECT":
                    onPlayerDisconnect(data)
                    break;
                case "REJOINED_GAME":
                    onRejoinGame(data)
                    break;
                default:
                    console.log("Event not handled")
            }
        } catch(e) {            
            console.log(e)
        }
    }
    
    // ********************** STATE UPDATES *******************************

    const onHandArranged = (data: string) => {
        arrangeHand(JSON.parse(data))
    }
    
    const onCardDiscarded = (data: string) => {
        discardCard(JSON.parse(data))
    }

    const onCardDrawn = (data: string) => {
        drawCard(JSON.parse(data))
    }

    const onGameCreated = (data: string) => {
        const {Id: password} = JSON.parse(data)
        const newPlayer: IPlayer = {
            name: playerName,
            points: 0,
            position: players.length
        } 
        localStorage.setItem("p10Pass", password)
        gameCreated({password, newPlayer})
        setHost(true)
    } 
    
    const onGameJoined = (data: string) => {
        const updatedPlayers = JSON.parse(data)
        const newPlayerName = updatedPlayers[updatedPlayers.length - 1].name
        gameJoined({updatedPlayers, newPlayerName})
    }

    const onGameRejoined = (data: string) => {
        const updatedPlayers = JSON.parse(data)
        const rejoinedPlayer = (updatedPlayers as (IPlayer & {isRejoin: boolean})[])
            .find(player => player.isRejoin)
        if(!rejoinedPlayer) return;
        const rejoinedPlayerName = rejoinedPlayer.name
        gameRejoined({updatedPlayers, rejoinedPlayerName})
    }

    const onGameStarted = (data: string) => {
        gameStarted(JSON.parse(data))
    }

    const onInvalidHand = (data: string) => {
        arrangeHand(JSON.parse(data))
        displayInvalidErr()
    }
    
    const onNextPlayerSet = (data: string) => {        
        const nextPlayer = JSON.parse(data)
        const isTurn = players[nextPlayer.CurrentPlayer.Position]?.name === playerName
        setCurrentPlayer({
            currentPlayer: {
                position: nextPlayer.CurrentPlayer.Position,
                name: nextPlayer.CurrentPlayer.Name
            },
            isTurn
        })
    }
    
    const onInProgressError = (data: string) => {
        inProgressError(JSON.parse(data).error)
        router.push("/")
    }

    const onPlayerDisconnect = (data: string) => {
        const updatedPlayers = JSON.parse(data)
        const lostPlayer = players.find(player => {
            return !updatedPlayers.includes(player.name)
        })
        const newPlayers = players.filter(player => {
            return player.name !== lostPlayer?.name
        }) 
        playerDisconnect({
            newPlayers,
            lostPlayer: lostPlayer!.name
        })
    }

    const onRejoinGame = (data: string) => {
        const [ClientData, Player] = JSON.parse(data)
        const rejoinData = {
            ...ClientData,
            Player
        }
        rejoinGame(rejoinData)
    }

    // ****************** SOCKET EVENTS **********************

    const arrangeHandHandler = (newHand: ICard[]) => {
        const event = "ARRANGE_HAND"
        const data = JSON.stringify({
            Hand: newHand,
            Id: gamePassword
        })
        socket?.send(JSON.stringify({event, data}))
    }

    const createGameHandler = () => {
        const event = "CREATE_GAME"
        const data = JSON.stringify({name: playerName})
        socket?.send(JSON.stringify({event, data}))
    }

    const discardHandler = () => {
        const event = "DISCARD_CARD"
        const data = JSON.stringify({
            Id: gamePassword,
            DiscardCard: {
                Position: discardSelected,
                Card: hand[discardSelected!]
            }
        })        
        socket?.send(JSON.stringify({event, data}))
    }
    
    const drawCardHandler = () => {
        const event = "DRAW_CARD"
        const data = JSON.stringify({
            Id: gamePassword
        })
        socket?.send(JSON.stringify({event, data}))
    }

    const joinGameHandler = () => {
        const event = "JOIN_GAME"
        const data = JSON.stringify({
            name: playerName, 
            gameId: gamePassword,
            isRejoin
        })
        socket?.send(JSON.stringify({event, data}))
    }

    const startGameHandler = () => {
        const event = "START_GAME"
        const data = JSON.stringify({
            Id: gamePassword
        })
        socket?.send(JSON.stringify({event, data}))
    }

    return (
        <Layout>
            {gameLoading ? 
                <LoadingSpinner/> : 
                <>
                    {host && <button onClick={startGameHandler}>Start Game</button>}
                    <div className={styles.gameBoard}>
                        <PlayerContainer 
                            drawCard={drawCardHandler} 
                            discardCard={discardHandler}
                            players={players}/>
                        <Hand 
                            hand={hand} 
                            arrangeHand={arrangeHandHandler}/>
                    </div>
                </>
            }
        </Layout>
    )
}

export default Game;
