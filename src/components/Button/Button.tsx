import React from "react"

import styles from "./Button.module.scss"

export type ButtonProps = {
    onClick: () => void
    disabled?: boolean
    negative?: boolean
    outline ?: boolean
    link ?: boolean
    size ?: 'regular' | 'small'
}

const Button: React.FC<ButtonProps> = ({onClick, disabled, size, negative, outline, link, children}) => {
    const buttonStyles = [
        styles.button,
        disabled ? styles.disabled : {},
        negative ? styles.negative : {},
        outline ? styles.outline : {},
        link ? styles.link : {},
        size === 'small' ? styles.small : styles.regular,
        ].join(' ')

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
