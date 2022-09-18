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
    LoadingSpinner 
} from "@components"
import { GameContext } from "./game.context" 
import { useRouter } from "next/router"
import { PlayerContainer } from "@components"
import styles from "@styles/Game.module.css"

let socket: WebSocket;
let socketJoined = false;

// Finish setting up Reducer (Need On Game In Progress Error)

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
            isTurn,
        },
        gameCreated,
        gameJoined,
        gameStarted,
        setIsTurn,
        updateHand
    } = useContext(GameContext)

    useEffect(() => {
        if(!playerName) {
            router.push("/")
            return
        }
        socketInitializer()
        const socketInterval = setInterval(() => {
            if(socket.readyState === 1 && !socketJoined) {
                createGame ? createHandler() : joinHandler()
                socketJoined = true
                clearInterval(socketInterval)
            }
        }, 1000)
    }, [])

    useEffect(() => {
        if(!isGameStarted) return;
        if(host) {
            setHost(false)
            setIsTurn(true)
        }
    }, [isGameStarted])

    const socketInitializer = () => {
        socket = new WebSocket("ws://localhost:3001")
        socket.addEventListener("message", onSocketMessage)
    }

    const onSocketMessage = (ev: MessageEvent) => {
        try {
            const serverData = JSON.parse(ev.data)
            const { data } = serverData
            switch(serverData.event) {
                case "GAME_CREATED":
                    onGameCreated(data)
                    break;
                case "GAME_JOINED":
                    onGameJoined(data)
                    break;
                case "GAME_STARTED":
                    onGameStarted(data)
                    break;
                case "CARD_DRAWN":
                    onCardDrawn(data)
                    break;
                case "ERR_GAME_IN_PROGRESS":
                    onGameInProgressErr(data);
                    break;
                default:
                    console.log("Event not handled")
            }
        } catch(e) {
            console.log(ev)
        }
    }

    const onGameInProgressErr = (data: string) => {
        // setMessageColor("red")
        // setMessage(JSON.parse(data).error)
        // setShowMessage({show: true, timer: 3})
        router.push("/")
    }

    const onGameCreated = (data: string) => {
        console.log(JSON.parse(data))
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

    const onCardDrawn = (data: string) => {
        updateHand(JSON.parse(data))
    }

    const createHandler = () => {
        const event = "CREATE_GAME"
        const data = JSON.stringify({name: playerName})
        socket?.send(JSON.stringify({event, data}))
    }

    const joinHandler = () => {
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

    const drawCardHandler = () => {
        const event = "DRAW_CARD"
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
                            isTurn={isTurn} 
                            players={players}/>
                        <div className={styles.deck}>
                            {hand && hand.map((card, i) => 
                                <Card 
                                    key={i} 
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
