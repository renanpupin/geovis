import React, {useEffect, useState, useCallback} from 'react';
import Select from "src/components/Select/Select";
import Input from "src/components/Input/Input";

type Step4ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step4Content: React.FC<Step4ContentProps> = (props) => {
    const {onData, data} = props;

    const [target, setTarget] = useState<string | undefined>(data?.target ?? undefined);
    const [targetValue, setTargetValue] = useState<string>(data?.targetValue ?? '');

    const targetOptions = [
        {label: 'Select an option', value: undefined},
        {label: 'Value', value: 'value'},
        // {label: 'Min value', value: 'minValue'},
        // {label: 'Max value', value: 'maxValue'},
        {label: 'Average value', value: 'average'},
        {label: 'Median value', value: 'median'},
    ];

    const onSelectTarget = (value: string) => {
        setTarget(value)
        onData?.({
            target: value
        })
    }

    const onChangeTargetValue = (value: string) => {
        setTargetValue(value)
        onData?.({
            targetValue: value
        })
    }

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter target:</label>
                </div>
                <Select
                    label={'Filter target'}
                    placeholder={'Select the filter target'}
                    value={target}
                    options={targetOptions}
                    onChange={onSelectTarget}
                />
            </div>
            {target === 'value' && <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the filter target value:</label>
                </div>
                <Input
                    label={'Filter target value'}
                    placeholder={'Select the filter target value'}
                    value={targetValue}
                    onChange={onChangeTargetValue}
                />
            </div>}
        </div>
    )
}

export default Step4Content

//
// <div>
//     <div>
//         <label htmlFor="inputFiltroAddName">Nome do filtro</label>
//         <input type="text" id="inputFiltroAddName"/>
//     </div>
//     <div>
//         <label htmlFor="inputFiltroAddAttribute">Attribute</label>
//         <select id="inputFiltroAddAttribute">
//             {attributes.map((item, index) => {
//                 return(
//                     <option key={index} value={item.name}>{item.name} ({item.type})</option>
//                 )
//             })}
//             {attributes.length === 0 && <option value={undefined}>No attributes found.</option>}
//         </select>
//     </div>
//     <div>
//         <label htmlFor="inputFiltroAddCondition">Condition</label>
//         <select id="inputFiltroAddCondition">
//             <option value="equal">Equal</option>
//             <option value="equal">Different</option>
//             <option value="more than">More than</option>
//             <option value="more than or equal">More than or equal</option>
//             <option value="less than">Less than</option>
//             <option value="less than or equal">Less than or equal</option>
//         </select>
//     </div>
//     <div>
//         <label htmlFor="inputFiltroAddCondition">Value</label>
//         {/*if boolean*/}
//         <select id="inputFiltroAddCondition">
//             <option value="true">True</option>
//             <option value="false">False</option>
//         </select>
//
//         {/*if string*/}
//         <input type="text" id="inputFiltroAddName"/>
//
//         {/*if number*/}
//         <select id="inputFiltroAddCondition">
//             <option value="more than">More than</option>
//             <option value="equal">Equal</option>
//             {/*...*/}
//         </select>
//
//         <select id="inputFiltroAddCondition">
//             <option value="average">Average</option>
//             <option value="median">Median</option>
//             {/*...*/}
//         </select>
//     </div>
// </div>
