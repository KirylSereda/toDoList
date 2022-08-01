import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Task } from '../components/Task/Task';


export default {
    title: 'toDolist/TaskWitchLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove buuton inside Task was clicked')
    }
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStories = Template.bind({});

TaskStories.args = {
    task: {
        id: '2',
        title: 'react',
        description: '5564',
        todoListId: '3',
        order: 2,
        status: 3,
        priority: 4,
        startDate: '5564',
        deadline: '5564',
        addedDate: '26.02.22',

    },
};

