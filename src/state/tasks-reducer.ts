import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
import { TasksStateType } from "../components/App/App";
import { AppActionsType, setAppStatusAC, setErrorAC } from "../components/App/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { AppRootStateType } from "./store";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType
  | AppActionsType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      console.log(action);

      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      console.log({ tasks, state });
      const newTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case "UPDATE-TASK": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) => (t.id === action.taskId ? { ...t, ...action.model } : t));
      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
  return { type: "UPDATE-TASK", model, todolistId, taskId } as const;
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: "SET-TASKS", tasks, todolistId } as const;
};

export const addTaskAC = (task: TaskType) => {
  return { type: "ADD-TASK", task } as const;
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(error.message, dispatch);
    });
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(removeTaskAC(taskId, todolistId));
    dispatch(setAppStatusAC("succeeded"));
  });
};

export const updateTaskTC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"));
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId);

    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          status: task.status,
          ...model,
        })
        .then((res) => {
          if (res.data.resultCode === 0) {
            const action = updateTaskAC(taskId, model, todolistId);
            dispatch(action);
            dispatch(setAppStatusAC("succeeded"));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error: AxiosError) => {
          handleServerNetworkError(error.message, dispatch);
        });
    }
  };
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
