import { v1 } from 'uuid';
import { TaskStateType } from '../App';
import { AddTodolistAT, RemoveTodolistAT } from './todolists-reducer';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;

export type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todolistId]],
            };
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => (t.id === action.taskId ? { ...t, isDone: action.isDone } : t)),
            };
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => (t.id === action.taskId ? { ...t, title: action.title } : t)),
            };
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: [],
            };
        case 'REMOVE-TODOLIST': {
            let copyState = { ...state };
            delete copyState[action.id];
            //  Or let {[action.id]: [],...rest} = { ...state }
            return copyState;
        }

        default:
            throw new Error("I don't understand this type");
    }
};

export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId, todolistId } as const);

export const addTaskAC = (title: string, todolistId: string) => ({ type: 'ADD-TASK', title, todolistId } as const);

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId } as const;
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TITLE-TASK', taskId, title, todolistId } as const;
};
