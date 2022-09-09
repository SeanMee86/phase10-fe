import * as React from 'react';
import styles from "@styles/Card.module.css"


export interface ICardProps {
    number: 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12;
    color: "red" | "yellow" | "blue" | "green"
}

const Card: React.FunctionComponent<ICardProps> = ({number, color}) => (
    <div 
        className={styles.card} 
        style={{color}}>
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

export default Card;
