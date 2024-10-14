import React, {useEffect, useState} from 'react';
import Select from "src/components/Select/Select";

type StepMarkerClusterProps = {
    onData?: (data: any) => void,
    data: any
}

const StepMarkerCluster: React.FC<StepMarkerClusterProps> = (props) => {
    const {onData, data} = props;

    const [showChart, setShowChart] = useState<string | undefined>(data?.showChart ?? 'no');

    useEffect(() => {
        onData?.({
            showChart
        })
    }, [showChart])

    const attributesOptions = [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'},
    ];

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Use marker chart on cluster icon?</label>
                </div>
                <Select
                    label={'Use marker chart as cluster icon'}
                    placeholder={'Use marker chart?'}
                    value={showChart}
                    options={attributesOptions}
                    onChange={(value) => setShowChart(value)}
                />
            </div>
        </div>
    )
}

export default StepMarkerCluster
