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

    // new MarkerClusterer(props.map, props.markers, {
    //     imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    // });
    const createInstance = () => {
        // console.log("create instance")
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

//CLUSTERING VIS
//CHECK IF THE MARKERS IS INSIDE BOUNDS
//http://jsfiddle.net/glafarge/mbuLw/
//https://developers.google.com/maps/articles/toomanymarkers#gridbasedclustering
/*Map.prototype.addInfoWindow = function(map, marker){
	for (var i=0; i < markers.length; i++)
	{
	    if map.getBounds().contains(markers[i].getPosition())
	    {
	        // markers[i] in visible bounds
	    }
	    else
	    {
	        // markers[i] is not in visible bounds
	    }
	}
}*/
