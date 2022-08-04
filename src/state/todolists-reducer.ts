import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

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

export const RemoveTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", id: todolistId } as const;
};
export const AddTodolistAC = (item: TodolistType) => {
  return { type: "ADD-TODOLIST", title: item.title, todolistId: item.id } as const;
};
export const ChangeTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title } as const;
};
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter } as const;
};
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return { type: "SET-TODOLISTS", todolists } as const;
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
