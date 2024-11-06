import React, {useEffect, useState} from 'react'
import Select from 'src/components/Select/Select'
import {useSelector} from 'react-redux'
import {getAttributes, getNumericAttributes} from 'src/redux/data/selectors'
import {StepDataProps} from '../VisualizationWizard'
import {keyIdAttributeName} from '../../../redux/data/reducers'

type StepMarkerChartAttributesProps = {
    onData?: (data: StepDataProps) => void
    data: StepDataProps
}

const StepMarkerChartAttributes: React.FC<StepMarkerChartAttributesProps> = props => {
    const {onData, data} = props

    const numericAttributes = useSelector(getNumericAttributes)
    const [markerChartAttributes, setMarkerChartAttributes] = useState<string[]>([])

    useEffect(() => {
        onData?.({
            markerChartAttributes
        })
    }, [markerChartAttributes])

    useEffect(() => {
        return () => {
            onData?.({
                markerChartAttributes
            })
        }
    }, [])

    const getLabel = () => {
        if (data?.markerChartType === 'radar') {
            return 'Select at least three attributes:'
        } else if (data?.markerChartType === 'pie') {
            return 'Select one attribute:'
        }
        return 'Select at least one attribute:'
    }

    const allowSelectMultiple = data?.markerChartType !== 'pie'

    return (
        <div>
            <div style={{marginBottom: 15}}>
                <div style={{marginBottom: 15}}>
                    <label>{getLabel()}</label>
                </div>
                {numericAttributes
                    ?.filter((item: any) => item.name !== keyIdAttributeName)
                    .map((attribute: any, index: any) => {
                        return (
                            <div key={index} style={{marginBottom: 5}}>
                                <input
                                    type={'checkbox'}
                                    checked={markerChartAttributes.includes(attribute.name)}
                                    onChange={(event: any) => {
                                        if (event.target.checked) {
                                            if (allowSelectMultiple) {
                                                setMarkerChartAttributes(oldData => {
                                                    return [...oldData, attribute.name]
                                                })
                                            } else {
                                                setMarkerChartAttributes(oldData => {
                                                    return [attribute.name]
                                                })
                                            }
                                        } else {
                                            setMarkerChartAttributes(oldData =>
                                                oldData.filter(
                                                    (item: any) => item !== attribute.name
                                                )
                                            )
                                        }
                                    }}
                                />
                                <span style={{marginLeft: 5}}>{attribute.name}</span>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default StepMarkerChartAttributes
