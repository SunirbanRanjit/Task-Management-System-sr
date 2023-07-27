import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/reducers';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyDQyp-e9fUXf5bcE0ApenHYu4dn3ocmXHE",
  authDomain: "task-management-system-sr.firebaseapp.com",
  projectId: "task-management-system-sr",
  storageBucket: "task-management-system-sr.appspot.com",
  messagingSenderId: "591575752605",
  appId: "1:591575752605:web:619e372a4c6809fb929974",
  measurementId: "G-EMXVN8Q2W3"
};

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    TaskItemComponent,
    TaskListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(rootReducer),
    AppRoutingModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
