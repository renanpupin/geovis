import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";
import {useSelector} from "react-redux";
import {getAttributes, getNumericAttributes} from "src/redux/data/selectors";

type StepMarkerChartAttributesProps = {
    onData?: (data: any) => void,
    data: any
}

const StepMarkerChartAttributes: React.FC<StepMarkerChartAttributesProps> = (props) => {
    const {onData, data} = props;

    const attributes = useSelector(getAttributes)
    const numericAttributes = useSelector(getNumericAttributes)
    const [markerChartAttributes, setMarkerChartAttributes] = useState<string[]>(data?.markerChartAttributes ?? []);

    useEffect(() => {
        onData?.({
            markerChartAttributes,
        })
    }, [markerChartAttributes])

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 15}}>
                    <label>Select at least one attribute:</label>
                </div>
                {numericAttributes.map((attribute: any, index: any) => {
                    return(
                        <div key={index} style={{marginBottom: 5}}>
                            <input
                                type={'checkbox'}
                                checked={markerChartAttributes.includes(attribute.name)}
                                // checked={true}
                                onChange={(event: any) => {
                                    if(event.target.checked){
                                        setMarkerChartAttributes(oldData => {
                                            return [
                                                ...oldData,
                                                attribute.name
                                            ]
                                        });
                                    }else{
                                        setMarkerChartAttributes(oldData => (
                                            oldData.filter((item: any) => item !== attribute.name)
                                        ));
                                    }
                                }}
                            />
                            <span style={{marginLeft: 5}}>{attribute.name}</span>
                            {/*{JSON.stringify(item)}*/}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StepMarkerChartAttributes
