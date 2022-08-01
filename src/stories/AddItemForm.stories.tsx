import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import AddItemForm from '../components/AddItemForm/AddItemForm';

export default {
    title: 'toDolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'button clicked inside form'
        },
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});

AddItemFormStories.args = {
    addItem: action('AddItemFormStories clicked')
};

