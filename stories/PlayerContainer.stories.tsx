import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayerContainer } from '@components';

export default {
  title: 'Components/PlayerContainer',
  component: PlayerContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlayerContainer>;

const Template: ComponentStory<typeof PlayerContainer> = (args) => <PlayerContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  players: [
    {
        name: "Player 1",
        points: 200
    },
    {
        name: "Player 2",
        points: 302
    },
    {
        name: "Player 3",
        points: 120
    },
    {
        name: "Player 4",
        points: 20
    },
  ]
};
