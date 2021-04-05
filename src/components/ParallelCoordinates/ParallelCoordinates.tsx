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
    const colorSequenceGroups = d3.scale.ordinal()
        .range([
            "#a6cee3","#1f78b4","#b2df8a","#33a02c",
            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
            "#cab2d6","#6a3d9a","#ffff99","#b15928"
        ]);
    let color1 = (d: any) => { return colorSequenceGroups(d.group); };


    //@ts-ignore
    const colorSequenceInterpolated = d3.scale.linear()
        .domain([0, 5])
        .range(["#1f78b4", "#fdbf6f", "#ff7f00", "#6a3d9a", "#e31a1c"])
        //@ts-ignore
        .interpolate(d3.interpolateLab);
    let color2 = (d: any) =>  { return colorSequenceInterpolated(d.id); };  // quantitative color scale

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
            // .hideAxis(["name"])
            // .color(color2)
            .render()
            .brushMode("1D-axes")
            .reorderable()
            .shadows()
            // .on("brush", (data:any) => console.log("[EVENT] brush data", data))
    }, [visibleRows])


    return (
        <div
            style={{border: "1px solid #e1e1e1", overflow: "hidden", margin: 15}}
        >
            <div
                id={id}
                onMouseDown={(e: any) => e.stopPropagation()}
                className="parcoords"
                style={{width: (attributes.length * 100) + 2, height: 300}}
            />
        </div>
    );
}

export default ParallelCoordinates
