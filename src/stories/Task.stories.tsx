
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Task } from '../Task';

export default {
    title: 'toDolist/TaskWitchLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove buuton inside Task was clicked')
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStories.args = {
    task: { id: 'sd', isDone: true, title: 'Js' }
};

