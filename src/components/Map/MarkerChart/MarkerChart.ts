import {VisualizationTypeValues, MarkerChartTypeProps} from 'src/redux/data/types'
import {useSelector} from 'react-redux'
import {getAttributes, getAttributesStats} from '../../../redux/data/selectors'

type MarkerChartProps = {
    data: any
    attributes: any
    attributesStats: any
    chartType: MarkerChartTypeProps
    chartAttributes: string[]
    width?: number
    height?: number
}

const MarkerChart = (props: MarkerChartProps) => {
    const {data, chartType, chartAttributes, attributes, attributesStats} = props

    const getHeatmapColorForNormalizedValue = (normalizedValue: number) => {
        // console.log("getHeatmapColorForNormalizedValue", normalizedValue);
        if (normalizedValue <= 20) {
            return '0000FF'
        } else if (normalizedValue > 20 && normalizedValue <= 40) {
            return '00FFFF'
        } else if (normalizedValue > 40 && normalizedValue <= 60) {
            return '00FF00'
        } else if (normalizedValue > 60 && normalizedValue <= 80) {
            return 'FFFF00'
        } else {
            return 'FF0000'
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
        let values = ''
        let legends = ''
        let colors = ''

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

            //@ts-ignore
            const normalizedValue = getNormalizedValue(
                attributeValue,
                attributeStats.min,
                attributeStats.max
            )

            values += normalizedValue
            legends += String(chartAttributes[index])
            colors += getHeatmapColorForNormalizedValue(normalizedValue)
            avg += normalizedValue
            //
            if (index !== chartAttributes.length - 1) {
                values += ','
                legends += '|'
                colors += chartType === 'bar' ? '|' : ','
            }
        }

        avg = avg / chartAttributes.length

        return {values, avg, legends, colors}
    }

    const generateChartUrl = () => {
        let result = processChartData()
        let url = `https://chart.googleapis.com/chart?chxl=0:||1:|&chf=bg,s,FFFFFF00`
        //legends: &chl=${result.legends}

        //set type and size
        let size
        let scale = getScaleForNormalizedValue(result.avg)
        let width
        let height
        let gChartType
        let colors
        if (chartType === 'bar') {
            // gChartType = "bvs";
            gChartType = 'bvg'
            colors = result.colors
            size = props.width && props.height ? `${props.width}x${props.height}` : '100x100'
            width = 30 * scale
            height = 30 * scale
        } else if (chartType === 'line') {
            let normalizedColor = getHeatmapColorForNormalizedValue(result.avg)

            url += `&chm=B,${normalizedColor},0,0,0` //&chm=a,990066,0,0.0,9.0|o,FF0000,0,1.0,25
            colors = normalizedColor
            gChartType = 'lc' //lc:nda
            size = props.width && props.height ? `${props.width}x${props.height}` : '100x100'
            width = 30 * scale
            height = 30 * scale
        } else {
            gChartType = 'p3'
            colors = result.colors
            size = props.width && props.height ? `${props.width}x${props.height}` : '120x50'
            width = 65 * scale
            height = 37 * scale
        }

        url += `&chs=${size}`
        url += `&cht=${gChartType}`
        url += `&chco=${colors}`
        url += `&chd=t:${result.values}`

        //permitir gráfico ser maior
        // http://www2.microstrategy.com/producthelp/10/GISHelp/Lang_1033/images/google/google_Analyze_Flash_terrain.png

        //permitir mostrar detalhes do marcador na lateral quando passar o mouse em cima
        // http://www.bmdata.co.uk/effective/index_map.html

        //https://www.targetmap.com/viewer.aspx?reportId=47255

        return {url, width, height}
    }

    const result = generateChartUrl()
    // console.log('generateChartUrl', result);

    //https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#interactive_markers
    //https://github.com/hassanlatif/google-map-chart-marker-clusterer?tab=readme-ov-file
    return {
        // url: `https://chart.googleapis.com/chart?chs=150x150&chd=t:5,10&cht=p3&chf=bg,s,FFFFFF00`,
        // url: `https://chart.googleapis.com/chart?chs=150x100&chd=t:40,60,60,45,47,75,70,72&cht=lc&chf=bg,s,FFFFFF00`,
        // url: 'https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27pie%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B84%2C%2028%2C%2057%2C%2019%2C%2097%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20159%2C%2064)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20205%2C%2086)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(75%2C%20192%2C%20192)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27Dataset%201%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%7D%0A',
        url: 'https://quickchart.io/chart?c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22ONE%22%2C%20%22TWO%22%2C%20%22THREE%22%2C%20%22FOUR%22%2C%20%22FIVE%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%23FF3784%22%2C%20%22%2336A2EB%22%2C%20%22%234BC0C0%22%2C%20%22%23F77825%22%2C%20%22%239966FF%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D',
        // url: result.url,
        origin: new google.maps.Point(0, 0),
        size: new google.maps.Size(result.width, result.height),
        anchor: new google.maps.Point(result.width / 2, result.height / 2),
        scaledSize: new google.maps.Size(result.width, result.height)
    }
}

export default MarkerChart
