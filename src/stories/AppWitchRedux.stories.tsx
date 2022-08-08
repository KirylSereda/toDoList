import { ComponentStory, ComponentMeta } from '@storybook/react';
import { App } from '../components/App/App';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLIST/AppWitchRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />

export const AppWitchReduxStories = Template.bind({});

AppWitchReduxStories.args = {

};

