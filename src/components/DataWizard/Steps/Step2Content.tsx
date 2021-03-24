import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import Select from "src/components/Select/Select";
import {getAttributeType} from "src/redux/data/filters";
import {parseCsvString} from "src/libs/parser";

type Step2ContentProps = {
    onData?: (data: any) => void,
    data: any
}

const Step2Content: React.FC<Step2ContentProps> = (props) => {
    const {onData, data} = props;

    const [latAttribute, setLatAttribute] = useState<string | undefined>(undefined);
    const [lonAttribute, setLonAttribute] = useState<string | undefined>(undefined);
    const [rowsCount, setRowsCount] = useState<number>(0);
    const [attributes, setAttributes] = useState<object[]>([]);

    useEffect(() => {
        const parsedCsv = parseCsvString(data);
        if(parsedCsv.errors?.length > 0){
            alert("Erro ao ler arquivo: "+parsedCsv.errors[0].message)
        }
        console.log("parseCsvString", parsedCsv);
        // console.log("parseCsvStringAttributes", parsedCsv.data.slice(0,1)[0].map((item: any) => console.log(item)));

        const attributesTypes = parsedCsv.data.slice(1,2)[0].map((item: any) => getAttributeType(item));
        const attributes = parsedCsv.data.slice(0,1)[0].map((item: any, index: number) => ({
            name: item,
            type: attributesTypes[index]
        }));

        setRowsCount(parsedCsv.data.length-1);
        setAttributes(attributes)
    }, [data])

    useEffect(() => {
        if(latAttribute && lonAttribute){
            onData?.({
                latAttribute,
                lonAttribute,
            })
        }
    }, [latAttribute, lonAttribute])

    const getAttributesList = useCallback(() => {
        return attributes.map((item: any, index: number) => {
            return(
                <div key={index}>
                    <div style={{padding: 5}}>
                        {item.name}: {item.type}
                    </div>
                </div>
            )
        })
    }, [attributes])

    const attributesOptions = attributes.map((item: any) => ({
        label: item.name,
        value: item.name
    }));

    return (
        <div>
            <p>Total Rows: <b>{rowsCount}</b></p>

            <div style={{fontSize: 12, marginBottom: 15}}>
                <label><b>Recognized attributes:</b></label>
                {getAttributesList()}
            </div>

            <div style={{marginBottom: 15}}>
                <label>Select the latitude attribute</label>
                <Select
                    label={'Latitude attribute'}
                    placeholder={'Select the latitude attribute'}
                    value={latAttribute}
                    options={attributesOptions}
                    onChange={(value) => setLatAttribute(value)}
                />
            </div>

            <div style={{marginBottom: 15}}>
                <label>Select the longitude attribute</label>
                <Select
                    label={'Longitude attribute'}
                    placeholder={'Select the longitude attribute'}
                    value={lonAttribute}
                    options={attributesOptions}
                    onChange={(value) => setLonAttribute(value)}
                />
            </div>
        </div>
    )
}

export default Step2Content
