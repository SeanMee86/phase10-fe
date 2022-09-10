import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ToggleSwitch } from '@components';

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (args) => <ToggleSwitch {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
