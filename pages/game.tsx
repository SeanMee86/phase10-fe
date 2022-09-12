import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { Card, ICardProps, IPlayer, LoadingSpinner } from "@components"
import styles from "@styles/Game.module.css"
import { GameContext } from "./game.context";
import { useRouter } from "next/router";
import { PlayerContainer } from "@components";
import Layout from "./layout";

let socket: WebSocket;
let socketJoined = false;

interface ICard {
    Number: ICardProps["number"];
    Color: ICardProps["color"];
}

const Game: NextPage = () => {

    const router = useRouter()
    const [deck, setDeck] = useState<ICard[]>()
    const [players, setPlayers] = useState<IPlayer[]>()
    const [gameCreated, setGameCreated] = useState<boolean>()
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
        if(!gameCreated) return;
        setMessage(`Game Password: ${gamePassword}`)
        setShowMessage(true)
    }, [gameCreated])

    const socketInitializer = () => {
        socket = new WebSocket("ws://localhost:3001")
        socket.addEventListener("message", onSocketMessage)
    }

    const onSocketMessage = (ev: MessageEvent) => {
        try {
            const serverData = JSON.parse(ev.data)
            const {data} = serverData
            switch(serverData.event) {
                case "GET_DECK":
                    setDeck(JSON.parse(data) as ICard[])
                    break;
                case "GAME_CREATED":
                    const gameData = JSON.parse(data)
                    setGamePassword(gameData.Id)
                    setPlayers([{name: playerName, points: 0}])
                    setGameCreated(true)
                    setGameLoading(false)
                    break;
                case "GAME_JOINED":
                    const playerNames = JSON.parse(data);
                    setPlayers(playerNames.map((player: string) => {
                        return {
                            name: player,
                            points: 0
                        }
                    }))
                    break;
                default:
                    console.log("Event not handled");
            }
        } catch(e) {
            console.log(ev);
        }
    }

    const clickHandler = () => {
        socket?.send(JSON.stringify({event: "GET_DECK"}))
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
                <>
                    <button onClick={clickHandler}>Get Deck</button>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
                        <div>
                            <PlayerContainer players={players}/>
                        </div>
                        <div className={styles.deck}>
                            {deck && deck.map((card, i) => 
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
