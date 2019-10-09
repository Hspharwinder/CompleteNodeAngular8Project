import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Service/authentication.service';
import { Api } from '../path.config/Api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:CrudService, private toastr:ToastrService,
    private auth:AuthenticationService) { }

  getData:any;
  ApiUrl:string = Api.BASEURL;

  ngOnInit() {    
    this.service.get().subscribe((res : any[])=>{
      this.getData = [...res];
      console.log(this.getData);
    },(error)=>{
        if (error.status == 401) {
          this.auth.tokenExpire();
        } else if (error.status == 0) {
          this.toastr.error('Error Api connection refused !!');
        }
        else {
          this.toastr.error('Invalid User Password !!');
        }   
    });
  }

  getGames(gamesObj:any){   
    let gamesArray=[];
    if(gamesObj != undefined){
      for(let [key, value] of Object.entries(gamesObj)){
        gamesArray.push(value)
      }  
    }      
    return gamesArray
  }

  getHobbies(hobbieObj:any[]){
    let hobbieArray = [];
    if(hobbieObj !== undefined){
      for(let [key,value] of Object.entries(hobbieObj)){
        hobbieArray.push(value.item_text);
      }
    }    
    return hobbieArray;
  }
  
  delete(id:string){
    this.service.delete(id).subscribe((res:any)=>{
      this.getData = [...res];
  }, (error) => {
        if (error.status == 401) {
          this.auth.tokenExpire();
        } else if (error.status == 0) {
          this.toastr.error('Error Api connection refused !!');
        }
        else {
          this.toastr.error('Invalid User Password !!');
        }   
    });
  }
  
  logout(){
    this.auth.logout();    
  }

}
