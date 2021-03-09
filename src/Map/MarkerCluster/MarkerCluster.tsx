// const markers = props.data.map((location:any) => {
//     return new google.maps.Marker({
//         position: location,
//         label: "index-"+new Date().getTime(),
//     });
// });

import React, {useEffect} from 'react';
import MarkerClusterer from "@googlemaps/markerclustererplus";

const MarkerCluster = (props: any) => {
    let mapCluster: any;

    new MarkerClusterer(props.map, props.markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    const createInstance = () => {
        console.log("create instance")
        return new MarkerClusterer(props.map, props.markers, {
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        });
    }

    useEffect(() => {
        return () => {
            if(mapCluster){
                mapCluster.clearMarkers();
                // mapCluster.removeMarker()
                mapCluster.setMap(null);
            }
        };
    }, []);

    useEffect(() => {
        if(mapCluster) {
            mapCluster.clearMarkers();
        }

        mapCluster = createInstance();
    }, [props.markers]);

    return null;
}

export default MarkerCluster;
