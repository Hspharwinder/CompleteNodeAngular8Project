import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, ControlContainer, Validators } from '@angular/forms';
import { CrudService } from '../Service/crud.service';
import {Router} from '@angular/router';
import { Api } from '../path.config/Api';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  otherTextBox = false;  
  filePost: FormData; 
  formValue:FormGroup;
  selectedGames:any=[];
  hobbiesList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  gamesCheckBoxList: any;
  Dept: { id: number; name: string; desi: string[]; }[];
  designation: any;
  validError: boolean;
  uploadForm: FormGroup;
  fileImageUrl: string;
  fullPath :string;
 

  constructor(private formBuilder:FormBuilder, 
    private service:CrudService, 
    private router:Router,
    private toastr: ToastrService,
    private auth: AuthenticationService,)
  {
    this.getHobbieList();
    this.getGamesCheckBox();
    this.formBuilderControl();    
    this.dropdownSett();  
    this.getDept();
  } 

  uploadFile(file:File[]){
    this.filePost = new FormData();
    if(file.length>0){
      this.filePost.append('File', file[0]);      
      this.fileUpload();   
    }     
  }

  onSubmit(form :any){
    if(this.formValue.invalid){
      this.valildateAll(form);
    } 
    else{                  
      this.postData();
    }      
  }

  fileUpload(){
    this.service.fileUpload(this.filePost).subscribe((res)=>{
      console.log(res);
      if(res.fileUploadSucess){   
        this.fileImageUrl = res.filePath; 
        this.fullPath = Api.BASEURL + this.fileImageUrl;
      }
      else
        console.log("File uploading Fail!!");
    }, (error) => {
      if (error.status == 401) {
        this.auth.tokenExpire();
      }else if (error.status == 0) {
          this.toastr.error('Error Api connection refused !!');
        }
        else {
          this.toastr.error('Invalid User Password !!');
        }   
    })   
  }


  /////*****  Validation code start *******/////  

  formBuilderControl(){
    this.formValue = this.formBuilder.group({
      name : ['', Validators.required],
      dept : new FormControl('',  Validators.required),
      designation : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required,Validators.email]),
      password: ['', [Validators.required,Validators.minLength(5)]],
      gender : new FormControl('', Validators.required),
      hobbies : new FormControl('', Validators.required),
      games : this.addListControl(),
      otherGames : new FormControl(''),
      fileUpload:new FormControl(''),      
    });
  }


  // incase user directly submitting form without touching control,validation apply on Submit
  //***** start: simple validation
  valildateAll(formValue:FormGroup){
    Object.keys(formValue.controls).forEach(element => {
      const control = formValue.get(element);
      if(control instanceof FormControl){
        control.markAllAsTouched();
      }
    });

    // validation for checkbox
    if(!this.typeGames.value && this.games.untouched)
      this.validError = true;
  }
   //***** End: simple validation


  /******  Start: check validation code  ********/
  onCheckChange(event) {
    //console.log(event);
    this.selectedGames = [];
    // adding selected values in selectedGames Array
    this.checkList.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedGames.push(this.gamesCheckBoxList[i].item_text);
      }
    });
    
    //code for checkbox validation 
    this.checkboxValidation();    
  }  

  clickTextBoxGames(e:any){
    this.typeGames.setValue(e.target.value);
    this.checkboxValidation();
  }

  otherChange(e:any){
    this.otherTextBox = !this.otherTextBox;
    console.log(e);    
    //code for checkbox validation 
    this.checkboxValidation();
  } 

  checkboxValidation(){
    this.validError = this.selectedGames.length || (this.typeGames.value && this.otherTextBox)  ? false:true;
    console.log("this.validError", this.validError);
  } 
  /***** End: Check validation code ********/

  /////*****  End Validation code start *******///// 

  ngOnInit(){
  }

  postData(){
    // adding checkbox values in form Object
    let games = this.selectedGames || [];  // if selectedGames Empty enter empty array otherwise push error throw because there is no array name of game
    let otherGames = this.typeGames.value;
    if(this.otherTextBox && otherGames){
      games.push(...otherGames.split(',')); 
      console.log({...this.formValue.value, games});     
    }
    else{
      delete this.formValue.value.games; // if games property empty delete it
      console.log({...this.formValue.value,games});
    };   

    let post = {...this.formValue.value, games};

    const fileUpload = this.fileImageUrl;    
    console.log({...post,fileUpload});
    post = {...post,fileUpload}
   
    this.service.post(post).subscribe((res)=>{
      this.router.navigateByUrl('/home');
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

  // initialize all value checked = false of gamesCheckBoxList
  addListControl(){
    const arr = this.gamesCheckBoxList.map(element=>{
      return this.formBuilder.control(false);
    });   
    return this.formBuilder.array(arr);
  }

 
  onItemSelect(hobbies:any){
    console.log("hobbies  ",hobbies);
  }
  onSelectAll(hobbiesAll:any){
    console.log("hobbiesAll  ", hobbiesAll);
  }
  
  deptChange(e:any){
   const value = e.target.value;
   this.designation = this.Dept.filter(x => x.name == value)[0].desi;
   console.log(this.designation)
  }

   // property of gamesCheckBoxList it would be call each time on checkbox clicking 
   get checkList(){
    return <FormArray>this.formValue.get('games');
  }

  get pwd(){
    return this.formValue.get('password');
  }

  get dept(){
    return this.formValue.get('dept');
  }
  get desi(){
    return this.formValue.get('designation');
  }
  get games(){
    return this.formValue.get('games');
  }
  get typeGames(){
    return this.formValue.get('otherGames');
  }

  getHobbieList(){
    this.hobbiesList = [
      { item_id: 1, item_text: 'Action' },
      { item_id: 2, item_text: 'Comedy' },
      { item_id: 3, item_text: 'Drama' },
      { item_id: 4, item_text: 'Romance' },
      { item_id: 5, item_text: 'Dance' }
    ];   
  }

  getGamesCheckBox(){
    this.gamesCheckBoxList  = [
      { item_id: 1, item_text: 'Cricket' },
      { item_id: 2, item_text: 'Puzzle' },
      { item_id: 3, item_text: 'Chess' },
    ];
  }

  getDept(){
    this.Dept = [
      { id: 1, name: 'Development', desi: ['Manager', 'TeamLead', 'TeamMemeber']  },
      { id: 2, name: 'Management', desi: ['Director', 'CTO', 'HR']  },
      { id: 3, name: 'Desiging', desi: ['Sr.Designer', 'Designer', 'Jr.Designer'] },
    ];
  }

  dropdownSett(){
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

}
