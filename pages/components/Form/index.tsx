import * as React from 'react';
import styles from "@styles/Form.module.css"
import { ToggleSwitch } from '@components';
import { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import { GameContext } from 'pages/game.context';

const Form: React.FunctionComponent = () => {

    const router = useRouter()
    const { 
        createGame,
        playerName,
        gamePassword, 
        setCreateGame,
        setPlayerName,
        setGamePassword
     } = React.useContext(GameContext)
    const [name, setName] = React.useState<string>(playerName)

    const onChangeHandler = () => {        
        setCreateGame!(prevState => !prevState)
    }

    const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
        router.push("/game")
    }

    const btnLabel = createGame ? "Create Game" : "Join Game"
    const backgroundColor = createGame ? "green" : "blue"

    return (
        <div className={styles.form}>
            <div className={styles.inputContainer}>
                <label htmlFor="name">Name</label>
                <input
                    onChange={(e) => setPlayerName!(e.currentTarget.value)} 
                    value={playerName} 
                    className={styles.input} 
                    type="text" 
                    id='name' />
            </div>
            {!createGame && <div className={styles.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                    onChange={(e) => setGamePassword!(e.currentTarget.value)} 
                    value={gamePassword} 
                    className={styles.input} 
                    type="text"  
                    id="password" />
            </div>}
            <div className={styles.createOrJoin}>
                <p>Create or Join a Game!</p>
                <ToggleSwitch
                    isChecked={createGame}
                    onChangeHandler={onChangeHandler}/>
                <button onClick={onClickHandler} style={{backgroundColor}}>
                    {btnLabel}
                </button>
            </div>
        </div>
    );
}

export default Form;
