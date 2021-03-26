import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1Content from 'src/components/VisualizationWizard/Steps/Step1Content'
import Step2Content from 'src/components/VisualizationWizard/Steps/Step2Content'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/VisualizationWizard/StepTemplate";

type VisualizationWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

type stepDataProps = {
    type?: any
    attribute?: any
}

const VisualizationWizard: React.FC<VisualizationWizardProps> = (props) => {
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

    const getDynamicSteps = () => {
        // if(stepsData?.type === 'line'){
        //     return [{
        //         title: 'Select spatial attributes',
        //         component: <Step2Content
        //             onData={updateData}
        //             data={stepsData}
        //         />,
        //         requiredFields: ['attribute']
        //     }]
        // }else if(stepsData?.type === 'euclidian'){
        //     return [{
        //         title: 'Select spatial attributes',
        //         component: <Step2Content
        //             onData={updateData}
        //             data={stepsData}
        //         />,
        //         requiredFields: ['attribute']
        //     }]
        // }
        return []
    }

    const steps = [
        {
            title: 'Select visualization type',
            component: <Step1Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['type']
        },
        ...getDynamicSteps()
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

export default VisualizationWizard
