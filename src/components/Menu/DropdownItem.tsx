import React from "react";
import styles from 'src/components/Menu/Menu.module.scss'

const DropdownItem = (props: any) => {
    const {children, onPress} = props
    return (
        <button onClick={onPress} className={styles.button}>
            {children}
        </button>
    )
}

export default DropdownItem
