import React, {useState} from 'react';
import styles from './Select.module.scss';

export type OptionsProps = {
    label: string
    value: string | undefined
}

export type SelectProps = {
    label: string
    placeholder: string
    value: string | undefined
    options: OptionsProps[]
    onChange?: (text: string) => void
}

const Select: React.FC<SelectProps> = (props) => {
    const {options, value, onChange, label, placeholder} = props

    const [hasFocus, setHasFocus] = useState(false)

    const labelStyles = [styles.label, hasFocus ? styles.labelFocus : {}].join(' ')
    const placeholderStyle = !value || value?.length === 0 ? {color: '#ccc'} : {}

    return (
        <div className={styles.wrapper}>
            <label className={labelStyles}>{label}</label>
            <select
                placeholder={placeholder}
                style={placeholderStyle}
                className={styles.select}
                value={value}
                onChange={(e) => onChange?.(e?.target?.value)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
            >
                {options.map((item, index) => {
                    return(
                        <option key={index} value={item.value ?? ""}>{item.label}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select
