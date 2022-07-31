import axios from "axios";

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
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, { title: title });
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};

type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

type TaskType = {
  id: string;
  title: string;
  description: null;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate: null;
  deadline: null;
  addedDate: string;
  completed: boolean;
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
