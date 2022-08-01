import React, { useCallback, useEffect } from "react";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography, Container } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, fetchTodolistsThunk, RemoveTodolistAC, setTodolistsAC, } from './state/todolists-reducer';
import { changeTaskTitleAC, createTaskTC, removeTaskTC, updateTaskStatusTC, } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodolistWithTasks } from "./components/todolistWithTasks/TodolistWithTasks";
import { TaskStatuses, TaskType } from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export function App() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, isDone: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(taskId, todolistId, isDone))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistId))
    }, [])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }, [])

    const changeTodoListTitle = (todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])


    useEffect(() => {
        dispatch(fetchTodolistsThunk())
    }, [])

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
                                        changeTodoListTitle={changeTodoListTitle}
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


