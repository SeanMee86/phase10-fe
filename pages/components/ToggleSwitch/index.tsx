import * as React from 'react';
import styles from "@styles/ToggleSwitch.module.css"
import { SyntheticEvent } from 'react';

interface IToggleSwitchProps {
    onChangeHandler: () => void;
    isChecked: boolean
}

const ToggleSwitch: React.FunctionComponent<IToggleSwitchProps> = ({onChangeHandler, isChecked}) => (
    <div className={styles.container}>
        <input 
            checked={isChecked} 
            onChange={onChangeHandler} 
            className={styles.input} 
            type={"checkbox"} />
        <div className={styles.switch}/>
        <div className={styles.background}/>
    </div>
);

export default ToggleSwitch;
