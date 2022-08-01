import { ComponentStory, ComponentMeta } from '@storybook/react';
import { App } from '../App';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';
import React from 'react';

export default {
    title: 'TODOLIST/AppWitchRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App />

export const AppWitchReduxStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWitchReduxStories.args = {

};

