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

    this.dataFromRouteStartedDriverIdJSON = this.activatedRoute.snapshot.paramMap.get('driverid')

    this.dataFromRouteStartedDromologioJSON = this.activatedRoute.snapshot.paramMap.get('dromologio')

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

      this.newCustomPickupRoutes = parsed;

      this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutes.CUSTPICKUPS

      this.startingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS

      for (var i = 1; i < this.newCustomPickupRoutesJSONtoArray.length - 1; i++) {

        this.thisIsMyStartingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS;

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

    let url = ''
    let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=' + this.dataFromRouteStartedDriverIdJSON + '&userid=dmta', {}, {

      'Content-Type': 'application/json'

    });

    from(myNativeCall).pipe(
      finalize(() => loader.dismiss())
    )
      .subscribe(data => {

        let parsed = JSON.parse(data.data);

        this.newCustomPickupRoutes = parsed;

        this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutes.CUSTPICKUPS

        this.startingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS

        for (var i = 1; i < this.newCustomPickupRoutesJSONtoArray.length - 1; i++) {

          this.thisIsMyStartingPoint = this.newCustomPickupRoutesJSONtoArray[0].PICKUP_ADDRESS;

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
