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
import {
    createClusterSvg,
    createMarkerChartHtmlElement,
    getMakerIds,
    getMarkerClusterColor,
    getRowsInCluster
} from './markerUtils'
import {ENABLE_COLLISION_BEHAVIOR_THRESHOLD} from './Marker'

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
    const clusterRef = useRef<MarkerClusterer | null>(null)
    const infoWindowClusterRef = useRef<any>(null)

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
                _key_id: `${index}_${new Date().getTime().toString()}`
            }))
    }, [props.visibleRows, highlight])

    const cleanInfoWindow = () => {
        infoWindowClusterRef?.current?.close()
        infoWindowClusterRef.current = null
    }

    const getMarkerChartImage = (
        items: any,
        showLegend: boolean,
        width?: number,
        height?: number
    ) => {
        return markerChartVis?.length > 0
            ? MarkerChart({
                  attributes,
                  attributesStats,
                  data: items,
                  chartType: markerChartVis[0].markerChartType as MarkerChartTypeProps,
                  chartAttributes: markerChartVis[0].markerChartAttributes,
                  showLegend,
                  width,
                  height
              })
            : null
    }

    clusterRef.current = new MarkerClusterer({
        map: props.map,
        markers: [],
        // algorithm: new GridAlgorithm({maxDistance: 40000}),
        algorithm: new SuperClusterAlgorithm({maxDistance: 40000}),
        // algorithm: new NoopAlgorithm({}),
        onClusterClick: function (event: any, cluster: any) {
            const rowsInCluster = getRowsInCluster(markersVisible, getMakerIds(cluster?.markers))

            cleanInfoWindow()

            infoWindowClusterRef.current = createInfoWindow(
                null,
                cluster.position,
                'Cluster',
                rowsInCluster.map((item: any, index: number) => {
                    return {...item, markerImageUrl: getMarkerChartImage([item], true)?.url}
                }),
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
                // change color if this cluster has more markers than the mean cluster
                const color = getMarkerClusterColor(cluster.count, markersVisible?.length)

                let resultMarkerChartCluster
                if (markerChartVis?.length > 0) {
                    const rowsInCluster = getRowsInCluster(
                        markersVisible,
                        getMakerIds(cluster?.markers)
                    )

                    resultMarkerChartCluster = getMarkerChartImage(rowsInCluster, false, 150, 150)
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

    useEffect(() => {
        const zoomChangedEventListener = google.maps.event.addListener(
            props.map,
            'zoom_changed',
            function () {
                console.log('zoom_changed')

                cleanInfoWindow()
            }
        )

        return () => {
            // console.log('marker list remove events')
            google.maps.event.removeListener(zoomChangedEventListener)

            cleanInfoWindow()
        }
    }, [markersVisible, clusterRef?.current])

    const getMarkers = useCallback(() => {
        clusterRef?.current?.clearMarkers()

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
                    cluster={clusterRef?.current}
                    enableMarkerCluster={markerClusterVis.length > 0}
                    // enableMarkerChart={markerChartVis.length > 0}
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
        clusterRef?.current,
        markerClusterVis,
        markerChartVis,
        highlight,
        attributes,
        attributesStats
    ])

    return getMarkers()
}

export default MarkerList
