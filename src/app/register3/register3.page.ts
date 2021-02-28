import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
const  { Camera } = Plugins;
@Component({
  selector: 'app-register3',
  templateUrl: './register3.page.html',
  styleUrls: ['./register3.page.scss'],
})
export class Register3Page  {
// http://localhost:8100/register2/%7B%22firstName%22:%22Greg%22,%22lastName%22:%22Daskalakis%22,%22birth%22:%222021-02-12%22,%22email%22:%22dask.gregory@gmail.com%22,%22phoneNumber%22:%226984863548%22,%22pass%22:%22123123%22,%22confirmPassword%22:%22123123%22%7D
  get licNumber(){
    return this.finalRegistrationForm.get('licNumber');
  }
  get plate(){
    return this.finalRegistrationForm.get('plate');
  }
  get registerId(){
    return this.finalRegistrationForm.get('registerId');
  }
  get licenceId(){
    return this.finalRegistrationForm.get('licenceId');
  }
  get profileId(){
    return this.finalRegistrationForm.get('profileId');
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
    plate:['',[Validators.required]],
    // registerId:['', [Validators.required]],
    // profileId:['',[Validators.required]],
    // licenceId:['',[Validators.required]]
  })


  private file:File;
  private filetwo:File;
  private file3:File;
  test2:any;
  img:any;
  reg:any;
  kappa:any;
  ins:any;
  prof:any;
  dataFromRegisterOne:any;
  dataFromRegisterOneJSON:any;
  dataFromRegisterTwo:any;
  dataFromRegisterTwoJSON:any;
  signupIsDone:any;
  constructor( public platform:Platform,public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private nativeHttp: HTTP) {

  this.dataFromRegisterOne = this.activatedRoute.snapshot.paramMap.get('infofromregisterone');
  this.dataFromRegisterOneJSON = JSON.parse(this.dataFromRegisterOne);

  console.log('%c Register 1 ','color:lightblue;');
  console.log(this.dataFromRegisterOneJSON);

  this.dataFromRegisterTwo = this.activatedRoute.snapshot.paramMap.get('infofromregistertwo');
  this.dataFromRegisterTwoJSON = JSON.parse(this.dataFromRegisterTwo);

  console.log('%c Register 2 ','color:lightblue;');
  console.log(this.dataFromRegisterTwoJSON);

   }

   async takePicture4() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.img=image.base64String;
  
  console.log(image);
  }
  call3(){
    const formData2 = new FormData();
    formData2.append("photo", this.img);
   
    console.log(formData2);
    var date= new Date().getHours();
     var date2=new Date().getMinutes();
     var kati= date + "_" + date2;
   this.http.post('http://cf11.travelsoft.gr/itourapi/chrbus_drv_img.cfm?driver_id=16&srv_type=CHT&srv_code=2&sp_id=1&sp_code=6&fromd=2020/11/27&tod=2020/11/27&vehicle_map_id=1025&vhc_id=1&vhc_plates=VFR111&version_id=1&VechicleTypeID=1&virtualversion_id=1&img_type=TOLL&latitude=37.865044&longitude=23.755045&pickup_address=kapou&first_name=christos24&last_name=christos24&time=' + kati + '&userid=dmta', formData2)
   .subscribe(data => {
     console.log(data);
   }
   )



   //native

   
 }

 async takePicture() {
        const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
        });
        
        this.reg=image.base64String;
        
        console.log(image);
        this.kappa=true;
        
        }
        async takePicture2() {
        const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
        });
        this.ins=image.base64String;
        
        console.log(image);
        }
        async takePicture3() {
        const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
        });
        this.prof=image.base64String;
        console.log(image);
        }
        call2(){
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        const formData = new FormData();
        formData.append("reg", this.reg);
        formData.append("ins",this.ins);
        formData.append("prof", this.prof);
        console.log(formData);
        
        this.http.post('http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?first_name=christos24&last_name=christos24&license_number=1235456&birthday=23/02/2020&password=1234567&mobile=0123455555&country=1&location=greece&address=krimpa&zip=123465&email=christos23test@mail.gr&userid=dmta', formData)
        .subscribe(data => {
        console.log(data);
        }
        )
  }
  public submit(){
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const formData = new FormData();
    formData.append("reg", this.reg);
    formData.append("ins",this.ins);
    formData.append("prof", this.prof);
    console.log(formData);
    
    console.log('%c Data From Final Registration Form','color:yellow;');
    console.log(this.finalRegistrationForm.value);

    this.signupIsDone = this.finalRegistrationForm.value;
    console.log('%c Passed Data From Final Registration Form','color:red;');
    console.log(this.signupIsDone.licNumber)
 
  
  this.http.post('http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?'
                  + '&firstName='  + this.dataFromRegisterOneJSON.firstName
                  + '&lastName='   + this.dataFromRegisterOneJSON.lastName
                  + '&licNumber='  + this.signupIsDone.licNumber
                  + '&birthday='      + this.dataFromRegisterOneJSON.birth
                  + '&password='       + this.dataFromRegisterOneJSON.pass
                  + '&mobile='     + this.dataFromRegisterOneJSON.phoneNumber
                  + '&location='   + this.dataFromRegisterTwoJSON.location
                  + '&country='    + 1
                  + '&location='   + this.dataFromRegisterTwoJSON.country
                  + '&address='    + this.dataFromRegisterTwoJSON.address
                  + '&zip='        + this.dataFromRegisterTwoJSON.zip
                  + '&email='      + this.dataFromRegisterOneJSON.email
                  + '&userid=dmta', formData
                  // + '&plate='      + this.signupIsDone.plate
                  ).subscribe( async (data) =>{


                    

                    console.log('%c FINAL DATA FROM SIGN UP BEFORE SEND TO API','color:orange;');
                    console.log(data);

                    let loader = await this.loadingCtrl.create({
                      message:"You have successfully sign up"
                    });
                    loader.present();

                    setTimeout(() => {
                      loader.dismiss();
                      this.router.navigate(['registercomplete']);
                    }, 1000);


                  });

  }
  
  public nativeSubmit(){
 
    
    console.log('%c Data From Final Registration Form','color:yellow;');
    console.log(this.finalRegistrationForm.value);

    this.signupIsDone = this.finalRegistrationForm.value;
    console.log('%c Passed Data From Final Registration Form','color:red;');
    console.log(this.signupIsDone.licNumber)

    this.nativeHttp.setDataSerializer('urlencoded');

    var formData2 = {
      reg:this.reg,
      ins:this.ins,
      prof:this.prof
  
   }
   let headers = {
    "Accept": "application/json",
    "api-auth": 'apiAuthToken String',
    "User-Auth": 'userAuthToken String'
    }
     // const formData2 = new FormData();
    //  formData2.append("photo", this.img);
     
    //  console.log(formData2);
    this.nativeHttp.setDataSerializer('urlencoded');
    this.nativeHttp.setHeader('*', 'Content-Type', 'application/x-www-form-urlencoded');
    // this.http_native.post('url String', formData, headers).then(api_response => {
  
   // });
      var date= new Date().getHours();
      var date2=new Date().getMinutes();
      var kati= date + "_" + date2;
   
  
  this.nativeHttp.post('http://cf11.travelsoft.gr/itourapi/trp_driver_signup.cfm?'
                  + '&first_name='  + this.dataFromRegisterOneJSON.firstName
                  + '&last_name='   + this.dataFromRegisterOneJSON.lastName
                  + '&license_number='  + this.signupIsDone.licNumber
                  + '&birthday='      + this.dataFromRegisterOneJSON.birth
                  + '&password='       + this.dataFromRegisterOneJSON.pass
                  + '&mobile='     + this.dataFromRegisterOneJSON.phoneNumber
                  + '&location='   + this.dataFromRegisterTwoJSON.location
                  + '&country='    + 1
                  + '&address='    + this.dataFromRegisterTwoJSON.address
                  + '&zip='        + this.dataFromRegisterTwoJSON.zip
                  + '&email='      + this.dataFromRegisterOneJSON.email
                  + '&userid=dmta', formData2, headers
                  // + '&plate='      + this.signupIsDone.plate
                  ).then( async (data) =>{


                    

                    console.log('%c FINAL DATA FROM SIGN UP BEFORE SEND TO API','color:orange;');
                    console.log(data);

                    let loader = await this.loadingCtrl.create({
                      message:"You have successfully sign up"
                    });
                    loader.present();

                    setTimeout(() => {
                      loader.dismiss();
                      this.router.navigate(['registercomplete']);
                    }, 1000);


                  }).catch(error=>{console.log(error)});
  }

  getSignUpFromEveryPlatForm(){
    this.platform.is('cordova') ? this.nativeSubmit() : this.submit() ;
  }

  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
  }
  
 
 
  


  registerCompleted(){
  	this.router.navigate(['registercomplete'])
  }

  navigateBack(){
  	this.router.navigate(['register2/' + JSON.stringify(this.dataFromRegisterTwoJSON) ]);
  }





} 