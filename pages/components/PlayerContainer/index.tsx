import * as React from 'react';
import { useContext } from 'react';
import { GameContext } from 'pages/game.context';
import styles from "@styles/PlayerContainer.module.css"
import { PenguinSprite } from '@components';

interface IPlayerContainerProps {
    players?: IPlayer[];
    drawCard(): void;
    discardCard(): void;
}

export interface IPlayer {
    name: string;
    points: number;
    position: number;
}

const PlayerContainer: React.FunctionComponent<IPlayerContainerProps> = ({players, drawCard, discardCard}) => {
    const { game, noDiscardSelectedMsg,setWillDiscard } = useContext(GameContext)

    const initDiscard = () => {
        setWillDiscard(true)
    }

    const undoDiscard = () => {
        setWillDiscard(false)
    }

    const confirmDiscard = () => {
        if(game.discardSelected === null) {
            noDiscardSelectedMsg()
        } else {
            discardCard();
        }
    }

    const showDrawBtn = game.canDraw && game.isTurn
    const showDiscardBtn = !game.willDiscard && !game.canDraw && game.isGameStarted && game.isTurn
    const showUndoDiscardBtn = game.willDiscard && !game.canDraw && game.isTurn
    const discardStyles = `${styles.btnContainer} ${styles.discardBtn}`
    const goBackStyles = `${styles.btnContainer} ${styles.goBackBtn}`
    const currentPlayerStyle = {
        backgroundColor: "rgba(120, 120, 120, 0.1)",
    }

    const spriteStyle: React.CSSProperties = {
        position: "absolute",
        top: "2px",
        right: "10px"
    }

    const isCurrentPlayer = (i: number): boolean => {
        return game.currentPlayer === i
    }

    return (
        <div className={styles.outerContainer}>
            {players && players.map((player, i) => (
                <div>
                    <div 
                        key={player.name} 
                        style={isCurrentPlayer(i) ? currentPlayerStyle : undefined} 
                        className={styles.innerContainer}>
                        <p>Player: {player.name}</p>
                        <p>Points: {player.points}</p>
                        {isCurrentPlayer(i) && <div style={spriteStyle}>
                            <PenguinSprite />
                        </div>}
                    </div>
                </div>
            ))}
            {showDrawBtn && <div className={styles.btnContainer}>
                <button onClick={drawCard}>Draw Card</button>
            </div>}
            {showDiscardBtn && <div className={discardStyles}>
                <button onClick={initDiscard}>Discard</button>
            </div>}
            {showUndoDiscardBtn && <>
                <div className={goBackStyles}>
                    <button onClick={undoDiscard}>&larr; Go Back</button>
                </div>
                <div className={discardStyles}>
                    <button onClick={confirmDiscard}>Confirm Discard</button>
                </div>
            </>}
        </div>
    )
};

export default PlayerContainer;
