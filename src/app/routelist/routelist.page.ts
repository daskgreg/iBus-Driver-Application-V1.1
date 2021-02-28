import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LanguageService } from '../services/language.service';
import {  isWithinInterval } from 'date-fns';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { Plugins, CameraResultType } from '@capacitor/core';


const { Camera } = Plugins ;

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.page.html',
  styleUrls: ['./routelist.page.scss'],
})
export class RoutelistPage implements OnInit {

  serviceRegistration:any="";
	dataFromService:any="";
  img:any;
  dataFromLoginPage:any;
  dataFromLoginPageJSON:any;

  dataFromLoginPageProfile:any;
  dataFromLoginPageProfileJSON:any;
  constructor(private nativeHttp: HTTP, private platform:Platform ,private alertController:AlertController,private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController,public http:HttpClient,private router : Router, private languageService: LanguageService) {

    //greg

    this.dataFromLoginPage = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataFromLoginPageJSON = JSON.parse(this.dataFromLoginPage);
    console.log('%c Print Data from Login','color:orange;');
    console.log(this.dataFromLoginPageJSON);

    this.dataFromLoginPageProfile = this.activatedRoute.snapshot.paramMap.get('theprofile');
    this.dataFromLoginPageProfileJSON = JSON.parse(this.dataFromLoginPageProfile);
    console.log(this.dataFromLoginPageProfileJSON);
   }

  ngOnInit() {
  }

//greg 
  myDate: String = new Date().toISOString();
  allDates;
  startDate;
  endDate;
  invalidSelection: boolean = false;
  routes: any = [];
  filtered = [...this.routes];
  RPT_DRIVER_ROUTES_DRIVER_ID;

  startingPointElementFromArrayOfPickups:any;
  theLastPointElementFromArrayOfPickups:any;

  chrbusCust:any = [];

  chrBusCustRoutes: any = [];
  chrBusCustRoutesJSONparse:any;
  chrBusCustRoutesJSONparseToArray:any = [];
  chrBusCustRoutesJSONparseToArrayCUSTPICKUP:any = [];

  RPT_DRIVER_ROUTES_SERVICE_CODE:any;
  rptDriverRoutes: any = [];
  rptDriverRoutesJSONparse:any;
  rptDriverRoutesJSONparseToArray:any = [];
  customPickUps:any = [];
  myPickUp:any;
  theRealPickUp:any = [];
  chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES:any = [];
  arrivalPickup:any;
  departurePickup:any;


  newCustomPickupRoutes:any=[];
  newCustomPickupRoutesJSON:any;
  newCustomPickupRoutesJSONtoArray:any = []
  newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS:any = [];
  ionViewWillEnter(){
    console.log('RERE')
    this.platform.is('cordova') ? this.getCustomPickupDataWithNativeHTTP() : this.getCustomPickupDataWithHTTP();
  }

  getCustomPickupDataWithHTTP(){
    console.log('Old Fashion HTTP Custom PIckup');
    this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta')
    .subscribe( (data) => {
      console.log(data);
      this.customPickUps = data;
      this.myPickUp = JSON.parse(this.customPickUps);
      this.theRealPickUp = this.myPickUp.CUSTPICKUPS;
      console.log('%c JSON PARSE','color:red;');
      console.log(this.myPickUp);
      console.log('%c TheReal array Pickups','color:orange;');
      console.log(this.theRealPickUp);
      
      for ( var i = 0; i < this.theRealPickUp.length; i++){
        console.log(this.theRealPickUp[0].PICKUP_ADDRESS);
        console.log(this.theRealPickUp[i].PICKUP_ADDRESS);
        this.startingPointElementFromArrayOfPickups = this.theRealPickUp[0].PICKUP_ADDRESS
        this.theLastPointElementFromArrayOfPickups = this.theRealPickUp[i].PICKUP_ADDRESS;
      }    
    } )
  }
nativePickup = [];
data = [];
nativePickupArray:any;
nativePickupArrayArray:any = [];
 async getCustomPickupDataWithNativeHTTP(){

  let loader = await this.loadingCtrl.create();
  await loader.present();

   //let url = 'http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta';
   let url = ''
   let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta', {}, {
    'Content-Type': 'application/json'
   });

     from(myNativeCall).pipe(
       finalize( () => loader.dismiss())
       )
     .subscribe( data => {
     
     let parsed = JSON.parse(data.data).CUSTPICKUPS;

     this.data = parsed;

     this.nativePickupArray = this.data;


      console.log(this.nativePickupArray)
      this.nativePickupArrayArray = this.nativePickupArray.PICKUP_ADDRESS;
      console.log(this.nativePickupArrayArray)
     for ( var i = 0; i < this.nativePickupArray.length; i++){

        console.log(this.nativePickupArray[0].PICKUP_ADDRESS);
        console.log(this.nativePickupArray[i].PICKUP_ADDRESS);
    
        this.startingPointElementFromArrayOfPickups = this.nativePickupArray[0].PICKUP_ADDRESS
        this.theLastPointElementFromArrayOfPickups = this.nativePickupArray[i].PICKUP_ADDRESS;
      }  
      console.log(this.startingPointElementFromArrayOfPickups);
      console.log(this.theLastPointElementFromArrayOfPickups);
    
   }, err => {
     console.log('Native error',err);
   } )
     
      
        
    
  }

  getChangeFunctionFromEveryHTTP(){
    this.platform.is('cordova') ? this.onChangeFromFunctionWitheNativeHTTP() : this.onChangeFromFunctionHTTP();
  }
  onChangeFromFunctionHTTP(){
    console.log('Old Fashion HTTP')
    const theFirstDate = this.startDate.split('T')[0];
    console.log("THE FIRST DATE", theFirstDate);
    const theLastDate = this.endDate.split('T')[0];
    console.log("THE LAST DATE", theLastDate);
    console.log("You selected FROM:");

    this.http.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?' 
                  + 'driver_id=' + this.dataFromLoginPageJSON + '&from_date=' + theFirstDate + '&to_date=' + theLastDate + '&userid=dmta').subscribe( (data)=>{
      console.log(data);
      this.rptDriverRoutes = data;
      this.rptDriverRoutesJSONparse = JSON.parse(this.rptDriverRoutes);
      this.rptDriverRoutesJSONparseToArray = this.rptDriverRoutesJSONparse;
      console.log('%c RPT DRIVER ROUTES','color:pink;');
      console.log(this.rptDriverRoutesJSONparseToArray);
      console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES.DRIVER_ID);
      this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES = this.rptDriverRoutesJSONparseToArray.DRVROUTES
      console.log(this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.SERVICECODE);
      var i=0;
      

      // this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.SERVICECODE + '&userid=dmta')
      // .subscribe( (data) =>{
      //   console.log('%c GAMW TIN PANAGIA');
      //   console.log(data);
        
      // })


      while(i<this.rptDriverRoutesJSONparseToArray.DRVROUTES.length){ // Looking for Chapter Bus Service 

        if(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICE == 'CHT'){
                  this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE + '&userid=dmta')
                .subscribe( (data) =>{
                  console.log('%c DATA','color:red;');
                  console.log(data);
                  this.newCustomPickupRoutes = data;
                  this.newCustomPickupRoutesJSON = JSON.parse(this.newCustomPickupRoutes);
                  this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
                  this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
                })
                
        i++;
      }
    }                  
     
      
   
    } )


   
  }
  async onChangeFromFunctionWitheNativeHTTP(){
    console.log('Native HTTP')
    const theFirstDate = this.startDate.split('T')[0];
    console.log("THE FIRST DATE", theFirstDate);
    const theLastDate = this.endDate.split('T')[0];
    console.log("THE LAST DATE", theLastDate);
    console.log("You selected FROM:");
    let loader = await this.loadingCtrl.create({
      message: "searching"
    });
    await loader.present();
    loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 800);
   let nativeCall =  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?' 
                  + 'driver_id=' + this.dataFromLoginPageJSON 
                  + '&from_date=' + theFirstDate + 
                  '&to_date=' + theLastDate + 
                  '&userid=dmta', {}, {
                    'Content-Type': 'application/json'
                  });
                  from(nativeCall).pipe(
                    finalize( () => loader.dismiss())
                  )
                  .subscribe( (data)=>{


                      this.rptDriverRoutesJSONparse = JSON.parse(data.data);
                      this.rptDriverRoutesJSONparseToArray = this.rptDriverRoutesJSONparse;
                      console.log('%c RPT DRIVER ROUTES','color:pink;');
                      console.log(this.rptDriverRoutesJSONparseToArray);
                      console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES.DRIVER_ID);
                      this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES = this.rptDriverRoutesJSONparseToArray.DRVROUTES
                      console.log(this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.SERVICECODE);
                      var i=0;
      


      while(i<this.rptDriverRoutesJSONparseToArray.DRVROUTES.length){ // Looking for Chapter Bus Service 

        if(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICE == 'CHT'){
       

                
                let nativeCalling =   this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' 
                + 'route_id=' + this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE 
                + '&userid=dmta', {}, {

                });
                 from(nativeCalling).pipe(
                  finalize( () => loader.dismiss())
                )
                .subscribe( (data) =>{

 
                  this.newCustomPickupRoutesJSON = JSON.parse(data.data);
                  this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
                  this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
                }, err => {
                  console.log('Error on Cust Routes');
                })
                
        i++;
      }
      console.log('finish');
    }                  
    } )

  }

  public sendDataToRouteStarted(selectedDatesFromCustomPickups){
    
    
    this.saveMyData(selectedDatesFromCustomPickups).subscribe((dataReturnFromService) =>{
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(this.dataFromService['_body']);

      this.router.navigate(['techinspect/'+ JSON.stringify(selectedDatesFromCustomPickups) + '/' +JSON.stringify(this.dataFromLoginPageJSON)]);
    });

    }

    saveMyData(dataToSend){
      var url="https://reqres.in/api/users";
      return this.http.post(url,dataToSend,
        {headers:new HttpHeaders(
          {"Content-type":"Application/json"}
        )})
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
    
       
  
   async takePhotoWithOldFashionHttpRequest(){
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
      });
      this.img=image.base64String;
    
    console.log(image);

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
    }
    //
    takePhotoWithNativeHttpRequest(){
      this.nativeHttp.setDataSerializer('urlencoded');
      var formData2 = {
        photo: this.img
    
     }
     let headers = {
      "Accept": "application/json",
      "api-auth": 'apiAuthToken String',
      "User-Auth": 'userAuthToken String'
      }
      
      this.nativeHttp.setDataSerializer('urlencoded');
    this.nativeHttp.setHeader('*', 'Content-Type', 'application/x-www-form-urlencoded');
 
       var date= new Date().getHours();
        var date2=new Date().getMinutes();
        var kati= date + "_" + date2;
      this.nativeHttp.post('http://cf11.travelsoft.gr/itourapi/chrbus_drv_img.cfm?driver_id=16&srv_type=CHT&srv_code=2&sp_id=1&sp_code=6&fromd=2020/11/27&tod=2020/11/27&vehicle_map_id=1025&vhc_id=1&vhc_plates=VFR111&version_id=1&VechicleTypeID=1&virtualversion_id=1&img_type=TOLL&latitude=37.865044&longitude=23.755045&pickup_address=kapou&first_name=christos24&last_name=christos24&time=' + kati + '&userid=dmta', formData2, headers)
      .then(data => {
       
        console.log(data);
       
      }
      )
      .catch(error=>{console.log(error);})
    
 
    }

    navigateToSettingsPage(){
      this.router.navigate(["settings"])
    }
    navigateToRouteHistoryPage(){
      this.router.navigate(["routehistory"])
    }
    navigateToTechHistoryPage(){
      this.router.navigate(["techhistory"])
    }
 
    async navigateToWalletPage() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Select Route!',
        message: '<strong>Select Route before trying to enter into Wallet</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
    navigateToProfilePage(){
      console.log('%c going to profile')
      console.log(this.dataFromLoginPageJSON.PERSON_ID);
      this.router.navigate(['profile/' + JSON.stringify(this.dataFromLoginPageProfileJSON)])
    }
    navigateToNotificationsPage(){
      this.router.navigate(['notifications']);
    }
    navigateToRouteListPage(){
      this.router.navigate(['routelist']);
    }
    navigateToCreateRoutePage(){
      this.router.navigate(['createroute']);
    }
  


  }
 