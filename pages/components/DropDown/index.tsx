import * as React from 'react';
import styles from "@styles/DropDown.module.css"
import { GameContext } from 'pages/game.context';
import { useContext, useEffect, useState } from 'react';

const DropDown: React.FunctionComponent = () => {
    const {
        showMessage, 
        message, 
        setMessage,
        messageColor, 
        setShowMessage,
        gamePassword
    } = useContext(GameContext)

    const onClickHandler = () => {
        setShowMessage({show: false, timer: null})
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(gamePassword as string)
        setMessage("Password Copied!")
        setShowMessage(prevState => ({...prevState, timer: 2}))
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
                border: `1px solid ${messageColor}`, 
                top: topStyle
            }}>
            {showMessage.timer === null && 
                <button onClick={onClickHandler}>&#10006;</button>}
            {message}
            {showMessage.timer === null &&
                <p className={styles.copy} onClick={copyPassword}>Click To Copy Password</p>}
        </div>
    );
}

export default DropDown;
