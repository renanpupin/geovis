import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";
import {useSelector} from "react-redux";
import {getAttributes, getNumericAttributes} from "src/redux/data/selectors";

type StepChartAttributeProps = {
    onData?: (data: any) => void,
    data: any
}

const StepChartAttribute: React.FC<StepChartAttributeProps> = (props) => {
    const {onData, data} = props;

    const attributes = useSelector(data?.chartType === 'line' ? getNumericAttributes : getAttributes)
    const [chartAttribute, setChartAttribute] = useState<string | undefined>(data?.chartAttribute ?? undefined);

    useEffect(() => {
        onData?.({
            chartAttribute
        })
    }, [chartAttribute])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        ...attributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart attribute:</label>
                </div>
                <Select
                    label={'Chart attribute'}
                    placeholder={'Select the chart attribute'}
                    value={chartAttribute}
                    options={attributesOptions}
                    onChange={(value) => setChartAttribute(value)}
                />
            </div>
        </div>
    )
}

export default StepChartAttribute
