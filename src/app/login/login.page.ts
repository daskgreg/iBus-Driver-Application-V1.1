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

  async getDataFormLoginPageFromServerNatively(){
    console.log('%c Native Http','color:yellow;');
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
   }

   getDataFromServerOldFashionHttp(){
    console.log('%c Old Fashion Http','color:yellow;');
    this.http.get('http://cf11.travelsoft.gr/itourapi/trp_driver_login.cfm?userid=dmta').subscribe( (data) =>{
      console.log(data);
    }, err => {
      console.log('Propably http request no longer exist', err);
    });
   }

   ionViewWillEnter() {
    this.platform.is('cordova') ? this.getDataFormLoginPageFromServerNatively() : this.getDataFromServerOldFashionHttp()
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
    console.log('%c Old Fashion Http Request','color:orange;6');
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

     this.usersData = response;
     this.items = JSON.stringify(this.usersData);
     this.allData = JSON.parse(this.items);
     console.log('%c This is the data of Login','color:orange;');
     console.log(this.allData);
     console.log(this.allData.DRIVER);
     this.driversInformationsLogin = this.allData;
     this.driversInformationLoginForChecks = this.driversInformationsLogin.DRIVER;

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
      console.log('Propably http request no longer exist', err);
    });
 }
 
 async nativeLogin(){
  console.log('Native Http Request');

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



  this.allData = JSON.parse(response.data);
  console.log('%c This is the data of Login','color:orange;');
  console.log(this.allData);
  console.log(this.allData.DRIVER);
  this.driversInformationsLogin = this.allData;
  this.driversInformationLoginForChecks = this.driversInformationsLogin.DRIVER;

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
    console.log('Propably http request no longer exist', err);
  });

  }

  getLoginFromEveryPlatform(){
    this.platform.is('cordova') ? this.nativeLogin() : this.login() ;
  }

  signOut(){
    this.afAuth.signOut().then(
      () => location.reload())
  };

  
 
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
  
  public edited = false;

  saveTodos(): void {
    //show box msg
    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function() {
        this.edited = false;
        console.log(this.edited);
    }.bind(this), 3000);
   }

}

