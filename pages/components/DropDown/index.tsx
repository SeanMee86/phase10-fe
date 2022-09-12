import * as React from 'react';
import styles from "@styles/DropDown.module.css"

interface IDropDownProps {
    message: string;
    color: "green" | "red";
    isShown: boolean;
}

const DropDown: React.FunctionComponent<IDropDownProps> = ({message, color, isShown}) => (
    <div 
        className={styles.container} 
        style={{
            border: `1px solid ${color}`, 
            top: isShown ? "20px" : "-100px"
        }}>
        <button>&#10006;</button>
        {message}
    </div>
);

export default DropDown;
