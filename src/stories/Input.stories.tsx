import React, {useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Input, { InputProps } from '../components/Input/Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
} as Meta;

const InputWrapper = (props: any) => {
  const [value, setValue] = useState<string>('')

  return(
      <div style={{maxWidth: 400}}>
        <Input
            {...props}
            value={value}
            onChange={(text) => setValue(text)}
        />
      </div>
  )
}

const Template: Story<InputProps> = (args) => <InputWrapper {...args}/>;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Type your text',
  label: 'Label'
};
