import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import {Plugins} from '@capacitor/core';
import { interval } from 'rxjs';
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

const {Geolocation, LocalNotifications, App, BackgroundTask} = Plugins;
declare var cordova;
declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  i:any=0;
  arr:any;
  constructor(
    private backgroundFetch: BackgroundFetch,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    private backgroundGeolocation: BackgroundGeolocation,
 
   
  ) {
      const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };




  //    const config: BackgroundFetchConfig = {
  //   stopOnTerminate: false, // Set true to cease background-fetch from operating after user "closes" the app. Defaults to true.
  // }
   

  // Stop the background-fetch API from firing fetch events. Your callbackFn provided to #configure will no longer be executed.
  // backgroundFetch.stop();

    App.addListener('appStateChange', (state) => {
      console.log(this.arr);
 //  if (!state.isActive) {
 //     backgroundFetch.configure(config)
 //     .then(() => {
 //         console.log('Background Fetch initialized');
 //         LocalNotifications.schedule({
 //        notifications:[
 //          {
 //            title: 'REMINDER2',
 //            body: 'test',
 //            id: 1,
 //          }
 //        ]
 //      })

 //          this.backgroundFetch.finish("com.travel.busdriver");

 //     })
 //     .catch(e => console.log('Error initializing background fetch', e));

 //  // Start the background-fetch API. Your callbackFn provided to #configure will be executed each time a background-fetch event occurs. NOTE the #configure method automatically calls #start. You do not have to call this method after you #configure the plugin
 //  backgroundFetch.start();

 // //      let taskId = BackgroundTask.beforeExit(async () => {
 // //        console.log("Active");
 // //        interval(10000).subscribe(x => {
 // //    LocalNotifications.schedule({
 // //        notifications:[
 // //          {
 // //            title: 'REMINDER2',
 // //            body: 'test',
 // //            id: 1,
 // //          }
 // //        ]
 // //      })
 // // });
 // //        });
 //       }
})
    this.initializeApp();

 //             this.backgroundMode.enable();
         
 //          this.backgroundMode.on("activate").subscribe(()=>{
 //        this.backgroundMode.disableWebViewOptimizations();
 //       this.backgroundMode.disableBatteryOptimizations();
 //      console.log("background activate !!!!");
 //       interval(10000).subscribe(x => {
 //    LocalNotifications.schedule({
 //        notifications:[
 //          {
 //            title: 'REMINDER',
 //            body: 'test',
 //            id: 1,
 //          }
 //        ]
 //      })

 // });
      
 //  });
   this.arr=[];
  }

  initializeApp() {
   
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
  .then(() => {

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      var locationstr = localStorage.getItem("location");
      console.log(locationstr);
      if(locationstr == null){
        this.arr.push(location);
      } 
      else{
        var locationarr = JSON.parse(locationstr);
        this.arr = locationstr;
      }
      localStorage.setItem("location",JSON.stringify(this.arr));
      console.log(this.arr);

      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
       this.backgroundGeolocation.finish(); // FOR IOS ONLY
    console.log(this.arr);
    });
    this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe((location2: BackgroundGeolocationResponse) => {
      var locationstr1 = localStorage.getItem("location2");
      console.log(locationstr1);
    })

  });
    this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe((location2: BackgroundGeolocationResponse) => {
      var locationstr1 = localStorage.getItem("location2");
      console.log(locationstr1);
    })
// this.backgroundGeolocation.start();

// start recording location



       
                    // this.backgroundMode.disableWebViewOptimizations();
                
       // this.check();
//        setTimeout(() => {
//     this.check();
//     // this.envoieNotif();
// }, 10000);
    });
  }
  check(){
     setTimeout(() => {
    this.check();
}, 10000);
      if (this.backgroundMode.isEnabled){

      console.log("kate");
      
      // var response=  Geolocation.getCurrentPosition();
      // console.log(response);
      console.log(this.i);
      this.i++;

      LocalNotifications.schedule({
        notifications:[
          {
            title: 'REMINDER',
            body: 'test',
            id: 1,
          }
        ]
      })
      }
  }
  check2(){
      interval(10000).subscribe(x => {
    LocalNotifications.schedule({
        notifications:[
          {
            title: 'REMINDER2',
            body: 'test',
            id: 1,
          }
        ]
      })
 });
  }
}
