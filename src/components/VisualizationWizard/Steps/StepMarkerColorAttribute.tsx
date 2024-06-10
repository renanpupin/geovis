import React, {useEffect, useState} from 'react'
import Select from 'src/components/Select/Select'
import {useSelector} from 'react-redux'
import {
    getAttributes,
    getNonSpatialAttributes,
    getNumericAttributes
} from 'src/redux/data/selectors'

type StepMarkerColorAttributeProps = {
    onData?: (data: any) => void
    data: any
}

const StepMarkerColorAttribute: React.FC<StepMarkerColorAttributeProps> = props => {
    const {onData, data} = props

    const attributes = useSelector(getNonSpatialAttributes)
    const [markerColorAttribute, setMarkerColorAttribute] = useState<string>(
        data?.markerColorAttribute
    )

    useEffect(() => {
        onData?.({
            markerColorAttribute
        })
    }, [markerColorAttribute])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        ...attributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ]

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 15}}>
                    <label>Select the color attribute:</label>
                </div>
                <div style={{marginBottom: 5}}>
                    <Select
                        label={'Chart type'}
                        placeholder={'Select the chart type'}
                        value={markerColorAttribute}
                        options={attributesOptions}
                        onChange={value => setMarkerColorAttribute(value)}
                    />
                    {/*{JSON.stringify(item)}*/}
                </div>
            </div>
        </div>
    )
}

export default StepMarkerColorAttribute
