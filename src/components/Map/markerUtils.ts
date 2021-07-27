import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";

export const createMarkerEmpty = (markerData: any) => {
    // console.log('markericon', markerData.icon);
    // https://maps.google.com/mapfiles/ms/icons/red-dot.png
    // http://maps.google.com/mapfiles/kml/paddle/red-blank.png
    // https://sites.google.com/site/gmapsdevelopment/

    function getSymbolWithCustomColor(color: any) {
        return {
            path: "M27.648 -41.399q0 -3.816 -2.7 -6.516t-6.516 -2.7 -6.516 2.7 -2.7 6.516 2.7 6.516 6.516 2.7 6.516 -2.7 2.7 -6.516zm9.216 0q0 3.924 -1.188 6.444l-13.104 27.864q-0.576 1.188 -1.71 1.872t-2.43 0.684 -2.43 -0.684 -1.674 -1.872l-13.14 -27.864q-1.188 -2.52 -1.188 -6.444 0 -7.632 5.4 -13.032t13.032 -5.4 13.032 5.4 5.4 13.032z",
            scale: 0.7,
            strokeWeight: 0.3,
            strokeColor: '#000',
            strokeOpacity: 1,
            fillColor: color,
            fillOpacity: 0.9,
        }
    }

    return new window.google.maps.Marker({
        title: markerData.id,
        position: {lat: markerData.lat, lng: markerData.lng},
        icon: markerData.icon,
        // icon: getSymbolWithCustomColor("#ffa500"),
        // label: 'X',
        optimized: true
        // map: map,
    });
}

export const createMarkerCircle = () => {
    return new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: "#ff0000",
        fillOpacity: 0.02,
        // map,
        center: { lat: -22.2, lng: -51.4 },
        radius: 50000,
    });
    // google.maps.event.addListener(circle, 'click', function() {
    //     infoWindow.setContent(html);
    //     infoWindow.open(ItemMap.map, circle);
    // });
}

export const removeMarker = (marker: any, enableMarkerCluster: any, cluster: any) => {
    // console.log("removeMarker", marker, enableMarkerCluster, cluster)
    window.google.maps.event.clearInstanceListeners(marker);
    if(enableMarkerCluster){
        cluster.removeMarker(marker)
    }else{
        marker.setMap(null)
    }
}

export const toggleMarker = (marker: any, map: any) => {
    marker.setMap(marker.getMap() ? null : map)
}
