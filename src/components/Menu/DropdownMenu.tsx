import React from "react";
import DropdownItem from 'src/Menu/DropdownItem'
import styles from 'src/Menu/Menu.module.scss'

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
