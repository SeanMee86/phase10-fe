import * as React from 'react';
import styles from "@styles/PlayerContainer.module.css"

interface IPlayerContainerProps {
    players?: IPlayer[]
}

export interface IPlayer {
    name: string;
    points: number;
}

const PlayerContainer: React.FunctionComponent<IPlayerContainerProps> = ({players}) => {
  return (
    <div className={styles.outerContainer}>
        {players && players.map(player => (
            <div key={player.name} className={styles.innerContainer}>
                <p>Player: {player.name}</p>
                <p>Points: {player.points}</p>
            </div>
        ))}
    </div>
  )
};

export default PlayerContainer;
