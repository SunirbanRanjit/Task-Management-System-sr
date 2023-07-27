import { ActionReducerMap, createSelector } from "@ngrx/store";
import { TaskReducer, TaskReducerState, getLoaded, getLoading, getLogs, getTasks } from "./task-reducer";

export interface RootReducerState {
    tasks: TaskReducerState;
}

export const rootReducer : ActionReducerMap<RootReducerState> = {
    tasks: TaskReducer
};

export const getTaskState = (state: RootReducerState) => state.tasks;

export const getTaskLoaded = createSelector(getTaskState,getLoaded);
export const getTaskLoading = createSelector(getTaskState,getLoading);
export const getAllTasks = createSelector(getTaskState,getTasks);
export const getAllLogs = createSelector(getTaskState,getLogs);