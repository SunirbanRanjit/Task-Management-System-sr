import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InputComponent } from './components/input/input.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routs: Routes = [{
  path: '', component: HomeComponent,
  children: [
    {path: 'add',component: InputComponent },
    {path: '', component: TaskListComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
