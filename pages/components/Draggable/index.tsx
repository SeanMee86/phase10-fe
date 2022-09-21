import { ICard } from 'pages/game.context';
import * as React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, ICardProps } from '@components';

interface IDraggableProps {
    id: number;
    card: ICard;
    position: number;
    onMoveItem(sourceId: number, destinationId: number): void;
    onDropItem(): void;
}

const DraggableCard: React.FunctionComponent<IDraggableProps> = ({id, card, onMoveItem, position, onDropItem}) => {
  const ref = useRef(null);
  
  const [{ isDragging }, connectDrag] = useDrag({
      type: "CARD",
      item: { id, type: "CARD" },
      collect: (monitor: any) => {
          const isDragging = monitor.isDragging()
            return {
                isDragging
            };
        }
    });

  const [, connectDrop] = useDrop({
    accept: "CARD",
    hover(hoveredOverItem: any) {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    },
    drop() {
        onDropItem()
    }
  });

  connectDrag(ref);
  connectDrop(ref);

  const opacity = isDragging ? 0.5 : 1;
  const containerStyle = { opacity };
  return (
    <Card
      color={card.Color as ICardProps["color"]}
      forwardedStyle={containerStyle}
      forwardedRef={ref}
      number={card.Number as ICardProps["number"]} 
      position={position}/>
  );
};

export default DraggableCard;
