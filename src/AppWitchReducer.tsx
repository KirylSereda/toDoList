import './App.css';
import React from 'react'
import { TaskType, TodoList } from './toDoList';
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useReducer } from 'react';

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWitchReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchTodoList] = useReducer(todolistsReducer, [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" },
    ]
    )

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
            [todoListID_1]: [
                { id: v1(), title: "HTML", isDone: true },
                { id: v1(), title: "CSS", isDone: true },
                { id: v1(), title: "JS/TS", isDone: false },
            ],
            [todoListID_2]: [
                { id: v1(), title: "Beer", isDone: true },
                { id: v1(), title: "Meat", isDone: true },
                { id: v1(), title: "Cheeps", isDone: false },
                { id: v1(), title: "Toilet paper", isDone: false },
            ]
        })

    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchTodoList(ChangeTodolistFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchTodoList(ChangeTodolistTitleAC(todoListID, title))
    }
    const removeTodoList = (todoListID: string) => {
        dispatchToTasks(RemoveTodolistAC(todoListID))
    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodoList(action)
        dispatchToTasks(action)
    }
    // UI:

    const todoListsFoRender = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id] // весь массив
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper
                    style={{ padding: '25px', }}>
                    <TodoList
                        title={tl.title}
                        todoListID={tl.id}
                        filter={tl.filter}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter}
                    />
                </Paper>
            </Grid>
        )
    })

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
                <Grid container spacing={8}>
                    {todoListsFoRender}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWitchReducer;
