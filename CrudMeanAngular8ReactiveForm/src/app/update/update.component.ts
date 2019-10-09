import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { DataService } from '../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Service/authentication.service';
import { Api } from '../path.config/Api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  getData: any[];
  formValue: FormGroup;
  hobbiesList:any;
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  female: boolean;
  male: boolean;
  gamesCheckBoxList: { item_id: number; item_text: string; }[];
  selectedGames: any = [];
  res: any;
  Dept: { id: number; name: string; desi: string[]; }[];
  designation: string[];
  otherTextBox: boolean = false;
  selectedhobbiesList: any[];
  fileImageUrl: string;
  filePost: any;
  fullPath: string;

  constructor(
    private service:CrudService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private dataService:DataService,
    private router:Router,
    private toastr:ToastrService,
    private auth:AuthenticationService,
    ) {     
      
    }

  ngOnInit() {  
    let id = this.gettParamId();        
    this.initialData(id); 
    this.bindingDropdownCheckBox(); 
    this.createFormBuilder();   
    this.dropdownListSettings();   
  } 

  initialData(id:string){
    this.service.getById(id).subscribe((res:any)=>{    
     /***  this format is used in less than angular v6  ****/
     // this.formBindingOldVersion(res); 

       /***  Code for binding reactive form in angular v6 and above   ****/
       this.formBinding(res);    
    },(error)=>{
      if(error.status == 401){ 
        this.auth.tokenExpire();
      }else{        
        this.toastr.error(error);
      }
    })    
  }

  formatingHobbies(hobbies:any){
    let arr = [];
      if(hobbies || hobbies !== undefined){
        for(let [key,value] of Object.entries(hobbies)){
          arr.push(value);            
        }
      }
      return arr;
  }

  dropdownListSettings(){
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

  gettParamId(){
    let id;
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];    
        // console.log(`${id}`);
      });
      return id;
  }

  createFormBuilder(){
    this.formValue = this.formBuilder.group({
      name : new FormControl(),
      dept : new FormControl(),
      designation : new FormControl(),
      email : new FormControl(),
      password: new FormControl(),
      gender : new FormControl(),
      hobbies : new FormControl(),
      games : new FormControl([]),
      otherGames : new FormControl(),
      fileUpload: new FormControl(''), 
    });
  }

  bindingDropdownCheckBox(){
    this.gamesCheckBoxList = this.dataService.getCheckBox();
    this.Dept = this.dataService.getDepartment()
    this.hobbiesList = this.dataService.gethobbiesList();
  }
  deptChange(e:any){
    const value = e.target.value;
    this.filterDesigantion(value);   
  }

  filterDesigantion(value:any){
    this.designation = this.Dept.filter(x => x.name == value)[0].desi;
    console.log(this.designation)
  }

   // initialize all value checked = false of gamesCheckBoxList
   addListControl(games:any){
    const arr = this.gamesCheckBoxList.map(element=>{
      let check = false;
      //logic for setting value true selected checkbox(this logic only for getting selected value) 
      //Start: no need of this logic if you don't want get selected checkbox value default      
      if(games || games !== undefined){
        let Values = Object.values(games);
        for(let [key,value] of Object.entries(Values)){
          for(let [key2,value2] of Object.entries(value)){
            if(value2 == element.item_text)
              check = true;
          }
        }
      }  
      //End :     
      //end logic for set true selected checkbox  
      
      // binding checkbox values from gamesCheckBoxList
        return this.formBuilder.control(check);
      });  
    return this.formBuilder.array(arr);
  }

  // property of gamesCheckBoxList it would be call each time on checkbox clicking 
  get checkList(){
    return <FormArray>this.formValue.get('games');
  } 

 
  formBinding(res:any){
    this.formValue.get('name').setValue(res.name);
    this.formValue.get('dept').setValue(res.dept);  
    
    // filtering designation accroding dept
    this.filterDesigantion(res.dept);
    this.formValue.get('designation').setValue(res.designation);
    this.formValue.get('email').setValue(res.email);
    this.formValue.get('password').setValue(res.password);    

    // formating hobbies according third party dropdown for showing selected value
    this.selectedhobbiesList = this.formatingHobbies(res.hobbies); 
    this.formValue.get('hobbies').setValue(this.selectedhobbiesList); // binding records in reactive form field

    // code for gender binding logic
    this.genderBinding(res);

    //logic for binding checkbox and selected Checkbox
    this.formValue.controls.games = this.addListControl(res.games);

    if(res.otherGames) this.otherTextBox = true; 
    this.formValue.get('otherGames').setValue(res.otherGames);
    
    // if(res.filePath){

    // }
    
  }

  genderBinding(res:any){
    // gender selecting
    // this.formValue.controls.gender = res.gender;
    this.formValue.get('gender').setValue(res.gender);

    this.male = res.gender==="male" ? true:false;
    this.female = this.male ? false:true;
    
  }

  onCheckChange(event) {
    //console.log(event);
    // adding selected values in selectedGames Array
    //this.getCheckBoxValues();    
  }

  getCheckBoxValues(){
    this.checkList.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedGames.push(this.gamesCheckBoxList[i].item_text);
      }
    });
  }
  
  onSubmit(form :any){
    //console.log(form);
    console.log("form worked"); 

    // checkboxs selected/true values inserted in Array 
    this.getCheckBoxValues();  

    // adding checkbox values in form Object
    // if selectedGames Empty enter empty array otherwise push error throw because there is no array name of game
    let games = this.selectedGames ||  [];  
    let otherGames = this.formValue.value.otherGames;
    if(this.otherTextBox && otherGames){
      games.push(...otherGames.split(',')); 
      console.log({...this.formValue.value, games});     
    }
    else{
      delete this.formValue.value.games; // if games property empty delete it
      // console.log({...this.formValue.value,games});
    }
    let id = this.gettParamId(); // getting id of record
    let put = {id, ...this.formValue.value, games};

    const fileUpload = this.fileImageUrl;      
    if(fileUpload) {      
      console.log({...put,fileUpload});
      put = {...put,fileUpload};
    }
    console.log("-------", put);
    this.service.put(put).subscribe((res)=>{
      this.router.navigateByUrl('/home');
    },(error) => {
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

  onItemSelect(hobbies:any){
    console.log("hobbies  ",hobbies);
  }
  onSelectAll(hobbiesAll:any){
    console.log("hobbiesAll  ", hobbiesAll);
  }
  otherChange(e:any){
    this.otherTextBox = !this.otherTextBox;
    console.log(e);    
  }

  uploadFile(file: File[]) {
    this.filePost = new FormData();
    if (file.length > 0) {
      this.filePost.append('File', file[0]);
      this.fileUpload();
    }
  }

  fileUpload() {
    this.service.fileUpload(this.filePost).subscribe((res) => {
      console.log(res);
      if (res.fileUploadSucess) {
        this.fileImageUrl = res.filePath;
        this.fullPath = Api.BASEURL + this.fileImageUrl;
      }
      else
        console.log("File uploading Fail!!");
    }, (error) => {
      if (error.status == 401) {
        this.auth.tokenExpire();
      } else {
        this.toastr.error(error);
      }
    })
  }
  

}
