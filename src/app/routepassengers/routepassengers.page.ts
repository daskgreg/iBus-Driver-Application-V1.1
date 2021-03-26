import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-routepassengers',
  templateUrl: './routepassengers.page.html',
  styleUrls: ['./routepassengers.page.scss'],
})
export class RoutepassengersPage implements OnInit {
  vehmapid = localStorage.getItem('vehmapid');
  onepass: any;
  fnames: any;
  lnames: any;
  pases: any;
  phones: any;
  emails: any;
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

  showInformation = false;
  hideTabs = true;
  saveTodos(m) {
    this.onepass = [];
    console.log("here");
    console.log(m);
    if (this.showInformation == false) {
      this.showInformation = true;
      this.hideTabs = false;
      this.onepass.push({
        fname: this.fnames[m],
        lname: this.lnames[m],
        fullname: this.lnames[m] + " " + this.fnames[m],
        phone: this.phones[m],
        email: this.emails[m],
        number: m + 1,
      });
    } else {
      this.showInformation = false;
      this.hideTabs = true;
    }
    console.log('wtf');
  }
  saveTodos2() {
    console.log("here2");
    if (this.showInformation == false) {
      this.showInformation = true;
    } else {
      this.showInformation = false;
    }
    console.log('wtf');
  }
  dataFromRouteStarted: any;
  dataFromRouteStartedJSON: any;
  thePassenger: any;
  VEHICLE_MAP_ID: any;
  passengersList;
  thePassengersListBecameAJSON: any;
  thepassengerListJSON: any = [];
  thepassengerListJSONPassenger: any;
  dataFromRouteStartedDromologio: any;
  dataFromRouteStartedDriverId: any;
  dataFromRouteStartedJSONDromologio: any;
  dataFromRouteStartedJSONDriverId: any;
  thepassengerListJSONtoArray: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private nativeHttp: HTTP) {
    //greg
    this.dataFromRouteStartedDromologio = this.activatedRoute.snapshot.paramMap.get('dromologio');
    this.dataFromRouteStartedJSONDromologio = JSON.parse(this.dataFromRouteStartedDromologio);
    this.dataFromRouteStartedDriverId = this.activatedRoute.snapshot.paramMap.get('driverid');
    this.dataFromRouteStartedJSONDriverId = JSON.parse(this.dataFromRouteStartedDriverId);
    this.dataFromRouteStarted = this.activatedRoute.snapshot.paramMap.get('passengers')
    console.log('%c JSON', 'color:orange;');
    console.log(this.dataFromRouteStarted);
    console.log('%c JSON', 'color:yellow;');
    this.dataFromRouteStartedJSON = JSON.parse(this.dataFromRouteStarted);
    console.log("HERE", this.dataFromRouteStartedJSON.VEHICLE_MAP_ID);
    this.VEHICLE_MAP_ID = this.dataFromRouteStartedJSON.VEHICLE_MAP_ID;
    console.log(this.VEHICLE_MAP_ID);
    this.fnames = [];
    this.lnames = [];
    this.pases = [];
    this.phones = [];
    this.emails = [];


    let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_passengers_list.cfm?vehicle_map_id=' + 2408 + '&userid=dmta', {}, {
      'Content-Type': 'application/json'

    });
    from(nativeCall).pipe(
      finalize(() => console.log(''))
    )
      .subscribe((data) => {

        let parsed = JSON.parse(data.data)
        console.log(data);
        this.thePassenger = parsed;

        this.thepassengerListJSON = this.thePassenger;

        this.thepassengerListJSONtoArray = this.thepassengerListJSON.PASSENGERS;


        console.log('%c Passengers', 'color:yellow;');
        console.log(this.thepassengerListJSONtoArray);

        var i = 0;
        var j = 0;
        for (i = 0; i < this.thepassengerListJSONtoArray.length; i++) {
          if (this.VEHICLE_MAP_ID == this.thepassengerListJSONtoArray[i].VEHICLE_MAP_ID) {
            this.fnames[j] = this.thepassengerListJSONtoArray[i].FIRST_NAME;
            this.lnames[j] = this.thepassengerListJSONtoArray[i].LAST_NAME;
            this.phones[j] = this.thepassengerListJSONtoArray[i].MOBILE;
            this.emails[j] = this.thepassengerListJSONtoArray[i].EMAIL;
            this.pases.push({
              fname: this.fnames[i],
              lname: this.lnames[i],
              fullname: this.lnames[i] + " " + this.fnames[i],
              phone: this.phones[i],
              email: this.emails[i],
              number: i + 1,
            });
            j++;
          }
        }

      })



    console.log(this.fnames, this.lnames);
  }

  navigateToStartRoutePage() {


    this.router.navigate(['routestarted/' + this.dataFromRouteStartedDromologio + '/' + this.dataFromRouteStartedDriverId])
  }

  ngOnInit() {
  }
  navigateToWalletPage() {
    this.router.navigate(['wallet'])
  }
  navigateToSettingsPage() {
    this.router.navigate(['settings'])
  }
  navigateToRoutelist() {
    this.router.navigate(['routelist'])
  }
  navigateToTechHistoryPage() {
    this.router.navigate(['techhistory'])
  }
  navigateToProfilePage() {
    this.router.navigate(['profile'])
  }
  navigateToRouteHistoryPage() {
    this.router.navigate(['routehistory'])
  }

  navigateToRouteListPage() {
    this.router.navigate(['routelist'])
  }
  navigateToNotificationsPage() {
    this.router.navigate(['notifications']);
  }

}
