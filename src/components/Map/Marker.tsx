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
    icon?: any
    highlight?: boolean
}

const Marker = (props: MarkerPropTypes) => {
    const {row, enableMarkerCluster, icon, cluster, attributes, highlight} = props
    const [didMount, setDidMount] = useState(false)
    // console.log('Marker ID', props.id)

    const visualizations = useSelector(getVisualizations)
    const attributesStats = useSelector(getAttributesStats)

    const [gmapMarker] = useState(
        createMarkerEmpty({
            id: props.id,
            lat: props.lat,
            lng: props.lon,
            icon: icon
        })
    )

    // const [gmapMarkerBubble] = useState(createMarkerCircle())
    let infoWindow: any = null
    let clusterInfoWindow: any = null
    // console.log('gmapMarkerBubble', gmapMarkerBubble)

    const markerChartVis = useMemo(() => {
        return visualizations.filter(
            visualization =>
                visualization.visible && visualization.type === VisualizationTypeValues.MarkerChart
        )
    }, [visualizations])

    useEffect(() => {
        // console.log("mount", props.enableMarkerCluster)
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
                    }
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
            gmapMarker.content = getMarkerContent(icon)

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
    }, [props.map, cluster, enableMarkerCluster, infoWindow, clusterInfoWindow, icon])

    // to use highlight with opacity (need to implement on cluster too)
    // useEffect(() => {
    //     console.log('marker onchange highlight', highlight);
    //     if(highlight === false){
    //         gmapMarker.setOpacity(0.3);
    //     }else{
    //         gmapMarker.setOpacity(1);
    //     }
    // }, [highlight])

    return null
}

export default Marker
