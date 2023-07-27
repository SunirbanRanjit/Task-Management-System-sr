import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { TaskListRequestAction, TaskListSuccessAction } from 'src/actions/task-action';
import { Task } from 'src/app/model/task';
import { SharedService } from 'src/app/shared.service';
import { RootReducerState, getAllLogs, getAllTasks, getTaskLoaded, getTaskLoading } from 'src/reducers';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  constructor(private service:SharedService, private store: Store<RootReducerState>){}
  tasks:Task[]=[];
  logs: string[] = [];
  order:boolean[] = [true, true, true, true,true];
  fetchData(){
    const loading$ = this.store.select(getTaskLoading);
    const loaded$ = this.store.select(getTaskLoaded);
    const tasks = this.store.select(getAllTasks);
    const logs = this.store.select(getAllLogs);
    combineLatest([loaded$, loading$]).subscribe((data)=>{
      console.log(data);
      
      if(!data[0] && !data[1]){
        this.store.dispatch(new TaskListRequestAction());
        this.service.getTask().subscribe((res)=>{
          
          this.store.dispatch(new TaskListSuccessAction({data:<Task[]>res}));
        })
      }
    })
    tasks.subscribe((data)=>{
      //console.log(data);
      this.tasks = data;
    });
    logs.subscribe((data)=>{
      this.logs = data;
    })
  }
  exportLog(){
    
    //console.log(this.logs);
    
    const blob = new Blob([this.logs.join('')], { type: 'text/plain' });
    saveAs(blob, 'log.txt');
  
  }
  exportToCSV() {
    const updatedData = this.tasks.map((item) => {
      // Check if the 'id' is 3, then update the 'name' property to 'Bob'
      if (item.Progress === "3") {
        return {
          ...item,
          Progress: 'Completed',
        };
      }
      if (item.Progress === "2") {
        return {
          ...item,
          Progress: 'In Progress',
        };
      }
      if (item.Progress === "1") {
        return {
          ...item,
          Progress: 'Pending',
        };
      }
      return item; // For other objects, keep them unchanged
    });
    const csv = Papa.unparse(updatedData);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'data.csv');
  }
  sortSlNo(){
    if(this.order[0]){
    this.tasks = this.tasks.slice().sort((a, b) => {
     return (a.Sl ?? 0) - (b.Sl ?? 0);
    });
  }else{
    this.tasks = this.tasks.slice().sort((a, b) => {
      return (b.Sl ?? 0) - (a.Sl ?? 0);
     });
    }
    this.order[0] = !this.order[0];
  }
  sortTitle(){
    if(this.order[1]){
    this.tasks = this.tasks.slice().sort((a, b) => {
      return a.Title.localeCompare(b.Title);
     });
    }else{
      this.tasks = this.tasks.slice().sort((b, a) => {
        return a.Title.localeCompare(b.Title);
       });
    }
    this.order[1] = !this.order[1];
  }
  sortPriority(){
    if(this.order[2]){
      this.tasks = this.tasks.slice().sort((a, b) => {
        return a.Priority.localeCompare(b.Priority);
       });
      }else{
        this.tasks = this.tasks.slice().sort((b, a) => {
          return a.Priority.localeCompare(b.Priority);
         });
      }
      this.order[2] = !this.order[2];
  }
  sortDueDate(){
    if(this.order[3]){
      this.tasks = this.tasks.sort((a, b) => {
        // Convert date strings to Date objects
        const dateA = new Date(a.DueDt);
        const dateB = new Date(b.DueDt);
      
        // Compare the Date objects for sorting
        return dateA.getTime() - dateB.getTime();
      });
      
      }else{
        this.tasks = this.tasks.sort((b, a) => {
          // Convert date strings to Date objects
          const dateA = new Date(a.DueDt);
          const dateB = new Date(b.DueDt);
        
          // Compare the Date objects for sorting
          return dateA.getTime() - dateB.getTime();
        });
      }
      this.order[3] = !this.order[3];
  }
  sortStatus(){
    if(this.order[4]){
      this.tasks = this.tasks.slice().sort((a, b) => {
        return a.Progress.localeCompare(b.Progress);
       });
      }else{
        this.tasks = this.tasks.slice().sort((b, a) => {
          return a.Progress.localeCompare(b.Progress);
         });
      }
      this.order[4] = !this.order[4];
  }
  ngOnInit(){
    this.fetchData();
    
  }

}
