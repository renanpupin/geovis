import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAttributes, getVisibleRows} from "src/redux/data/selectors";

export type Props = {
    visData: any
}

const ParallelCoordinates: React.FC<Props> = (props) => {
    const attributes = useSelector(getAttributes)
    const visibleRows = useSelector(getVisibleRows)

    const [id] = useState<string>("parallelChart")

    const getNormalizedRows = () => {
        return visibleRows.map((row: any, rowIndex: number) => {
            let attributesObject = {}

            for(const [rowValueIndex, rowValue] of row.entries()){
                // @ts-ignore
                attributesObject[attributes[rowValueIndex].name] = attributes[rowValueIndex].type === "boolean" ? String(rowValue) : rowValue;
            }

            return {
                ...attributesObject,
                id: rowIndex
            }
        });
    }

    //@ts-ignore
    const color1 = d3.scale.ordinal()
        .range([
            "#a6cee3","#1f78b4","#b2df8a","#33a02c",
            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
            "#cab2d6","#6a3d9a","#ffff99","#b15928"
        ]);

    //@ts-ignore
    const color2 = d3.scale.linear()
        .domain([9, 50])
        .range(["steelblue", "brown"])
        //@ts-ignore
        .interpolate(d3.interpolateLab);

    const colorHeat = function(row: any) {
        if (row.x <= 33){
            return "red"
        }else if (row.x <= 66){
            return "yellow"
        }else{
            return "green"
        }
    }

    useEffect(() => {
        // @ts-ignore
        document.getElementById(id).innerHTML = "";

        //@ts-ignore
        d3.parcoords()(`#${id}`)
            .alpha(0.5)
            .mode("queue") // progressive rendering
            .height(300)
            .data(getNormalizedRows())
            .width(attributes.length * 100)
            .hideAxis(["name"])
            .render()
            .brushMode("1D-axes")
            // .updateAxes()
            // .render()
            .reorderable()
            .shadows()
            .color(color1)
            // .brushReset()

        // parcoords.on("highlight", (data:any) => console.log("hightlight", data))
    }, [visibleRows])


    return (
        <div
            id={id}
            onMouseDown={(e: any) => e.stopPropagation()}
            className="parcoords"
            style={{border: "1px solid #e1e1e1", width: (attributes.length * 100) + 2, height: 300, margin: 15}}
        />
    );
}

export default ParallelCoordinates
