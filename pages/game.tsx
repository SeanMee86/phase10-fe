import { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "../styles/Game.module.css"
let socket: WebSocket;

type Card = {
    Number: number;
    Color: string;
}

const Game: NextPage = () => {

    const [deck, setDeck] = useState<Card[]>([])

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
        socket.addEventListener("message", (ev) => {
            try {
                const serverData = JSON.parse(ev.data)
                switch(serverData.event) {
                    case "GET_DECK":
                        const {data} = serverData
                        setDeck(JSON.parse(data))
                        break;
                    default:
                        console.log("Event not handled");
                        
                }
            } catch(e) {
                console.log(ev);
            }
        })
        socket.addEventListener("close", () => {
            console.log("Socket Closed");
            
        })
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
                    <div 
                        className={styles.card} 
                        style={{color: card.Color}} 
                        key={i}>
                        <div className={styles.inner}>
                            <div
                                className={`${styles.cardDecor} ${styles.upperLeft}`} 
                                style={{backgroundColor: card.Color}}><p>{card.Number}</p></div>
                            {card.Number}
                            <div
                                className={`${styles.cardDecor} ${styles.bottomRight}`} 
                                style={{backgroundColor: card.Color}}><p>{card.Number}</p></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Game;
