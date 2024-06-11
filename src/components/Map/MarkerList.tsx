import React, {useEffect, useState, useCallback, useMemo, FC, useRef} from 'react'
// import MarkerClusterer from '@googlemaps/markerclustererplus'
import {
    GridAlgorithm,
    MarkerClusterer,
    NoopAlgorithm,
    SuperClusterAlgorithm
} from '@googlemaps/markerclusterer'
import Marker from 'src/components/Map/Marker'
import {useSelector} from 'react-redux'
import {
    getLatAttributeIndex,
    getLonAttributeIndex,
    getAttributes,
    getAttributesStats,
    getHighlight,
    getVisibleRows,
    getVisualizations
} from 'src/redux/data/selectors'
import {createInfoWindow} from 'src/components/Map/InfoWindow/infoWindowUtils'
import MarkerChart from 'src/components/Map/MarkerChart/MarkerChart'
import {VisualizationTypeValues, MarkerChartTypeProps} from '../../redux/data/types'
import {removeDuplicatesFromStringArray} from '../../utils/array'
import {colorScale, colorScaleHeatmap, generateRandomColors} from '../../libs/colors'
import {Cluster} from '@googlemaps/markerclusterer/dist/cluster'
import {ClusterStats} from '@googlemaps/markerclusterer/dist/renderer'
import {createClusterSvg, createMarkerChartHtmlElement} from './markerUtils'
import {ENABLE_COLLISION_BEHAVIOR_THRESHOLD} from './Marker'

// const styleCluster = [
//     MarkerClusterer.withDefaultStyle({
//         // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//         url: Img,
//         width: 100,
//         height: 128,
//         anchorIcon: [64, 50],
//         textColor: "red",
//         textSize: 10,
//     }),
//     MarkerClusterer.withDefaultStyle({
//         // url: "src/assets/img/logo.png",
//         // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//         url: Img,
//         width: 40,
//         height: 35,
//         anchorIcon: [35, 20],
//         textColor: "blue",
//         textSize: 11,
//     }),
//     MarkerClusterer.withDefaultStyle({
//         // url: "src/assets/img/logo.png",
//         // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//         url: Img,
//         width: 50,
//         height: 44,
//         anchorIcon: [44, 25],
//         textColor: "green",
//         textSize: 12,
//     }),
// ];

type MarkerListProps = {
    map: any
    visibleRows: any
}

const MarkerList: FC<MarkerListProps> = props => {
    const visualizations = useSelector(getVisualizations)
    const latAttributeIndex = useSelector(getLatAttributeIndex)
    const lonAttributeIndex = useSelector(getLonAttributeIndex)
    const attributes = useSelector(getAttributes)
    const attributesStats = useSelector(getAttributesStats)
    const highlight = useSelector(getHighlight)
    const infoWindowClusterRef = useRef(null)

    const markerClusterVis = useMemo(() => {
        return visualizations.filter(
            visualization =>
                visualization.visible &&
                visualization.type === VisualizationTypeValues.MarkerCluster
        )
    }, [visualizations])

    const markerChartVis = useMemo(() => {
        return visualizations.filter(
            visualization =>
                visualization.visible && visualization.type === VisualizationTypeValues.MarkerChart
        )
    }, [visualizations])

    const markerColorVis = useMemo(() => {
        return visualizations.filter(
            visualization =>
                visualization.visible && visualization.type === VisualizationTypeValues.MarkerColor
        )
    }, [visualizations])

    const markersVisible = useMemo(() => {
        return props.visibleRows
            .filter(
                (row: any, index: number) =>
                    highlight.length === 0 || highlight.includes(index as any)
            )
            .map((row: any, index: number) => ({
                ...row,
                _key_id: `${index}_${new Date().getTime()}`
            }))
    }, [props.visibleRows, highlight])

    // console.log('markerChartVis outside', markerChartVis)

    const getCluster = useCallback(() => {
        return new MarkerClusterer({
            map: props.map,
            markers: [],
            // algorithm: new GridAlgorithm({maxDistance: 40000}),
            algorithm: new SuperClusterAlgorithm({maxDistance: 40000}),
            // algorithm: new NoopAlgorithm({}),
            onClusterClick: function (event: any, cluster: any) {
                const gmapMarkers = cluster.markers

                const ids = gmapMarkers.map((item: any) => Number(item.title))
                const rowsInCluster = markersVisible
                    .filter((_: any, index: number) => ids.includes(index))
                    .map((item: any, index: number) => {
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
                    })

                //@ts-ignore
                infoWindowClusterRef?.current?.close()
                infoWindowClusterRef.current = null

                //@ts-ignore
                infoWindowClusterRef.current = createInfoWindow(
                    null,
                    cluster.position,
                    'Cluster',
                    rowsInCluster,
                    props.map,
                    attributes,
                    true,
                    () => {
                        infoWindowClusterRef.current = null
                    },
                    null
                )
            },
            renderer: {
                render(cluster: Cluster, stats: ClusterStats, map: google.maps.Map) {
                    const clusterMarkersCount = cluster.count

                    const getMarkerClusterColor = () => {
                        let index = 0
                        if (clusterMarkersCount / markersVisible.length > 0.8) {
                            index = 4
                        } else if (clusterMarkersCount / markersVisible.length > 0.6) {
                            index = 3
                        } else if (clusterMarkersCount / markersVisible.length > 0.4) {
                            index = 2
                        } else if (clusterMarkersCount / markersVisible.length > 0.2) {
                            index = 1
                        } else {
                            index = 0
                        }

                        return colorScaleHeatmap[index]
                    }

                    // change color if this cluster has more markers than the mean cluster
                    const color = getMarkerClusterColor()
                    // console.log('markerChartVis inside', markerChartVis)

                    let resultMarkerChartCluster
                    if (markerChartVis?.length > 0) {
                        const ids = cluster?.markers?.map((item: any) => Number(item.title))
                        const rowsInCluster = markersVisible.filter((item: any, index: number) =>
                            ids?.includes(index)
                        )

                        resultMarkerChartCluster = MarkerChart({
                            attributes,
                            attributesStats,
                            data: rowsInCluster,
                            chartType: markerChartVis[0].markerChartType as MarkerChartTypeProps,
                            chartAttributes: markerChartVis[0].markerChartAttributes,
                            width: 150,
                            height: 150
                        })
                    }

                    let clusterDiv = resultMarkerChartCluster
                        ? createMarkerChartHtmlElement({
                              url: resultMarkerChartCluster?.url,
                              width: resultMarkerChartCluster?.sizes?.width,
                              height: resultMarkerChartCluster?.sizes?.height,
                              count: cluster.count
                          })
                        : null

                    const showClusterChart =
                        markerChartVis?.length > 0 && markerClusterVis?.[0]?.showChart === 'yes'

                    return new window.google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: cluster.position,
                        // adjust zIndex to be above other markers
                        zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + cluster.count,
                        title: `Cluster of ${cluster.count} markers`,
                        content: showClusterChart
                            ? clusterDiv
                            : createClusterSvg(color, String(cluster.count))
                    })
                }
            }
        })
    }, [props.map, markersVisible, markerChartVis, attributes, attributesStats])

    const [cluster, setCluster] = useState<MarkerClusterer>(getCluster())

    // useEffect(() => {
    //     setCluster(getCluster())
    // }, [])

    useEffect(() => {
        const zoomChangedEventListener = google.maps.event.addListener(
            props.map,
            'zoom_changed',
            function () {
                console.log('zoom_changed')
                //@ts-ignore
                infoWindowClusterRef?.current?.close()
                infoWindowClusterRef.current = null
            }
        )

        return () => {
            // console.log('marker list remove events')
            google.maps.event.removeListener(zoomChangedEventListener)
            //@ts-ignore
            infoWindowClusterRef?.current?.close()
            infoWindowClusterRef.current = null
        }
    }, [markersVisible, cluster])

    const getMarkers = useCallback(() => {
        cluster.clearMarkers()

        const getMarkerIcon = (row: any) => {
            if (markerChartVis?.length > 0) {
                return MarkerChart({
                    attributes,
                    attributesStats,
                    data: [row],
                    chartType: markerChartVis[0].markerChartType as MarkerChartTypeProps,
                    chartAttributes: markerChartVis[0].markerChartAttributes
                })
            }

            if (markerColorVis?.length > 0) {
                const attributeIndex = attributes.findIndex(
                    (item: any) => item.name === markerColorVis[0].markerColorAttribute
                )

                const markerColorUniqueAttributeValues = removeDuplicatesFromStringArray(
                    markersVisible.map((item: any) => item[attributeIndex])
                )

                const extraRandomColors: string[] = generateRandomColors(
                    markerColorUniqueAttributeValues?.length - colorScale?.length
                )

                const color = [...colorScale, ...extraRandomColors][
                    markerColorUniqueAttributeValues.indexOf(row[attributeIndex])
                ]

                return {color}
            }

            return null
        }

        return markersVisible.map((row: any, index: number) => {
            return (
                <Marker
                    key={row._key_id}
                    id={String(index)}
                    highlight={highlight.length === 0 || highlight.includes(index as any)}
                    lat={row[latAttributeIndex]}
                    lon={row[lonAttributeIndex]}
                    row={row}
                    attributes={attributes}
                    map={props.map}
                    cluster={cluster}
                    enableMarkerCluster={markerClusterVis.length > 0}
                    // enableMarkerChart={markerChartVis.length > 0}
                    // icon={MarkerChart({data: row, type: "pie"})}
                    icon={getMarkerIcon(row)}
                    enableCollisionBehavior={
                        markersVisible?.length > ENABLE_COLLISION_BEHAVIOR_THRESHOLD
                    }
                />
            )
        })
    }, [
        markersVisible,
        props.map,
        cluster,
        markerClusterVis,
        markerChartVis,
        highlight,
        attributes,
        attributesStats
    ])

    return getMarkers()
}

export default MarkerList
