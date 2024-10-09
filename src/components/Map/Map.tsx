import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MapLoader from 'src/components/Map/MapLoader'
import Heatmap from 'src/components/Map/Heatmap/Heatmap'
import MarkerList from 'src/components/Map/MarkerList'
import {
    getBounds,
    getHighlight,
    getLatAttributeIndex,
    getLonAttributeIndex,
    getOverlays,
    getVisibleRows,
    getVisualizations
} from 'src/redux/data/selectors'
import {VisualizationTypeValues} from 'src/redux/data/types'
import {addOverlay, removeOverlay, setBounds} from '../../redux/data/actions'

const Map: React.FC = () => {
    const dispatch = useDispatch()
    const latAttributeIndex = useSelector(getLatAttributeIndex)
    const lonAttributeIndex = useSelector(getLonAttributeIndex)
    const visibleRows = useSelector(getVisibleRows)
    const visualizations = useSelector(getVisualizations)
    const highlight = useSelector(getHighlight)
    const bounds = useSelector(getBounds)
    const overlays = useSelector(getOverlays)
    const [map, setMap] = useState<any | undefined>(undefined)
    const [finishCalculateBounds, setFinishCalculateBounds] = useState<boolean>(false)
    const [drawingManager, setDrawingManager] = useState<any>()

    const onLoad = (map: any) => {
        setMap(map)
    }

    useEffect(() => {
        let overlayCompleteEventListener: any = null
        let overlayClickEventListener: any = null
        let overlayRightClickEventListener: any = null
        if (map) {
            const dmanager = new window.google.maps.drawing.DrawingManager({
                // drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    position: window.google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        // window.google.maps.drawing.OverlayType.MARKER,
                        window.google.maps.drawing.OverlayType.CIRCLE,
                        window.google.maps.drawing.OverlayType.POLYGON,
                        // window.google.maps.drawing.OverlayType.POLYLINE,
                        window.google.maps.drawing.OverlayType.RECTANGLE
                    ]
                }
                // circleOptions: {
                //     fillColor: '#ffff00',
                //     fillOpacity: 1,
                //     strokeWeight: 5,
                //     clickable: false,
                //     editable: true,
                //     zIndex: 1
                // }
            })
            setDrawingManager(dmanager)
            dmanager.setMap(map)

            overlayCompleteEventListener = google.maps.event.addListener(
                dmanager,
                'overlaycomplete',
                function (event: any) {
                    const mapRefId = new Date().getTime().toString()
                    dispatch(
                        addOverlay({
                            mapRefId,
                            type: event.type,
                            reference: event.overlay
                        })
                    )

                    overlayClickEventListener = window.google.maps.event.addListener(
                        event.overlay,
                        'click',
                        function (eventClick: any) {
                            console.log('event click', eventClick, mapRefId)
                            dispatch(removeOverlay(mapRefId))
                            event.overlay.setMap(null)
                        }
                    )
                    overlayRightClickEventListener = window.google.maps.event.addListener(
                        event.overlay,
                        'rightclick',
                        function (eventClick: any) {
                            console.log('event rightclick', eventClick, mapRefId)
                            dispatch(removeOverlay(mapRefId))
                            event.overlay.setMap(null)
                        }
                    )
                }
            )
        }
        return () => {
            drawingManager?.setMap(null)
            google.maps.event.removeListener(overlayCompleteEventListener)
            google.maps.event.removeListener(overlayClickEventListener)
            google.maps.event.removeListener(overlayRightClickEventListener)
        }
    }, [!!map])

    useEffect(() => {
        for (const overlay of overlays) {
            if (overlay.visible) {
                overlay.reference.setMap(map)
            } else {
                overlay.reference.setMap(null)
            }
        }
        // console.log('overlays changed', overlays)
    }, [overlays])

    const isSameBounds = (newBounds: any) =>
        newBounds?.getNorthEast()?.lat() === bounds?.getNorthEast()?.lat() &&
        newBounds?.getNorthEast()?.lng() === bounds?.getNorthEast()?.lng() &&
        newBounds?.getSouthWest()?.lat() === bounds?.getSouthWest()?.lat() &&
        newBounds?.getSouthWest()?.lng() === bounds?.getSouthWest()?.lng()

    useEffect(() => {
        // Fired when the map becomes idle after panning or zooming.
        let idleEventListener: any
        let boundsChangedEventListener: any
        let timer: any

        if (map) {
            idleEventListener = google.maps.event.addListener(map, 'idle', function () {
                // console.log('idle')

                clearTimeout(timer)
                const newBounds = map?.getBounds()
                if (!isSameBounds(newBounds)) {
                    dispatch(setBounds(newBounds))
                }
            })

            boundsChangedEventListener = google.maps.event.addListener(
                map,
                'bounds_changed',
                function () {
                    // console.log('bounds_changed')

                    clearTimeout(timer)

                    timer = setTimeout(() => {
                        const newBounds = map?.getBounds()

                        if (!isSameBounds(newBounds)) {
                            dispatch(setBounds(newBounds))
                        }
                    }, 1500)
                }
            )
        }

        return () => {
            google.maps.event.removeListener(idleEventListener)
            google.maps.event.removeListener(boundsChangedEventListener)
            clearTimeout(timer)
        }
    }, [!!map])

    useEffect(() => {
        if (map && visibleRows?.length > 0) {
            console.log('=> calculate bounds')

            let bounds = new google.maps.LatLngBounds()
            visibleRows.map((row: any) =>
                bounds.extend(
                    new google.maps.LatLng(
                        row[latAttributeIndex] as number,
                        row[lonAttributeIndex] as number
                    )
                )
            )
            // @ts-ignore
            map.fitBounds(bounds)

            setFinishCalculateBounds(true)
        }
    }, [visibleRows, !!map])

    const getHeatmap = useCallback(() => {
        if (!map) {
            return null
        }
        const hideHeatmap =
            visualizations.filter(visualization => {
                return (
                    visualization.visible && visualization.type === VisualizationTypeValues.Heatmap
                )
            }).length === 0

        if (hideHeatmap) {
            return null
        }

        //TODO: maybe refactor heatmap and move inside markers (inside cluster to use marker.getLocation())
        return (
            <Heatmap
                map={map}
                data={visibleRows
                    .filter(
                        (_: any, index: number) =>
                            highlight.length === 0 || highlight.includes(index as any)
                    )
                    .map((row: any) => ({
                        lat: row[latAttributeIndex],
                        lng: row[lonAttributeIndex]
                    }))}
            />
        )
    }, [visualizations, visibleRows, map, highlight])

    const getMarkers = useCallback(() => {
        if (!map) {
            return
        }
        console.debug('=> Map render MarkerList')

        return <MarkerList visibleRows={visibleRows} map={map} />
    }, [visibleRows, !!map])

    return (
        <MapLoader onLoad={onLoad}>
            {finishCalculateBounds ? getMarkers() : null}
            {getHeatmap()}
        </MapLoader>
    )
}

export default Map

// Fired when the map becomes idle after panning or zooming.
// google.maps.event.addListener(map, 'idle', function() {
//     var bounds = map.getBounds();
//     for (var i = 0; i < markers.length; i++) {
//         bounds.contains(marker.getPosition())
//     }
// });
