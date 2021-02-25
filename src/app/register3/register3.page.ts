import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register3',
  templateUrl: './register3.page.html',
  styleUrls: ['./register3.page.scss'],
})
export class Register3Page  {

  get licNumber(){
    return this.finalRegistrationForm.get('licNumber');
  }
  get plate(){
    return this.finalRegistrationForm.get('plate');
  }

  public errorMessages = {
    licNumber:[
      {type:'required', message: 'Please Fill Licence Number'},
    ],
    plate:[
      {type:'required', message: 'Please Fill Plates Number'}
    ]
  }

  finalRegistrationForm = this.formBuilder.group({
    licNumber:['', [Validators.required]],
    plate:['',[Validators.required]]
  })


  private file:File;
  private filetwo:File;
  private file3:File;

  dataFromRegisterOne:any;
  dataFromRegisterOneJSON:any;
  dataFromRegisterTwo:any;
  dataFromRegisterTwoJSON:any;
  signupIsDone:any;
  constructor( public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

  this.dataFromRegisterOne = this.activatedRoute.snapshot.paramMap.get('infofromregisterone');
  this.dataFromRegisterOneJSON = JSON.parse(this.dataFromRegisterOne);

  console.log('%c Register 1 ','color:lightblue;');
  console.log(this.dataFromRegisterOneJSON);

  this.dataFromRegisterTwo = this.activatedRoute.snapshot.paramMap.get('infofromregistertwo');
  this.dataFromRegisterTwoJSON = JSON.parse(this.dataFromRegisterTwo);

  console.log('%c Register 2 ','color:lightblue;');
  console.log(this.dataFromRegisterTwoJSON);

   }

  public submit(){

    console.log('%c Data From Final Registration Form','color:yellow;');
    console.log(this.finalRegistrationForm.value);

    this.signupIsDone = this.finalRegistrationForm.value;
  //   console.log('%c Passed Data From Final Registration Form','color:red;');
  //   console.log(this.signupIsDone.licNumber)
  //   //http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?userid=dmta&firstName=Gregory&lastName=Daskalakis&licNumber=9999999&birth=2021-02-20&pass=606060&mobile=5050&location=Heraklion&country=33&address=Krimpa1&zip=71500&email=dask.gregory@gmail.com&plate=54545454
  //      // cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?userid=dmta&firstName=greg&lastName=dask&licNumber=123123&birth=12/02/2020&pass=123123&mobile=321321321&location=greece&country=1&address=krimpa&zip=50500&email=asd@mail.gr&plate=4444
  // // http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm? 
  // // cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?%20userid=dmta&firstName=Gregory&lastName=Daskalakis&licNumber=999999999&birth=2021-02-20&pass=606060&mobile=5050&location=Heraklion&country=33&address=Krimpa1&zip=71500&email=dask.gregory@gmail.com&plate=44444
  //  this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?userid=dmta'
                  // + '&firstName='  + this.dataFromRegisterOneJSON.firstName
                  // + '&lastName='   + this.dataFromRegisterOneJSON.lastName
                  // + '&licNumber='  + this.signupIsDone.licNumber
                  // + '&birth='      + this.dataFromRegisterOneJSON.birth
                  // + '&pass='       + this.dataFromRegisterOneJSON.pass
                  // + '&mobile='     + this.dataFromRegisterOneJSON.phoneNumber
                  // + '&location='   + this.dataFromRegisterTwoJSON.location
                  // + '&country='    + 33
                  // + '&address='    + this.dataFromRegisterTwoJSON.address
                  // + '&zip='        + this.dataFromRegisterTwoJSON.zip
                  // + '&email='      + this.dataFromRegisterOneJSON.email
                  // + '&plate='      + this.signupIsDone.plate
                  // ).subscribe( async (data) =>{


                    

                  //   console.log('%c FINAL DATA FROM SIGN UP BEFORE SEND TO API','color:orange;');
                  //   console.log(data);

                  //   let loader = await this.loadingCtrl.create({
                  //     message:"You have successfully sign up"
                  //   });
                  //   loader.present();

                  //   setTimeout(() => {
                  //     loader.dismiss();
                  //     this.router.navigate(['registercomplete']);
                  //   }, 1000);


                  // });

  } 
  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
  }


  async submitForm(){
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    this.http.get("http://cf21.travelsoft.gr/ibus/images/drivers/drv_2535/ + formData").subscribe((response) => {
    console.log(response);
    });
  }


  registerCompleted(){
  	this.router.navigate(['registercomplete'])
  }

  navigateBack(){
  	this.router.navigate(['register2/' + JSON.stringify(this.dataFromRegisterTwoJSON) ]);
  }

}
