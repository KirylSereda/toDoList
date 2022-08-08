import { Dispatch } from "redux";
import { BaseResponseType } from "../api/todolist-api";
import { setAppStatusAC, setErrorAC } from "../components/App/app-reducer";
import { ActionsType } from "../state/tasks-reducer";

export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: Dispatch<ActionsType>) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("Some error"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (message: string, dispatch: Dispatch<ActionsType>) => {
  dispatch(setErrorAC(message));
  dispatch(setAppStatusAC("failed"));
};
