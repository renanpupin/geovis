import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";
import Touchable from "src/components/Touchable/Touchable";
import {parseCsvString} from "src/libs/parser";
import {getAttributeType} from "src/redux/data/filters";

type Step1ContentProps = {
    onData?: (data: any) => void
    data: any
}

type AttributesProps = {
    name: string
    type: string
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData, data} = props;

    const [fileData, setFileData] = useState<any>(data.rawDataObj || null);
    const [rowsCount, setRowsCount] = useState<number>(data.rows?.length ?? 0);
    const [attributes, setAttributes] = useState<AttributesProps[]>(data.attributes || []);
    // console.log("data", data);

    const onDrop = useCallback(acceptedFiles => {
        // console.log(acceptedFiles);

        try{
            const fileName = acceptedFiles[0].name;
            const filePath = acceptedFiles[0].path;
            const fileType = acceptedFiles[0].type;

            if (FileReader && window.File && window.FileReader && window.FileList && window.Blob){
                if (!acceptedFiles[0]) {
                    throw new Error("Falha ao carregar o arquivo");
                }

                let freader = new FileReader();
                freader.onload = function(e: any) {
                    try{
                        let fileContent: string = e.target.result;

                        if(fileType === "text/json"){
                            fileContent = fileContent.replace(/\t/g, "");	//removing tabs
                            fileContent = fileContent.replace(/\n/g, "");	//removing new line
                            // fileContent = fileContent.replace(/ /g, "");	//removing spaces
                            fileContent = JSON.parse(fileContent);
                        }

                        console.log("LEITURA DO ARQUIVO OK: \n\n"+ fileContent);

                        const dataObj = {
                            name: fileName,
                            content: fileContent,
                            type: fileType,
                        }
                        setFileData(dataObj);

                        parseCsv(dataObj)
                    }catch(e){
                        throw new Error(`Erro ao ler o arquivo de entrada, verifique se seu arquite está seguindo o padrão. Erro: ${e.message}`);
                    }
                }

                freader.readAsText(acceptedFiles[0]);
            }else{
                throw new Error("Desculpe, mas seu navegador não suporta algumas funcionalidades desta aplicação!");
            }
        }catch (err){
            console.log(err);
            alert(err.message);
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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

    const parseCsv = (dataCsv: any) => {
        const parsedCsv = parseCsvString(dataCsv.content);
        if (parsedCsv.errors?.length > 0) {
            alert("Erro ao ler arquivo: " + parsedCsv.errors[0].message)
        }
        console.log("parseCsvString", parsedCsv);
        // console.log("parseCsvStringAttributes", parsedCsv.data.slice(0,1)[0].map((item: any) => console.log(item)));

        const attributesTypes: string[] = parsedCsv.data.slice(1, 2)[0].map((item: any) => getAttributeType(item));
        const attributes: AttributesProps[] = parsedCsv.data.slice(0, 1)[0].map((item: any, index: number) => ({
            name: item,
            type: attributesTypes[index]
        }));
        const rows: string[] = parsedCsv.data.slice(1, parsedCsv.data.length)

        setRowsCount(parsedCsv.data.length - 1);
        setAttributes(attributes)

        onData?.({
            attributes,
            rows,
            rawDataObj: dataCsv
        });
    }

    const dropzoneStyles = [styles.dropzone, isDragActive ? styles.dropzoneActive : {}].join(' ')
    return (
        <div>
            {/*<p className={styles.smallDescription}>Select an csv or json file.</p>*/}

            {fileData && <div>
                <p className={styles.fileNameView}>
                    <i className="material-icons">attach_file</i>
                    <span>{fileData.name}</span>
                    <Touchable onClick={() => setFileData(null)}>
                        <i className="material-icons">close</i>
                    </Touchable>
                </p>

                <div style={{ width: '100%', borderBottom: '1px dashed #ccc', marginBottom: 5, marginTop: 15}}/>

                <div style={{marginTop: 15}}>
                    <div style={{marginBottom: 10}}>
                        <label><b>Total rows:</b> {rowsCount}</label>
                    </div>

                    <div style={{marginBottom: 10}}>
                        <label><b>Attributes:</b></label>
                        <div style={{fontSize: 12, marginBottom: 15, display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                            {getAttributesList()}
                        </div>
                    </div>
                </div>
            </div>}

            {!fileData && <div className={dropzoneStyles} {...getRootProps()}>
                <input {...getInputProps()} accept=".csv"/>
                <i className="material-icons">cloud_upload</i>
                <p>Drop the files here or click to upload</p>
            </div>}
        </div>
    )
}

export default Step1Content
