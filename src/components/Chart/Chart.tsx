import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import GoogleCharts from "react-google-charts";
import {getAttributes, getVisibleRows} from "src/redux/data/selectors";

import ParallelCoordinates from "src/components/ParallelCoordinates/ParallelCoordinates";
import Draggable from "src/components/Draggable/Draggable";
import styles from './Chart.module.scss';
import {countAttributeOcurrences} from 'src/redux/data/filters'
import {setHighlight} from "../../redux/data/actions";

// https://developers.google.com/chart/interactive/docs/printing

export type ChartPropTypes = {
    visData: any
    visMode?: any
    index: number
}

const Chart: React.FC<ChartPropTypes> = (props) => {
    // console.log("props", props)
    const { visData, visMode } = props
    const dispatch = useDispatch();
    const visibleRows = useSelector(getVisibleRows)
    const attributes = useSelector(getAttributes)
    // console.log("visData", visData)
    // console.log("visibleRows", visibleRows)
    // console.log("attributes", attributes)

    // chart = {
    //     title: string
    //     field: <field> or id
    //     series: ['numeric1', numeric2]
    // }
    //hAxis = <field> or id, vAxis = ['numeric1', numeric2]

    const labelAttributeIndex = attributes.findIndex(item => item.name === visData.chartLabelAttribute)
    const attributeIndexX = attributes.findIndex(item => item.name === visData.chartAttributeX)
    const attributeIndexY = attributes.findIndex(item => item.name === visData.chartAttributeY)

    const getDataByChartType = () => {
        if(visData.chartType === 'pie' && visData.hasToGroup){
            const ocurrences = countAttributeOcurrences(visibleRows, labelAttributeIndex);
            return ocurrences[0].map((item: any, index: any) => (
                [
                    item,
                    ocurrences[1][index]
                ]
            ))
        }else{
            return visibleRows.map((item: any, index: any) => (
                    [
                        labelAttributeIndex !== -1 ? item[labelAttributeIndex] : item[attributeIndexX],
                        item[attributeIndexY]
                    ]
                ))
            }
    }

    let data = [
        [visData.chartLabelAttribute || visData.chartAttributeX, visData.chartAttributeY ?? "Ocurrences"],
        ...getDataByChartType()
    ]
    // console.log("chart data", data)

    const getNormalizedChartType = () => {
        switch (visData.chartType){
            case "line": {
                return "LineChart";
            }
            case "column": {
                return "ColumnChart";
            }
            case "area": {
                return "AreaChart";
            }
            case "histogram": {
                return "Histogram";
            }
            case "pie": {
                return "PieChart";
            }
            case "scatter": {
                return "ScatterChart";
            }
            default: {
                return visData.chartType;
            }
        }
    }

    const getParallel = () => {
        return(
            <ParallelCoordinates visData={visData}/>
        )
    }

    const normalizedChartType = getNormalizedChartType()

    const size = 400-35;    // 35 is scrollbar width
    return(
        <Draggable className={styles.chart} disabled={visMode === 'split'}>
            {normalizedChartType === "parallel" ? getParallel() :<GoogleCharts
                width={size}
                height={size*0.75}
                chartType={normalizedChartType}
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: props.visData.title ?? `Chart ${props.index}`,
                    chartArea: { width: '50%' },
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
                        eventName: 'select',
                        callback: ({ chartWrapper, google }) => {
                            const chart = chartWrapper.getChart();
                            console.log('chart getSelection', chart.getSelection())
                            //@ts-ignore
                            const selectedDataRow = chart.getSelection()?.length > 0 ? data[chart.getSelection()?.[0]?.row +1] : null
                            console.log('selectedDataRow', selectedDataRow)
                            console.log('visibleRows', visibleRows)
                            const highlightIndexes = visibleRows.map((row: any, index: number) => (labelAttributeIndex !== -1 ? row[labelAttributeIndex] : row[attributeIndexX]) === selectedDataRow?.[0] ? index : null).filter((item: any) => item !== null)
                            console.log('highlightIndexes', highlightIndexes)

                            //TODO: arrumar isso está filtrando errado (testar clicar no gráfico e abrir os marcadores)

                            dispatch(setHighlight(highlightIndexes as number[]))
                        }
                    }
                ]}
                legendToggle
            />}
        </Draggable>
    )
}

export default Chart
