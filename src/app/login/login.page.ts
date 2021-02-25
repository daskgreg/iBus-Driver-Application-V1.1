import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
 import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { LanguageService } from '../services/language.service';
import { ConnectProvider } from '../../providers/connect/connect';
import { HTTP } from '@ionic-native/http/ngx';
import { finalize, publish } from 'rxjs/operators';
import { from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	mobile:string;
  pass:string;
  response:any;
  message:string;
  newsData:any;
  flag:any;
  driverID:any;
  personID:any;
  personnel_id:any;
  response2:any;
  kati:any;
  drv_master_json= [{ "driver_id": "16", "person_id": "11", "password": "11" }];
  locations:any;
  
  constructor( 
    public afAuth: AngularFireAuth,
    private languageService: LanguageService,
     private backgroundGeolocation: BackgroundGeolocation,
      private router : Router, 
       public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
         public connect: ConnectProvider,
         private http: HttpClient,
         private platform: Platform, private nativeHttp:HTTP
      ) {
    this.locations= [];
     this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe((location: BackgroundGeolocationResponse) => {
      var locationstr1 = localStorage.getItem("location");
      console.log(locationstr1);
    });
    const { Storage } = Plugins;
        
   }

  //  ionViewWillEnter(){
  //   this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?userid=dmta').subscribe( (data) =>{
  //     console.log(data);
  //   })

  //  }

   async ionViewWillEnter() {
   
    if(this.platform.is('android')){
      try {
      
        
        const url = 'http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?userid=dmta';
        const params = {};
        const headers = {};
  
        const response = await this.nativeHttp.get(url, params, headers);
  
        console.log(response.status);
        console.log(JSON.parse(response.data)); // JSON data returned by server
        console.log(response.headers);
  
      } catch (error) {
        console.error(error.status);
        console.error(error.error); // Error message as string
        console.error(error.headers);
      }
    }else if (this.platform.is('ios')){
        this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?userid=dmta').subscribe( (data) =>{
        console.log(data);
      })
    }else {
      this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?userid=dmta').subscribe( (data) =>{
        console.log(data);
      })
    }
  }

  shit: any = [];
  usersData: any = [];
  items: any;
  results: any;
  allData: any;
  postList = [];
  driversInformationsLogin: any;
  driversInformationLoginForChecks: any = [];


  async login(){
     console.log('in function');
     let loader = await this.loadingCtrl.create({
      message: "Logging in"
    });
    await loader.present();
    loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 800);
    
   localStorage.setItem('mobile',this.mobile)
   localStorage.setItem('pass',this.pass);   

   const params = {};
   const headers = {};

  
      this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?'
      + '&mobile=' + this.mobile+'&password='+this.pass + '&userid=dmta')
  .subscribe( async (response) => {
     console.log(response)
  
   //
     
     this.usersData = response;
     this.items = JSON.stringify(this.usersData);
     console.log("ti exoume?");
     console.log(this.items);
     this.allData = JSON.parse(this.items);
     console.log("ti exoume?");
     console.log("allData",this.allData);
     console.log('%c This is the data of Login','color:orange;');
     console.log(this.allData);
     console.log(this.allData.DRIVER);
     this.driversInformationsLogin = this.allData;
     console.log(this.driversInformationsLogin);
     this.driversInformationLoginForChecks = this.driversInformationsLogin.DRIVER;
     console.log(this.driversInformationLoginForChecks);

     for(var i=0; i<this.driversInformationLoginForChecks.length; i++){
        if(this.driversInformationLoginForChecks[i].FLAG == 1){
          let loader = await this.loadingCtrl.create({
            message: "Successfull Login"
          });
          
          loader.present();

          setTimeout(() => {
            loader.dismiss();
          }, 1000);
          console.log(this.driversInformationLoginForChecks[i].PERSON_ID)
          
           this.router.navigate(['routelist/' + this.driversInformationLoginForChecks[i].DRIVER_ID + '/' + this.driversInformationLoginForChecks[i].PERSON_ID]);   
        }else {
          let loader = await this.loadingCtrl.create({
            message: "Password or login is wrong..."
          });

          loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 800);
        }
     }
    
    }, err =>{
      console.log('Something is wrong', err);
    });
    //  const params = {};
    //  const headers = {};
  
    
    //   const response = await  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?'
    //  + '&mobile=' + this.mobile+'&password='+this.pass + '&userid=dmta', params , headers);
     
    //   //  this.results = data;
    //   //  this.usersData = data;
    //   // this.items = JSON.stringify(response.data);
    //    //console.log("ti exoume?");
    //    //console.log(this.items);
    //    this.allData = JSON.parse(response.data);

  

  //  from().pipe( 
  //    finalize(()=> loader.dismiss())
  //  ).subscribe(data => {
  //   //  console.log(data);
  //   //  this.shit = data;
  //   //  console.log("Shit",this.shit);
  //   //  console.log("before success")
  //   //  this.response = JSON.parse(this.shit);

  //     console.log(data);
  //     this.data = JSON.parse(data.data);
  //    if(this.response == "SUCCESS"){
  //      console.log("we are in")
  //    }else {
  //      console.log("go to sleep");
  //    }
  //  },err => {
  //        console.log("Kati paei lathos:",err);
  //      });
 }
 
 async nativeLogin(){
  console.log('in function');
  let loader = await this.loadingCtrl.create({
   message: "Logging in"
 });
 await loader.present();

 
localStorage.setItem('mobile',this.mobile)
localStorage.setItem('pass',this.pass);   

const params = {};
const headers = {};


   let nativeCall =  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?'
   + '&mobile=' + this.mobile+'&password='+this.pass + '&userid=dmta', {} , {
     'Content-Type': 'application/json'
   });

   from(nativeCall).pipe(
     finalize( () => loader.dismiss())
   )
.subscribe( async (response) => {
  console.log(response)

//
  
  //this.usersData = response;
 //this.items = JSON.stringify(this.usersData);
  //console.log("ti exoume?");
  //console.log(this.items);
  this.allData = JSON.parse(response.data);
  console.log("ti exoume?");
  console.log("allData",this.allData);
  console.log('%c This is the data of Login','color:orange;');
  console.log(this.allData);
  console.log(this.allData.DRIVER);
  this.driversInformationsLogin = this.allData;
  console.log(this.driversInformationsLogin);
  this.driversInformationLoginForChecks = this.driversInformationsLogin.DRIVER;
  console.log(this.driversInformationLoginForChecks);

  for(var i=0; i<this.driversInformationLoginForChecks.length; i++){
     if(this.driversInformationLoginForChecks[i].FLAG == 1){
       let loader = await this.loadingCtrl.create({
         message: "Successfull Login"
       });
       
       loader.present();

       setTimeout(() => {
         loader.dismiss();
       }, 1000);
       console.log(this.driversInformationLoginForChecks[i].PERSON_ID)
       
        this.router.navigate(['routelist/' + this.driversInformationLoginForChecks[i].DRIVER_ID + '/' + this.driversInformationLoginForChecks[i].PERSON_ID]);   
     }else {
       let loader = await this.loadingCtrl.create({
         message: "Password or login is wrong..."
       });

       loader.present();
       setTimeout(() => {
         loader.dismiss();
       }, 800);
     }
  }
 
 }, err =>{
   console.log('Something is wrong', err);
 });
 //  const params = {};
 //  const headers = {};

 
 //   const response = await  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?'
 //  + '&mobile=' + this.mobile+'&password='+this.pass + '&userid=dmta', params , headers);
  
 //   //  this.results = data;
 //   //  this.usersData = data;
 //   // this.items = JSON.stringify(response.data);
 //    //console.log("ti exoume?");
 //    //console.log(this.items);
 //    this.allData = JSON.parse(response.data);



//  from().pipe( 
//    finalize(()=> loader.dismiss())
//  ).subscribe(data => {
//   //  console.log(data);
//   //  this.shit = data;
//   //  console.log("Shit",this.shit);
//   //  console.log("before success")
//   //  this.response = JSON.parse(this.shit);

//     console.log(data);
//     this.data = JSON.parse(data.data);
//    if(this.response == "SUCCESS"){
//      console.log("we are in")
//    }else {
//      console.log("go to sleep");
//    }
//  },err => {
//        console.log("Kati paei lathos:",err);
//      });
}

getLoginFromEveryPlatform(){
  this.platform.is('cordova') ? this.nativeLogin() : this.login() ;
}

 signOut(){
  this.afAuth.signOut().then(
    () => location.reload())
};
  // async login(){
  //   localStorage.setItem('mobile',this.mobile)
  //   localStorage.setItem('pass',this.pass)    
  //   console.log(this.mobile);
  //   console.log(this.pass); 
  //   let loader = await this.loadingCtrl.create({
  //     message: "Logging in"
  //   });
  //   loader.present();
  //   this.connect.getJsonLogin().subscribe( (data) => {
  //     console.log("im in")
  //     console.log("loginData : ", data);
  //     let fff = data.json();
  //     this.response = fff;
  //     console.log(this.response);
  //     console.log(this.response.RESPONSE);
  //     this.message = this.response.MESSAGE;
  //     console.log(this.message);
  //     this.response = JSON.parse(this.response);
  //     if (this.response.RESPONSE == "SUCCESS") {
  //       console.log("SUCCESS")
  //     }else {
  //       console.log("FAILURE");
  //     }
  //   }, err => {
  //     console.log("Kati paei lathos:",err);
  //   });
  // }
  
    async loginwithoutapi(){
      
     localStorage.setItem('mobile',this.mobile)
    localStorage.setItem('pass',this.pass)    
    //this.clearInvalid();
    console.log(this.mobile);
    console.log(this.pass); 
    // if(this.errmobile!="" || this.errpass!="")
    //   return;
    let loader = await this.loadingCtrl.create({
      // content: "Logging in..."
      message: "Logging in..."
    })
     loader.present();
      if(this.mobile==this.drv_master_json[0].person_id && this.pass==this.drv_master_json[0].password){
        this.flag=1;
        localStorage.setItem("driver_id",this.drv_master_json[0].driver_id);
        localStorage.setItem("person_id",this.drv_master_json[0].person_id);
      
        console.log("komple");
      } 
      else{
        this.flag=0;
      }
      if (this.flag == "1"){
         loader.dismiss()
         //this.router.navigate(['routelist'])
         // this.router.navigate(['routelist'])
        //   this.navCtrl.setRoot(RoutesPage);
        }
        else{
           loader.dismiss()
          let alert = await this.alertCtrl.create({
                  header: 'Invalid Login!',
                  subHeader: 'Invalid password or phone',
                  buttons: ['Ok']
                });
                alert.present();    
                //this.navCtrl.setRoot(RoutesPage);
        }
  }
   async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  forgot(){
  	this.router.navigate(['forgotpass'])
  }
  register(){
    this.router.navigate(['register'])
  }

}

// async login(){
//   console.log('in function');
//   let loader = await this.loadingCtrl.create({
//    message: "Logging in"
//  });
//  loader.present();
//  setTimeout(() => {
//    loader.dismiss();
//  }, 1000);
 
// localStorage.setItem('mobile',this.mobile)
// localStorage.setItem('pass',this.pass);   

// const params = {};
// const headers = {};


//  this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?'
// + '&mobile=' + this.mobile+'&password='+this.pass + '&userid=dmta',
// {
//  headers:
//    new HttpHeaders(
//      {
//        'Content-Type': 'application/json',
//        'X-Requested-With': 'XMLHttpRequest',
//        'MyClientCert': '',        // This is empty
//        'MyToken': '',
//        'Access-Control-Allow-Headers': 'X-Custom-Header, Upgrade-Insecure-Requests',
//        'Access-Control-Allow-Origin': 'http://travelsoft.gr'        // This is empty
//      }
//    )
// }
// ).subscribe( async (response) => {
//   console.log(response)

// //
  
//   this.usersData = response;
//  this.items = JSON.stringify(this.usersData);
//   //console.log("ti exoume?");
//   //console.log(this.items);
//   this.allData = JSON.parse(this.items);
//   console.log("ti exoume?");
//   console.log("allData",this.allData);
//   console.log('%c This is the data of Login','color:orange;');
//   console.log(this.allData);
//   console.log(this.allData.DRIVER);
//   this.driversInformationsLogin = this.allData;
//   console.log(this.driversInformationsLogin);
//   this.driversInformationLoginForChecks = this.driversInformationsLogin.DRIVER;
//   console.log(this.driversInformationLoginForChecks);

//   for(var i=0; i<this.driversInformationLoginForChecks.length; i++){
//      if(this.driversInformationLoginForChecks[i].FLAG == 1){
//        let loader = await this.loadingCtrl.create({
//          message: "Successfull Login"
//        });
       
//        loader.present();

//        setTimeout(() => {
//          loader.dismiss();
//        }, 1000);
//        console.log(this.driversInformationLoginForChecks[i].PERSON_ID)
       
//         this.router.navigate(['routelist/' + this.driversInformationLoginForChecks[i].DRIVER_ID + '/' + this.driversInformationLoginForChecks[i].PERSON_ID]);   
//      }else {
//        let loader = await this.loadingCtrl.create({
//          message: "Password or login is wrong..."
//        });

//        loader.present();
//        setTimeout(() => {
//          loader.dismiss();
//        }, 800);
//      }
//   }
 
//  });