import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskDeleteAction, TaskUpdateAction } from 'src/actions/task-action';
import { Task } from 'src/app/model/task';
import { SharedService } from 'src/app/shared.service';
import { RootReducerState } from 'src/reducers';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input()
  task!: Task;
  
  updatedTask:any = {};

  visible = false;
  edit = false;
  constructor(private service:SharedService, private store: Store<RootReducerState>){}
    toggleCollapse(): void {
      this.visible = !this.visible;
      
        this.edit = false;
      
    }
    toggleEdit(): void {
      if(this.edit){
        this.save();
      }
      this.edit = !this.edit;
    }
    onRadioChange(e:any){
      this.updatedTask.Priority = e.target.value;
    }
    modelChangeTitle(value:string) {
      this.updatedTask.Title = value;
    }
    modelChangeDescription(value:string) {
      this.updatedTask.Description = value;
    }
    modelChangeDueDt(value:string) {
      this.updatedTask.DueDt = value;
    }
    modelChangeProgress(value:any) {
      this.updatedTask.Progress = value;
    }
    modelChangePriority(value:string) {
      this.updatedTask.Priority = value;
    }
    save(){
      console.log(this.updatedTask);
      this.service.updateTask(this.task.Id,this.updatedTask);
      this.store.dispatch(new TaskUpdateAction({data:{Id:this.task.Id,data:this.updatedTask}}));
    }
    deleteT(){
      this.service.deleteTask(this.task.Id);
      this.store.dispatch(new TaskDeleteAction({data:this.task.Id}));
    }
  
}

