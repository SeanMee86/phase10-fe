import * as React from 'react';
import { ToggleSwitch } from "@components";
import { GameContext } from 'pages/game.context';
import { SyntheticEvent, useContext } from 'react';
import styles from "@styles/Form.module.css"
import { useRouter } from 'next/router';

const JoinCreateSelector: React.FunctionComponent = () => {

  const router = useRouter()
  const { createGame, setCreateGame } = useContext(GameContext)

  const btnLabel = createGame ? "Create Game" : "Join Game"
  const backgroundColor = createGame ? "green" : "blue"

  const onChangeHandler = () => {        
    setCreateGame(prevState => !prevState)
  }

  const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
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
