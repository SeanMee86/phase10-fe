import { NextPage } from "next"
import { Card, ICardProps } from "@components";
import Layout from "./layout";
import styles from "@styles/Game.module.css"
import React, { useState } from "react";
import { ICard } from "./game.context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import Draggable from "./components/Draggable";

const mockHand: ICard[] = [
    {
        "Number": 5,
        "Color": "green",
        "ID": 1
    },
    {
        "Number": 6,
        "Color": "yellow",
        "ID": 2
    },
    {
        "Number": 5,
        "Color": "blue",
        "ID": 3
    },
    {
        "Number": 7,
        "Color": "red",
        "ID": 4
    },
    {
        "Number": 1,
        "Color": "yellow",
        "ID": 5
    },
    {
        "Number": 11,
        "Color": "red",
        "ID": 6
    },
    {
        "Number": 2,
        "Color": "red",
        "ID": 7
    },
    {
        "Number": 1,
        "Color": "yellow",
        "ID": 8
    },
    {
        "Number": 6,
        "Color": "blue",
        "ID": 9
    },
    {
        "Number": 4,
        "Color": "blue",
        "ID": 10
    }
]

function move(array: ICard[], oldIndex: number, newIndex: number) {
    if (newIndex >= array.length) {
      newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }
  
  function moveElement(array: ICard[], index: number, offset: number) {
    const newIndex = index + offset;
  
    return move(array, index, newIndex);
  }


const DND: NextPage = () => {

    const moveItem = (sourceId: number, destinationId: number) => {
        const sourceIndex = state.cards.findIndex(
          item => item.ID === sourceId
        );
        const destinationIndex = state.cards.findIndex(
          item => item.ID === destinationId
        );
    
        // If source/destination is unknown, do nothing.
        if (sourceId === -1 || destinationId === -1) {
          return;
        }
    
        const offset = destinationIndex - sourceIndex;

        const newHand = moveElement(state.cards, sourceIndex, offset)

        console.log(newHand);
        
    
        setState(prevState => ({
          ...prevState,
          cards: [...newHand]
        }));
      };

    const [state, setState] = useState<{cards: ICard[], [key: string]: any}>({
        cards: [...mockHand],
        moveItem
    })

    return (
        <Layout>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.deck}>
                        {state.cards.map((card, i) => 
                            <Draggable key={card.ID} id={card.ID} card={card} onMoveItem={moveItem} position={i}/>
                        )}
                </div>
            </DndProvider>
        </Layout>
    )
}

export default DND;

