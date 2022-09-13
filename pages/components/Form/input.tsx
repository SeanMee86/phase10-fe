import * as React from 'react';
import { SyntheticEvent } from 'react';
import styles from "@styles/Form.module.css"

interface IInputProps {
    label: string;
    id: string;
    onChangeHandler: (e: SyntheticEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input: React.FunctionComponent<IInputProps> = ({label, id, value, onChangeHandler}) => (
    <div className={styles.inputContainer}>
        <label htmlFor={id}>{label}</label>
        <input
            onChange={onChangeHandler} 
            value={value} 
            className={styles.input} 
            type="text" 
            id={id} />
    </div>
);

export default Input;
