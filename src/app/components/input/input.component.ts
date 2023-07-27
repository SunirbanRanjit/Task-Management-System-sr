import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { SharedService } from 'src/app/shared.service';

import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  Priority:any = '3';
  constructor(private service:SharedService){}
  log(t:any){
    console.log(t);
    
  }
  onSubmit(form:NgForm){
    const f = form.value.formGroupValues;
    
    this.addTasks({Title:f.title, DueDt:f.dueDt, Priority:this.Priority, Description:f.description,Progress:'1' });
    
    
  }
  addTasks(newTask:Task){
   
    try {
      this.service.addTask(newTask).then((res)=>{
      if(res !== (undefined || null)){
        alert("Task saved Successfully!");
        
      } 
    })
    } catch (error) {
      console.log(error);
      return false;
    }
    return;
  }
  onRadioChange(e:any){
    this.Priority = e.target.value;
  }
  
}
