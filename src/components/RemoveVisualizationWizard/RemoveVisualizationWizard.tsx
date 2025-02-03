import React, {useState} from 'react';
import Step1Content from 'src/components/RemoveVisualizationWizard/Steps/Step1Content'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/RemoveVisualizationWizard/StepTemplate";

type RemoveVisualizationWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

type stepDataProps = {
    id?: any
}

const RemoveVisualizationWizard: React.FC<RemoveVisualizationWizardProps> = (props) => {
    const {onFinish, onClose} = props

    const [step, setStep] = useState(0);
    const [stepsData, setStepsData] = useState<stepDataProps>({});

    const onPrev = () => {
        if(step > 0){
            setStep(step-1);
        }
    }

    const onContinue = () => {
        if(steps.length-1 === step){
            // console.log("stepsData", stepsData)
            onFinish(stepsData);
        }else{
            setStep(step+1);
        }
    }

    const updateData = (data: any) => {
        setStepsData(oldData => {
            return {
                ...oldData,
                ...data
            }
        });
    }

    const steps = [
        {
            title: 'Select visualization',
            component: <Step1Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['id']
        },
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
                disabled: steps[step].requiredFields.filter((item: any) => {
                    // @ts-ignore
                    return !!stepsData[item]
                }).length === 0
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

export default RemoveVisualizationWizard
