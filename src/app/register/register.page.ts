import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  get firstName(){
    return this.registrationForm.get('first_name');
  }
  get lastName(){
    return this.registrationForm.get('last_name');
  }
  get birth(){
    return this.registrationForm.get('birthday');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get phoneNumber(){
    return this.registrationForm.get('mobile');
  }
  get pass(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  public errorMessages = {
    first_name: [
      { type: 'required', message: 'First Name is required' },
      { type: 'maxlength', message: 'First Name cant be longer than 100 characters' },
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'maxlength', message: 'Last Name cant be longer than 100 characters' },
      { type: 'minlength', message: 'Last Name should be bigger than 2 characters' }
    ],
    birthday: [
      { type: 'required', message: 'Birth Date is required'},
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid Email' }
    ],
    mobile: [ 
      { type: 'required', message: 'Phone number is required' },
      { type: 'minlength', message: 'Your Phone number should be more than 4 numbers.'},
      { type: 'maxlength', message: 'Your Phone number should be less than 15 numbers.'},
      { type: 'pattern', message: 'Please enter a valid Phone Number' }
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Please enter a password bigger than 5 characters'}
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirmation of your password is required'},
      { type: 'minlength', message: 'Your Passwords do not match'}
    ]
    
  }
 
  registrationForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
     lastName: ['',[Validators.required, Validators.minLength(2),Validators.maxLength(100)]],
     birth: [''],
     email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')]],
     phoneNumber:['', [Validators.required,Validators.pattern('^[0-9]{4,15}$'), Validators.maxLength(15),Validators.minLength(4)]],
     pass:['',[Validators.required,Validators.minLength(5)]],
     confirmPassword:['', [Validators.required,Validators.minLength(5)]], //
  });

  serviceRegistration:any="";
  dataFromService:any="";
  isMyRegisterForm:any=[];
  constructor(public http:HttpClient, private formBuilder: FormBuilder, private router : Router) { }


  public submit(){
  
      this.isMyRegisterForm = this.registrationForm.value;

      this.router.navigate(['register2/' + JSON.stringify(this.isMyRegisterForm)]);

      var myRegistrationForm = this.registrationForm.value;
      
      this.sendData(myRegistrationForm).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify(dataReturnFromService);
        
      }, error => {
        console.log(error);
      });
  }

  sendData(myRegistrationForm){
    var url=""
    return this.http.post(url,myRegistrationForm,
      {headers:new HttpHeaders(
        { "content-type":"application/json"
      })})

  }

  navigateRegOne(){
  	this.router.navigate(['register2'])
  }
    navigateBack(){
  	this.router.navigate(['login'])
  }

}
