import * as React from 'react';
import styles from "@styles/PlayerContainer.module.css"

interface IPlayerContainerProps {
    players?: IPlayer[];
    isTurn: boolean;
    drawCard(): void;
}

export interface IPlayer {
    name: string;
    points: number;
}

const PlayerContainer: React.FunctionComponent<IPlayerContainerProps> = ({players, isTurn, drawCard}) => {
  return (
    <div className={styles.outerContainer}>
        {players && players.map(player => (
            <div key={player.name} className={styles.innerContainer}>
                <p>Player: {player.name}</p>
                <p>Points: {player.points}</p>
            </div>
        ))}
        {isTurn && <div className={styles.btnContainer}>
            <button onClick={drawCard}>Draw Card</button>
        </div>}
    </div>
  )
};

export default PlayerContainer;
