import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { appReducer } from "../components/App/app-reducer";
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppRootStateType = ReturnType<typeof rootReducer>;
