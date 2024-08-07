import {VisualizationTypeValues, MarkerChartTypeProps} from 'src/redux/data/types'
import {useSelector} from 'react-redux'
import {getAttributes, getAttributesStats} from '../../../redux/data/selectors'
import {colorScaleHeatmap, hex2rgba} from '../../../libs/colors'

type MarkerChartProps = {
    data: any
    attributes: any
    attributesStats: any
    chartType: MarkerChartTypeProps
    chartAttributes: string[]
    width?: number
    height?: number
    showLegend?: boolean
    zoomLevel?: number | null
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

            if (chartAttributes?.length === 1 && chartType === 'pie') {
                values.push(100 - values[0])
                colors.push('rgba(215, 215, 215, 1)')
                legends.push(`max (${attributeStats.max})`)
            }
        }

        avg = avg / chartAttributes.length

        return {values, avg, legends, colors}
    }

    const encodeChartToUrl = (chartObject: object, chartSize: {width: number; height: number}) => {
        const baseUrl = 'https://quickchart.io/chart?c='
        const encodedChart = encodeURIComponent(JSON.stringify(chartObject))
        const backgroundColor = ['line', 'bar', 'radar'].includes(props?.chartType)
            ? 'white'
            : 'transparent'
        const chartConfig = `&backgroundColor=${backgroundColor}${props?.showLegend ? `` : `&width=${chartSize.width}&height=${chartSize.height}`}&format=png&version=2.9.3`
        return `${baseUrl}${encodedChart}${chartConfig}`
    }

    const generateChartUrl = () => {
        let result = processChartData()

        //set type and size
        let size: {width: number; height: number}
        const maxZoomLevel = 14
        const minZoomLevel = 7
        const numberOfZooms = 10
        const zoomScale = props.zoomLevel
            ? Math.min(Math.max(props.zoomLevel, minZoomLevel), maxZoomLevel) / numberOfZooms
            : 1
        let scale = getScaleForNormalizedValue(result.avg) * zoomScale
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
                        backgroundColor: ['radar'].includes(props?.chartType)
                            ? hex2rgba(colors[0], 0.6)
                            : colors,
                        borderColor: ['radar'].includes(props?.chartType)
                            ? hex2rgba(colors[0], 0.9)
                            : undefined,
                        data: result.values
                    }
                ]
            },
            options: {
                ...(!['pie', 'outlabeledPie', 'polar', 'radar'].includes(props?.chartType)
                    ? {
                          scales: {
                              yAxes: [
                                  {
                                      display: props?.showLegend,
                                      ticks: {
                                          suggestedMin: 0,
                                          suggestedMax: 100
                                      }
                                  }
                              ],
                              xAxes: [
                                  {
                                      drawTicks: false,
                                      gridLines: {
                                          display: false,
                                          drawBorder: true
                                      }
                                  }
                              ]
                          }
                      }
                    : {}),
                ...(['radar'].includes(props?.chartType)
                    ? {
                          scale: {
                              id: 'radial',
                              pointLabels: {
                                  display: props?.showLegend,
                                  fontColor: '#666',
                                  fontSize: 10
                              }
                          }
                      }
                    : {}),
                plugins: {
                    legend: false,
                    ...(props?.chartType === 'radar'
                        ? {
                              datalabels: {
                                  display: props.showLegend,
                                  align: 'center',
                                  anchor: 'center',
                                  backgroundColor: '#eee',
                                  borderColor: '#ddd',
                                  borderRadius: 6,
                                  borderWidth: 1,
                                  padding: 4,
                                  color: '#666666',
                                  font: {
                                      family: 'sans-serif',
                                      size: 10,
                                      style: 'normal'
                                  }
                              }
                          }
                        : {})
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
        scaledSize: new google.maps.Size(result.width, result.height),
        sizes: {width: result.width, height: result.height}
    }
}

export default MarkerChart
