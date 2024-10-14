import React from 'react'
import {keyIdAttributeName} from '../../../redux/data/reducers'

export type InfoWindowPropTypes = {
    title: string
    rows: any
    attributes: any
}

const InfoWindow = (props: InfoWindowPropTypes) => {
    return (
        <div style={{minWidth: 300, maxHeight: '40vh', minHeight: 150}}>
            {/*<h5 style={{margin: 0, marginBottom: 15, fontSize: 14}}>#{props.title}</h5>*/}

            {props.rows.map((row: any, indexRow: number) => {
                return (
                    <div
                        key={indexRow}
                        style={{
                            marginBottom: indexRow === props.rows.length - 1 ? 0 : 5,
                            borderBottom:
                                indexRow === props.rows.length - 1 ? 'none' : '1px solid #e1e1e1'
                        }}
                    >
                        {props.attributes
                            ?.filter((item: any) => item.name !== keyIdAttributeName)
                            .map((attribute: any, index: number) => {
                                return (
                                    <p key={index} style={{fontSize: 14}}>
                                        <b>{attribute.name}</b>: {String(row[index])}
                                    </p>
                                )
                            })}
                        {row?.markerImageUrl ? (
                            <img
                                style={{width: '300px', height: 'auto'}}
                                src={row?.markerImageUrl}
                            />
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

export default InfoWindow
