import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoadingSpinner } from '@components';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => <LoadingSpinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
