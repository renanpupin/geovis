export const createClusterSvg = (color: string, count: string) => {
    // create svg literal with fill color
    const svg = `
        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
            <circle cx="120" cy="120" opacity=".8" r="70" />
            <circle cx="120" cy="120" opacity=".3" r="90" />
            <circle cx="120" cy="120" opacity=".2" r="110" />
            <text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
        </svg>
    `

    // create cluster SVG element
    const parser = new DOMParser()
    const svgEl = parser.parseFromString(svg, 'image/svg+xml').documentElement
    svgEl.setAttribute('transform', 'translate(0 25)')

    return svgEl
}

export const createPin = (color: string, scale?: number) => {
    return new window.google.maps.marker.PinElement({
        scale: scale ?? 1,
        background: color,
        borderColor: color,
        glyphColor: '#777'
        // glyph: 'b'
    })
}

export const createMarkerChartHtmlElement = ({
    url,
    width,
    height,
    count,
    chartImage
}: {
    url: string
    width: number
    height: number
    count?: number
    chartImage?: string | null
}): HTMLDivElement => {
    const imageElement = document.createElement('img')
    imageElement.src = chartImage ?? url
    imageElement.style.width = `${width}px`
    imageElement.style.height = `${height}px`

    const wrapper = document.createElement('div')
    wrapper.style.transform = 'translateY(50%)'
    wrapper.append(imageElement)

    if (count !== null && count !== undefined) {
        const span = document.createElement('span')
        span.innerText = String(count)
        span.style.color = 'white'
        span.style.position = 'absolute'
        span.style.fontSize = '16px'
        span.style.top = '50%'
        span.style.left = '50%'
        span.style.textShadow = '#000 0px 1px 2px'
        span.style.transform = 'translate(-50%, -50%)'
        wrapper.append(span)
    }

    return wrapper
}

export const getMarkerContent = (icon: any, chartImage?: string | null) => {
    if (icon?.url) {
        return createMarkerChartHtmlElement({
            url: icon?.url,
            width: icon?.sizes?.width,
            height: icon?.sizes?.height,
            chartImage
        })
    }

    if (icon?.color) {
        return createPin(icon?.color)?.element
    }

    return null
}

export const createMarkerEmpty = (markerData: {
    id: string
    lat: any
    lng: any
    icon: any
    map?: any
    enableCollisionBehavior?: boolean
}) => {
    // https://maps.google.com/mapfiles/ms/icons/red-dot.png
    // http://maps.google.com/mapfiles/kml/paddle/red-blank.png
    // https://sites.google.com/site/gmapsdevelopment/
    // https://developers.google.com/maps/documentation/javascript/examples/icon-complex
    // https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#try-sample_2

    return new window.google.maps.marker.AdvancedMarkerElement({
        title: markerData.id,
        position: {lat: markerData.lat, lng: markerData.lng},
        content: getMarkerContent(markerData?.icon),
        collisionBehavior: markerData?.enableCollisionBehavior
            ? window.google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY
            : window.google.maps.CollisionBehavior.REQUIRED,
        // icon: getSymbolWithCustomColor("#ffa500"),
        map: markerData?.map ?? null
    })
}

export const createMarkerCircle = () => {
    return new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.02,
        // map,
        center: {lat: -22.2, lng: -51.4},
        radius: 50000
    })
    // google.maps.event.addListener(circle, 'click', function() {
    //     infoWindow.setContent(html);
    //     infoWindow.open(ItemMap.map, circle);
    // });
}

export const removeMarker = (marker: any, enableMarkerCluster: any, cluster: any) => {
    // console.log("removeMarker", marker, enableMarkerCluster, cluster)
    window.google.maps.event.clearInstanceListeners(marker)

    if (enableMarkerCluster) {
        cluster.removeMarker(marker)
    } else {
        marker.setMap(null)
    }
}

export const toggleMarker = (marker: any, map: any) => {
    marker.setMap(marker.getMap() ? null : map)
}
