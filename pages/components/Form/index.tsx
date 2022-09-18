import * as React from 'react';
import Input from './input';
import JoinCreateSelector from './joinCreateSelector';
import { 
    SyntheticEvent, 
    useState 
} from 'react';
import styles from "@styles/Form.module.css"

const Form: React.FunctionComponent = () => {
    const [createGame, setCreateGame] = useState<boolean>(true)
    const [playerName, setPlayerName] = useState<string>("")
    const [gamePassword, setGamePassword] = useState<string>("")

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
            <JoinCreateSelector 
                createGame={createGame} 
                setCreateGame={setCreateGame}
                playerName={playerName}
                gamePassword={gamePassword}/>
        </div>
    );
}

export default Form;
