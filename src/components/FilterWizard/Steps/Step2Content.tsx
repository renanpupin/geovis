import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Select from "src/components/Select/Select";
import {getAttributes} from "src/redux/data/selectors";

type Step2ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step2Content: React.FC<Step2ContentProps> = (props) => {
    const {onData, data} = props;

    const attributes = useSelector(getAttributes)
    const [attribute, setAttribute] = useState<string | undefined>(data?.attribute?.name ?? undefined);

    const attributeOptions = [
        {label: 'Select an option', value: undefined},
        ...attributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ];

    const onSelectAttribute = (value: string) => {
        setAttribute(value)
        onData?.({
            attribute: attributes.filter(item => item.name === value)[0]
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter attribute:</label>
                </div>
                <Select
                    label={'Filter attribute'}
                    placeholder={'Select the filter attribute'}
                    value={attribute}
                    options={attributeOptions}
                    onChange={onSelectAttribute}
                />
            </div>
        </div>
    )
}

export default Step2Content
