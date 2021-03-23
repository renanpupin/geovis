import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import styles from "src/components/DataWizard/Wizard.module.scss";
import Button from "src/components/Button/Button";


type Step1Props = {
    onPrevConfig: {
        onClick: () => void,
        disabled: boolean
        link?: boolean
    }
    onNextConfig: {
        onClick: () => void,
        disabled: boolean
        link?: boolean
    }
    step: number
    steps: number
}

const Actions: React.FC<Step1Props> = (props) => {
    const {step, steps, onPrevConfig, onNextConfig} = props;

    return (
        <div className={styles.buttons}>
            <div style={{marginRight: 15}}>
                <Button onClick={onPrevConfig.onClick} disabled={onPrevConfig.disabled} size={'small'} link={true}>
                    Previous
                </Button>
            </div>
            <div style={{marginLeft: 15}}>
                <Button onClick={onNextConfig.onClick} disabled={onNextConfig.disabled} size={'small'} link={onNextConfig.link}>
                    {steps-1 === step ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    )
}

export default Actions
