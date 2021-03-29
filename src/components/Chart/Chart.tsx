// https://developers.google.com/chart/interactive/docs/printing

import React from 'react';
import Draggable from "src/components/Draggable/Draggable";
import GoogleCharts from "react-google-charts";
import styles from './Chart.module.scss';

// https://developers.google.com/chart/interactive/docs/printing

const Chart: React.FC = ({}) => {
    // const visibleData = useSelector(getVisibleRows)
    return(
        <Draggable className={styles.chart}>
            <GoogleCharts
                width={400}
                height={300}
                chartType="ColumnChart"
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
                    title: 'Population of Largest U.S. Cities',
                    chartArea: { width: '30%' },
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
