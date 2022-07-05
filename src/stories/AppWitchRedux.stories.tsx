import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppWitchRedux } from '../AppWitchRedux';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';


export default {
    title: 'TODOLIST/AppWitchRedux',
    component: AppWitchRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWitchRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWitchRedux> = (args) => <AppWitchRedux />

export const AppWitchReduxStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWitchReduxStories.args = {

};

