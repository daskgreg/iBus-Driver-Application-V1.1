import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  dataForPersonId:any;
  dataForPersonIdJSON:any;
  getProfileInfo:any = [];
  getProfileJSON:any = [];
  getProfileJSONtoArray:any = [];

  get firstName(){
      return this.profileRegistrationUpdateForm.get('firstName');
  }
  get lastName(){
      return this.profileRegistrationUpdateForm.get('lastName');
  }
  get address(){
      return this.profileRegistrationUpdateForm.get('address');
  }
  get city(){
      return this.profileRegistrationUpdateForm.get('city');
  }
  get state(){
      return this.profileRegistrationUpdateForm.get('state');
  }
  get email(){
      return this.profileRegistrationUpdateForm.get('email');
  }
  get phoneNumber(){
      return this.profileRegistrationUpdateForm.get('phoneNumber');
  }
  get licenceNumber(){
      return this.profileRegistrationUpdateForm.get('licenceNumber');
  }
  get plateNumber(){
      return this.profileRegistrationUpdateForm.get('plateNumber');
  }



  profileRegistrationUpdateForm = this.formBuilder.group({
    firstName:['', [ Validators.required ]],
    lastName:['',[Validators.required]],
    address:['',[Validators.required]],
    city:['',[Validators.required]],
    state:['',[Validators.required]],
    email:['',[Validators.required]],
    phoneNumber:['',[Validators.required]],
    licenceNumber:['',[Validators.required]],
    plateNumber:['',[Validators.required]],
  })


  constructor(public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder, private http: HttpClient,private router : Router) {

    this.dataForPersonId = this.activatedRoute.snapshot.paramMap.get('personid');
    this.dataForPersonIdJSON = JSON.parse(this.dataForPersonId);
    console.log('%c PERSON ID','color:blue;');
    console.log(this.dataForPersonIdJSON);

    this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_details.cfm?' 
                  + 'person_id=' + this.dataForPersonIdJSON
                  + '&userid=dmta' ).subscribe( (data) => {
                    console.log(data);
                    this.getProfileInfo = data;
                    this.getProfileJSONtoArray = this.getProfileInfo.DRIVER;
                    console.log(this.getProfileJSONtoArray);
                  })
   }

  submit(){
    console.log('%c Information from Profile','color:yellow;');
    console.log(this.profileRegistrationUpdateForm.value);

    // this.http.get('updateProfile')
  }
  ngOnInit() {
  }
  navigateToFeedPage(){
  	this.router.navigate(['login'])
  }
}
