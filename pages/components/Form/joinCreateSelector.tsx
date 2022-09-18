import * as React from 'react';
import { ToggleSwitch } from "@components";
import { GameContext } from 'pages/game.context';
import { Dispatch, SetStateAction, useContext } from 'react';
import styles from "@styles/Form.module.css"
import { useRouter } from 'next/router';

type JoinCreateProps = {
  createGame: boolean;
  gamePassword: string;
  playerName: string;
  setCreateGame: Dispatch<SetStateAction<boolean>>;
}

const JoinCreateSelector: React.FunctionComponent<JoinCreateProps> = ({
  createGame, 
  gamePassword, 
  playerName, 
  setCreateGame
}) => {

  const router = useRouter()
  const { submitForm } = useContext(GameContext)

  const btnLabel = createGame ? "Create Game" : "Join Game"
  const backgroundColor = createGame ? "green" : "blue"

  const onChangeHandler = () => {        
    setCreateGame(prevState => !prevState)
  }

  const onClickHandler = () => {
    submitForm({createGame, gamePassword, playerName})
    router.push("/game")
  }


  return (
    <div className={styles.createOrJoin}>
        <p>Create or Join a Game!</p>
        <ToggleSwitch
            isChecked={createGame}
            onChangeHandler={onChangeHandler}/>
        <button onClick={onClickHandler} style={{backgroundColor}}>
            {btnLabel}
        </button>
    </div>
  );
}

export default JoinCreateSelector;
