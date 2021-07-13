import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";

type StepMarkerClusterProps = {
    onData?: (data: any) => void,
    data: any
}

const StepMarkerCluster: React.FC<StepMarkerClusterProps> = (props) => {
    const {onData, data} = props;

    const [showPie, setShowPie] = useState<string | undefined>(data?.showPie ?? 'no');

    useEffect(() => {
        onData?.({
            showPie
        })
    }, [showPie])

    const attributesOptions = [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'},
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Use pie chart on cluster icon?</label>
                </div>
                <Select
                    label={'Use pie chart as cluster icon'}
                    placeholder={'Use pie chart?'}
                    value={showPie}
                    options={attributesOptions}
                    onChange={(value) => setShowPie(value)}
                />
            </div>
        </div>
    )
}

export default StepMarkerCluster
