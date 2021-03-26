import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingController, Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-routedetails',
  templateUrl: './routedetails.page.html',
  styleUrls: ['./routedetails.page.scss'],
})
export class RoutedetailsPage implements OnInit {
  pickUps = localStorage.getItem('routeDetails');
  tests: any


  dataFromRouteStartedPickups: any;
  dataFromRouteStartedPickupsJSON: any;

  dataFromRouteStartedDromologio: any;
  dataFromRouteStartedDromologioJSON: any;
  dataFromRouteStartedDriverId: any;
  dataFromRouteStartedDriverIdJSON: any;
  theRoutingPathSelection: any = [];
  toMyNewArray: any = [];
  thisIsMyStartingPoint: any;
  thisIsmyLastPoint: any;
  newCustomPickupRoutes: any;
  newCustomPickupRoutesJSONtoArray: any;
  startingPoint: any;
  constructor(private http: HttpClient, private platform: Platform, private loading: LoadingController, private nativeHttp: HTTP, private activatedRoute: ActivatedRoute, private router: Router) {
    //greg 
    this.dataFromRouteStartedDriverIdJSON = this.activatedRoute.snapshot.paramMap.get('driverid')
    console.log('%c Driver Id', 'color:orange;');
    console.log(this.dataFromRouteStartedDriverIdJSON);
    // this.dataFromRouteStartedDriverIdJSON = JSON.parse(this.dataFromRouteStartedDriverId);
    // console.log(this.dataFromRouteStartedDriverIdJSON);

    this.dataFromRouteStartedDromologioJSON = this.activatedRoute.snapshot.paramMap.get('dromologio')
    console.log('%c Dromologio', 'color:orange;');
    console.log(this.dataFromRouteStartedDromologioJSON);
    // this.dataFromRouteStartedDromologioJSON = JSON.parse(this.dataFromRouteStartedDromologio);
    // console.log(this.dataFromRouteStartedDromologioJSON);

    // this.dataFromRouteStartedPickupsJSON = this.activatedRoute.snapshot.paramMap.get('gogogopick')
    // console.log('%c Pickups', 'color:orange;');
    // console.log(this.dataFromRouteStartedPickupsJSON);
    // this.dataFromRouteStartedPickupsJSON = JSON.parse(this.dataFromRouteStartedPickups);
    // console.log(this.dataFromRouteStartedPickupsJSON);

    console.log(this.toMyNewArray);

    //  console.log('%c JSON','color:yellow;');
    // console.log(this.dataFromRouteStartedDriverIdJSON); // in this line i will take the arrival and departure 
    // this.theRoutingPathSelection = this.dataFromRouteStartedDriverIdJSON.routePath;

    console.log(this.pickUps);
    this.tests = [];
    this.tests = ["Athens", "Komotini", "Alexpoli"];
  }
  ionViewWillEnter() {
    this.platform.is('cordova') ? this.getDetails() : this.getDetailsHTTPclient();
  }
  getDetailsHTTPclient() {
    let url = ''
    this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=' + this.dataFromRouteStartedDriverIdJSON + '&userid=dmta').subscribe(data => {

      let parsed = data;

      console.log('in');
      this.newCustomPickupRoutes = parsed;
      console.log(this.newCustomPickupRoutes);

      this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutes.CUSTPICKUPS
      console.log(this.newCustomPickupRoutesJSONtoArray);

      this.startingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS
      console.log(this.startingPoint);

      for (var i = 1; i < this.newCustomPickupRoutesJSONtoArray.length - 1; i++) {
        this.thisIsMyStartingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS;
        console.log(this.thisIsMyStartingPoint)
        this.toMyNewArray.push(this.newCustomPickupRoutesJSONtoArray[i]);
        this.thisIsmyLastPoint = this.newCustomPickupRoutesJSONtoArray[i + 1].PICKUP_ADDRESS;
      }

    }, err => {
      console.log("native error", err);
    })
  }
  async getDetails() {
    let loader = await this.loading.create();
    await loader.present();

    //let url = 'http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta';
    let url = ''
    let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=' + this.dataFromRouteStartedDriverIdJSON + '&userid=dmta', {}, {
      'Content-Type': 'application/json'
    });

    from(myNativeCall).pipe(
      finalize(() => loader.dismiss())
    )
      .subscribe(data => {

        let parsed = JSON.parse(data.data);

        console.log('in');
        this.newCustomPickupRoutes = parsed;
        console.log(this.newCustomPickupRoutes);

        this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutes.CUSTPICKUPS
        console.log(this.newCustomPickupRoutesJSONtoArray);

        this.startingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS
        console.log(this.startingPoint);

        for (var i = 1; i < this.newCustomPickupRoutesJSONtoArray.length - 1; i++) {
          this.thisIsMyStartingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS;
          console.log(this.thisIsMyStartingPoint)
          this.toMyNewArray.push(this.newCustomPickupRoutesJSONtoArray[i]);
          this.thisIsmyLastPoint = this.newCustomPickupRoutesJSONtoArray[i + 1].PICKUP_ADDRESS;
        }

      }, err => {
        console.log("native error", err);
      })
  }

  ngOnInit() {
  }
  navigateToMyroutePage() {
    this.router.navigate(['routestarted/' + this.dataFromRouteStartedDromologioJSON + '/' + this.dataFromRouteStartedDriverIdJSON]);
  }

}
