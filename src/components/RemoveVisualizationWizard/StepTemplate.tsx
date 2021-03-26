import React from 'react';
import Button from "src/components/Button/Button";
import styles from "src/components/DataWizard/Wizard.module.scss";

type StepTemplateProps = {
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

const StepTemplate: React.FC<StepTemplateProps> = (props) => {
    const {onPrevConfig, onNextConfig, step, steps, children} = props;

    return (
        <div>
            {/*<p className={styles.smallDescription}>Select an csv or json file.</p>*/}

            {/*<div>*/}
            {/*    <p>Step {step+1}/{steps.length}</p>*/}
            {/*</div>*/}

            <div className={styles.templateBody}>
                {children}
            </div>

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
        </div>
    )
}

export default StepTemplate
