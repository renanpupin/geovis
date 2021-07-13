import React, {useState} from 'react';
import Step1Content from 'src/components/VisualizationWizard/Steps/Step1Content'
import StepChartType from 'src/components/VisualizationWizard/Steps/StepChartType'
import StepMarkerCluster from 'src/components/VisualizationWizard/Steps/StepMarkerCluster'
import StepChartAttribute from 'src/components/VisualizationWizard/Steps/StepChartAttribute'
import StepMarkerChartType from 'src/components/VisualizationWizard/Steps/StepMarkerChartType'
import StepMarkerChartAttributes from 'src/components/VisualizationWizard/Steps/StepMarkerChartAttributes'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/VisualizationWizard/StepTemplate";
import {VisualizationTypeValues} from "src/redux/data/types";

type VisualizationWizardProps = {
    // steps: number
    onFinish: (data: any) => void
    onClose: () => void
}

type stepDataProps = {
    type?: string
    attribute?: string
    chartType?: string
    chartLabelAttribute?: string
    chartAttributeX?: string
    chartAttributeY?: string
    hasToGroup?: boolean
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

        const getRequiredByChartType = () => {
            if(stepsData.chartType === 'scatter'){
                return ['chartAttributeX', 'chartAttributeY']
            }else if(stepsData.chartType === 'pie'){
                return stepsData.hasToGroup ? ['chartLabelAttribute', 'hasToGroup'] : ['chartLabelAttribute', 'chartAttributeY', 'hasToGroup']
            }else{
                return ['chartLabelAttribute', 'chartAttributeY']
            }
        }

        if(stepsData?.type === VisualizationTypeValues.Chart){
            return [
                {
                    title: 'Select chart type',
                    component: <StepChartType
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: ['chartType']
                },
                {
                    title: 'Select chart attribute',
                    component: <StepChartAttribute
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: getRequiredByChartType()
                }
            ]
        }else if(stepsData?.type === VisualizationTypeValues.MarkerCluster){
            return [
                {
                    title: 'Customize cluster icon',
                    component: <StepMarkerCluster
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: ['showPie']
                }
            ]
        }else if(stepsData?.type === VisualizationTypeValues.MarkerChart){
            return [
                {
                    title: 'Select chart type',
                    component: <StepMarkerChartType
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: ['markerChartType']
                },
                {
                    title: 'Select marker chart attribute',
                    component: <StepMarkerChartAttributes
                        onData={updateData}
                        data={stepsData}
                    />,
                    requiredFields: ['markerChartAttributes']
                }
            ]
        }

        // else if(stepsData?.type === 'line'){
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
