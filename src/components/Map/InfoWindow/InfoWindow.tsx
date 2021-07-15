import React from 'react';

export type InfoWindowPropTypes = {
    title: string
    rows: any
    attributes: any
}

const InfoWindow = (props: InfoWindowPropTypes) => {
    return (
        <div style={{minWidth: 300, maxHeight: '50vh', minHeight: 150}}>
            <h5 style={{marginBottom: 15}}>#{props.title}</h5>
            {props.rows.map((row: any, indexRow: number) => {
                return(
                    <div key={indexRow} style={{marginBottom: indexRow === props.rows.length-1 ? 0 : 5, borderBottom: indexRow === props.rows.length-1 ? 'none' : '1px solid #e1e1e1'}}>
                        {props.attributes.map((attribute: any, index: number) => {
                            return(
                                <p key={index}><b>{attribute.name}</b>: {String(row[index])}</p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}

export default InfoWindow;
