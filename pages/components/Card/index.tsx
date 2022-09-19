import * as React from 'react';
import styles from "@styles/Card.module.css"
import { 
    useContext, 
    useState, 
    useEffect 
} from 'react';
import { GameContext } from 'pages/game.context';


export interface ICardProps {
    number: 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12;
    color: "red" | "yellow" | "blue" | "green";
    cardId: number;
    position: number;
}

const Card: React.FunctionComponent<ICardProps> = ({number, color, position, id}) => {

    const {game, selectDiscard} = useContext(GameContext)
    const [discardable, setDiscardable] = useState<boolean>(false)

    useEffect(() => {
        if(position === game.discardSelected) {
            setDiscardable(true)
        } else {
            setDiscardable(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.discardSelected])

    const onSelectDiscard = () => {        
        selectDiscard(position)
    }

    const onSelect = () => {
        // Need to implement
    }

    const discardStyle = discardable && {borderColor: "red"}
    return (
        <div 
            className={styles.card} 
            style={{color, ...(discardStyle)}}
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
