import React, { useCallback, useEffect } from 'react';
import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import EditableSpan from '../EditableSpan/EditableSpan';
import { FilterValuesType } from '../../App';
import { fetchTasksTC } from '../../state/tasks-reducer';
import AddItemForm from '../AddItemForm/AddItemForm';
import { Task } from '../Task/Task'
import { TaskStatuses, TaskType } from '../../api/todolist-api';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const TodolistWithTasks = React.memo((props: PropsType) => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    }, [props.id])

    const allBtnColor = props.filter === "all" ? "secondary" : "primary"
    const activeBtnColor = props.filter === "active" ? "secondary" : "primary"
    const completedBtnColor = props.filter === "completed" ? "secondary" : "primary"

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3> <EditableSpan title={props.title} setNewTitle={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    todoListId={props.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />)
            }
        </div>
        <div style={{ paddingTop: "10px" }}>
            <ButtonGroup
                size={"small"}
                variant={"contained"}
                disableElevation
            >
                <Button
                    color={allBtnColor}
                    onClick={changeFilter("all")}>Все
                </Button>
                <Button
                    color={activeBtnColor}
                    onClick={changeFilter("active")}>В работе
                </Button>
                <Button
                    color={completedBtnColor}
                    onClick={changeFilter("completed")}>Сделано
                </Button>
            </ButtonGroup>
        </div>
    </div>
})


