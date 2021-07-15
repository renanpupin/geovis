import React, {useState, useEffect} from 'react';
import {Range} from 'react-range';

const TemporalFilter: React.FC<any> = (props) => {
    const [values, setValues] = useState<any>([0])

    const dates = [new Date(2021, 0, 1), new Date(2021, 1, 1), new Date(2021, 2, 1), new Date(2021, 3, 1), new Date(2021, 4, 1), new Date(2021, 5, 1)]
    return(
        <Range
            step={1}
            min={0}
            max={dates.length-1}
            values={values}
            onChange={(values) => setValues(values)}
            onFinalChange={(values) => {
                console.log('onFinalChange', values)
            }}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#ddd',
                        borderRadius: 6
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props, isDragged }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        // height: '42px',
                        // width: '42px',
                        height: '32px',
                        width: '32px',
                        borderRadius: 6,
                        backgroundColor: '#FFF',
                        // backgroundColor: '#999',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-34px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                            display: 'flex',
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {dates[values[0]].toLocaleDateString()}
                    </div>
                    <div
                        style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC'
                        }}
                    />
                </div>
            )}
        />
    )
}

export default TemporalFilter
