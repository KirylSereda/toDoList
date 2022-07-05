
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Task } from '../Task';
import { useState } from 'react';

export default {
    title: 'toDolist/TaskWitchLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
    }
} as ComponentMeta<typeof Task>;

const TaskWitchLocalState = () => {
    let [task, setTask] = useState({ id: 'dsds', title: 'Js', isDone: false })

    const changeTaskStatus = () => setTask({ ...task, isDone: !task.isDone })
    const changeTaskTitle = (taskId: string, title: string) => setTask({ ...task, title })

    return <Task key='sdd' changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('Remove Task')} task={task} todolistId={'dsda'} />
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWitchLocalState> = (args) => <TaskWitchLocalState />;

export const TaskWitchLocalStateStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWitchLocalStateStories.args = {

};

