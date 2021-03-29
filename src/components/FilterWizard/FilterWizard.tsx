import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1Content from 'src/components/FilterWizard/Steps/Step1Content'
import Step2Content from 'src/components/FilterWizard/Steps/Step2Content'
import Step3Content from 'src/components/FilterWizard/Steps/Step3Content'
import Step4Content from 'src/components/FilterWizard/Steps/Step4Content'

import styles from "./FilterWizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/FilterWizard/StepTemplate";

type FilterWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

type stepDataProps = {
    type?: any
    attribute?: any
}

const FilterWizard: React.FC<FilterWizardProps> = (props) => {
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
        console.log(data, stepsData)
        setStepsData(oldData => {
            return {
                ...oldData,
                ...data
            }
        });
    }

    const getDynamicSteps = () => {
        if(stepsData?.type === 'line'){
            return [
                {
                    title: 'Select filter attribute',
                    component: <Step3Content
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: ['attribute']
                },
            ]
        }
        return []
    }

    const steps = [
        {
            title: 'Select filter name',
            component: <Step1Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['name']
        },
        {
            title: 'Select filter attribute',
            component: <Step2Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['attribute']
        },
        {
            title: 'Select filter type',
            component: <Step3Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['condition']
        },
        {
            title: 'Select filter target',
            component: <Step4Content
                onData={updateData}
                data={stepsData}
            />,
            requiredFields: ['targetType', 'targetValue']
        },
        // ...getDynamicSteps()
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

export default FilterWizard
