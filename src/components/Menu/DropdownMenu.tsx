import React from "react";
import styles from 'src/components/Menu/Menu.module.scss'

const DropdownMenu = (props: any) => {
    const {children} = props
    return (
        <div className={styles.dropdownMenu}>
            <ul>
                {children}
            </ul>
        </div>
    )
}

export default DropdownMenu
