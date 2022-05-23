import { FilterValuesType, TodoListType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (
    state: Array<TodoListType>,
    action: ActionsType,
): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, { id: v1(), title: action.title, filter: 'all' }]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', id }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return { type: 'ADD-TODOLIST', title }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return { type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const ChangeTodolistFilterAC = (
    id: string,
    filter: FilterValuesType,
): ChangeTodolistFilterAT => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
}
