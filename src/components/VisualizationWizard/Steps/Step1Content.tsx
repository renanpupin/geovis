import React, {useState} from 'react';
import Select from "src/components/Select/Select";
import {VisualizationTypeValues} from 'src/redux/data/types'

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const [visualizationType, setVisualizationType] = useState<string | undefined>(data?.type ?? undefined);

    const typeOptions = [
        {label: 'Select an option', value: undefined},
        ...Object.entries(VisualizationTypeValues).map((item: any) => ({label: item[0], value: item[1]}))
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
