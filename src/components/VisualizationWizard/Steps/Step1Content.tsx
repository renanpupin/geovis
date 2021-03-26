import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";
import Touchable from "src/components/Touchable/Touchable";
import {parseCsvString} from "src/libs/parser";
import {getAttributeType} from "src/redux/data/filters";
import Select from "src/components/Select/Select";

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const [visualizationType, setVisualizationType] = useState<string | undefined>(data?.type ?? undefined);

    const typeOptions = [
        {label: 'Select an option', value: undefined},
        {label: 'Heatmap', value: 'heatmap'},
        {label: 'Cluster', value: 'cluster'},
        // {label: 'Chart', value: 'chart'},
        // {label: 'Marker chart', value: 'markerChart'},
        // {label: 'Convex Hull', value: 'convexHull'},
        // {label: 'Line', value: 'line'},
        // {label: 'Euclidian', value: 'euclidian'},
    ];

    const onSelectType = (value: string) => {
        setVisualizationType(value)
        onData?.({
            type: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the visualization type:</label>
                </div>
                <Select
                    label={'Visualization type'}
                    placeholder={'Select the visualization type'}
                    value={visualizationType}
                    options={typeOptions}
                    onChange={onSelectType}
                />
            </div>
        </div>
    )
}

export default Step1Content
