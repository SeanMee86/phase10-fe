import * as React from 'react';
import styles from "@styles/Form.module.css"
import { ToggleSwitch } from '@components';

interface IFormProps {
}

const Form: React.FunctionComponent<IFormProps> = (props) => (
    <form className={styles.form}>
        <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <input className={styles.input} type="text" id='name' />
        </div>
        <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input className={styles.input} type="text" id="password" />
        </div>
        <ToggleSwitch/>
    </form>
);

export default Form;
