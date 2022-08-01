import axios from "axios";
import { TodolistType } from "../App";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "a0295f8a-9fa1-4dbc-8a4a-eedb6d5d31b8",
  },
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists/`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(`todo-lists/`, { title: title });
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  getTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post(`/todo-lists/${todolistId}/tasks`, { title: title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};

type GetTasksResponseType = {
  error: string | null;
  items: TaskType[];
  totalCount: number;
};

type BaseResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: T;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

// export type TodolistType = {
//   id: string;
//   title: string;
//   addedDate: string;
//   order: number;
// };
// export type ResponseType<D = {}> = {
//   resultCode: number;
//   messages: Array<string>;
//   fieldsErrors: Array<string>;
//   data: D;
// };

// export enum TaskStatuses {
//   New = 0,
//   InProgress = 1,
//   Completed = 2,
//   Draft = 3,
// }

// export enum TaskPriorities {
//   Low = 0,
//   Middle = 1,
//   Hi = 2,
//   Urgently = 3,
//   Later = 4,
// }

// export type TaskType = {
//   description: string;
//   title: string;
//   status: TaskStatuses;
//   priority: TaskPriorities;
//   startDate: string;
//   deadline: string;
//   id: string;
//   todoListId: string;
//   order: number;
//   addedDate: string;
// };
// export type UpdateTaskModelType = {
//   title: string;
//   description: string;
//   status: TaskStatuses;
//   priority: TaskPriorities;
//   startDate: string;
//   deadline: string;
// };
// type GetTasksResponse = {
//   error: string | null;
//   totalCount: number;
//   items: TaskType[];
// };
