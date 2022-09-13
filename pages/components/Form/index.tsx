import * as React from 'react';
import styles from "@styles/Form.module.css"
import { SyntheticEvent, useContext } from 'react';
import { GameContext } from 'pages/game.context';
import Input from './input';
import JoinCreateSelector from './joinCreateSelector';

const Form: React.FunctionComponent = () => {

    const { 
        createGame,
        playerName,
        gamePassword, 
        setPlayerName,
        setGamePassword
     } = useContext(GameContext)

    const onNameChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
        setPlayerName(e.currentTarget.value)
    }

    const onPasswordChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
        setGamePassword(e.currentTarget.value)
    }

    return (
        <div className={styles.form}>
            <Input 
                label={'Name'} 
                id={'name'} 
                onChangeHandler={onNameChangeHandler} 
                value={playerName} />
            {!createGame && 
                <Input 
                    label={'Password'} 
                    id={'password'} 
                    onChangeHandler={onPasswordChangeHandler} 
                    value={gamePassword} />
            }
            <JoinCreateSelector/>
        </div>
    );
}

export default Form;
