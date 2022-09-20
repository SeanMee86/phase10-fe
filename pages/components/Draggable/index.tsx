import { ICard } from 'pages/game.context';
import * as React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, ICardProps } from '@components';

interface IDraggableProps {
    id: number;
    card: ICard;
    onMoveItem(sourceId: number, destinationId: number): void;
    position: number;
}

const Draggable: React.FunctionComponent<IDraggableProps> = ({id, card, onMoveItem, position}) => {
  const ref = useRef(null);
  
  const [{ isDragging }, connectDrag, connectDragPreview] = useDrag({
      type: "CARD",
      item: { id, type: "CARD" },
      collect: (monitor: any) => {
          const isDragging = monitor.isDragging()
            return {
                isDragging
            };
        }
    });

    React.useEffect(() => {
        connectDragPreview(ref.current, {
            anchorX: 0,
            anchorY: 0
        })
    }, [connectDragPreview])

  const [, connectDrop] = useDrop({
    accept: "CARD",
    hover(hoveredOverItem: any) {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    }
  });

  connectDrag(ref);
  connectDrop(ref);

  const opacity = isDragging ? 0.5 : 1;
  const containerStyle = { opacity };
  return (
    <Card
        forwardedStyle={containerStyle}
        key={id} 
        position={position}
        forwardedRef={ref}
        number={card.Number as ICardProps["number"]} 
        color={card.Color as ICardProps["color"]} />
  );
};

export default Draggable;
