import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { isWithinInterval } from 'date-fns';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { Plugins, CameraResultType } from '@capacitor/core';


const { Camera } = Plugins;

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.page.html',
  styleUrls: ['./routelist.page.scss'],
})
export class RoutelistPage implements OnInit {

  serviceRegistration: any = "";
  dataFromService: any = "";
  img: any;
  dataFromLoginPage: any;
  dataFromLoginPageJSON: any;

  dataFromLoginPageProfile: any;
  dataFromLoginPageProfileJSON: any;

  constructor(private nativeHttp: HTTP, private platform: Platform, private alertController: AlertController, private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController, public http: HttpClient, private router: Router, private languageService: LanguageService) {

    //greg

    this.dataFromLoginPage = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataFromLoginPageJSON = JSON.parse(this.dataFromLoginPage);
    localStorage.setItem("localSettingId", this.dataFromLoginPageJSON);
   

    this.dataFromLoginPageProfile = this.activatedRoute.snapshot.paramMap.get('theprofile');
    this.dataFromLoginPageProfileJSON = JSON.parse(this.dataFromLoginPageProfile);
    localStorage.setItem("localSettingId", this.dataFromLoginPageProfile);
    
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
  RPT_DRIVER_ROUTES_DRIVER_ID;
  startingPointElementFromArrayOfPickups: any;
  theLastPointElementFromArrayOfPickups: any;
  chrbusCust: any = [];
  chrBusCustRoutes: any = [];
  chrBusCustRoutesJSONparse: any;
  chrBusCustRoutesJSONparseToArray: any = [];
  chrBusCustRoutesJSONparseToArrayCUSTPICKUP: any = [];
  RPT_DRIVER_ROUTES_SERVICE_CODE: any;
  rptDriverRoutes: any = [];
  rptDriverRoutesJSONparse: any;
  rptDriverRoutesJSONparseToArray: any = [];
  customPickUps: any = [];
  myPickUp: any;
  theRealPickUp: any = [];
  arrivalPickup: any;
  departurePickup: any;
  CustStartingPointElementFromArrayOfPickups: any;
  CustTheLastPointElementFromArrayOfPickups: any;
  FixedStartingPointElementFromArrayOfPickups: any;
  FixedTheLastPointElementFromArrayOfPickups: any;
  newCustomPickupRoutes: any = [];
  newCustomPickupRoutesJSON: any;
  newCustomPickupRoutesJSONtoArray: any = []
  newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS: any = [];
  chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES: any = [];
  filtered = [...this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES]

  getChangeFunctionFromEveryHTTP() {
    this.platform.is('cordova') ? this.onChangeFromFunctionWitheNativeHTTP() : this.onChangeFromFunctionHTTP();
  }
  onChangeFromFunctionHTTP() {

    const theFirstDate = this.startDate.split('T')[0];

    const theLastDate = this.endDate.split('T')[0];


    this.http.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?'
      + 'driver_id=' + this.dataFromLoginPageJSON + '&from_date=' + theFirstDate + '&to_date=' + theLastDate + '&userid=dmta').subscribe((data) => {
       
        this.rptDriverRoutes = data;
        this.rptDriverRoutesJSONparseToArray = this.rptDriverRoutes;
      
        this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES = this.rptDriverRoutesJSONparseToArray.DRVROUTES
       
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        
        this.filtered = this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.filter(item => {
                return isWithinInterval(new Date(item.ASSIGNMENT_TO_DATE), { start: startDate, end: endDate });
         
        })

        for (var j = 0; j < this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.length; j++) {
        
          if (this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].TYPE === "FIX") {

            this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_route_pup.cfm?' + 'chrbus_code=' + this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].SERVICECODE + '&userid=dmta')
              .subscribe((data) => {

                this.customPickUps = data;
                this.theRealPickUp = this.customPickUps.FIXEDPICKUPS;
                this.FixedStartingPointElementFromArrayOfPickups = this.theRealPickUp[0].CTY_NAME
                this.FixedTheLastPointElementFromArrayOfPickups = this.theRealPickUp[this.theRealPickUp.length-1].CTY_NAME;
              })
          } else {

            this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].SERVICECODE + '&userid=dmta')
              .subscribe((data) => {
            
                this.customPickUps = data;
                this.theRealPickUp = this.customPickUps.CUSTPICKUPS;            
                this.CustStartingPointElementFromArrayOfPickups = this.theRealPickUp[0].PICKUP_ADDRESS
                this.CustTheLastPointElementFromArrayOfPickups = this.theRealPickUp[this.theRealPickUp.length-1].PICKUP_ADDRESS;
              })
          }
        }
        var i = 0;

      })

  }
  async onChangeFromFunctionWitheNativeHTTP() {
    const theFirstDate = this.startDate.split('T')[0];
    const theLastDate = this.endDate.split('T')[0];
    let loader = await this.loadingCtrl.create({
      message: "searching"
    });
    await loader.present();
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 800);
    let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?'
      + 'driver_id=' + this.dataFromLoginPageJSON
      + '&from_date=' + theFirstDate +
      '&to_date=' + theLastDate +
      '&userid=dmta', {}, {
      'Content-Type': 'application/json'
    });
    await from(nativeCall).pipe(
      finalize(() => loader.dismiss())
    )
      .subscribe(async (data) => {


        this.rptDriverRoutesJSONparse = JSON.parse(data.data);
        this.rptDriverRoutesJSONparseToArray = this.rptDriverRoutesJSONparse;
        this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES = this.rptDriverRoutesJSONparseToArray.DRVROUTES
        var i = 0;
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        this.filtered = this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.filter(item => {
          return isWithinInterval(new Date(item.ASSIGNMENT_TO_DATE), { start: startDate, end: endDate });

        })
        for (var j = 0; j < this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES.length; j++) {

          if (this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].TYPE === "FIX") {

            let fixedRoutesNativelyCalled =  this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_route_pup.cfm?' + 'chrbus_code=' + this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].SERVICECODE + '&userid=dmta', {}, {
              'Content-Type': 'application/json'
            });
            await from(fixedRoutesNativelyCalled).pipe(
              finalize(() => loader.dismiss())
            )
              .subscribe((data) => {

                this.customPickUps = JSON.parse(data.data);
                this.theRealPickUp = this.customPickUps.FIXEDPICKUPS;
                for (var i = 0; i < this.theRealPickUp.length; i++) {
                  this.FixedStartingPointElementFromArrayOfPickups = this.theRealPickUp[0].CTY_NAME
                  this.FixedTheLastPointElementFromArrayOfPickups = this.theRealPickUp[i].CTY_NAME;
                }
              })
          } else {

            let customRoutesNativelyCalled = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.chrBusCustRoutesJSONparseToArrayRPTDRIVERROUTES[j].SERVICECODE + '&userid=dmta', {}, {
              'Content-Type': 'application/json'
            });
            from(customRoutesNativelyCalled).pipe(
              finalize(() => loader.dismiss())
            )
              .subscribe((data) => {
                this.customPickUps = JSON.parse(data.data);
                this.theRealPickUp = this.customPickUps.CUSTPICKUPS;
                for (var i = 0; i < this.theRealPickUp.length; i++) {
                  this.CustStartingPointElementFromArrayOfPickups = this.theRealPickUp[0].PICKUP_ADDRESS
                  this.CustTheLastPointElementFromArrayOfPickups = this.theRealPickUp[i].PICKUP_ADDRESS;
                }
              })
          }
        }
      })

  }

  public sendDataToRouteStarted(selectedDatesFromCustomPickups) {


    this.saveMyData(selectedDatesFromCustomPickups).subscribe((dataReturnFromService) => {
      this.dataFromService = JSON.stringify(dataReturnFromService);
      this.router.navigate(['techinspect/' + JSON.stringify(selectedDatesFromCustomPickups) + '/' + JSON.stringify(this.dataFromLoginPageJSON)]);
    });

  }

  saveMyData(dataToSend) {
    var url = "https://reqres.in/api/users";
    return this.http.post(url, dataToSend,
      {
        headers: new HttpHeaders(
          { "Content-type": "Application/json" }
        )
      })
  }





  async takePicture4() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.img = image.base64String;
  }



  async takePhotoWithOldFashionHttpRequest() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.img = image.base64String;
    const formData2 = new FormData();
    formData2.append("photo", this.img);

    var date = new Date().getHours();
    var date2 = new Date().getMinutes();
    var kati = date + "_" + date2;
    this.http.post('http://cf11.travelsoft.gr/itourapi/chrbus_drv_img.cfm?driver_id=16&srv_type=CHT&srv_code=2&sp_id=1&sp_code=6&fromd=2020/11/27&tod=2020/11/27&vehicle_map_id=1025&vhc_id=1&vhc_plates=VFR111&version_id=1&VechicleTypeID=1&virtualversion_id=1&img_type=TOLL&latitude=37.865044&longitude=23.755045&pickup_address=kapou&first_name=christos24&last_name=christos24&time=' + kati + '&userid=dmta', formData2)
      .subscribe(data => {
        console.log(data);
      }
      )
  }
  //
  takePhotoWithNativeHttpRequest() {
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

    var date = new Date().getHours();
    var date2 = new Date().getMinutes();
    var kati = date + "_" + date2;
    this.nativeHttp.post('http://cf11.travelsoft.gr/itourapi/chrbus_drv_img.cfm?driver_id=16&srv_type=CHT&srv_code=2&sp_id=1&sp_code=6&fromd=2020/11/27&tod=2020/11/27&vehicle_map_id=1025&vhc_id=1&vhc_plates=VFR111&version_id=1&VechicleTypeID=1&virtualversion_id=1&img_type=TOLL&latitude=37.865044&longitude=23.755045&pickup_address=kapou&first_name=christos24&last_name=christos24&time=' + kati + '&userid=dmta', formData2, headers)
      .then(data => {

        console.log(data);

      }
      )
      .catch(error => { console.log(error); })


  }

  navigateToSettingsPage() {
    this.router.navigate(["settings"])
  }
  navigateToRouteHistoryPage() {
    this.router.navigate(["routehistory"])
  }
  navigateToTechHistoryPage() {
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
         
          }
        }, {
          text: 'Okay',
          handler: () => {
         
          }
        }
      ]
    });

    await alert.present();
  }
  navigateToProfilePage() {
    this.router.navigate(['profile/' + JSON.stringify(this.dataFromLoginPageProfileJSON)])
  }
  navigateToNotificationsPage() {
    this.router.navigate(['notifications']);
  }
  navigateToRouteListPage() {
    this.router.navigate(['routelist']);
  }
  navigateToCreateRoutePage() {
    this.router.navigate(['createroute']);
  }



}
