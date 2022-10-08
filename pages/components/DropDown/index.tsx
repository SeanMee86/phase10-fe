import * as React from 'react';
import { GameContext } from 'pages/game.context';
import { 
    useContext, 
    useEffect, 
    useState 
} from 'react';
import styles from "@styles/DropDown.module.css"
import { useRouter } from 'next/router';

const DropDown: React.FunctionComponent = () => {

    const router = useRouter()

    const {
        game: {
            showMessage, 
            message, 
            gamePassword
        },
        copyPassword,
        closeMessage,
        submitForm
    } = useContext(GameContext)

    const onClickHandler = () => {
        closeMessage()
    }

    const onCopyPassword = () => {
        navigator.clipboard.writeText(gamePassword as string)
        copyPassword()
    }

    const onConfirmHandler = () => {
        closeMessage()
        setTimeout(() => {
            const pass = localStorage.getItem("p10Pass");
            const uName = localStorage.getItem("p10Player");
            submitForm({
                createGame: false, 
                playerName: uName!, 
                gamePassword: pass!, 
                isRejoin: true
            });
            router.push("/game")
        }, 700)
    }

    const onDeclineHandler = () => {
        localStorage.clear()
        closeMessage()
    }

    const confirmBtn = (
        <button onClick={onConfirmHandler}>Yes</button>
    )
  
    const declineBtn = (
        <button onClick={onDeclineHandler}>No</button>
    )

    const topHide = "-150px",
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
            {showMessage.timer === null && !showMessage.isRejoin &&
                <button className={styles.closeButton} onClick={onClickHandler}>&#10006;</button>}
            {message.copy}
            {showMessage.timer === null && !showMessage.isRejoin &&
                <p className={styles.copy} onClick={onCopyPassword}>Click To Copy Password</p>}
            {showMessage.timer === null && showMessage.isRejoin &&
                <div className={styles.rejoinBtns}>{confirmBtn} {declineBtn}</div>}
        </div>
    );
}

export default DropDown;
