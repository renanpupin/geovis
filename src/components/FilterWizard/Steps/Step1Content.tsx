import React, {useEffect, useState, useCallback} from 'react';
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";
import Touchable from "src/components/Touchable/Touchable";
import {parseCsvString} from "src/libs/parser";
import {getAttributeType} from "src/redux/data/filters";
import Input from "src/components/Input/Input";

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const [name, setName] = useState<string>(data?.name ?? "");

    const onChangeName = (value: string) => {
        setName(value)
        onData?.({
            name: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter name:</label>
                </div>
                <Input
                    label={'Filter name'}
                    placeholder={'Select the filter name'}
                    value={name}
                    onChange={onChangeName}
                />
            </div>
        </div>
    )
}

export default Step1Content
