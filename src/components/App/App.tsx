import { useCallback, useEffect } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography, Container } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { ChangeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, fetchTodolistsThunk, TodolistDomainType } from '../../state/todolists-reducer';
import { createTaskTC, removeTaskTC, updateTaskTC, } from '../../state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, useAppSelector } from '../../state/store';
import { TodolistWithTasks } from "../todolistWithTasks/TodolistWithTasks";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { ErrorSnackbar } from "../ErrorSnackbar/ErrorSnackBar";
import { LinearProgress } from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    addedDate?: string
    oreder?: number
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

export function App() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useAppSelector(state => state.app.status)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, todolistId, { status: isDone }))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskID, todolistId, { title }))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTodoListTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchTodolistsThunk())
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position='static'>
                <ErrorSnackbar />
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
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
                                        entityStatus={tl.entityStatus}
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


