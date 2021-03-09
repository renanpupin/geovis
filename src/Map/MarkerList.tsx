import React, {useEffect, useState, useCallback, useMemo} from 'react';
import Marker from "src/Map/Marker";
import Img from "src/assets/img/logo.png";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import {createInfoWindow} from "src/Map/InfoWindow/infoWindowUtils";

const styleCluster = [
    MarkerClusterer.withDefaultStyle({
        // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        url: Img,
        width: 100,
        height: 128,
        anchorIcon: [64, 50],
        textColor: "red",
        textSize: 10,
    }),
    MarkerClusterer.withDefaultStyle({
        // url: "src/assets/img/logo.png",
        // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        url: Img,
        width: 40,
        height: 35,
        anchorIcon: [35, 20],
        textColor: "blue",
        textSize: 11,
    }),
    MarkerClusterer.withDefaultStyle({
        // url: "src/assets/img/logo.png",
        // url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        url: Img,
        width: 50,
        height: 44,
        anchorIcon: [44, 25],
        textColor: "green",
        textSize: 12,
    }),
];

const MarkerList = (props: any) => {
    const [cluster] = useState(new MarkerClusterer(props.map, [], {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        averageCenter: true,
        ignoreHidden: true,
        // gridSize: 2,
        // title: 'dasssasdas',
        // calculator: ''
        // minimumClusterSize: 3,
        // styles: styleCluster,
    }))

    //custom image (index.esm.js at ClusterIcon.prototype.getImageElementHtml)
    // const url = "https://chart.googleapis.com/chart?chs="+this.style.width+"x"+this.style.height+"&chd=t:120,80&cht=p3&chf=bg,s,FFFFFF00"
    // return "<img alt=\"" + this.sums_.text + "\" aria-hidden=\"true\" src=\"" + url + "\" style=\"" + cssText + "\"/>";

    // console.log("aaa", cluster.getCalculator())
    cluster.setCalculator((markers, numStyles) => {
        let index = 0;
        const count: number = markers.length;

        let dv = count;
        while (dv !== 0) {
            dv = Math.floor(dv / 10);
            index++;
        }

        index = Math.min(index, numStyles);
        return {
            text: count.toString(),
            index: index,
            title: "",
        };
    });

    // cluster.setCalculator((markers, numStyles= 3): any => {
    //     //create an index for icon styles
    //     let index = 0,
    //         //Count the total number of markers in this cluster
    //         count = markers.length,
    //         //Set total to loop through (starts at total number)
    //         total = count;
    //
    //     /**
    //      * While we still have markers, divide by a set number and
    //      * increase the index. Cluster moves up to a new style.
    //      *
    //      * The bigger the index, the more markers the cluster contains,
    //      * so the bigger the cluster.
    //      */
    //     while (total !== 0) {
    //         //Create a new total by dividing by a set number
    //         //@ts-ignore
    //         total = parseInt(total / 5, 10);
    //         //Increase the index and move up to the next style
    //         index++;
    //     }
    //
    //     /**
    //      * Make sure we always return a valid index. E.g. If we only have
    //      * 5 styles, but the index is 8, this will make sure we return
    //      * 5. Returning an index of 8 wouldn't have a marker style.
    //      */
    //     index = Math.min(index, numStyles);
    //
    //     //Tell MarkerCluster this clusters details (and how to style it)
    //     return {
    //         // text: ('<div id="something">' + count + ' ('+ index + ')<img src="https://chart.googleapis.com/chart?cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World"/></div>'),
    //         // text: '<img src="https://chart.googleapis.com/chart?cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World"/>',
    //         // text: '<img src="'+Img+'"/>',
    //         text: 'aaa',
    //         index: index,
    //         title: undefined
    //     };
    // });

    useEffect(() => {
        let infowindow: any;
        const clusterClickEventListener = google.maps.event.addListener(cluster, 'clusterclick', function (cluster) {
            let markers = cluster.getMarkers();
            console.log("markers", markers);

            infowindow = new window.google.maps.InfoWindow();
            infowindow.setPosition(cluster.getCenter());
            infowindow.setContent("adsdad");
            infowindow.open(props.map);
        });

        const zoomChangedEventListener = google.maps.event.addListener(props.map, 'zoom_changed', function () {
            // infowindow?.close();
        });

        return () => {
            google.maps.event.removeListener(clusterClickEventListener);
            google.maps.event.removeListener(zoomChangedEventListener);
            infowindow?.close();
            cluster.clearMarkers();
            cluster.setMap(null);
        };
    }, []);

    const getMarkers = useCallback(() => {
        return props.data.map((data: any) => {
            return (
                <Marker
                    key={data.id}
                    data={data}
                    map={props.map}
                    cluster={cluster}
                    enableMarkerCluster={props.enableMarkerCluster}
                />
            )
        })
    }, [props.data, props.map, cluster, props.enableMarkerCluster]);

    return getMarkers()
}

export default MarkerList;