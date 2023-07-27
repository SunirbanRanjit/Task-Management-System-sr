import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  add:boolean = false;

  toggleAdd(){
    this.add = !this.add;
  }
}
