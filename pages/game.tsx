import { NextPage } from "next"
import { useEffect, useState } from "react"
import { Card, ICardProps } from "@components"
import styles from "@styles/Game.module.css"

let socket: WebSocket;

type Card = {
    Number: ICardProps["number"];
    Color: ICardProps["color"];
}

const Game: NextPage = () => {

    const [deck, setDeck] = useState<Card[]>()

    useEffect(() => {
        socketInitializer()
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
                    console.log(JSON.parse(data))
                    break;
                case "GAME_JOINED":
                    console.log(data);
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
        socket?.send(JSON.stringify({event: "CREATE_GAME", data: JSON.stringify({name: "Sean"})}))
    }

    const joinHandler = () => {
        socket?.send(JSON.stringify({event: "JOIN_GAME", data: JSON.stringify({name: "Ed", gameId: "07dcea05-aada-4a9c-a5d0-36cd0d9cd923"})}))
    }

    return (
        <div>
            <button onClick={clickHandler}>Get Deck</button>
            <button onClick={createHandler}>Create Game</button>
            <button onClick={joinHandler}>Join Game</button>
            <div className={styles.deck}>
                {deck && deck.map((card, i) => 
                    <Card
                        key={i} 
                        number={card.Number} 
                        color={card.Color} />
                )}
            </div>
        </div>
    )
}

export default Game;
