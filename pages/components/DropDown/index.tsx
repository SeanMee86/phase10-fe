import * as React from 'react';
import { GameContext } from 'pages/game.context';
import { 
    useContext, 
    useEffect, 
    useState 
} from 'react';
import styles from "@styles/DropDown.module.css"

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

    const topHide = "-110px",
          topShow = "60px"

    const [topStyle, setTopStyle] = useState(topHide)

    useEffect(() => {
        if (showMessage.show) {
            setTopStyle(topShow)
            if(showMessage.timer !== null) {
                setTimeout(() => {
                    setTopStyle(topHide)
                }, showMessage.timer*1000)
            }
        } else {
            setTopStyle(topHide)
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
