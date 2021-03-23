import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import styles from "src/components/DataWizard/Wizard.module.scss";
import Button from "src/components/Button/Button";


type Step1Props = {
    onPrev: () => void
    onNext: () => void
    step: number
    steps: number
}

const Actions: React.FC<Step1Props> = (props) => {
    const {step, steps, onPrev, onNext} = props;

    return (
        <div className={styles.buttons}>
            <div style={{marginRight: 15}}>
                <Button onClick={onPrev} disabled={step === 0} size={'small'} link={true}>
                    Prev
                </Button>
            </div>
            <div style={{marginLeft: 15}}>
                <Button onClick={onNext} size={'small'} link={steps-1 !== step}>
                    {steps-1 === step ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    )
}

export default Actions
