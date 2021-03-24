import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
// import StepActions from './StepActions'
import styles from '../Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";

type Step1ContentProps = {
    onData?: (data: any) => void
}

const Step1Content: React.FC<Step1ContentProps> = (props) => {
    const {onData} = props;

    const [fileData, setFileData] = useState<any>(null);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

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

                        setFileData({
                            name: fileName,
                            content: fileContent,
                            type: fileType,
                        });
                        onData?.(fileContent);
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

    const dropzoneStyles = [styles.dropzone, isDragActive ? styles.dropzoneActive : {}].join(' ')

    return (
        <div>
            {/*<p className={styles.smallDescription}>Select an csv or json file.</p>*/}

            {fileData && <p className={styles.fileNameView}>
                <i className="material-icons">attach_file</i>
                <span>{fileData.name}</span>
            </p>}

            <div className={dropzoneStyles} {...getRootProps()}>
                <input {...getInputProps()} accept=".csv"/>
                <i className="material-icons">cloud_upload</i>
                <p>Drop the files here or click to upload</p>
            </div>
        </div>
    )
}

export default Step1Content
