import React, {useEffect, useState, useCallback, useMemo, FC} from 'react'
// import MarkerClusterer from '@googlemaps/markerclustererplus'
import {MarkerClusterer} from '@googlemaps/markerclusterer'
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
import {getSymbolWithCustomColor} from './markerUtils'
import {removeDuplicatesFromStringArray} from '../../utils/array'
import {colorScale, colorScaleHeatmap, generateRandomColors} from '../../libs/colors'
import {Cluster} from '@googlemaps/markerclusterer/dist/cluster'
import {ClusterStats} from '@googlemaps/markerclusterer/dist/renderer'

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
    const [clusterInfoWindow, setClusterInfoWindow] = useState<any>(null)

    const markerClusterVis = visualizations.filter(
        visualization =>
            visualization.visible && visualization.type === VisualizationTypeValues.MarkerCluster
    )
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

    const [cluster] = useState<MarkerClusterer>(
        new MarkerClusterer({
            map: props.map,
            markers: [],
            onClusterClick: function (event: any, cluster: any) {
                console.log('onClusterClick', {
                    event,
                    cluster,
                    markers: cluster.markers,
                    marker: cluster.markers[0]?.title
                })
                //prevent cluster to zoom in on click
                event.domEvent.preventDefault()
                // event.stopPropagation()

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

                clusterInfoWindow?.close()
                setClusterInfoWindow(
                    createInfoWindow(
                        null,
                        cluster.position,
                        'Cluster',
                        rowsInCluster,
                        props.map,
                        attributes,
                        true,
                        () => {
                            setClusterInfoWindow(null)
                        }
                    )
                )
            },
            renderer: {
                render(cluster: Cluster, stats: ClusterStats, map: google.maps.Map) {
                    // console.log('aaa', cluster, stats)

                    const clusterMarkersCount = cluster.count

                    //cluster color strategy 1
                    // let dv = count;
                    // while (dv !== 0) {
                    //     dv = Math.floor(dv / 10);
                    //     index++;
                    // }
                    // index = Math.min(index, numStyles);

                    const getMarkerClusterColor = () => {
                        //cluster color strategy 2 (heatmap with 5 levels)
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

                    // create svg literal with fill color
                    const svg = `
                        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
                            <circle cx="120" cy="120" opacity=".8" r="70" />
                            <circle cx="120" cy="120" opacity=".3" r="90" />
                            <circle cx="120" cy="120" opacity=".2" r="110" />
                            <text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${cluster.count}</text>
                        </svg>
                    `

                    // create cluster SVG element
                    const parser = new DOMParser()
                    const svgEl = parser.parseFromString(svg, 'image/svg+xml').documentElement
                    svgEl.setAttribute('transform', 'translate(0 25)')

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

                    const pin = new window.google.maps.marker.PinElement({
                        scale: 1,
                        background: 'blue',
                        borderColor: 'red',
                        glyphColor: 'green'
                        // glyph: 'b'
                    })

                    let clusterDiv
                    if (resultMarkerChartCluster) {
                        const imageUrl = document.createElement('img')
                        //@ts-ignore
                        imageUrl.src = resultMarkerChartCluster?.url
                        imageUrl.style.width = `${resultMarkerChartCluster?.sizes?.width}px`
                        imageUrl.style.height = `${resultMarkerChartCluster?.sizes?.height}px`
                        // clusterDiv.style.display = 'flex'
                        const span = document.createElement('span')
                        span.innerText = String(cluster.count)
                        span.style.color = 'white'
                        span.style.position = 'absolute'
                        span.style.fontSize = '16px'
                        span.style.top = '50%'
                        span.style.left = '50%'
                        span.style.textShadow = '#000 0px 1px 2px'
                        span.style.transform = 'translate(-50%, -50%)'
                        span.className = 'cluster-inner-text'
                        // span.style.textShadow = 'text-shadow: "5px 5px 5px black"'
                        clusterDiv = document.createElement('div')
                        clusterDiv.appendChild(imageUrl)
                        clusterDiv.appendChild(span)
                    }

                    return new window.google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: cluster.position,
                        // adjust zIndex to be above other markers
                        zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + cluster.count,
                        title: `Cluster of ${cluster.count} markers`,
                        // markerClusterVis?.[0]?.showChart === 'yes' && resultMarkerChartCluster
                        //@ts-ignore
                        content:
                            markerChartVis?.length > 0 && markerClusterVis?.[0]?.showChart === 'yes'
                                ? clusterDiv
                                : svgEl
                    })
                }
            }
        })
    )

    // cluster.setCalculator((clusterMarkers, numStyles) => {
    //     let index = 0
    //     const clusterMarkersCount = clusterMarkers.length
    //
    //     //cluster color strategy 1
    //     // let dv = count;
    //     // while (dv !== 0) {
    //     //     dv = Math.floor(dv / 10);
    //     //     index++;
    //     // }
    //     // index = Math.min(index, numStyles);
    //
    //     //cluster color strategy 2 (heatmap with 5 levels)
    //     if (clusterMarkersCount / markersVisible.length > 0.8) {
    //         index = 5
    //     } else if (clusterMarkersCount / markersVisible.length > 0.6) {
    //         index = 4
    //     } else if (clusterMarkersCount / markersVisible.length > 0.4) {
    //         index = 3
    //     } else if (clusterMarkersCount / markersVisible.length > 0.2) {
    //         index = 2
    //     } else {
    //         index = 1
    //     }
    //
    //     // const iconUrl = `https://chart.googleapis.com/chart?chs=150x150&chd=t:${clusterMarkersCount},${markersVisible.length-clusterMarkersCount}&cht=p3&chf=bg,s,FFFFFF00`
    //     const ids = clusterMarkers.map((item: any) => Number(item.title))
    //     const rowsInCluster = markersVisible.filter((item: any, index: number) =>
    //         ids.includes(index)
    //     )
    //     //TODO: enable cluster on visible
    //     // const iconUrl = MarkerChart({data: row, type: "pie"}).url
    //
    //     // console.log("index", index)
    //     // console.log("numStyles", numStyles)
    //     // console.log("rowsInCluster", rowsInCluster)
    //     // console.log("iconUrl", iconUrl)
    //     // console.log("count", count)
    //     // console.log("markersVisible", markersVisible.length)
    //     // console.log("clusterMarkers", clusterMarkers)
    //
    //     let resultMarkerChartCluster
    //     if (markerChartVis?.length > 0) {
    //         resultMarkerChartCluster = MarkerChart({
    //             attributes,
    //             attributesStats,
    //             data: rowsInCluster,
    //             chartType: markerChartVis[0].markerChartType as MarkerChartTypeProps,
    //             chartAttributes: markerChartVis[0].markerChartAttributes,
    //             width: 150,
    //             height: 150
    //         })
    //         // console.log("resultMarkerChartCluster", resultMarkerChartCluster)
    //     }
    //
    //     return {
    //         text: clusterMarkersCount.toString(),
    //         // url: markerClusterVis?.[0]?.showChart === 'yes' ? iconUrl : undefined,
    //         url:
    //             markerClusterVis?.[0]?.showChart === 'yes' && resultMarkerChartCluster
    //                 ? resultMarkerChartCluster.url
    //                 : undefined,
    //         index,
    //         title: ''
    //     }
    // })

    useEffect(() => {
        const zoomChangedEventListener = google.maps.event.addListener(
            props.map,
            'zoom_changed',
            function () {
                clusterInfoWindow?.close()
                setClusterInfoWindow(null)
            }
        )

        return () => {
            // console.log('marker list remove events')
            // google.maps.event.removeListener(clusterClickEventListener)
            google.maps.event.removeListener(zoomChangedEventListener)
            clusterInfoWindow?.close()
            // cluster.clearMarkers();
            // cluster.setMap(null);
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
                // console.log('color', color)

                return {color}
                // return getSymbolWithCustomColor(color)
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
