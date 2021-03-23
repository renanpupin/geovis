import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1 from 'src/components/DataWizard/Step1'
import Step2 from 'src/components/DataWizard/Step1'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import Actions from "src/components/DataWizard/Actions";

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
        {
            title: 'Select data file',
            component: <Step1
                step={step}
                steps={2}
                onPrev={onPrev}
                onNext={onContinue}
            />
        },
        {
            title: 'Select spatial attributes',
            component: <Step2
                step={step}
                steps={2}
                onPrev={onPrev}
                onNext={onContinue}
            />
        }
    ];

    const getModalContent = () => (
        <div>
            {/*<div>*/}
            {/*    <p>Step {step+1}/{steps.length}</p>*/}
            {/*</div>*/}

            <div className={styles.stepsView}>
                {steps[step].component}
            </div>
        </div>
    )

    return(
        <Modal
            visible={true}
            title={steps[step].title}
            onClose={onClose}
        >
            {getModalContent()}
        </Modal>
    )
}

export default DataWizard
