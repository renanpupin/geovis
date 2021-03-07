import React from 'react';

const InfoWindow = (props: any) => {
    return (
        <div>
            <h1>Marker info:</h1>
            <p>{JSON.stringify(props.content)}</p>
        </div>
    );
}

export default InfoWindow;
