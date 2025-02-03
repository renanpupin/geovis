import React, {useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import Select, {SelectProps} from '../components/Select/Select';

export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {},
} as Meta;

const SelectWrapper = (props: any) => {
    const [value, setValue] = useState<string | undefined>(undefined)

    return (
        <div style={{maxWidth: 400}}>
            <Select
                {...props}
                value={value}
                onChange={(text) => setValue(text)}
            />
        </div>
    )
}

const Template: Story<SelectProps> = (args) => <SelectWrapper {...args}/>;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Select an option',
    options: [{label: 'Select an option', value: undefined}, {label: 'Option 1', value: 'option1'}, {label: 'Option 2', value: 'option2'}],
    label: 'Label'
};
