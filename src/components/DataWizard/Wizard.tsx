import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1 from 'src/components/DataWizard/Step1'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";

type DataWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

const DataWizard: React.FC<DataWizardProps> = (props) => {
    const {onFinish, onClose} = props

    const [step, setStep] = useState(0);

    const onPrev = () => {
        if(step > 0){
            setStep(step-1);
        }
    }

    const onContinue = () => {
        if(steps.length-1 === step){
            onFinish("aaa");
        }else{
            setStep(step+1);
        }
    }

    const steps = [
        <Step1
            step={step}
            steps={1}
            onPrev={onPrev}
            onNext={onContinue}
        />
    ];

    const getModalContent = () => (
        <div>
            {/*<div>*/}
            {/*    <p>Step {step+1}/{steps.length}</p>*/}
            {/*</div>*/}

            <div className={styles.stepsView}>
                {steps[step]}
            </div>
        </div>
    )

    return(
        <Modal
            visible={true}
            title={`Step ${step+1}`}
            onClose={onClose}
        >
            {getModalContent()}
        </Modal>
    )
}

export default DataWizard
