import React from 'react';

import styles from './Touchable.module.scss';

type TouchableProps = {
    onClick: (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    style?: any
}

const Touchable: React.FC<TouchableProps> = (props) => {
    const {onClick, children, style} = props

    return (
        <button className={styles.touchable} onClick={onClick} style={style}>
            {children}
        </button>
    )
}

export default Touchable
