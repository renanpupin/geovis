import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1Content from 'src/components/DataWizard/Steps/Step1Content'
import Step2Content from 'src/components/DataWizard/Steps/Step2Content'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/DataWizard/StepTemplate";

type DataWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

const DataWizard: React.FC<DataWizardProps> = (props) => {
    const {onFinish, onClose} = props

    const [step, setStep] = useState(0);
    const [stepData, setStepData] = useState<object[]>([]);

    const onPrev = () => {
        if(step > 0){
            setStep(step-1);
        }
    }

    const onContinue = () => {
        if(steps.length-1 === step){
            onFinish(stepData);
        }else{
            setStep(step+1);
        }
    }

    const updateData = (data: any) => {
        setStepData(oldData => {
            let items = [...oldData];
            items[step] = data;
            return items;
        });
    }

    const steps = [
        {
            title: 'Select data file',
            component: <Step1Content
                onData={updateData}
            />
        },
        {
            title: 'Select spatial attributes',
            component: <Step2Content
                onData={updateData}
                data={stepData[step-1]}
            />
        }
    ];

    const getModalContent = () => (
        <StepTemplate
            steps={steps.length}
            step={step}
            onPrevConfig={{
                onClick: onPrev,
                disabled: step === 0,
                link: steps.length-1 !== step
            }}
            onNextConfig={{
                onClick: onContinue,
                disabled: !stepData[step]
            }}
        >
            <div className={styles.stepsView}>
                {steps[step].component}
            </div>
        </StepTemplate>
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
