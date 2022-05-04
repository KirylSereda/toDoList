import React, { useState } from 'react';
import './App.css';

import { v1 } from "uuid";
import { TaskType, TodoList } from './Todolist';
import { AddItemForm } from './AddItemForm';

// GUI
// CLI - command line interface
// C - create
// R - read
// U - update
// D - delete
export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" },
    ]
    )

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },// true -> false
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
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID) })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? { ...t, isDone } : t)
        })
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? { ...t, title } : t)
        })
    }

    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: filter } : tl))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, title: title } : tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copy = { ...tasks }
        delete copy[todoListID]
        setTasks(copy)
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({ ...tasks, [newTodoListID]: [] })
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
            <TodoList
                key={tl.id}
                title={tl.title}
                todoListID={tl.id}
                filter={tl.filter}
                tasks={tasksForTodoList}
                changeTodoListTitle={changeTodoListTitle}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListsFoRender}
        </div>
    );
}

export default App;
