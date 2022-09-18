import { NextPage } from "next"
import { 
    useContext, 
    useEffect, 
    useState 
} from "react"
import Layout from "./layout"
import { 
    Card, 
    IPlayer, 
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
    const [players, setPlayers] = useState<IPlayer[]>()
    const [host, setHost] = useState<boolean>(false)
    const {
        game: {
            hand,
            createGame, 
            playerName, 
            gamePassword,
            gameLoading,
            isGameStarted,
            discardSelected
        },
        discardCard,
        drawCard,
        gameCreated,
        gameJoined,
        gameStarted,
        inProgressError,
        setIsTurn,
    } = useContext(GameContext)

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

    const socketInitializer = () => {
        socket = new WebSocket("ws://localhost:3001")
        socketJoined = true
        socket.addEventListener("message", onSocketMessage)
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
        gameCreated(JSON.parse(data).Id)
        setPlayers([{name: playerName, points: 0}])
        setHost(true)
    } 
    
    const onGameJoined = (data: string) => {
        const playerNames = JSON.parse(data)
        .map((player: string) => ({name: player, points: 0}))
        const joinedPlayer = playerNames[playerNames.length - 1].name
        setPlayers(playerNames)
        gameJoined(joinedPlayer)
        
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
