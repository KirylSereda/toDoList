import { Provider } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { AppRootStateType } from "./store";
import React from "react";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: '2',
        title: 'react',
        description: '66',
        todoListId: '3',
        order: 2,
        status: 3,
        priority: 4,
        startDate: '5564',
        deadline: '55',
        addedDate: '26.02.22',
        completed: 2,
      },
    ],
    ["todolistId2"]: [
      {
        id: '2',
        title: 'react',
        description: '5564',
        todoListId: '3',
        order: 2,
        status: 3,
        priority: 4,
        startDate: '5564',
        deadline: '5564',
        addedDate: '26.02.22',
        completed: 2,
      },
    ],
  },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider
    store={storyBookStore}>{storyFn()}
  </Provider>)
