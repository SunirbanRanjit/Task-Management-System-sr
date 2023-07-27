
import { Task } from "src/app/model/task";

export const TASK_LIST_REQUEST = 'task list request';
export const TASK_LIST_SUCCESS = 'task list success';

export const TASK_CREATE = 'task create';

export const TASK_UPDATE = 'task update';

export const TASK_DELETE = 'task delete';
export class TaskListRequestAction {
    readonly type = TASK_LIST_REQUEST;
    
}

export class TaskListSuccessAction {
    readonly type = TASK_LIST_SUCCESS;
    constructor(public payload?: {data: Task[]} ) {
    }
    
    
}

export class TaskCreateAction {
    readonly type = TASK_CREATE;
    constructor(public payload?: {data: Task}) {
    }
    
}
export class TaskUpdateAction {
    readonly type = TASK_UPDATE;
    constructor(public payload?: {data: any}) {
    }
    
}
export class TaskDeleteAction {
    readonly type = TASK_DELETE;
    constructor(public payload?: {data: any}) {
    }
    
}
