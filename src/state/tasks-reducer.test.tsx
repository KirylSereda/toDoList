import { v1 } from "uuid";
import { TaskType } from "../api/todolist-api";
import { TasksStateType, TodolistType } from "../App";
import { addTaskAC, removeTaskAC, updateTaskAC } from "./tasks-reducer";
import { tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists-reducer";

let startState: TasksStateType
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {
                id: "1",
                title: "CSS",
                status: 1,
                description: 'do it now',
                priority: 2,
                startDate: '02-02-25,23.00.25',
                deadline: '02-02-25,23.00.25',
                todoListId: todolistId1,
                order: 0,
                addedDate: '02-02-25,23.00.25'
            },
            {
                id: "2",
                title: "CSS",
                status: 1,
                description: 'do it now',
                priority: 2,
                startDate: '02-02-25,23.00.25',
                deadline: '02-02-25,23.00.25',
                todoListId: todolistId1,
                order: 0,
                addedDate: '02-02-25,23.00.25'
            }
        ],
        [todolistId2]: [
            {
                id: "3",
                title: "CSS",
                status: 1,
                description: 'do it now',
                priority: 2,
                startDate: '02-02-25,23.00.25',
                deadline: '02-02-25,23.00.25',
                todoListId: todolistId2,
                order: 0,
                addedDate: '02-02-25,23.00.25'
            },
        ],
    };
})

test("correct task should be deleted from correct array", () => {

    const action = removeTaskAC("1", todolistId1);
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        [todolistId1]: [
            {
                id: "2",
                title: "CSS",
                status: 1,
                description: 'do it now',
                priority: 2,
                startDate: '02-02-25,23.00.25',
                deadline: '02-02-25,23.00.25',
                todoListId: todolistId1,
                order: 0,
                addedDate: '02-02-25,23.00.25'
            }
        ],
        [todolistId2]: [
            {
                id: "3",
                title: "CSS",
                status: 1,
                description: 'do it now',
                priority: 2,
                startDate: '02-02-25,23.00.25',
                deadline: '02-02-25,23.00.25',
                todoListId: todolistId2,
                order: 0,
                addedDate: '02-02-25,23.00.25',
            }
        ],
    });
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: "3",
        title: "CSS",
        status: 1,
        description: 'do it now',
        priority: 2,
        startDate: '02-02-25,23.00.25',
        deadline: '02-02-25,23.00.25',
        todoListId: todolistId2,
        order: 0,
        addedDate: '02-02-25,23.00.25',
    });

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe("CSS");
    expect(endState[todolistId2][0].status).toBe(1);
})

test('status of specified task should be changed', () => {

    let model: TaskType = {
        title: startState[todolistId1][0].title,
        description: startState[todolistId1][0].description,
        priority: startState[todolistId1][0].priority,
        startDate: startState[todolistId1][0].startDate,
        deadline: startState[todolistId1][0].deadline,
        order: startState[todolistId1][0].order,
        id: startState[todolistId1][0].id,
        addedDate: startState[todolistId1][0].addedDate,
        todoListId: todolistId1,
        status: 3,
    };
    const action = updateTaskAC("3", model, todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][0].status).toBe(3);

});

test('title of specified task should be changed', () => {

    let model: TaskType = {
        description: startState[todolistId1][0].description,
        priority: startState[todolistId1][0].priority,
        startDate: startState[todolistId1][0].startDate,
        deadline: startState[todolistId1][0].deadline,
        order: startState[todolistId1][0].order,
        id: startState[todolistId1][0].id,
        addedDate: startState[todolistId1][0].addedDate,
        todoListId: todolistId1,
        status: startState[todolistId1][0].status,
        title: 'NewTitle'
    };

    const action = updateTaskAC("1", model, todolistId1);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][0].title).toBe('NewTitle');
    expect(endState[todolistId1][1].title).toBe("CSS");
});

test('new array should be added when new todolist is added', () => {

    let newTodolist: TodolistType = {
        id: '6',
        title: '666',
        filter: 'all',
        addedDate: '25-09-95',
        oreder: 2
    }

    const action = AddTodolistAC(newTodolist);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k !== todolistId2);

    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC(todolistId2)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[2]).not.toBeDefined()
})
