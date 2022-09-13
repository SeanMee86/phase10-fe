import { NextPage } from "next"
import { 
    useContext, 
    useEffect, 
    useState 
} from "react"
import Layout from "./layout"
import { 
    Card, 
    ICardProps, 
    IPlayer, 
    LoadingSpinner 
} from "@components"
import { GameContext } from "./game.context" 
import { useRouter } from "next/router"
import { PlayerContainer } from "@components"
import styles from "@styles/Game.module.css"

let socket: WebSocket;
let socketJoined = false;

interface ICard {
    Number: ICardProps["number"];
    Color: ICardProps["color"];
}

const Game: NextPage = () => {
    const router = useRouter()
    const [players, setPlayers] = useState<IPlayer[]>()
    const {
        createGame, 
        playerName, 
        gamePassword,
        gameLoading,
        setGamePassword,
        setMessage,
        setShowMessage,
        setGameLoading
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
        if(!gamePassword || !createGame) return;
        setMessage(`Game Password: ${gamePassword}`)
        setShowMessage({show: true, timer: null})
    }, [gamePassword])

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
                default:
                    console.log("Event not handled")
            }
        } catch(e) {
            console.log(ev)
        }
    }

    const onGameCreated = (data: string) => {
        const gameData = JSON.parse(data)
        setGamePassword(gameData.Id)
        setPlayers([{name: playerName, points: 0}])
        setGameLoading(false)
    } 

    const onGameJoined = (data: string) => {
        const playerNames = JSON.parse(data)
            .map((player: string) => ({name: player, points: 0}))
        const joinedPlayer = playerNames[playerNames.length - 1].name
        setPlayers(playerNames)
        setMessage(`${joinedPlayer} has joined the game`)
        setShowMessage({show: true, timer: 2})
        setGameLoading(false)
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

    return (
        <Layout>
            {gameLoading ? 
                <LoadingSpinner/> : 
                <div className={styles.gameBoard}>
                    <PlayerContainer players={players}/>
                    <div className={styles.deck}>
                        Cards Go here ...
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Game;
