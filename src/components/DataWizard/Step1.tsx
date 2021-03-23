import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import Actions from './Actions'
import styles from './Wizard.module.scss'
import DropdownItem from "src/Menu/DropdownItem";

type Step1Props = {
    onFileSelected?: (file: any) => void
    onPrev: () => void
    onNext: () => void
    step: number
    steps: number
}

const Step1: React.FC<Step1Props> = (props) => {
    const {onFileSelected, onPrev, onNext, step, steps} = props;

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        onFileSelected?.(acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const dropzoneStyles = [styles.dropzone, isDragActive ? styles.dropzoneActive : {}].join(' ')

    return (
        <div>
            <div className={dropzoneStyles} {...getRootProps()}>
                <input {...getInputProps()} />
                <i className="material-icons">cloud_upload</i>
                <p>Drop the files here or click to upload</p>
            </div>
            <Actions
                step={step}
                steps={steps}
                onPrev={onPrev}
                onNext={onNext}
            />
        </div>
    )
}

export default Step1
