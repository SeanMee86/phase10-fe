import { NextPage } from "next"
import { Card, ICardProps } from "@components";
import Layout from "./layout";
import styles from "@styles/Game.module.css"
import React, { createContext, useState } from "react";
import { ICard } from "./game.context";

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

const GridContext = createContext({})

const GridProvider: React.FC<{children: React.ReactNode}> = (props) => {

    const setItems = (items: any) => setState({ ...items });

    const moveItem = (sourceId: number, destinationId: number) => {
        const sourceIndex = state.items.findIndex(
            (item: { id: any; }) => item.id === sourceId
        );
        const destinationIndex = state.items.findIndex(
            (item: { id: any; }) => item.id === destinationId
        );

        if (sourceId === -1 || destinationId === -1) {
            return;
        }

        const offset = destinationIndex - sourceIndex;

        setState(prevState => {
            return {
                ...prevState,
                items: moveElement(prevState.items, sourceIndex, offset)
            }
        });
    };

    const [state, setState] = useState({
        items: mockHand,
        moveItem,
        setItems
    })


    return (
        <GridContext.Provider value={}>
            {props.children}
        </GridContext.Provider>
    )
}


const DND: NextPage = () => {

    return (
        <Layout>
            <GridProvider>
                <div className={styles.deck}>
                        {mockHand.map((card, i) => 
                            <Card 
                                key={i} 
                                position={i}
                                number={card.Number as ICardProps["number"]} 
                                color={card.Color as ICardProps["color"]} />
                        )}
                </div>
            </GridProvider>
        </Layout>
    )
}

export default DND;

