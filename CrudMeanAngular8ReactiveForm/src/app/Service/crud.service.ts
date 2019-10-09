import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL, Api } from '../path.config/Api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {    

  constructor(private http:HttpClient) { }

  fileUpload(data:any) : Observable<any>{
    let url = BaseURL + Api.FilePost;
    return this.http.post(`${url}`, data);
  }

  post(data: any) : Observable<any>{    
    console.log("service ===  ", data);
    let url = BaseURL + Api.POST;
    return this.http.post(`${url}`, data);
  }

  get() : Observable<any>{
    let url = BaseURL + Api.GET;
    return this.http.get(`${url}`);
  }

  getById(id:string) : Observable<any>{
    let url = BaseURL + Api.GET + '/' + id;
    return this.http.get(`${url}`);
  }

  delete(id:string) : Observable<any>{
    let url = BaseURL + Api.DELETE + id;
    return this.http.delete(`${url}`);
  }
  put(data: any) : Observable<any>{
    let url = BaseURL + Api.PUT;
    return this.http.put(`${url}`, data);
  }
}





















// cors error  
// out of component use const
// const httpOptions = {
//    headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//           'Access-Control-Allow-Origin' : '*'
//       });
//     };

// pass header 
// public get(){
//   let url = BaseURL + Api.GET;
//   return this.http.get(`${url}`, httpOptions);
// }

// inside component userInfo private
// const httpOptions = {
//   headers : new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//       'Access-Control-Allow-Origin' : '*'
//   })
// }


// pass header 
// public get(){
//   let url = BaseURL + Api.GET;
//   return this.http.get(`${url}`, {head: this.headers});
// }

//append like this 
// in method
// getTour(id: string){
  //  httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
//     httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
// }

