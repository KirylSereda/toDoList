import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { useState } from 'react';
import { Task } from '../components/Task/Task';

export default {
    title: 'toDolist/TaskWitchLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
    }
} as ComponentMeta<typeof Task>;

const TaskWitchLocalState = () => {
    let [task, setTask] = useState({
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

    })

    const changeTaskStatus = () => setTask({ ...task })
    const changeTaskTitle = (title: string) => setTask({ ...task, title })

    return <Task key='sdd' changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('Remove Task')} task={task} todoListId={'dsda'} />
}


const Template: ComponentStory<typeof TaskWitchLocalState> = (args) => <TaskWitchLocalState />;

export const TaskWitchLocalStateStories = Template.bind({});
TaskWitchLocalStateStories.args = {
};

