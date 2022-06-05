import React from "react";
import '../App.css';
import AddItemForm from "../AddItemForm";
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography, Container } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, } from '../state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, } from '../state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskType, TodolistWithTasks } from "../TodolistWithTasks";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export function AppWitchRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    let dispatch = useDispatch()

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))
    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }
    // UI:

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '25px', }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{ padding: "10px" }}>
                                    <TodolistWithTasks
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodoListTitle}
                                        changeTodoListFilter={changeTodoListFilter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


