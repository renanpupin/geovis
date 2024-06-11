import React, {useEffect, useState} from 'react'
import Select from 'src/components/Select/Select'

type Step2ContentProps = {
    onData?: (data: any) => void
    data: any
}

const Step2Content: React.FC<Step2ContentProps> = props => {
    const {onData, data} = props

    const [latAttribute, setLatAttribute] = useState<string | undefined>(
        data?.latAttribute ?? undefined
    )
    const [lonAttribute, setLonAttribute] = useState<string | undefined>(
        data?.lonAttribute ?? undefined
    )
    const [temporalAttribute, setTemporalAttribute] = useState<string | undefined>(
        data?.temporalAttribute ?? undefined
    )

    useEffect(() => {
        const latParsedAttribute = data.attributes.filter((item: any) =>
            ['lat', 'latitude'].includes(item.name)
        )
        if (latParsedAttribute.length > 0) {
            setLatAttribute(latParsedAttribute[0].name)
        }
        // }
        //auto detect lon attribute
        // if(!lonAttribute){
        const lonParsedAttribute = data.attributes.filter((item: any) =>
            ['lon', 'lng', 'longitude'].includes(item.name)
        )
        if (lonParsedAttribute.length > 0) {
            setLonAttribute(lonParsedAttribute[0].name)
        }
        // }

        // const temporalParsedAttribute = data.attributes.filter((item: any) => ['date'].includes(item.name))
        // if(temporalParsedAttribute.length > 0){
        //     setTemporalAttribute(temporalParsedAttribute[0].name)
        // }
    }, [])

    useEffect(() => {
        if (latAttribute && lonAttribute) {
            onData?.({
                latAttribute,
                lonAttribute,
                temporalAttribute
            })
        } else {
            onData?.({
                latAttribute: undefined,
                lonAttribute: undefined,
                temporalAttribute: undefined
            })
        }
    }, [latAttribute, lonAttribute, temporalAttribute])

    const attributesOptions = [
        {label: 'Select an option', value: undefined},
        ...data.attributes.map((item: any) => ({
            label: item.name,
            value: item.name
        }))
    ]

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the latitude attribute:</label>
                </div>
                <Select
                    label={'Latitude attribute *'}
                    placeholder={'Select the latitude attribute'}
                    value={latAttribute}
                    options={attributesOptions}
                    onChange={value => setLatAttribute(value)}
                />
            </div>

            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 5}}>
                    <label>Select the longitude attribute:</label>
                </div>
                <Select
                    label={'Longitude attribute *'}
                    placeholder={'Select the longitude attribute'}
                    value={lonAttribute}
                    options={attributesOptions}
                    onChange={value => setLonAttribute(value)}
                />
            </div>
            {/*<div style={{marginBottom: 15}}>*/}
            {/*    <div style={{marginBottom: 5}}>*/}
            {/*        <label>Select the temporal attribute: (not required)</label>*/}
            {/*    </div>*/}
            {/*    <Select*/}
            {/*        label={'Temporal attribute'}*/}
            {/*        placeholder={'Select the temporal attribute'}*/}
            {/*        value={temporalAttribute}*/}
            {/*        options={attributesOptions}*/}
            {/*        onChange={(value) => setTemporalAttribute(value)}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    )
}

export default Step2Content
