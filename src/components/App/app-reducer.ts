export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed" | "progress-percent";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
};

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.value };
    default:
      return state;
  }
};

export type setAppStatusType = ReturnType<typeof setAppStatusAC>;
export type setErrorType = ReturnType<typeof setErrorAC>;

export type AppActionsType = setAppStatusType | setErrorType;
export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: "APP/SET-STATUS", status } as const;
};

export const setErrorAC = (value: null | string) => {
  return { type: "APP/SET-ERROR", value } as const;
};
