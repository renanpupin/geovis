import React from 'react';
import {useSelector} from "react-redux";
import {getAttributes, getVisibleRows} from "src/redux/data/selectors";

import Draggable from "src/components/Draggable/Draggable";
import GoogleCharts from "react-google-charts";
import styles from './Chart.module.scss';

// https://developers.google.com/chart/interactive/docs/printing

export type ChartPropTypes = {
    data: any
    index: number
}

const Chart: React.FC<ChartPropTypes> = (props) => {
    console.log("props", props)
    const visibleData = useSelector(getVisibleRows)
    const attributes = useSelector(getAttributes)
    console.log("visibleData", visibleData)
    console.log("attributes", attributes)

    // chart = {
    //     title: string
    //     field: <field> or id
    //     series: ['numeric1', numeric2]
    // }
    //hAxis = <field> or id, vAxis = ['numeric1', numeric2]

    return(
        <Draggable className={styles.chart}>
            <GoogleCharts
                width={400}
                height={300}
                chartType="ColumnChart"
                // chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['City', '2010 Population', '2000 Population'],
                    ['New York City, NY', 8175000, 8008000],
                    ['Los Angeles, CA', 3792000, 3694000],
                    ['Chicago, IL', 2695000, 2896000],
                    ['Houston, TX', 2099000, 1953000],
                    ['Philadelphia, PA', 1526000, 1517000],
                ]}
                options={{
                    title: props.data.title ?? `Chart ${props.index}`,
                    chartArea: { width: '50%' },
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'City',
                    },
                }}
                legendToggle
            />
        </Draggable>
    )
}

export default Chart
