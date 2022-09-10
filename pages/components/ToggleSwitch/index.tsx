import * as React from 'react';
import styles from "@styles/ToggleSwitch.module.css"

interface IToggleSwitchProps {
}

const ToggleSwitch: React.FunctionComponent<IToggleSwitchProps> = (props) => (
    <div className={styles.container}>
        <input className={styles.input} type={"checkbox"} />
        <button>Create Game</button>
        <button>Join Game</button>
    </div>
);

export default ToggleSwitch;
