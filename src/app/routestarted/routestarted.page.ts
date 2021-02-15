import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-routestarted',
  templateUrl: './routestarted.page.html',
  styleUrls: ['./routestarted.page.scss'],
})
export class RoutestartedPage implements OnInit {
  chrbus_passengers_json=[{"vehicle_map_id": "2245", "pass_id": "1", "first_name": "Christos", "last_name": "Sotidis", "mobile": "123456", "email": "christos@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2245", "pass_id": "2", "first_name": "Christos2", "last_name": "Sotidis2", "mobile": "123456", "email": "christos2@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2246", "pass_id": "3", "first_name": "Christos3", "last_name": "Sotidis3", "mobile": "123456", "email": "christos3@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2246", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2250", "pass_id": "1", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2250", "pass_id": "2", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2251", "pass_id": "1", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2251", "pass_id": "2", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2247", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2248", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"},
                          {"vehicle_map_id": "2249", "pass_id": "4", "first_name": "Christos4", "last_name": "Sotidis4", "mobile": "123456", "email": "christos4@test", "vhc_plates": "OPE6009", "service": "CHT", "ServiceCode": "panos", "assignment_from_date": "2020-10-27 00:00:000:000", "assignment_to_date": "2020-10-27 00:00:000:000"}    ];
  
  custom=localStorage.getItem('custom');
  ekkinisiRoute=localStorage.getItem('ekkinisiRoute');
  ekkinisiCust=localStorage.getItem('ekkinisiCust');
  startPlace:any;
  vehmapId:any;
  passCounter=0;
  dataFromRouteList:any;
  dataFromRouteListJSON:any;
  dataFromRouteListLogin:any;
  dataFromRouteListLoginJSON:any;
  constructor(private activatedRoute:ActivatedRoute, private router : Router) { 

    

    this.dataFromRouteList = this.activatedRoute.snapshot.paramMap.get('xyz')
    this.dataFromRouteListLogin = this.activatedRoute.snapshot.paramMap.get('loginid');
    this.dataFromRouteListJSON = JSON.parse(this.dataFromRouteList);
    this.dataFromRouteListLoginJSON = JSON.parse(this.dataFromRouteListLogin);
    console.log('%c DATA FROM ROUTELIST JSON','color:orange;')
    console.log(this.dataFromRouteListJSON);
    console.log('%c DATA FROM ROUTELIST LOGIN JSON','color:yellow;')
    console.log(this.dataFromRouteListLoginJSON);

    var i=0;

    if(this.custom=="true"){
      this.startPlace=this.ekkinisiCust;
      this.vehmapId=localStorage.getItem('custVehmap');
    }
    else if(this.custom=="false"){
      this.startPlace=this.ekkinisiRoute;
      this.vehmapId=localStorage.getItem('vehmapid');
    }
     for(i=0; i<this.chrbus_passengers_json.length; i++){
        if(this.vehmapId==this.chrbus_passengers_json[i].vehicle_map_id){
          this.passCounter++;
        }
      }
  }

  ngOnInit() {
  }

  startRoute(){
    console.log("the route has started");
    alert('Route has started');
    setTimeout((isClick) => { this.router.navigate(['map']) }, 3000);    
  }
  getPassengersInformationFromRouteListSelection(){
    console.log('%c Routing to Passengers List', 'color:orange;');
    console.log(this.dataFromRouteListJSON);
    this.router.navigate(['routepassengers/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  getRoutingInformationPathFromRouteListSelection(){
    console.log('%c Routing to Route Path Details', 'color:yellow;');
    console.log(this.dataFromRouteListJSON);
     this.router.navigate(['routepassengers/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  goBackToRouteListPage(){
    console.log('%c Going back to Routelist Page','color:red;')
    console.log(this.dataFromRouteListLoginJSON);
    this.router.navigate(['routelist/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);
  }
  beforeRouteStartedGoTechInspectPage(){
    console.log('%c Going to Check Vehicle | DRIVER ID | ','color:red;');
    console.log(this.dataFromRouteListLoginJSON);
    console.log('%c Going to Check Vehicle | Route Information | ','color:red;');
    console.log(this.dataFromRouteListJSON);
    this.router.navigate(['techinspect/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);
  }
  goToWalletPageWithDriverId(){
    console.log('%c GOing to Wallet Page | DRIVER ID |','color:pink;');
    console.log(this.dataFromRouteListLoginJSON);
    this.router.navigate(['wallet/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);
  }

  navigateToMapPage(){
  	this.router.navigate(["map"])
  }
  navigateToPassengersPage(){
  	this.router.navigate(["routepassengers"])
  }
  navigateToStartFeedPage(){
    this.router.navigate(['home2/routelist'])
  }
  navigateToSettingsPage(){
    this.router.navigate(['home2/settings'])
  }
  navigateToWalletPage(){
    this.router.navigate(['home2/wallet'])
  }
  navigateToRouteDetails(){
    this.router.navigate(['routedetails'])
  }
  navigateToVehiclePage(){
    this.router.navigate(['home2/techinspect'])
  }
  navigateToRouteHistoryPage(){
    this.router.navigate(['home2/routehistory'])
  }
  navigateToTechHistoryPage(){
    this.router.navigate(['techhistory'])
  }
  navigateToProfilePage(){
    this.router.navigate(['home2/profile'])
  }
}
