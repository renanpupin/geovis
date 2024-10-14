import React, {useCallback, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import GoogleCharts from 'react-google-charts'
import {getAttributes, getVisibleRows} from 'src/redux/data/selectors'

import Draggable from 'src/components/Draggable/Draggable'
import styles from './Chart.module.scss'
import {countAttributeOcurrences} from 'src/redux/data/filters'
import {setHighlight} from '../../redux/data/actions'

// https://developers.google.com/chart/interactive/docs/printing
// convert chart to image
// https://jsfiddle.net/asgallant/R8A8P/1/
// https://developers.google.com/chart/interactive/docs/printing?hl=pt-br

const chartSize = 400 - 35 // 35 is scrollbar width

export type ChartPropTypes = {
    visData: any
    visMode?: any
    index: number
}

const Chart: React.FC<ChartPropTypes> = props => {
    const {visData, visMode} = props
    const dispatch = useDispatch()
    const visibleRows = useSelector(getVisibleRows)
    const attributes = useSelector(getAttributes)

    const labelAttributeIndex = attributes.findIndex(
        item => item.name === visData.chartLabelAttribute
    )
    const attributeIndexX = attributes.findIndex(item => item.name === visData.chartAttributeX)
    const attributeIndexY = attributes.findIndex(item => item.name === visData.chartAttributeY)

    const getDataByChartType = useCallback(() => {
        if (visData.chartType === 'pie' && visData.hasToGroup) {
            const ocurrences = countAttributeOcurrences(visibleRows, labelAttributeIndex)
            return ocurrences[0].map((item: any, index: any) => [item, ocurrences[1][index]])
        } else {
            return visibleRows.map((item: any, index: any) => [
                labelAttributeIndex !== -1 ? item[labelAttributeIndex] : item[attributeIndexX],
                item[attributeIndexY]
            ])
        }
    }, [visData, visibleRows, labelAttributeIndex, attributeIndexX, attributeIndexY])

    let data = useMemo(() => {
        return [
            [
                visData.chartLabelAttribute || visData.chartAttributeX,
                visData.chartAttributeY ?? 'Ocurrences'
            ],
            ...getDataByChartType()
        ]
    }, [getDataByChartType, visData])

    const getNormalizedChartType = () => {
        switch (visData.chartType) {
            case 'line': {
                return 'LineChart'
            }
            case 'column': {
                return 'ColumnChart'
            }
            case 'area': {
                return 'AreaChart'
            }
            case 'histogram': {
                return 'Histogram'
            }
            case 'pie': {
                return 'PieChart'
            }
            case 'scatter': {
                return 'ScatterChart'
            }
            default: {
                return visData.chartType
            }
        }
    }

    const normalizedChartType = getNormalizedChartType()

    const getChartName = () => {
        if (props.visData.title) {
            return props.visData.title
        }

        const getNameChartType = (chartType: any) => {
            if (chartType === 'pie') {
                return 'Pie'
            } else if (chartType === 'histogram') {
                return 'Histogram'
            } else if (chartType === 'line') {
                return 'Line'
            } else if (chartType === 'area') {
                return 'Area'
            } else if (chartType === 'column') {
                return 'Column'
            } else if (chartType === 'scatter') {
                return 'Scatter'
            }
        }

        if (props?.visData?.chartType === 'pie') {
            return `${getNameChartType(props?.visData?.chartType)} chart ${props?.visData?.hasToGroup ? 'grouped by ' : ''}"${props?.visData?.chartLabelAttribute}"${props?.visData?.chartAttributeY ? ` x "${props?.visData?.chartAttributeY}"` : ''}`
        } else if (
            ['area', 'line', 'histogram', 'scatter', 'column'].includes(props?.visData?.chartType)
        ) {
            return `${getNameChartType(props?.visData?.chartType)} chart "${props?.visData?.chartLabelAttribute}"${props?.visData?.chartAttributeY ? ` x "${props?.visData?.chartAttributeY}"` : ''}`
        }

        return `Chart ${props.index}`
    }

    return (
        <Draggable className={styles.chart} disabled={visMode === 'split'}>
            <GoogleCharts
                width={chartSize}
                height={chartSize * 0.75}
                chartType={normalizedChartType}
                loader={<div style={{padding: 30}}>Loading...</div>}
                data={data}
                options={{
                    title: getChartName(),
                    // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                    // backgroundColor: 'transparent',
                    chartArea: {
                        // backgroundColor: 'blue',
                        width: '50%'
                        // height: '80%'
                        // left: 0,
                        // top: 0,
                    }
                    // legend: 'none',
                    // legend: {
                    //     position: 'top'
                    // }
                    // hAxis: {
                    //     title: 'Total Population',
                    //     minValue: 0,
                    // },
                    // vAxis: {
                    //     title: 'City',
                    // },
                }}
                chartEvents={[
                    {
                        eventName: 'ready',
                        callback: ({chartWrapper, google}) => {
                            // console.log('chart image base64', chartWrapper.getChart().getImageURI())
                        }
                    },
                    {
                        eventName: 'select',
                        callback: ({chartWrapper, google}) => {
                            const chart = chartWrapper.getChart()
                            const selectedDataRow =
                                chart.getSelection()?.length > 0
                                    ? data[chart.getSelection()?.[0]?.row + 1]
                                    : null
                            const highlightIndexes = visibleRows
                                .map((row: any, index: number) => {
                                    const rowAttributeIndex =
                                        labelAttributeIndex !== -1
                                            ? labelAttributeIndex
                                            : attributeIndexX
                                    return row[rowAttributeIndex] === selectedDataRow?.[0]
                                        ? index
                                        : null
                                })
                                .filter((item: any) => item !== null)

                            dispatch(setHighlight(highlightIndexes as number[]))
                        }
                    }
                ]}
                legendToggle
            />
        </Draggable>
    )
}

export default Chart
