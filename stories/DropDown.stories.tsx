import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropDown } from '@components';

export default {
  title: 'Components/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: "Game Password: Some-Password",
  color: "green",
  isShown: true,
};
