import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../AppWitchRedux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string;
    todolistId: string;
};
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
};
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterValuesType;
};

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

const initialState: Array<TodoListType> = [];

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id != action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((tl) => (tl.id == action.id ? { ...tl, title: action.title } : tl));

            // const todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = action.title;
            // }
            // return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
        }
        default:
            return state;
    }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() };
};
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};

