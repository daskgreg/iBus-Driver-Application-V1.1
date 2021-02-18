import { HttpClient } from '@angular/common/http';
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

  startingPoint:any;
  newCustomPickupRoutes:any=[];
  newCustomPickupRoutesJSON:any;
  newCustomPickupRoutesJSONtoArray:any = []
  newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS:any = [];
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute, private router : Router) { 

    

    this.dataFromRouteList = this.activatedRoute.snapshot.paramMap.get('xyz');
    this.dataFromRouteListLogin = this.activatedRoute.snapshot.paramMap.get('loginid');
    this.dataFromRouteListJSON = JSON.parse(this.dataFromRouteList);
    this.dataFromRouteListLoginJSON = JSON.parse(this.dataFromRouteListLogin);
    console.log('%c DATA FROM ROUTELIST JSON','color:orange;')
    console.log(this.dataFromRouteListJSON);
    console.log(this.dataFromRouteListJSON.SERVICECODE);
    console.log('%c DATA FROM ROUTELIST LOGIN JSON','color:yellow;')
    console.log(this.dataFromRouteListLoginJSON);

    this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.dataFromRouteListJSON.SERVICECODE + '&userid=dmta')
    .subscribe( (data) =>{
      console.log('%c DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','color:red;');
      console.log(data);
      this.newCustomPickupRoutes = data;
      console.log(this.newCustomPickupRoutes)
      this.newCustomPickupRoutesJSON = JSON.parse(this.newCustomPickupRoutes);
      console.log(this.newCustomPickupRoutesJSON);
      this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
      console.log(this.newCustomPickupRoutesJSONtoArray);
      this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
      console.log('auto thelw');
      console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
      console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].PICKUP_ADDRESS);
      this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].PICKUP_ADDRESS
    })

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
    this.router.navigate(["map/" + JSON.stringify(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListLoginJSON)]);                       
  }
  getPassengersInformationFromRouteListSelection(){
    console.log('%c Routing to Passengers List', 'color:orange;');
    console.log(this.dataFromRouteListJSON);
    this.router.navigate(['routepassengers/' +  JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
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
    console.log('%c Going to Wallet Page | DRIVER ID |','color:pink;');
    console.log(this.dataFromRouteListLoginJSON);
    this.router.navigate(['wallet/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  goToRouteDetails(){
    console.log('%c Going to RouteDetails | DRIVER ID |','color:pink;');
    console.log(this.dataFromRouteListLoginJSON);
    console.log('%c Going to RouteDetails | RPT DRV ROUTES |','color:pink;');
    console.log(this.dataFromRouteListJSON);
    console.log('%c Going to RouteDetails | PickUps |','color:pink;');
    console.log(this.newCustomPickupRoutesJSONtoArray)
    this.router.navigate(['routedetails/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS)]);
  }
  navigateToWalletPage(){
    console.log('%c GOing to Wallet Page | DRIVER ID |','color:pink;');
    console.log(this.dataFromRouteListLoginJSON);
    this.router.navigate(['wallet/' + JSON.stringify(this.dataFromRouteListLoginJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);
  }
  navigateToMapPage(){
  //	this.router.navigate(["map/" + JSON.stringify(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS) + '/' + JSON.stringify(this.dataFromRouteListJSON) + '/' + JSON.stringify(this.dataFromRouteListJSON)]);                                       // pickups  
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
