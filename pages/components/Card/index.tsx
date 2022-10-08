import * as React from 'react';
import styles from "@styles/Card.module.css"
import { 
    useContext, 
    useState, 
    useEffect, 
    Ref
} from 'react';
import { GameContext } from 'pages/game.context';
import { useWindowResize } from '@hooks';


export interface ICardProps {
    number: 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12;
    color: "red" | "yellow" | "blue" | "green";
    position: number;
    forwardedRef: React.MutableRefObject<HTMLDivElement>;
    forwardedStyle: any;
}

const Card: React.FunctionComponent<ICardProps> = ({number, color, position, forwardedRef, forwardedStyle}) => {

    const {game, selectDiscard} = useContext(GameContext)
    const [discardable, setDiscardable] = useState<boolean>(false)
    const [cardHeight, setCardHeight] = useState<string>("")
    const [width] = useWindowResize()    

    useEffect(() => {
        if(position === game.discardSelected) {
            setDiscardable(true)
        } else {
            setDiscardable(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.discardSelected])

    useEffect(() => {
        setCardHeight(`${forwardedRef.current.offsetWidth*1.5}px`)
    }, [width])

    const onSelectDiscard = () => {        
        selectDiscard(position)
    }

    const onSelect = () => {
        // Need to implement
    }

    const discardStyle = discardable && {borderColor: "red"}
    return (
        <div 
            ref={forwardedRef}
            className={styles.card} 
            style={{color, ...(forwardedStyle), ...(discardStyle), zIndex: position, height: cardHeight}}
            onClick={game.willDiscard ? onSelectDiscard : onSelect}>
            <div className={styles.inner}>
                <div
                    className={`${styles.cardDecor} ${styles.upperLeft}`} 
                    style={{backgroundColor: color}}><p>{number}</p></div>
                {number}
                <div
                    className={`${styles.cardDecor} ${styles.bottomRight}`} 
                    style={{backgroundColor: color}}><p>{number}</p></div>
            </div>
        </div>
    );
}

export default Card;
