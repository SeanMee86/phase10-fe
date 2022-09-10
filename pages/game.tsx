import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { Card, ICardProps } from "@components"
import styles from "@styles/Game.module.css"
import { GameContext } from "./game.context";
import { useRouter } from "next/router";

let socket: WebSocket;
let socketJoined = false;

type Card = {
    Number: ICardProps["number"];
    Color: ICardProps["color"];
}

const Game: NextPage = () => {

    const router = useRouter()
    const [deck, setDeck] = useState<Card[]>()
    const [players, setPlayers] = useState<string[]>([])
    const {createGame, playerName, gamePassword, setGamePassword} = useContext(GameContext)

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
                    setDeck(JSON.parse(data) as Card[])
                    break;
                case "GAME_CREATED":
                    const gameData = JSON.parse(data)
                    setGamePassword!(gameData.Id)
                    break;
                case "GAME_JOINED":
                    const playerNames = JSON.parse(data);
                    setPlayers([...playerNames])
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
        <div>
            {createGame && <p>Game Password: {gamePassword}</p>}
            <button onClick={clickHandler}>Get Deck</button>
            <div className={styles.deck}>
                {deck && deck.map((card, i) => 
                    <Card
                        key={i} 
                        number={card.Number} 
                        color={card.Color} />
                )}
            </div>
            <div>{players.map(player => {
                return (
                    <p key={player}>{player}</p>
                )
            })}</div>
        </div>
    )
}

export default Game;
