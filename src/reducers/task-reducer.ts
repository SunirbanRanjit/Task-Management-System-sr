import { Injector } from "@angular/core";
import { Action } from "src/actions";
import {  TASK_CREATE, TASK_DELETE, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_UPDATE } from "src/actions/task-action";

import { Task } from "src/app/model/task";

export interface TaskReducerState {
    loading: boolean;
    loaded: boolean;
    tasks: Task[];
    timeStamp?: string;
    log:string[];
};

const initialState: TaskReducerState = {
    loaded: false,
    loading: false,
    tasks: [],
    timeStamp: (new Date()).toISOString(),
    log: [],
};



export function TaskReducer(state = initialState, action: Action ): TaskReducerState {
    
    switch (action.type){
        case TASK_LIST_REQUEST : {
            const timeStamp = (new Date()).toISOString();
            const log = state.log.concat(`Task List Request Action: ${timeStamp} \n\n#########\n\n`);
            return {...state, loading: true, timeStamp,log};
        }
        case TASK_LIST_SUCCESS: {
            const timeStamp = (new Date()).toISOString();
            const data = action.payload.data;
            const log = state.log.concat(`Task List Success Action at ${timeStamp} data: \n ${JSON.stringify(data)} \n\n#########\n\n`);
            return {...state, loading: false, loaded: true, tasks: data,timeStamp,log};
        }
        case TASK_CREATE: {
            const timeStamp = (new Date()).toISOString();
            const data = state.tasks.concat(action.payload.data);
            const log = state.log.concat(`Task Create Request Action: At ${timeStamp} \n Added task: ${JSON.stringify(action.payload.data)} \n\n#########\n\n`);
            return {...state, loading: false, loaded: true, tasks: data,timeStamp,log};
        }
        case TASK_UPDATE: {
            const timeStamp =(new Date()).toISOString();
            const Id = action.payload.data.Id;
            const UpdatedData = action.payload.data.data;
            const log = state.log.concat(`Update Action: Id: ${Id}, Changes done ,${JSON.stringify(UpdatedData)}, At:,${timeStamp} \n\n#########\n\n`);
            return {...state, loading: false, loaded: false,timeStamp,log };
        }
        case TASK_DELETE: {
            const timeStamp = (new Date()).toISOString();
            const tasks = state.tasks.filter(data=> data.Id !== action.payload.data);
            const log = state.log.concat(`Task Delete Request Action: At ${timeStamp} \n Deleted Id : ${action.payload.data}\n\n#########\n\n`);
            return {...state,...tasks,timeStamp,log};
        }
        
    }
    return state;
}

//selectors

export const getLoading = (state: TaskReducerState) => state.loading;
export const getLoaded = (state: TaskReducerState) => state.loaded;
export const getTasks = (state: TaskReducerState) => state.tasks;
export const getLogs = (state: TaskReducerState) => state.log;
