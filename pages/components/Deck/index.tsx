import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableCard } from '@components';
import styles from "@styles/Game.module.css"
import { GameContext, ICard } from 'pages/game.context';
import { useContext, useState } from 'react';

interface IDeckProps {
    hand: ICard[];
    arrangeHand(newHand: ICard[]): void;
}

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

const Deck: React.FunctionComponent<IDeckProps> = ({hand, arrangeHand: socketHandHandler}) => {

    const { arrangeHand } = useContext(GameContext)

    const moveItem = (sourceId: number, destinationId: number) => {
        
        const sourceIndex = hand.findIndex(
          item => item.ID === sourceId
        );
        const destinationIndex = hand.findIndex(
          item => item.ID === destinationId
        );
    
        // If source/destination is unknown, do nothing.
        if (sourceId === -1 || destinationId === -1) {
          return;
        }
    
        const offset = destinationIndex - sourceIndex;

        const newHand = moveElement(hand, sourceIndex, offset)        
    
        arrangeHand(newHand)
        
      };

    const dropItem = () => {
        socketHandHandler(hand)
    }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className={styles.deck}>
                {hand && hand.map((card, i) => 
                    <DraggableCard 
                        key={card.ID} 
                        id={card.ID} 
                        card={card} 
                        onMoveItem={moveItem} 
                        onDropItem={dropItem}
                        position={i}/>
                )}
        </div>
    </DndProvider>
  );
};

export default Deck;
