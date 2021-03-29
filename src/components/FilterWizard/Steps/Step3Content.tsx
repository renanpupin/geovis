import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";
import Touchable from "src/components/Touchable/Touchable";
import {parseCsvString} from "src/libs/parser";
import {getAttributeType} from "src/redux/data/filters";
import Select from "src/components/Select/Select";

const conditionalOptions: any = {
    'equal': {label: 'Equal (=)', value: 'equal'},
    'different': {label: 'Different (!=)', value: 'different'},
    'moreThan': {label: 'More than (>)', value: 'moreThan'},
    'moreThanOrEqual': {label: 'More than or equal (>=)', value: 'moreThanOrEqual'},
    'lessThan': {label: 'Less than (<)', value: 'lessThan'},
    'lessThanOrEqual': {label: 'Less than or equal (<=)', value: 'lessThanOrEqual'},
}

const typeOptionsKeys: any = {
    'number': ['equal', 'different', 'moreThan', 'lessThan', 'moreThanOrEqual', 'lessThanOrEqual'],
    'boolean': ['equal', 'different'],
    'string': ['equal', 'different'],
}

type Step2ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step3Content: React.FC<Step2ContentProps> = (props) => {
    const {onData, data} = props;

    const isAttributeConditionTypeSupported = typeOptionsKeys[data?.attribute.type].includes(data?.conditionType)

    const [conditionType, setConditionType] = useState<string | undefined>(isAttributeConditionTypeSupported ? data?.conditionType : undefined);

    const conditionOptions = [
        {label: 'Select an option', value: undefined},
        ...(typeOptionsKeys[data?.attribute?.type]?.map((item: any) => conditionalOptions[item]))
    ];

    const onSelectConditionType = (value: string) => {
        setConditionType(value)
        onData?.({
            conditionType: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter condition type:</label>
                </div>
                <Select
                    label={'Filter condition type'}
                    placeholder={'Select the filter condition type'}
                    value={conditionType}
                    options={conditionOptions}
                    onChange={onSelectConditionType}
                />
            </div>
        </div>
    )
}

export default Step3Content
