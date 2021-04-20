import React, {useState} from 'react';
import Select from "src/components/Select/Select";

const conditionalOptions: any = {
    'Equal': {label: 'Equal (=)', value: 'Equal'},
    'Different': {label: 'Different (!=)', value: 'Different'},
    'MoreThan': {label: 'More than (>)', value: 'MoreThan'},
    'MoreThanOrEqual': {label: 'More than or equal (>=)', value: 'MoreThanOrEqual'},
    'LessThan': {label: 'Less than (<)', value: 'LessThan'},
    'LessThanOrEqual': {label: 'Less than or equal (<=)', value: 'LessThanOrEqual'},
}

const typeOptionsKeys: any = {
    'number': ['Equal', 'Different', 'MoreThan', 'LessThan', 'MoreThanOrEqual', 'LessThanOrEqual'],
    'boolean': ['Equal', 'Different'],
    'string': ['Equal', 'Different'],
}

type Step2ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step3Content: React.FC<Step2ContentProps> = (props) => {
    const {onData, data} = props;

    const isAttributeConditionTypeSupported = typeOptionsKeys[data?.attribute.type].includes(data?.condition)

    const [condition, setCondition] = useState<string | undefined>(isAttributeConditionTypeSupported ? data?.condition : undefined);

    const conditionOptions = [
        {label: 'Select an option', value: undefined},
        ...(typeOptionsKeys[data?.attribute?.type]?.map((item: any) => conditionalOptions[item]))
    ];

    const onSelectCondition = (value: string) => {
        setCondition(value)
        onData?.({
            condition: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter condition:</label>
                </div>
                <Select
                    label={'Filter condition'}
                    placeholder={'Select the filter condition'}
                    value={condition}
                    options={conditionOptions}
                    onChange={onSelectCondition}
                />
            </div>
        </div>
    )
}

export default Step3Content
