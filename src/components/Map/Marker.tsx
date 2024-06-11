import React, {useEffect, useMemo, useState} from 'react'
// import MarkerClusterer from '@googlemaps/markerclustererplus'
import {MarkerClusterer} from '@googlemaps/markerclusterer'
import {
    removeMarker,
    createMarkerEmpty,
    createMarkerCircle,
    createPin,
    createMarkerChartHtmlElement,
    getMarkerContent
} from './markerUtils'
import {createInfoWindow} from 'src/components/Map/InfoWindow/infoWindowUtils'
import MarkerChart from './MarkerChart/MarkerChart'
import {MarkerChartTypeProps, VisualizationTypeValues} from '../../redux/data/types'
import {useSelector} from 'react-redux'
import {
    getAttributes,
    getAttributesStats,
    getHighlight,
    getLatAttributeIndex,
    getLonAttributeIndex,
    getVisualizations
} from '../../redux/data/selectors'

export const ENABLE_COLLISION_BEHAVIOR_THRESHOLD = 250

export type MarkerPropTypes = {
    id: string
    lat: string
    lon: string
    row: any
    map: any
    attributes: any
    cluster: MarkerClusterer
    enableMarkerCluster: boolean
    // enableMarkerChart: boolean
    enableCollisionBehavior?: boolean
    icon?: any
    highlight?: boolean
}

const Marker = (props: MarkerPropTypes) => {
    const {row, enableMarkerCluster, icon, cluster, attributes, highlight} = props
    const [didMount, setDidMount] = useState(false)
    const [chartImage, setChartImage] = useState<string | null>(null)

    const visualizations = useSelector(getVisualizations)
    const attributesStats = useSelector(getAttributesStats)

    const [gmapMarker] = useState(
        createMarkerEmpty({
            id: props.id,
            lat: props.lat,
            lng: props.lon,
            icon: icon,
            enableCollisionBehavior: props.enableCollisionBehavior
        })
    )

    // const [gmapMarkerBubble] = useState(createMarkerCircle())
    let infoWindow: any = null
    let clusterInfoWindow: any = null

    const markerChartVis = useMemo(() => {
        return visualizations.filter(
            visualization =>
                visualization.visible && visualization.type === VisualizationTypeValues.MarkerChart
        )
    }, [visualizations])

    useEffect(() => {
        if (enableMarkerCluster) {
            cluster.addMarker(gmapMarker)
            // gmapMarkerBubble.setMap(props.map);
        } else {
            gmapMarker.map = props.map
            // gmapMarkerBubble.setMap(props.map);
        }

        const markerClickEventListener = gmapMarker.addListener('click', (evt: any) => {
            if (!infoWindow) {
                infoWindow = createInfoWindow(
                    gmapMarker,
                    null,
                    props.id,
                    [row].map((item: any, index: number) => {
                        const markerChart =
                            markerChartVis?.length > 0
                                ? MarkerChart({
                                      attributes,
                                      attributesStats,
                                      data: [item],
                                      chartType: markerChartVis[0]
                                          .markerChartType as MarkerChartTypeProps,
                                      chartAttributes: markerChartVis[0].markerChartAttributes,
                                      showLegend: true
                                  })
                                : null
                        return {...item, markerImageUrl: markerChart?.url}
                    }),
                    props.map,
                    attributes,
                    false,
                    () => {
                        infoWindow = null
                    },
                    icon
                )
            }
        })

        return () => {
            // console.log('marker remove events')
            google.maps.event.removeListener(markerClickEventListener)
            infoWindow?.close()
        }
    }, [props.id, enableMarkerCluster, cluster, props.map])

    useEffect(() => {
        if (didMount) {
            gmapMarker.content = getMarkerContent(icon, chartImage)

            if (enableMarkerCluster) {
                gmapMarker.map = null
                cluster.addMarker(gmapMarker)
            } else {
                cluster.removeMarker(gmapMarker)
                gmapMarker.map = props.map
            }
        }
        setDidMount(true)

        return () => {
            removeMarker(gmapMarker, enableMarkerCluster, cluster)
            // console.log("remove", infoWindow)
            infoWindow?.close()
            clusterInfoWindow?.close()
        }
    }, [props.map, cluster, enableMarkerCluster, infoWindow, clusterInfoWindow, icon, chartImage])

    return null
    //to use google charts on the marker
    // return (
    //     <div style={{display: 'none'}}>
    //         <Chart
    //             chartType="PieChart"
    //             data={[
    //                 ['Task', 'Hours per Day'],
    //                 ['Work', 11],
    //                 ['Eat', 2],
    //                 ['Commute', 2],
    //                 ['Watch TV', 2],
    //                 ['Sleep', 7]
    //             ]}
    //             options={{
    //                 // title: 'My Daily Activities',
    //                 colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    //                 backgroundColor: 'transparent',
    //                 legend: 'none',
    //                 chartArea: {
    //                     width: '100%',
    //                     backgroundColor: 'blue',
    //                     left: 0,
    //                     top: 0,
    //                     height: '100%'
    //                 },
    //                 width: 200
    //             }}
    //             width={200}
    //             height={200}
    //             chartEvents={[
    //                 {
    //                     eventName: 'ready',
    //                     callback: ({chartWrapper, google}) => {
    //                         console.log('=> base64', chartWrapper.getChart().getImageURI())
    //                         //@ts-ignore
    //                         setChartImage(chartWrapper.getChart().getImageURI())
    //                     }
    //                 }
    //             ]}
    //             // legendToggle
    //         />
    //     </div>
    // )
}

export default Marker
