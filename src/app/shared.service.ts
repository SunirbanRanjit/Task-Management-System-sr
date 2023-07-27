import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Task } from './model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sortedData$!: Observable<any[]> ;
  constructor(private fs: Firestore) { }
  getTask(){
    try {
      let taskCollectionRef:CollectionReference = collection(this.fs,'tasks');
    const sortedQuery = query(taskCollectionRef, orderBy('Progress'));
    this.sortedData$ = collectionData(sortedQuery, { idField: 'Id' });
    
    } catch (error) {
      console.log(error);
      
      
    }
    
    return this.sortedData$;
  }

  async addTask(data:Task){
    try {
    let taskCollection = collection(this.fs,'tasks');
    const querySnapshot = await getDocs(taskCollection);
    data.Sl = querySnapshot.size +1;
    const docRef = await addDoc(taskCollection,data);
    return docRef.id;
      
    } catch (error) {
      console.log(error);
      return null;
    }
    
    return null;
  }

  updateTask(Id:any,data:any){
    console.log(Id);    
    let docRef = doc(this.fs,'tasks/'+Id);
    updateDoc(docRef,data);
  }

  deleteTask(Id:any){
    let docRef = doc(this.fs,'tasks/'+Id);
    deleteDoc(docRef); 
  }
}
