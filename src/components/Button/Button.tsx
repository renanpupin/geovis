import React from "react"

import styles from "./Button.module.scss"

export type ButtonProps = {
    onClick: () => void
    disabled?: boolean
    negative?: boolean
    outline ?: boolean
}

const Button: React.FC<ButtonProps> = ({onClick, disabled, negative, outline, children}) => {
    const buttonStyles = [styles.button, disabled ? styles.disabled : {}, negative ? styles.negative : {}, outline ? styles.outline : {}].join(' ')
    return (
        <button
            className={buttonStyles}
            onClick={() => {
                if (!disabled) {
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
}

export default Button
