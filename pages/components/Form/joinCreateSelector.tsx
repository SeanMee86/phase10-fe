import * as React from 'react';
import { 
  Dispatch, 
  SetStateAction, 
  useContext 
} from 'react';
import { useRouter } from 'next/router';
import { ToggleSwitch } from "@components";
import { GameContext } from 'pages/game.context';
import styles from "@styles/Form.module.css"

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
    localStorage.setItem("p10Pass", gamePassword)
    localStorage.setItem("p10Player", playerName)
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
