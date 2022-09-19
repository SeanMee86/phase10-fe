import { NextPage } from "next"
import { 
    useContext, 
    useEffect, 
    useState 
} from "react"
import Layout from "./layout"
import { 
    Card, 
    LoadingSpinner,
    PlayerContainer 
} from "@components"
import { GameContext } from "./game.context" 
import { useRouter } from "next/router"
import styles from "@styles/Game.module.css"

let socket: WebSocket;
let socketJoined = false;

const Game: NextPage = () => {
    const router = useRouter()
    const [host, setHost] = useState<boolean>(false)
    const {
        game,
        discardCard,
        drawCard,
        gameCreated,
        gameJoined,
        gameStarted,
        inProgressError,
        setIsTurn,
    } = useContext(GameContext)

    const {
        hand,
        createGame, 
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
            setIsTurn(true)
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
                case "GAME_STARTED":
                    onGameStarted(data)
                    break;
                case "ERR_GAME_IN_PROGRESS":
                    onInProgressError(data);
                    break;
                case "NEXT_PLAYER_SET":
                    onNextPlayerSet(data)
                    break;
                default:
                    console.log("Event not handled")
            }
        } catch(e) {            
            console.log(ev)
        }
    }
    
    // ********************** STATE UPDATES *******************************
    
    const onCardDiscarded = (data: string) => {
        discardCard(JSON.parse(data))
    }

    const onCardDrawn = (data: string) => {
        drawCard(JSON.parse(data))
    }

    const onGameCreated = (data: string) => {
        gameCreated({password: JSON.parse(data).Id, name: playerName})
        setHost(true)
    } 
    
    const onGameJoined = (data: string) => {
        const playerArray = JSON.parse(data)
        .map((player: string, index: number) => ({name: player, points: 0, position: index}))
        gameJoined(playerArray)
    }

    const onNextPlayerSet = (data: string) => {
        const position = +JSON.parse(data) 
        const currentPlayer = players[position]
        if (currentPlayer.name === playerName) {
            setIsTurn(true)
        }
    }
    
    const onGameStarted = (data: string) => {
        gameStarted(JSON.parse(data))
    }
    
    const onInProgressError = (data: string) => {
        inProgressError(JSON.parse(data).error)
        router.push("/")
    }

    // ****************** SOCKET EVENTS **********************

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
            gameId: gamePassword
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
                        <div className={styles.deck}>
                            {hand && hand.map((card, i) => 
                                <Card 
                                    key={i} 
                                    position={i}
                                    number={card.Number} 
                                    color={card.Color} />
                            )}
                        </div>
                    </div>
                </>
            }
        </Layout>
    )
}

export default Game;
