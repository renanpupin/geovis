import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAttributes, getVisibleRows} from 'src/redux/data/selectors'
import styles from '../Chart/Chart.module.scss'
import Draggable from '../Draggable/Draggable'
import {setHighlight} from '../../redux/data/actions'

export type ParallelCoordinatesProps = {
    visMode: 'split' | 'full'
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = props => {
    const {visMode} = props
    const attributes = useSelector(getAttributes)
    const visibleRows = useSelector(getVisibleRows)
    const [brushData, setBrushData] = useState([])
    const dispatch = useDispatch()

    const [id] = useState<string>('parallelChart')

    const getNormalizedRows = () => {
        return visibleRows.map((row: any, rowIndex: number) => {
            let attributesObject = {}

            for (const [rowValueIndex, rowValue] of row.entries()) {
                // @ts-ignore
                attributesObject[attributes[rowValueIndex].name] =
                    attributes[rowValueIndex].type === 'boolean' ? String(rowValue) : rowValue
            }

            return {
                ...attributesObject,
                id: rowIndex
            }
        })
    }

    //@ts-ignore
    // const colorSequenceGroups = d3.scale.ordinal().range(colorScaleRandom)
    // let color1 = (d: any) => {
    //     return colorSequenceGroups(d.group)
    // }

    //@ts-ignore
    // const colorSequenceInterpolated = d3.scale
    //     .linear()
    //     .domain([0, 5])
    //     .range(['#1f78b4', '#fdbf6f', '#ff7f00', '#6a3d9a', '#e31a1c'])
    //     //@ts-ignore
    //     .interpolate(d3.interpolateLab)
    // let color2 = (d: any) => {
    //     return colorSequenceInterpolated(d.id)
    // } // quantitative color scale

    //TODO: move to utils and share usage with marker chart
    // const colorHeat = function (row: any) {
    //     if (row.x <= 33) {
    //         return 'red'
    //     } else if (row.x <= 66) {
    //         return 'yellow'
    //     } else {
    //         return 'green'
    //     }
    // }

    const errorTimeoutRef = useRef<NodeJS.Timeout>()

    const axisWidth = 100

    useEffect(() => {
        errorTimeoutRef.current = setTimeout(() => {
            const visibleIndexes = brushData.map((row: any) => row.id)

            const highlightIndexes = visibleRows
                .map((row: any, index: number) => {
                    return visibleIndexes.includes(index) ? index : null
                })
                .filter((item: any) => item !== null)

            dispatch(setHighlight(highlightIndexes as number[]))
        }, 1000)

        //@ts-ignore
        return () => clearTimeout(errorTimeoutRef?.current)
    }, [brushData])

    useEffect(() => {
        // @ts-ignore
        document.getElementById(id).innerHTML = ''

        //@ts-ignore
        d3.parcoords()(`#${id}`)
            .alpha(0.5)
            .mode('queue') // progressive rendering
            .height(300)
            .data(getNormalizedRows())
            .width(attributes.length * axisWidth)
            // .hideAxis(["ibgeID", 'country', 'cod_RegiaoDeSaude', 'name_RegiaoDeSaude', 'city', '_source'])
            // .color(color2)
            .render()
            .brushMode('1D-axes')
            .reorderable()
            .shadows()
            .on('brush', (data: any) => {
                // console.log("[EVENT] brush data", data)
                setBrushData(data)
            })
    }, [visibleRows])

    const size = 400 - 35 // 35 is scrollbar width
    return (
        <Draggable className={styles.chart} disabled={visMode === 'split'}>
            <div style={{fontSize: 11, fontWeight: 'bold', margin: 15, textAlign: 'center'}}>
                Parallel coordinates
            </div>
            <div
                style={{
                    position: 'relative',
                    border: '1px solid #e1e1e1',
                    overflow: 'scroll',
                    margin: 15,
                    width: visMode === 'split' ? size : 'auto'
                }}
            >
                <div
                    id={id}
                    onMouseDown={(e: any) => e.stopPropagation()}
                    className="parcoords"
                    style={{width: attributes.length * axisWidth + 2, height: 300}}
                />
            </div>
        </Draggable>
    )
}

export default ParallelCoordinates
