import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

const { Camera } = Plugins;

@Component({
  selector: 'app-routestarted',
  templateUrl: './routestarted.page.html',
  styleUrls: ['./routestarted.page.scss'],
})
export class RoutestartedPage implements OnInit {
  chrbus_passengers_json = [{ "vehicle_map_id": "2245", "pass_id": "1", "first_name": "Christos", "last_name": "Sotidis", "mobile": "123456", "email": "christos@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2245", "pass_id": "2", "first_name": "Christos2", "last_name": "Sotidis2", "mobile": "123456", "email": "christos2@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2246", "pass_id": "3", "first_name": "Christos3", "last_name": "Sotidis3", "mobile": "123456", "email": "christos3@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2246", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2250", "pass_id": "1", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2250", "pass_id": "2", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2251", "pass_id": "1", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2251", "pass_id": "2", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2247", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2248", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" },
  { "vehicle_map_id": "2249", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000" }];

  custom = localStorage.getItem('custom');
  ekkinisiRoute = localStorage.getItem('ekkinisiRoute');
  ekkinisiCust = localStorage.getItem('ekkinisiCust');
  startPlace: any;
  vehmapId: any;
  passCounter = 0;
  dataFromRouteList: any;
  dataFromRouteListJSON: any;
  dataFromRouteListLogin: any;
  dataFromRouteListLoginJSON: any;
  goToMap: any;
  startingPoint: any;
  img: any;
  Id: any;
  personId: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private nativeHttp: HTTP, private loading: LoadingController, private platform: Platform) {



    this.dataFromRouteList = this.activatedRoute.snapshot.paramMap.get('xyz');

    this.dataFromRouteListLogin = this.activatedRoute.snapshot.paramMap.get('loginid');

    this.dataFromRouteListJSON = JSON.parse(this.dataFromRouteList);

    this.dataFromRouteListLoginJSON = JSON.parse(this.dataFromRouteListLogin);


    this.Id = this.dataFromRouteListLoginJSON
    this.personId = this.dataFromRouteListJSON.PERSON_ID
    var i = 0;

    if (this.custom == "true") {
      this.startPlace = this.ekkinisiCust;
      this.vehmapId = localStorage.getItem('custVehmap');
    }
    else if (this.custom == "false") {
      this.startPlace = this.ekkinisiRoute;
      this.vehmapId = localStorage.getItem('vehmapid');
    }
    for (i = 0; i < this.chrbus_passengers_json.length; i++) {
      if (this.vehmapId == this.chrbus_passengers_json[i].vehicle_map_id) {
        this.passCounter++;
      }
    }
  }

  async ionViewWillEnter() {
    let loader = await this.loading.create({
      message: 'Data Loading'
    });
    await loader.present();
    this.platform.is('cordova') ? this.getCustomPickupFromNativeHttp() : this.getCustomPickupFromHttpClient();
    loader.dismiss();
  }

  getCustomPickupFromHttpClient() {

    if (this.dataFromRouteListJSON.TYPE == 'FIX') {

      this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_route_pup.cfm?' + 'chrbus_code=' + this.dataFromRouteListJSON.SERVICECODE + '&userid=dmta')
        .subscribe(async (data) => {
          let loader = await this.loading.create({
            message: 'Data Loading'
          });
          this.newCustomPickupRoutes = data;
          this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
          this.goToMap = this.newCustomPickupRoutesJSON;
          this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
          this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.FIXEDPICKUPS
          this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].CTY_NAME
          loader.dismiss();
        })
    } else {
      this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.dataFromRouteListJSON.SERVICECODE + '&userid=dmta')
        .subscribe(async (data) => {
          let loader = await this.loading.create({
            message: 'Data Loading'
          });
          await loader.present();
          this.newCustomPickupRoutes = data;
          this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
          this.goToMap = this.newCustomPickupRoutesJSON;
          this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
          this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
          this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].PICKUP_ADDRESS
          loader.dismiss();
        })
    }
  }

  newCustomPickupRoutes: any = [];
  newCustomPickupRoutesJSON: any;
  newCustomPickupRoutesJSONtoArray: any;
  newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS: any = [];
  async getCustomPickupFromNativeHttp() {
    // let loader = await this.loading.create();
    // await loader.present();
    let loader = await this.loading.create();
    await loader.present();

    //let url = 'http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta';
    let url = ''
    let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=' + this.dataFromRouteListJSON.SERVICECODE + '&userid=dmta', {}, {
      'Content-Type': 'application/json'
    });

    from(myNativeCall).pipe(
      finalize(() => loader.dismiss())
    )
      .subscribe(data => {

        let parsed = JSON.parse(data.data).CUSTPICKUPS;

        this.newCustomPickupRoutes = parsed;

        this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutes

        this.startingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS

      }, err => {
        console.log("native error", err);
      })
  }

  ngOnInit() {
  }
  //
  startRoute() {

    setTimeout((isClick) => { this.router.navigate(['map']) }, 3000);

    this.router.navigate(["map/" + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);


  }
  getPassengersInformationFromRouteListSelection() {
    this.router.navigate(['routepassengers/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  getRoutingInformationPathFromRouteListSelection() {
    this.router.navigate(['routepassengers/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  goBackToRouteListPage() {
    this.router.navigate(['routelist/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);
  }
  beforeRouteStartedGoTechInspectPage() {
   
    this.router.navigate(['techinspect/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);
  }
  goToWalletPageWithDriverId() {
    this.router.navigate(['wallet/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  goToRouteDetails() {
   
    this.router.navigate(['routedetails/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  navigateToWalletPage() {
    
    this.router.navigate(['wallet/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + this.dataFromRouteListJSON]);
  }
  navigateToMapPage() {
    //	this.router.navigate(["map/" + JSON.stringify(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);                                       // pickups  
  }

  async takePicture4() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.img = image.base64String;

    console.log(image);
  }



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



  navigateToPassengersPage() {
    this.router.navigate(["routepassengers"])
  }
  navigateToStartFeedPage() {
    this.router.navigate(['routelist/' + this.Id + '/' + this.personId]);
  }
  navigateToSettingsPage() {
    this.router.navigate(['settings'])
  }

  navigateToRouteDetails() {
    this.router.navigate(['routedetails'])
  }
  navigateToVehiclePage() {
    this.router.navigate(['techinspect'])
  }
  navigateToRouteHistoryPage() {
    this.router.navigate(['routehistory'])
  }
  navigateToTechHistoryPage() {
    this.router.navigate(['techhistory'])
  }
  navigateToProfilePage() {
    this.router.navigate(['profile'])
  }
}
