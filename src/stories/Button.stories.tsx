import React, {useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import Button, {ButtonProps} from '../components/Button/Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {},
} as Meta;

const ButtonWrapper = (props: any) => {
    return (
        <div style={{maxWidth: 400}}>
            <Button
                {...props}
            >
                Button
            </Button>
        </div>
    )
}

const Template: Story<ButtonProps> = (args) => <ButtonWrapper {...args}/>;

export const Default = Template.bind({});
Default.args = {
    onClick: () => alert
};
