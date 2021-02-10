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
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

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
         private platform: Platform
      ) {

        
        
    this.locations= [];
     this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe((location: BackgroundGeolocationResponse) => {
      var locationstr1 = localStorage.getItem("location");
      console.log(locationstr1);
    });
   }

   ionViewWillEnter(){
   

   }

  



   shit: any = [];
  usersData: any = [];
  items: any;
  results: any;
  allData: any;
  postList = [];
 async login(){
     let loader = await this.loadingCtrl.create({
      message: "Logging in"
    });
    loader.present();
    
   localStorage.setItem('mobile',this.mobile)
   localStorage.setItem('pass',this.pass)   
  
   this.http.get('http://localhost:3000/login2?users'
   + '&mobile=' + this.mobile+'&password='+this.pass ).pipe( 
     finalize( () => loader.dismiss() )
   )
   .subscribe( async data => {
     this.results = data;
     this.usersData = data;
     this.items = JSON.stringify(this.usersData);
     this.allData = JSON.parse(this.items);

     for (var i=0; i<this.allData.length; i++){

        if(this.allData[i].mobile == this.mobile){

          let loader = await this.loadingCtrl.create({
            message: "Successfull Login"
          });
          
          loader.present();

          setTimeout(() => {
            loader.dismiss();
          }, 1000);
           var id = this.allData[i].id;
           this.router.navigate(['routelist/', id]);   
          
        }else {
          let loader = await this.loadingCtrl.create({
            message: "Please try again.."
          });

          loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 800);
        }
     }
   }, err => {
     console.log('Kati paizei', err);
   });

  

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
         this.router.navigate(['routelist'])
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
