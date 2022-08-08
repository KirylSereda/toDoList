import { TasksStateType, TodolistType } from "../components/App/App";
import { tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, TodolistDomainType, todolistsReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let newTodolist: TodolistType = {
    id: "6",
    title: "666",
    filter: "all",
    addedDate: "25-09-95",
    oreder: 2,
  };

  const action = AddTodolistAC(newTodolist);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
