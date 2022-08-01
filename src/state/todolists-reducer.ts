import { Dispatch } from "redux";
import { v1 } from "uuid";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistType>;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.id);
    }
    case "ADD-TODOLIST": {
      return [...state, { id: action.todolistId, title: action.title, filter: "all" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id == action.id ? { ...tl, title: action.title } : tl));
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
      }));
    }
    default:
      return state;
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() };
};
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists };
};

export const fetchTodolistsThunk = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
  };
};
