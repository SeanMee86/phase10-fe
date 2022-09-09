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
        return () => {
            socket.close()
        }
    }, [])

    const socketInitializer = () => {
        socket = new WebSocket("ws://localhost:3001")
        socket.addEventListener("open", () => {
            console.log("Socket Connected");
        })
        socket.addEventListener("message", onSocketMessage)
        socket.addEventListener("close", () => {
            console.log("Socket Closed");
        })
    }

    const onSocketMessage = (ev: MessageEvent) => {
        try {
            const serverData = JSON.parse(ev.data)
            switch(serverData.event) {
                case "GET_DECK":
                    const {data} = serverData
                    setDeck(JSON.parse(data) as Card[])
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

    const testHandler = () => {
        socket?.send(JSON.stringify({event: "TEST_CONN"}))
    }

    return (
        <div>
            <button onClick={clickHandler}>Get Deck</button>
            <button onClick={testHandler}>Test Conns</button>
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
