import * as React from 'react';
import styles from "@styles/DropDown.module.css"
import { GameContext } from 'pages/game.context';
import { useContext, useEffect, useState } from 'react';

const DropDown: React.FunctionComponent = () => {
    const {
        showMessage, 
        message, 
        messageColor, 
        setShowMessage
    } = useContext(GameContext)

    const onClickHandler = () => {
        setShowMessage({show: false, timer: null})
    }

    const [topStyle, setTopStyle] = useState("-100px")

    useEffect(() => {
        if (showMessage.show) {
            setTopStyle("60px")
            if(showMessage.timer !== null) {
                setTimeout(() => {
                    setTopStyle("-100px")
                }, showMessage.timer*1000)
            }
        } else {
            setTopStyle("-100px")
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
        </div>
    );
}

export default DropDown;
