import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management-system-sr';
/*
  constructor(private service:SharedService){}
  tasks:any=[];

  refreshTasks(){
    this.service.getTask().subscribe((res)=>{
      this.tasks = res;
    })
  }

  ngOnInit(){
    this.refreshTasks();
  }

  addTasks(newTask:Task){
    this.service.addTask(newTask).then((res)=>{
      console.log(res);
      this.refreshTasks();
      
    })
  }
  */
}
