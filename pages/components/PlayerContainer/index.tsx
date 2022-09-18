import * as React from 'react';
import { useContext } from 'react';
import { GameContext } from 'pages/game.context';
import styles from "@styles/PlayerContainer.module.css"

interface IPlayerContainerProps {
    players?: IPlayer[];
    drawCard(): void;
}

export interface IPlayer {
    name: string;
    points: number;
}

const PlayerContainer: React.FunctionComponent<IPlayerContainerProps> = ({players, drawCard}) => {
    const { game, setWillDiscard } = useContext(GameContext)

    const initDiscard = () => {
        setWillDiscard(true)
    }

    const undoDiscard = () => {
        setWillDiscard(false)
    }

    const showDiscardBtn = !game.willDiscard && !game.canDraw && game.isGameStarted && game.isTurn
    const showUndoDiscardBtn = game.willDiscard && !game.canDraw

    return (
        <div className={styles.outerContainer}>
            {players && players.map(player => (
                <div key={player.name} className={styles.innerContainer}>
                    <p>Player: {player.name}</p>
                    <p>Points: {player.points}</p>
                </div>
            ))}
            {game.canDraw && <div className={styles.btnContainer}>
                <button onClick={drawCard}>Draw Card</button>
            </div>}
            {showDiscardBtn && <div className={styles.btnContainer}>
                <button onClick={initDiscard}>Discard?</button>
            </div>}
            {showUndoDiscardBtn && <>
                <div className={styles.btnContainer}>
                    <button onClick={undoDiscard}>Undo Discard</button>
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={undoDiscard}>Confirm Discard</button>
                </div>
            </>}
        </div>
    )
};

export default PlayerContainer;
