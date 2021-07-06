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
    const [chartAttributeX, setChartAttributeX] = useState<string | undefined>(data?.chartAttributeX ?? undefined);
    const [chartAttributeY, setChartAttributeY] = useState<string | undefined>(data?.chartAttributeY ?? undefined);
    const [hasToGroup, setHasToGroup] = useState<boolean>(true);

    useEffect(() => {
        onData?.({
            chartLabelAttribute,
            chartAttributeX,
            chartAttributeY,
            hasToGroup,
        })
    }, [chartAttributeX, chartAttributeY, chartLabelAttribute, hasToGroup])

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
            {data.chartType !== "scatter" && <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart {data.chartType === 'pie' ? 'group' : 'label'} attribute:</label>
                </div>
                <Select
                    label={`Chart ${data.chartType === 'pie' ? 'group' : 'label'} attribute`}
                    placeholder={`Select the chart ${data.chartType === 'pie' ? 'group' : 'label'} attribute`}
                    value={chartLabelAttribute}
                    options={attributesOptions}
                    onChange={(value) => setChartLabelAttribute(value)}
                />
            </div>}

            {data.chartType === "scatter" && <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart numeric attribute{data.chartType === "scatter" ? ' x' : ''}:</label>
                </div>
                <Select
                    label={`Chart numeric attribute ${data.chartType === "scatter" ? 'x' : ''}`}
                    placeholder={`Select the chart numeric attribute ${data.chartType === "scatter" ? 'x' : ''}`}
                    value={chartAttributeX}
                    options={numericAttributesOptions}
                    onChange={(value) => setChartAttributeX(value)}
                />
            </div>}

            {(data.chartType !== "pie" || (data.chartType === "pie" && !data.hasToGroup)) && <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the chart numeric attribute y:</label>
                </div>
                <Select
                    label={`Chart numeric attribute ${data.chartType !== "pie" ? 'y' : ''}`}
                    placeholder={`Select the chart numeric attribute ${data.chartType !== "pie" ? 'y' : ''}`}
                    value={chartAttributeY}
                    options={numericAttributesOptions}
                    onChange={(value) => setChartAttributeY(value)}
                />
            </div>}

            {data.chartType === "pie" && <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Group attributes:</label>
                </div>
                <div>
                    <input
                        type={'checkbox'}
                        checked={hasToGroup}
                        onChange={(event: any) => setHasToGroup(event.target.checked)}
                    />
                    <span style={{marginLeft: 5}}>Has to group?</span>
                </div>
            </div>}
        </div>
    )
}

export default StepChartAttribute
