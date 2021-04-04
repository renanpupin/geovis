import React from 'react';
import {useSelector} from "react-redux";
import {getAttributes, getVisibleRows} from "src/redux/data/selectors";

import ParallelCoordinates from "src/components/ParallelCoordinates/ParallelCoordinates";
import Draggable from "src/components/Draggable/Draggable";
import GoogleCharts from "react-google-charts";
import styles from './Chart.module.scss';

// https://developers.google.com/chart/interactive/docs/printing

export type ChartPropTypes = {
    visData: any
    index: number
}

const Chart: React.FC<ChartPropTypes> = (props) => {
    console.log("props", props)
    const { visData } = props
    const visibleRows = useSelector(getVisibleRows)
    const attributes = useSelector(getAttributes)
    console.log("visData", visData)
    console.log("visibleRows", visibleRows)
    console.log("attributes", attributes)

    // chart = {
    //     title: string
    //     field: <field> or id
    //     series: ['numeric1', numeric2]
    // }
    //hAxis = <field> or id, vAxis = ['numeric1', numeric2]

    const labelAttributeIndex = attributes.findIndex(item => item.name === visData.chartLabelAttribute)
    const attributeIndex = attributes.findIndex(item => item.name === visData.chartAttribute)

    let data = [
        [visData.chartLabelAttribute, visData.chartAttribute],
        ...visibleRows.map((item: any, index: any) => [item[labelAttributeIndex], item[attributeIndex]])
    ]
    console.log("chart dataa", data)
        // data = [
        // ['City', '2010 Population', '2000 Population'],
        //     ['New York City, NY', 8175000, 8008000],
        //     ['Los Angeles, CA', 3792000, 3694000],
        //     ['Chicago, IL', 2695000, 2896000],
        //     ['Houston, TX', 2099000, 1953000],
        //     ['Philadelphia, PA', 1526000, 1517000],
        // ]

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

    return(
        <Draggable className={styles.chart}>
            {normalizedChartType === "parallel" ? getParallel() :<GoogleCharts
                width={400}
                height={300}
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
                legendToggle
            />}
        </Draggable>
    )
}

export default Chart
