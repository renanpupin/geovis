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

    const attributes = useSelector(getAttributes)
    const numericAttributes = useSelector(getNumericAttributes)
    const [chartLabelAttribute, setChartLabelAttribute] = useState<string | undefined>(data?.chartLabelAttribute ?? undefined);
    const [chartAttribute, setChartAttribute] = useState<string | undefined>(data?.chartAttribute ?? undefined);

    useEffect(() => {
        onData?.({
            chartAttribute,
            chartLabelAttribute,
        })
    }, [chartAttribute, chartLabelAttribute])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        ...attributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ];

    const numericAttributesOptions = [
        {label: 'Select an option', value: undefined},
        ...numericAttributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart label attribute:</label>
                </div>
                <Select
                    label={'Chart label attribute'}
                    placeholder={'Select the chart label attribute'}
                    value={chartLabelAttribute}
                    options={attributesOptions}
                    onChange={(value) => setChartLabelAttribute(value)}
                />
            </div>

            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart numeric attribute:</label>
                </div>
                <Select
                    label={'Chart numeric attribute'}
                    placeholder={'Select the chart numeric attribute'}
                    value={chartAttribute}
                    options={numericAttributesOptions}
                    onChange={(value) => setChartAttribute(value)}
                />
            </div>
        </div>
    )
}

export default StepChartAttribute
