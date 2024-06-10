import {VisualizationTypeValues, MarkerChartTypeProps} from 'src/redux/data/types'
import {useSelector} from 'react-redux'
import {getAttributes, getAttributesStats} from '../../../redux/data/selectors'
import {colorScaleHeatmap} from '../../../libs/colors'

type MarkerChartProps = {
    data: any
    attributes: any
    attributesStats: any
    chartType: MarkerChartTypeProps
    chartAttributes: string[]
    width?: number
    height?: number
    showLegend?: boolean
}

const MarkerChart = (props: MarkerChartProps) => {
    const {data, chartType, chartAttributes, attributes, attributesStats} = props

    const getHeatmapColorForNormalizedValue = (normalizedValue: number) => {
        if (normalizedValue <= 20) {
            return colorScaleHeatmap[0]
        } else if (normalizedValue > 20 && normalizedValue <= 40) {
            return colorScaleHeatmap[1]
        } else if (normalizedValue > 40 && normalizedValue <= 60) {
            return colorScaleHeatmap[2]
        } else if (normalizedValue > 60 && normalizedValue <= 80) {
            return colorScaleHeatmap[3]
        } else {
            return colorScaleHeatmap[4]
        }
    }

    const getNormalizedValue = (value: number, min: number, max: number) => {
        // console.log("getNormalizedValue", value);
        return 100 * ((value - min) / (max - min))
    }

    const getScaleForNormalizedValue = (normalizedValue: any) => {
        // console.log("getScaleForNormalizedValue", normalizedValue);

        return normalizedValue / 50 + 0.5 //make the scale go from 1 to 3
    }

    const processChartData = () => {
        let values: number[] = []
        let legends: string[] = []
        let colors: string[] = []

        let avg = 0

        for (let index = 0; index < chartAttributes.length; index++) {
            const attributeIndex = attributes.findIndex(
                (item: any) => item.name === chartAttributes[index]
            )
            // console.log('attributeIndex', attributeIndex, chartAttributes[index])
            const attributeStats = attributesStats.find(
                (item: any) => item.attribute === chartAttributes[index]
            )
            // console.log('attributeStats', attributeStats)

            //calculage avg value to support cluster
            let attributeValue = 0
            for (const dataItem of data) {
                attributeValue += dataItem[attributeIndex]
            }
            attributeValue = attributeValue / data.length
            // console.log('attributeValue', attributeValue)

            const normalizedValue = getNormalizedValue(
                attributeValue,
                attributeStats.min,
                attributeStats.max
            )

            values.push(normalizedValue)
            legends.push(String(chartAttributes[index]))
            colors.push(getHeatmapColorForNormalizedValue(normalizedValue))
            avg += normalizedValue
        }

        avg = avg / chartAttributes.length

        return {values, avg, legends, colors}
    }

    const encodeChartToUrl = (chartObject: object, chartSize: {width: number; height: number}) => {
        const baseUrl = 'https://quickchart.io/chart?c='
        const encodedChart = encodeURIComponent(JSON.stringify(chartObject))
        const chartConfig = `&backgroundColor=transparent${props?.showLegend ? `` : `&width=${chartSize.width}&height=${chartSize.height}`}&format=png&version=2.9.3`
        return `${baseUrl}${encodedChart}${chartConfig}`
    }

    const generateChartUrl = () => {
        let result = processChartData()

        //set type and size
        let size: {width: number; height: number}
        let scale = getScaleForNormalizedValue(result.avg)
        let width
        let height
        let colors
        let type: 'outlabeledPie' | 'pie' | 'line' | 'bar' | 'polarArea' | 'radar' | 'bubble'
        if (chartType === 'bar') {
            type = 'bar'
            colors = result.colors
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        } else if (chartType === 'line') {
            type = 'line'
            colors = getHeatmapColorForNormalizedValue(result.avg)
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        } else if (chartType === 'radar') {
            type = 'radar'
            colors = result.colors
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        } else if (chartType === 'polar') {
            type = 'polarArea'
            colors = result.colors
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        } else if (chartType === 'bubble') {
            type = 'bubble'
            colors = result.colors
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        } else {
            type = props?.showLegend ? 'outlabeledPie' : 'pie'
            colors = result.colors
            size =
                props.width && props.height
                    ? {width: props.width, height: props.height}
                    : {width: 100, height: 100}
            width = 40 * scale
            height = 40 * scale
        }

        const chartObject = {
            type,
            data: {
                labels: result.legends,
                datasets: [
                    {
                        // backgroundColor: ['#FF3784', '#36A2EB', '#4BC0C0', '#F77825', '#9966FF'],
                        backgroundColor: colors,
                        data: result.values
                    }
                ]
            },
            options: {
                plugins: {
                    legend: false,
                    outlabels: {
                        text: '%l %p',
                        color: 'white',
                        stretch: 35,
                        font: {
                            resizable: true,
                            minSize: 12,
                            maxSize: 18
                        }
                    }
                }
            }
        }

        return {url: encodeChartToUrl(chartObject, size), width, height}
    }

    const result = generateChartUrl()

    //https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#interactive_markers
    //https://github.com/hassanlatif/google-map-chart-marker-clusterer?tab=readme-ov-file
    return {
        url: result.url,
        origin: new google.maps.Point(0, 0),
        size: new google.maps.Size(result.width, result.height),
        anchor: new google.maps.Point(result.width / 2, result.height / 2),
        scaledSize: new google.maps.Size(result.width, result.height)
    }
}

export default MarkerChart
