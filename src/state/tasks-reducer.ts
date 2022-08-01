import { Dispatch } from "redux";
import { TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
import { TasksStateType } from "../App";
import { AppRootStateType } from "./store";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter((t) => t.id != action.taskId);
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
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) => (t.id === action.taskId ? { ...t, status: action.status } : t));

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      let newTaskArray = todolistTasks.map((t) => (t.id == action.taskId ? { ...t, title: action.title } : t));
      state[action.todolistId] = newTaskArray;
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
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId } as const;
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
  return { type: "CHANGE-TASK-STATUS", status, todolistId, taskId };
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId };
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: "SET-TASKS", tasks, todolistId };
};

export const addTaskAC = (task: TaskType) => {
  return { type: "ADD-TASK", task } as const;
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
  };
};

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTask(todolistId, title).then((res) => {
    dispatch(addTaskAC(res.data.data.item));
  });
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(removeTaskAC(taskId, todolistId));
  });
};

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
          status: status,
        })
        .then(() => {
          const action = changeTaskStatusAC(taskId, status, todolistId);
          dispatch(action);
        });
    }
  };
};
