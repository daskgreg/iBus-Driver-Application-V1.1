import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-routehistory',
  templateUrl: './routehistory.page.html',
  styleUrls: ['./routehistory.page.scss'],
})
export class RoutehistoryPage implements OnInit {

  serviceRegistration:any="";
	dataFromService:any="";

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
    console.log('Old Fashion HTTP');
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

  getCustomPickupDataWithNativeHTTP(){
    console.log('Native HTTP');
    let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta', {}, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize( () => console.log('finalizing'))
    ).subscribe( (data) => {

      this.myPickUp = JSON.parse(data.data);
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
          console.log('%c FOUND THE SERVICE','color:red;');
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICE);
      
          console.log('%c local storage chrbus_sp_id','color:yellow;'); // chrbus_sp_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].CHRBUS_SP_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_CHRBUS_SP_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].CHRBUS_SP_ID);

          console.log('%c local storage DRIVER_ID','color:orange;'); // driver_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].DRIVER_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_DRIVER_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].DRIVER_ID);

          console.log('%c local storage SERVICECODE','color:red;'); // service_code
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE);
          this.RPT_DRIVER_ROUTES_SERVICE_CODE =  this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE;

          console.log('%c local storage VEHICLE_MAP_ID','color:blue;'); // vehicle_map_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VEHICLE_MAP_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_VEHICLE_MAP_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VEHICLE_MAP_ID);

          console.log('%c local storage VHC_PLATES','color:green;'); // vhc_plates
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VHC_PLATES);
          localStorage.setItem('RPT_DRIVER_ROUTES_VHC_PLATES', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VHC_PLATES)

          console.log('%c local storage SP_CODE','color:green;'); // sp_code
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SP_CODE);
          localStorage.setItem('RPT_DRIVER_ROUTES_SP_CODE', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SP_CODE)

                
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
     
      
      // if(1){
      //   console.log("Start Date:", this.startDate);
      //   console.log("End Date", this.endDate);
      //   console.log("JSON Date:", this.routes.date);

      //   if(!this.startDate || !this.endDate){
      //     console.log('Date is missing')
      //     return 
      //   }
      //       const startDate = new Date(this.startDate); 
      //       const endDate = new Date(this.endDate);
    
      //       this.filtered = this.routes.filter(item => {
      //         return isWithinInterval(new Date(item.date), { start: startDate, end: endDate });
      //     })
    
      // }else{
      //   console.log('Try Again this if');
      // }
    } )


   
  }
  onChangeFromFunctionWitheNativeHTTP(){
    console.log('Native HTTP')
    const theFirstDate = this.startDate.split('T')[0];
    console.log("THE FIRST DATE", theFirstDate);
    const theLastDate = this.endDate.split('T')[0];
    console.log("THE LAST DATE", theLastDate);
    console.log("You selected FROM:");

   let nativeCall =  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?' 
                  + 'driver_id=' + this.dataFromLoginPageJSON 
                  + '&from_date=' + theFirstDate + 
                  '&to_date=' + theLastDate + 
                  '&userid=dmta', {}, {
                    'Content-Type': 'application/json'
                  });
                  from(nativeCall).pipe(
                    finalize( () => console.log('finalizing'))
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
          console.log('%c FOUND THE SERVICE','color:red;');
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICE);
      
          console.log('%c local storage chrbus_sp_id','color:yellow;'); // chrbus_sp_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].CHRBUS_SP_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_CHRBUS_SP_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].CHRBUS_SP_ID);

          console.log('%c local storage DRIVER_ID','color:orange;'); // driver_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].DRIVER_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_DRIVER_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].DRIVER_ID);

          console.log('%c local storage SERVICECODE','color:red;'); // service_code
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE);
          this.RPT_DRIVER_ROUTES_SERVICE_CODE =  this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE;

          console.log('%c local storage VEHICLE_MAP_ID','color:blue;'); // vehicle_map_id
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VEHICLE_MAP_ID);
          localStorage.setItem('RPT_DRIVER_ROUTES_VEHICLE_MAP_ID', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VEHICLE_MAP_ID);

          console.log('%c local storage VHC_PLATES','color:green;'); // vhc_plates
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VHC_PLATES);
          localStorage.setItem('RPT_DRIVER_ROUTES_VHC_PLATES', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].VHC_PLATES)

          console.log('%c local storage SP_CODE','color:green;'); // sp_code
          console.log(this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SP_CODE);
          localStorage.setItem('RPT_DRIVER_ROUTES_SP_CODE', this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SP_CODE)

                
                let nativeCalling =   this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' 
                + 'route_id=' + this.rptDriverRoutesJSONparseToArray.DRVROUTES[i].SERVICECODE 
                + '&userid=dmta', {}, {

                });
                 from(nativeCalling).pipe(
                  finalize( () => console.log('finalizing'))
                )
                .subscribe( (data) =>{

 
                  this.newCustomPickupRoutesJSON = JSON.parse(data.data);
                  this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
                  this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
                })
                
        i++;
      }
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


