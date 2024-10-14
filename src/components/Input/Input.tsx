import React, {useState} from 'react';
import styles from './Input.module.scss';

export type InputProps = {
    label: string
    placeholder: string
    value: string | number | undefined
    type?: 'text' | 'number'
    onChange?: (text: string) => void
    disabled?: boolean
}

const Input: React.FC<InputProps> = (props) => {
    const {type, value, onChange, label, placeholder, disabled} = props

    const [hasFocus, setHasFocus] = useState(false)

    const labelStyles = [styles.label, hasFocus ? styles.labelFocus : {}].join(' ')

    return (
        <div className={styles.wrapper}>
            <label className={labelStyles}>{label}</label>
            <input
                disabled={disabled}
                placeholder={placeholder}
                type={type ?? 'text'}
                className={styles.input}
                value={value ?? ''}
                onChange={(e) => onChange?.(e?.target?.value)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
            />
        </div>
    )
}

export default Input
