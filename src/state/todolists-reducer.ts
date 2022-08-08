import { handleServerAppError } from "./../utils/error-utils";
import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../components/App/App";
import { RequestStatusType, setAppStatusAC, setErrorAC } from "../components/App/app-reducer";

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistESActionType = ReturnType<typeof ChangeTodolistEntityStatusAC>;

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistESActionType;

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [...state, { id: action.todolistId, title: action.title, filter: "all", entityStatus: "idle" }];
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
        entityStatus: "idle",
      }));
    }
    case "SET-ENTITY-STATUS": {
      return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl));
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
export const ChangeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
  return { type: "SET-ENTITY-STATUS", id, entityStatus } as const;
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
    dispatch(setAppStatusAC("loading"));
    todolistAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(AddTodolistAC(res.data.data.item));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      dispatch(setErrorAC(error.message));
    })
    .finally(() => {
      dispatch(setAppStatusAC("idle"));
    });
};

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(ChangeTodolistEntityStatusAC(todolistId, "loading"));
  todolistAPI
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(RemoveTodolistAC(todolistId));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      dispatch(setErrorAC(error.message));
      dispatch(ChangeTodolistEntityStatusAC(todolistId, "idle"));
    })
    .finally(() => {
      dispatch(setAppStatusAC("idle"));
    });
};

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.updateTodolist(todolistId, title).then(() => {
    dispatch(ChangeTodolistTitleAC(todolistId, title));
    dispatch(setAppStatusAC("succeeded"));
  });
};
