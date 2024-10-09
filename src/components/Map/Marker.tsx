import {useEffect, useMemo, useRef, useState, memo, useCallback} from 'react'
import {MarkerClusterer} from '@googlemaps/markerclusterer'
import {removeMarker, createMarkerEmpty, getMarkerContent} from './markerUtils'
import {createInfoWindow} from 'src/components/Map/InfoWindow/infoWindowUtils'
import MarkerChart from './MarkerChart/MarkerChart'
import {MarkerChartTypeProps, VisualizationTypeValues} from '../../redux/data/types'
import {useSelector} from 'react-redux'
import {getAttributesStats, getVisualizations} from '../../redux/data/selectors'

export const ENABLE_COLLISION_BEHAVIOR_THRESHOLD = 250

export type MarkerPropTypes = {
    id: string
    lat: string
    lon: string
    row: any
    map: any
    attributes: any
    cluster: MarkerClusterer | null
    enableMarkerCluster: boolean
    enableCollisionBehavior?: boolean
    icon?: any
    highlight?: boolean
    markerChartType?: MarkerChartTypeProps
}

const Marker = memo(
    (props: MarkerPropTypes) => {
        const {row, enableMarkerCluster, icon, cluster, attributes, highlight} = props
        const visualizations = useSelector(getVisualizations)
        const attributesStats = useSelector(getAttributesStats)

        const [didMount, setDidMount] = useState(false)
        const [chartImage, setChartImage] = useState<string | null>(null)
        const [zoomLevel, setZoomLevel] = useState<number | null>(null)

        const [gmapMarker] = useState(
            createMarkerEmpty({
                id: props.id,
                lat: props.lat,
                lng: props.lon,
                icon: icon,
                enableCollisionBehavior: props.enableCollisionBehavior,
                chartType: props.markerChartType
            })
        )

        const infoWindowRef = useRef<any>(null)

        const markerChartVis = useMemo(() => {
            return visualizations.filter(
                visualization =>
                    visualization.visible &&
                    visualization.type === VisualizationTypeValues.MarkerChart
            )
        }, [visualizations])

        useEffect(() => {
            console.debug('=> Marker mount', props.id)
            return () => {
                console.debug('=> Marker destroy', props.id)
            }
        }, [])

        const cleanInfoWindow = useCallback(() => {
            infoWindowRef?.current?.close()
            infoWindowRef.current = null
        }, [])

        useEffect(() => {
            if (enableMarkerCluster) {
                cluster?.addMarker(gmapMarker)
            } else {
                gmapMarker.map = props.map
            }

            const markerClickEventListener = gmapMarker.addListener('click', (evt: any) => {
                if (!infoWindowRef?.current) {
                    infoWindowRef.current = createInfoWindow(
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
                                          showLegend: true,
                                          zoomLevel
                                      })
                                    : null
                            return {...item, markerImageUrl: markerChart?.url}
                        }),
                        props.map,
                        attributes,
                        false,
                        () => {
                            cleanInfoWindow()
                        },
                        icon
                    )
                }
            })

            return () => {
                // console.log('marker remove events')
                google.maps.event.removeListener(markerClickEventListener)
                cleanInfoWindow()
            }
        }, [props.id, enableMarkerCluster, cluster, props.map, zoomLevel])

        useEffect(() => {
            const zoomChangedEventListener = google.maps.event.addListener(
                props.map,
                'zoom_changed',
                function () {
                    setZoomLevel(props.map.getZoom())

                    cleanInfoWindow()
                }
            )

            return () => {
                google.maps.event.removeListener(zoomChangedEventListener)
            }
        }, [infoWindowRef?.current])

        useEffect(() => {
            // if (didMount) {
            gmapMarker.content = getMarkerContent(icon, chartImage, props?.markerChartType)

            if (enableMarkerCluster) {
                gmapMarker.map = null
                cluster?.addMarker(gmapMarker)
            } else {
                cluster?.removeMarker(gmapMarker)
                gmapMarker.map = props.map
            }
            // }
            // setDidMount(true)

            return () => {
                removeMarker(gmapMarker, enableMarkerCluster, cluster)
                cleanInfoWindow()
            }
        }, [
            props.map,
            cluster,
            enableMarkerCluster,
            infoWindowRef?.current,
            icon,
            chartImage,
            props?.markerChartType
        ])

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
    },
    (prevProps, nextProps) => {
        // console.log('=> prevProps, nextProps', prevProps, nextProps)
        return (
            prevProps.id === nextProps.id &&
            prevProps.lat === nextProps.lat &&
            prevProps.lon === nextProps.lon &&
            prevProps.row === nextProps.row &&
            prevProps.attributes === nextProps.attributes &&
            !!prevProps.map === !!nextProps.map &&
            !!prevProps.cluster === !!nextProps.cluster &&
            prevProps.enableMarkerCluster === nextProps.enableMarkerCluster &&
            prevProps.enableCollisionBehavior === nextProps.enableCollisionBehavior &&
            prevProps.icon === nextProps.icon &&
            prevProps.highlight === nextProps.highlight &&
            prevProps.markerChartType === nextProps.markerChartType
        )
        // id: string
        //     lat: string
        //     lon: string
        //     row: any
        //     map: any
        //     attributes: any
        //     cluster: MarkerClusterer | null
        //     enableMarkerCluster: boolean
        //     enableCollisionBehavior?: boolean
        //     icon?: any
        //     highlight?: boolean
        //     markerChartType?: MarkerChartTypeProps
    }
)

export default Marker
