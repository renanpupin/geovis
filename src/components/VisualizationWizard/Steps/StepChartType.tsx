import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";

type StepChartTypeProps = {
    onData?: (data: any) => void,
    data: any
}

const StepChartType: React.FC<StepChartTypeProps> = (props) => {
    const {onData, data} = props;

    const [chartType, setChartType] = useState<string | undefined>(data?.chartType ?? undefined);

    useEffect(() => {
        onData?.({
            chartType
        })
    }, [chartType])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        {label: 'Line', value: 'line'},
        {label: 'Column', value: 'column'},
        {label: 'Area', value: 'area'},
        {label: 'Pie', value: 'pie'},   //TODO: count ocurrences
        {label: 'Scatter', value: 'scatter'},   //TODO: count ocurrences
        {label: 'Histogram', value: 'histogram'},
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart type:</label>
                </div>
                <Select
                    label={'Chart type'}
                    placeholder={'Select the chart type'}
                    value={chartType}
                    options={attributesOptions}
                    onChange={(value) => setChartType(value)}
                />
            </div>
        </div>
    )
}

export default StepChartType
