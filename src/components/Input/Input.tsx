import React, {useState} from 'react';
import styles from './Input.module.scss';

export type InputProps = {
    label: string
    placeholder: string
    value: string | number
    type?: 'text' | 'number'
    onChange?: (text: string) => void
}

const Input: React.FC<InputProps> = (props) => {
    const {type, value, onChange, label, placeholder} = props

    const [hasFocus, setHasFocus] = useState(false)

    const labelStyles = [styles.label, hasFocus ? styles.labelFocus : {}].join(' ')

    return (
        <div className={styles.wrapper}>
            <label className={labelStyles}>{label}</label>
            <input
                placeholder={placeholder}
                type={type ?? 'text'}
                className={styles.input}
                value={value}
                onChange={(e) => onChange?.(e?.target?.value)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
            />
        </div>
    )
}

export default Input
