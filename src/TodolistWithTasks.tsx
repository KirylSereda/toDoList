import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { Button, ButtonGroup, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EditableSpan from './EditableSpan';
import AddItemForm from './AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function TodolistWithTasks(props: PropsType) {

    const changeFilter = (filter: FilterValuesType): () => void => {
        return () => props.changeTodoListFilter(filter, props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const allBtnColor = props.filter === "all" ? "secondary" : "primary"
    const activeBtnColor = props.filter === "active" ? "secondary" : "primary"
    const completedBtnColor = props.filter === "completed" ? "secondary" : "primary"

    return <div>
        <h3> <EditableSpan title={props.title} setNewTitle={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan title={t.title} setNewTitle={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
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
            {/* <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}
                color={'primary'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}
                color={'primary'}>Completed
            </Button> */}
        </div>
    </div>
}


