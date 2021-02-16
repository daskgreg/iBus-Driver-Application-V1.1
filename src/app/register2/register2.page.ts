import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  dataCameFromRegisterPage:any;
  dataCameFromRegisterPageJSON:any;
  thisIsMyRegistrationFromThatIwillAccessData
  
  constructor(private activatedRoute: ActivatedRoute,public http:HttpClient, private formBuilder: FormBuilder, private router : Router) { 
    this.dataCameFromRegisterPage = this.activatedRoute.snapshot.paramMap.get('information');
    this.dataCameFromRegisterPageJSON = JSON.parse(this.dataCameFromRegisterPage);
    console.log('%c Data Came','color:yellow;');
    console.log(this.dataCameFromRegisterPageJSON);
    console.log(this.dataCameFromRegisterPageJSON.email);
  }


  public submit(){
  
    console.log(this.registrationForm2.value);
    this.thisIsMyRegistrationFromThatIwillAccessData = this.registrationForm2.value;
    //address: "address"
   // country: "country"
   // location: "state"
    //zip: "01234"
    console.log('%c COUNTRY ','color:orange;');
    console.log(this.thisIsMyRegistrationFromThatIwillAccessData.country);


    
    var myRegistrationForm = this.registrationForm2.value;
    this.sendData(myRegistrationForm).subscribe(
    (dataReturnFromService) => {
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(JSON.stringify(dataReturnFromService));
      console.log( dataReturnFromService['_body'] );
      this.router.navigate(['register3/' + JSON.stringify(this.dataCameFromRegisterPageJSON) + '/' + JSON.stringify(this.thisIsMyRegistrationFromThatIwillAccessData)]);
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
