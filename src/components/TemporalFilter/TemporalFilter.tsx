import React, {useState, useEffect, useCallback} from 'react';
import {Range} from 'react-range';
import {useSelector, useDispatch} from 'react-redux';

import {getTemporalAttributeIndex, getData} from 'src/redux/data/selectors'
import {setTemporalFilter} from '../../redux/data/actions';

const TemporalFilter: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const allRows = useSelector(getData);    //TODO: mover highlight para esta lógica
    const temporalAttributeIndex = useSelector(getTemporalAttributeIndex)
    const [values, setValues] = useState<any>([0]);

    const getRangeValues = useCallback(() => {
        const rangeValues: string[] = [];

        for(const row of allRows){
            //@ts-ignore
            if(!rangeValues.includes(row[temporalAttributeIndex])){
                //@ts-ignore
                rangeValues.push(row[temporalAttributeIndex])
            }
        }

        return rangeValues;
    }, [allRows, temporalAttributeIndex]);

    const rangeValues = getRangeValues()

    //TODO: apertar play para ver iterações

    return(
        <Range
            step={1}
            min={0}
            max={rangeValues.length > 0 ? rangeValues.length-1 : 1}
            values={values}
            onChange={(values) => setValues(values)}
            onFinalChange={(values) => {
                console.log('onFinalChange', values[0], rangeValues[values[0]]);

                dispatch(setTemporalFilter(rangeValues[values[0]]))
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
                        {rangeValues[values[0]]}
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
