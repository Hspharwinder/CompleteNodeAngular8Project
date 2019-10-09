import { Injectable } from '@angular/core';
import { Data } from '../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private data:Data) { }
  
  getCheckBox(){
    return this.data.gamesCheckBoxList;
  }
  getDepartment(){
    return this.data.Dept;
  }
  gethobbiesList(){
    return this.data.hobbiesList;
  }

  getRole():any {
    return this.data.role;
  }
  
}
