import React, {useEffect, useState} from 'react';
// import * as d3 from "d3"
// import {parcoords1, renderQueue1} from "src/libs/d3.parcoords"

export type Props = {
    //
}

const ParallelCoordinates: React.FC<Props> = (props) => {
    useEffect(() => {
        //@ts-ignore
        var parcoords = d3.parcoords()("#example")
            .alpha(0.1)
            .mode("queue") // progressive rendering
            //@ts-ignore
            .height(150)
            .margin({
                top: 36,
                left: 0,
                right: 0,
                bottom: 16
            });

        // load csv file and create the chart
        //@ts-ignore
        d3.csv('src/data/example.csv', function(data) {
            // slickgrid needs each data element to have an id
            //@ts-ignore
            data.forEach(function(d,i) { d.id = d.id || i; });

            parcoords
                .data(data)
                .hideAxis(["name"])
                .render()
                .reorderable()
                .brushMode("1D-axes");
        });
    }, [])
    return (
        <div id="example" className="parcoords" style={{width: 400, height: 150}}></div>
    );
}

export default ParallelCoordinates
