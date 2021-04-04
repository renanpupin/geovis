import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAttributes, getVisibleRows} from "src/redux/data/selectors";
// import * as d3 from "d3"
// import {parcoords1, renderQueue1} from "src/libs/d3.parcoords"

export type Props = {
    visData: any
}

const ParallelCoordinates: React.FC<Props> = (props) => {
    const attributes = useSelector(getAttributes)
    const visibleRows = useSelector(getVisibleRows)

    const [id] = useState<string>("parallel-" + String(new Date().getTime()))

    const getNormalizedRows = () => {
        return visibleRows.map((row: any) => {
            return row.map((rowValue: any, rowValueIndex: number) => {
                return attributes[rowValueIndex].type === "boolean" ? String(rowValue) : rowValue
            })
        })
    }

    let parcoords: any

    useEffect(() => {

        //@ts-ignore
        const color1 = d3.scale.ordinal()
            .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
                "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
                "#cab2d6","#6a3d9a","#ffff99","#b15928"]);

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

        //@ts-ignore
        parcoords = d3.parcoords()(`#${id}`)
            .alpha(0.5)
            .mode("queue") // progressive rendering
            .height(300)
            .width(attributes.length * 100)
            // .margin({
            //     top: 36,
            //     left: 0,
            //     right: 0,
            //     bottom: 16
            // })
            .data(getNormalizedRows())
            // .hideAxis(["name"])
            .render()
            .reorderable()
            .brushMode("1D-axes")
            .shadows()
            .color(color1)
            // .color(color2)
            // .color(colorHeat)
        ;

        // const normalizedData = visibleRows.map((item: any, i: number) => ({ ...item, id: item.id ?? i }));

        parcoords.on("highlight", (data:any) => console.log("hightlight", data))
    }, [])

    useEffect(() => {
        // console.log("aaa", visibleRows, parcoords.data)

        if (parcoords) {
            parcoords
                //TOOD: need to clear data
                // .clear()
                .data(getNormalizedRows())
                .brushReset()
                .render()
        }
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
