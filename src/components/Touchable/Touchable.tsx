import React, {useEffect, useState} from 'react';

import styles from './Touchable.module.scss';

type TouchableProps = {
    onClick: () => void
}

const Touchable: React.FC<TouchableProps> = (props) => {
    const {onClick, children} = props

    return (
        <button className={styles.touchable} onClick={onClick}>
            {children}
        </button>
    )
}

export default Touchable
