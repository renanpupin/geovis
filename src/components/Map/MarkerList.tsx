import React, {useEffect, useState, useCallback, FC} from 'react';
import MarkerClusterer from "@googlemaps/markerclustererplus";
import Marker from "src/components/Map/Marker";
import {useSelector} from "react-redux";
import {
    getLatAttributeIndex,
    getLonAttributeIndex,
    getAttributes,
    getAttributesStats,
    getHighlight,
    getVisibleRows,
    getVisualizations
} from "src/redux/data/selectors";
import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";
import MarkerChart from "src/components/Map/MarkerChart/MarkerChart";
import {VisualizationTypeValues, MarkerChartTypeProps} from "../../redux/data/types";

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

const MarkerList:FC<MarkerListProps> = (props) => {
    const visualizations = useSelector(getVisualizations)
    const latAttributeIndex = useSelector(getLatAttributeIndex)
    const lonAttributeIndex = useSelector(getLonAttributeIndex)
    const attributes = useSelector(getAttributes)
    const attributesStats = useSelector(getAttributesStats)
    const highlight = useSelector(getHighlight)

    const markerClusterVis = visualizations.filter(visualization => visualization.visible && visualization.type === VisualizationTypeValues.MarkerCluster);
    const markerChartVis = visualizations.filter(visualization => visualization.visible && visualization.type === VisualizationTypeValues.MarkerChart);

    const [cluster] = useState<MarkerClusterer>(new MarkerClusterer(props.map, [], {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        averageCenter: true,
        ignoreHidden: true,
        zoomOnClick: false,
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
    cluster.setCalculator((clusterMarkers, numStyles) => {
        let index = 0;
        const count = clusterMarkers.length;

        let dv = count;
        while (dv !== 0) {
            dv = Math.floor(dv / 10);
            index++;
        }

        const iconUrl = `https://chart.googleapis.com/chart?chs=150x150&chd=t:${count},${props.visibleRows.length-count}&cht=p3&chf=bg,s,FFFFFF00`
        const ids = clusterMarkers.map((item: any) => Number(item.title));
        const rowsInCluster = props.visibleRows.filter((item: any, index: number) => ids.includes(index));
        //TODO: enable cluster on visible
        // const iconUrl = MarkerChart({data: row, type: "pie"}).url

        // console.log("rowsInCluster", rowsInCluster)
        // console.log("iconUrl", iconUrl)
        // console.log("count", count)
        // console.log("visibleRows", props.visibleRows.length)
        // console.log("clusterMarkers", clusterMarkers)

        index = Math.min(index, numStyles);
        return {
            text: count.toString(),
            url: markerClusterVis?.[0]?.showPie === 'yes' ? iconUrl : undefined,
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
        let infoWindow: any;

        const clusterClickEventListener = google.maps.event.addListener(cluster, 'clusterclick', function (cluster) {
            const gmapMarkers = cluster.getMarkers();
            // console.log("markers", gmapMarkers);
            // console.log("cluster", cluster);

            const ids = gmapMarkers.map((item: any) => Number(item.title));
            const rowsInCluster = props.visibleRows.filter((item: any, index: number) => ids.includes(index));

            // console.log("cluster ids", ids);
            // console.log("cluster rowsInCluster", rowsInCluster);
            // console.log("cluster props.visibleRows", props.visibleRows);

            infoWindow?.close();
            // if(!infoWindow){
                infoWindow = createInfoWindow(null, cluster.getCenter(), 'Cluster', rowsInCluster, props.map, attributes, true, () => {
                    infoWindow = null;
                })
            // }
        });
        //
        const zoomChangedEventListener = google.maps.event.addListener(props.map, 'zoom_changed', function () {
            infoWindow?.close();
            infoWindow = null;
        });

        return () => {
            // console.log('marker list remove events')
            google.maps.event.removeListener(clusterClickEventListener);
            google.maps.event.removeListener(zoomChangedEventListener);
            infoWindow?.close();
            // cluster.clearMarkers();
            // cluster.setMap(null);
        };
    }, [props.visibleRows]);

    const getMarkers = useCallback(() => {
        return props.visibleRows
            .filter((row: any, index: number) => highlight.length === 0 || highlight.includes(index as any))
            .map((row: any, index: number) => {
                return (
                    <Marker
                        key={index}
                        id={String(index)}
                        // highlight={highlight.length === 0 || highlight.includes(index as any)}
                        lat={row[latAttributeIndex]}
                        lon={row[lonAttributeIndex]}
                        row={row}
                        attributes={attributes}
                        map={props.map}
                        cluster={cluster}
                        enableMarkerCluster={markerClusterVis.length > 0}
                        // enableMarkerChart={markerChartVis.length > 0}
                        // icon={MarkerChart({data: row, type: "pie"})}
                        icon={
                            markerChartVis?.length > 0 ? (
                                MarkerChart({
                                    attributes,
                                    attributesStats,
                                    data: row,
                                    chartType: markerChartVis[0].markerChartType as MarkerChartTypeProps,
                                    chartAttributes: markerChartVis[0].markerChartAttributes,
                                })
                            ) : null
                        }
                    />
                )
            });
    }, [props, props.visibleRows, props.map, cluster, markerClusterVis, markerChartVis, highlight]);

    return getMarkers()
}

export default MarkerList;
