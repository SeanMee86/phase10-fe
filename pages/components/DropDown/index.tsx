import * as React from 'react';
import styles from "@styles/DropDown.module.css"
import { GameContext } from 'pages/game.context';

const DropDown: React.FunctionComponent = () => {
    const {showMessage, message, messageColor, setShowMessage} = React.useContext(GameContext)
    return (
        <div 
            className={styles.container} 
            style={{
                border: `1px solid ${messageColor}`, 
                top: showMessage ? "60px" : "-100px"
            }}>
            <button onClick={() => {setShowMessage(false)}}>&#10006;</button>
            {message}
        </div>
    );
}

export default DropDown;
