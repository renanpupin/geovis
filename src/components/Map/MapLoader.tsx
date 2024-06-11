import React, {useEffect} from 'react'

import styles from './Map.module.css'

const mapNodeId = 'map'

const mapOptions = {
    center: {lat: 0, lng: 0},
    zoom: 2,
    streetViewControl: false,
    panControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapId: new Date().getTime().toString()
}

const MapLoader = (props: any) => {
    const {onLoad} = props
    const onScriptLoad = () => {
        //@ts-ignore
        onLoad(
            new window.google.maps.Map(
                document.getElementById(mapNodeId) as HTMLElement,
                mapOptions
            )
        )
    }

    useEffect(() => {
        //@ts-ignore
        if (!window.google) {
            let s = document.createElement('script')
            s.type = 'text/javascript'
            s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdwyQqepDLqf0quMCkBtuVZ6rOocccL9Q&libraries=visualization,marker`
            let x = document.getElementsByTagName('script')[0]
            //@ts-ignore
            x.parentNode.insertBefore(s, x)
            // Below is important.
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                onScriptLoad()
            })
        } else {
            onScriptLoad()
        }
    }, [])

    return (
        <div id={mapNodeId} className={styles.map}>
            {props.children}
        </div>
    )
}

export default MapLoader
