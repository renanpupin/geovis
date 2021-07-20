import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";

type StepMarkerChartTypeProps = {
    onData?: (data: any) => void,
    data: any
}

const StepMarkerChartType: React.FC<StepMarkerChartTypeProps> = (props) => {
    const {onData, data} = props;

    const [markerChartType, setMarkerChartType] = useState<string | undefined>(data?.markerChartType ?? undefined);

    useEffect(() => {
        onData?.({
            markerChartType
        })
    }, [markerChartType])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        {label: 'Line', value: 'line'},
        {label: 'Column', value: 'bar'},
        // {label: 'Area', value: 'area'},
        {label: 'Pie', value: 'pie'},   //TODO: count ocurrences
        // {label: 'Scatter', value: 'scatter'},   //TODO: count ocurrences
        // {label: 'Histogram', value: 'histogram'},
        // {label: 'Parallel Coordinates', value: 'parallel'},
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the marker chart type:</label>
                </div>
                <Select
                    label={'Chart type'}
                    placeholder={'Select the chart type'}
                    value={markerChartType}
                    options={attributesOptions}
                    onChange={(value) => setMarkerChartType(value)}
                />
            </div>
        </div>
    )
}

export default StepMarkerChartType
