import React, {useState} from 'react';
import Select from "src/components/Select/Select";
import {useSelector} from "react-redux";
import {getFilters} from "src/redux/data/selectors";

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const filters = useSelector(getFilters)
    const [visualization, setVisualization] = useState<string | undefined>(data?.id ?? undefined);

    const typeOptions = [
        {label: 'Select an option', value: undefined},
        ...filters.map((item: any, index: any) => {
            return {
                label: `${item.name} (#${item.id})`,
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
                    <label>Select the filter to remove:</label>
                </div>
                <Select
                    label={'Filter'}
                    placeholder={'Select the filter'}
                    value={visualization}
                    options={typeOptions}
                    onChange={onSelect}
                />
            </div>
        </div>
    )
}

export default Step1Content
