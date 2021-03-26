import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";
import Touchable from "src/components/Touchable/Touchable";
import {parseCsvString} from "src/libs/parser";
import {getAttributeType} from "src/redux/data/filters";
import Select from "src/components/Select/Select";
import {useSelector} from "react-redux";
import {getVisualizations} from "src/redux/data/selectors";

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const visualizations = useSelector(getVisualizations)
    const [visualization, setVisualization] = useState<string | undefined>(data?.id ?? undefined);

    const typeOptions = [
        {label: 'Select an option', value: undefined},
        ...visualizations.map((item: any, index: any) => {
            return {
                label: `${item.type} - (${item.id})`,
                value: item.id,
            }
        })
    ]

    const onSelect = (value: string) => {
        setVisualization(value)
        onData?.({
            id: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the visualization to remove:</label>
                </div>
                <Select
                    label={'Visualization'}
                    placeholder={'Select the visualization'}
                    value={visualization}
                    options={typeOptions}
                    onChange={onSelect}
                />
            </div>
        </div>
    )
}

export default Step1Content
