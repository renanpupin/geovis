import {OverlayTypes} from 'src/redux/data/types'

export const applyOverlays = (
    data: object[],
    overlays: OverlayTypes[],
    latAttributeIndex: number,
    lonAttributeIndex: number
) => {
    return data.filter((dataItem: any) => {
        const visibleOverlays = overlays.filter((overlay: any) => overlay.visible)
        if (visibleOverlays?.length === 0) {
            return true
        }

        const location = new window.google.maps.LatLng(
            dataItem[latAttributeIndex],
            dataItem[lonAttributeIndex]
        )
        for (const overlay of visibleOverlays) {
            if (overlay?.type === 'circle' || overlay?.type === 'rectangle') {
                const isVisible = overlay?.reference?.getBounds()?.contains(location)
                // console.log('overlay isVisible', overlay)
                if (isVisible) {
                    return true
                }
            } else if (overlay?.type === 'polygon') {
                const isVisible = window.google.maps.geometry.poly.containsLocation(
                    location,
                    overlay?.reference
                )
                if (isVisible) {
                    return true
                }
            } else {
                console.warn('overlay not filtered', overlay?.type)
            }
        }

        return false
    })
}
