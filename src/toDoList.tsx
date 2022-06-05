import React, { FC, useState, KeyboardEvent, ChangeEvent } from 'react';
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {
    Button,
    ButtonGroup,
    Checkbox,
    IconButton,
    List, ListItem
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeFilter = (filter: FilterValuesType): () => void => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const tasksListItems = props.tasks.length
        ? props.tasks.map(t => {
            const onClickRemoveTask = () => props.removeTask(t.id, props.todoListID)
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todoListID)
            }
            const taskClasses = t.isDone ? "is-done" : "";
            return (
                <ListItem
                    style={{ padding: "0" }}
                    disableGutters
                    key={t.id}>
                    <Checkbox
                        size={"small"}
                        color={"primary"}
                        checked={t.isDone}
                        onChange={onChangeChangeStatus}
                    />
                    <span className={taskClasses}>
                        <EditableSpan title={t.title}
                            setNewTitle={changeTaskTitle} />
                    </span>
                    <IconButton
                        size={"small"}
                        color={"secondary"}
                        onClick={onClickRemoveTask}>
                        <HighlightOffIcon />
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Нет задач в списке</span>

    const allBtnColor = props.filter === "all" ? "secondary" : "primary"
    const activeBtnColor = props.filter === "active" ? "secondary" : "primary"
    const completedBtnColor = props.filter === "completed" ? "secondary" : "primary"

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                    setNewTitle={changeTodoListTitle} />
                <IconButton
                    color={"secondary"}
                    onClick={removeTodoList}>
                    <HighlightOffIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List disablePadding>
                {tasksListItems}
            </List>
            <div>
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
    );
};

