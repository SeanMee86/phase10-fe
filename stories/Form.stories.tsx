import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form } from '@components';

export default {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
