import * as React from 'react';
import styles from "@styles/DropDown.module.css"
import { GameContext } from 'pages/game.context';
import { useContext, useEffect, useState } from 'react';

const DropDown: React.FunctionComponent = () => {
    const {
        game: {
            showMessage, 
            message, 
            gamePassword
        },
        copyPassword,
        closeMessage
    } = useContext(GameContext)

    const onClickHandler = () => {
        closeMessage()
    }

    const onCopyPassword = () => {
        navigator.clipboard.writeText(gamePassword as string)
        copyPassword()
    }

    const [topStyle, setTopStyle] = useState("-110px")

    useEffect(() => {
        if (showMessage.show) {
            setTopStyle("60px")
            if(showMessage.timer !== null) {
                setTimeout(() => {
                    setTopStyle("-110px")
                }, showMessage.timer*1000)
            }
        } else {
            setTopStyle("-110px")
        }
    }, [showMessage])

    return (
        <div 
            className={styles.container} 
            style={{
                border: `1px solid ${message.color}`, 
                top: topStyle
            }}>
            {showMessage.timer === null && 
                <button onClick={onClickHandler}>&#10006;</button>}
            {message.copy}
            {showMessage.timer === null &&
                <p className={styles.copy} onClick={onCopyPassword}>Click To Copy Password</p>}
        </div>
    );
}

export default DropDown;
