import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page {
  //greg 
  get country(){
    return this.registrationForm2.get('country');
  }

  get location(){
    return this.registrationForm2.get('location');
  }
  get address(){
    return this.registrationForm2.get('address');
  }

  get zip(){
    return this.registrationForm2.get('zip');
  }

  public errorMessages = {
    country:[
      { type: 'required', message: 'Country is required'},
      { type: 'maxlength', message: 'This field should be no longer than 20 characters'}
    ],
    location:[
      { type: 'required', message: 'Location is required'},
      { type: 'maxlength', message: 'This field should be no longer than 20 characters'}
    ],
    address:[
      { type: 'required', message: 'Address is required'},
      { type: 'maxlength', message: 'This field should be no longer than 20 characters'}
    ],
    zip:[
      { type: 'required', message: 'Zip Code is required'},
      { type: 'maxlength', message: 'This field should be no longer than 20 characters'}
    ],
  }


  registrationForm2 = this.formBuilder.group({
    country:['', [Validators.required, Validators.maxLength(20)]],
    location:['',[Validators.required, Validators.maxLength(20)]],
    address:['',[Validators.required, Validators.maxLength(20)]],
    zip:['',[Validators.required,Validators.pattern('^[0-9]{4,15}$')]]
  })

  serviceRegistration:any="";
  dataFromService:any="";

  
  constructor(public http:HttpClient, private formBuilder: FormBuilder, private router : Router) { }

  public submit(){
  
    console.log(this.registrationForm2.value);
    var myRegistrationForm = this.registrationForm2.value;
    this.sendData(myRegistrationForm).subscribe(
    (dataReturnFromService) => {
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(JSON.stringify(dataReturnFromService));
      console.log( dataReturnFromService['_body'] );
      this.router.navigate(['register3']);
    }, error => {
      console.log(error);
    });
}

sendData(myRegistrationForm){
  var url="https://reqres.in/api/users";
  return this.http.post(url,myRegistrationForm,
    {headers:new HttpHeaders(
      { "content-type":"application/json"
    })})

}
  navigateBack(){
  	this.router.navigate(['register'])
  }

}
