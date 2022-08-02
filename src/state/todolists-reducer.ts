import { Dispatch } from "redux";
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
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [...state, { id: action.todolistId, title: action.title, filter: "all" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl));
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
export const AddTodolistAC = (item: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: item.title, todolistId: item.id };
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

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title).then((res) => {
    dispatch(AddTodolistAC(res.data.data.item));
  });
};

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId).then(() => {
    dispatch(RemoveTodolistAC(todolistId));
  });
};

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.updateTodolist(todolistId, title).then(() => {
    dispatch(ChangeTodolistTitleAC(todolistId, title));
  });
};
