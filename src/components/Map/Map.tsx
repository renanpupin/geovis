import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MapLoader from 'src/components/Map/MapLoader'
import Heatmap from 'src/components/Map/Heatmap/Heatmap'
import MarkerList from 'src/components/Map/MarkerList'
import {
    getBounds,
    getHighlight,
    getLatAttributeIndex,
    getLonAttributeIndex,
    getVisibleRows,
    getVisualizations
} from 'src/redux/data/selectors'
import {VisualizationTypeValues} from 'src/redux/data/types'
import {setBounds, setHighlight} from '../../redux/data/actions'

const Map: React.FC = () => {
    const dispatch = useDispatch()
    const latAttributeIndex = useSelector(getLatAttributeIndex)
    const lonAttributeIndex = useSelector(getLonAttributeIndex)
    const visibleRows = useSelector(getVisibleRows)
    const visualizations = useSelector(getVisualizations)
    const highlight = useSelector(getHighlight)
    const bounds = useSelector(getBounds)
    const [map, setMap] = useState<any | undefined>(undefined)

    const onLoad = (map: any) => {
        setMap(map)
    }

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
    }, [map])

    useEffect(() => {
        if (map && visibleRows?.length > 0) {
            let bounds = new google.maps.LatLngBounds()
            visibleRows.map((row: any) =>
                bounds.extend(
                    new google.maps.LatLng(row[latAttributeIndex], row[lonAttributeIndex])
                )
            )
            // @ts-ignore
            map.fitBounds(bounds)
        }
    }, [visibleRows, map])

    const getHeatmap = useCallback(() => {
        if (!map) {
            return null
        }
        const hideHeatmap =
            visualizations.filter(visualization => {
                // console.log("visualization", visualization)
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

        return <MarkerList visibleRows={visibleRows} map={map} />
    }, [visibleRows, map])

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
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
