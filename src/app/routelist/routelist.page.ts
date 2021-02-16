import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LanguageService } from '../services/language.service';
import {  isWithinInterval } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.page.html',
  styleUrls: ['./routelist.page.scss'],
})
export class RoutelistPage implements OnInit {
	//  response:any;
  // response2:any;
  // drv_id:any=12;
  // trp_code:any="ATHALX";
  // fromd="2020-06-05";
  // tod="2020-06-06";
  // fpup_code="ath";
  // tpup_code="alxport";
  // assignment_from_date="2020/06/06";
  // personnel_id=localStorage.getItem('personnel_id');
  // driver_id=localStorage.getItem('driver_id');
  // person_id=localStorage.getItem('person_id');
  // vehicle_map_id:any;
  // Service="CHT";
  // serviceCodes:any;
  // Dates:any;
  // Dates2:any;
  // citynames:any;
  // selectedDate:any;
  // selectedDate2:any;
  // names:any;
  // routes:any;
  // mapids:any;
  // routeids:any;
  // depdates:any;
  // deptimes:any;
  // returndates:any;
  // returntimes:any;
  // custs:any;
  // orderids:any;
  // pickupadds:any;
  // routesarx:any;
  // vehmaps:any;
  // custom:any=false;
  // custroute_json=[{"vehicle_map_id": "2250", "route_id": "1", "application_date": "2020-10-27 00:00:000:000", "last_name": "Sotidis", "first_name": "Christos", "mobile_phone": "12345", "email": "christos@test.gr", "individual_status": "", "departure_date": "2020-10-27", "departure_time": "07:00:000:000", "return_date": "2020-10-27", "return_time": "13:00:000:000", "comments": "1o dromologio", "capacity": "10"},
  //                 {"vehicle_map_id": "2251", "route_id": "1", "application_date": "2020-10-27 00:00:000:000", "last_name": "Sotidis", "first_name": "Christos", "mobile_phone": "12345", "email": "christos@test.gr", "individual_status": "", "departure_date": "2020-10-27", "departure_time": "07:00:000:000", "return_date": "2020-10-27", "return_time": "13:00:000:000", "comments": "1o dromologio", "capacity": "10"},
  //               ];
  // custroutePickups_json=[{"route_id": "1", "pickup_id": "1", "order_id": "1", "latitude": "37.865044000000000", "longitude": "23.755045000000000", "pickup_address": "Glyfada, Attica, Greece", "pickup_stop": "1"},
  //                        {"route_id": "1", "pickup_id": "2", "order_id": "2", "latitude": "37.955894000000000", "longitude": "23.702099000000000", "pickup_address": "Kallithea, Attica, Greece", "pickup_stop": "1"},
  //                        {"route_id": "1", "pickup_id": "3", "order_id": "3", "latitude": "37.983810000000000", "longitude": "23.727539000000000", "pickup_address": "Athens, Greece", "pickup_stop": "1"},
  //                        {"route_id": "1", "pickup_id": "4", "order_id": "4", "latitude": "40.736851000000000", "longitude": "22.920227000000000", "pickup_address": "Thessaloniki, Greece", "pickup_stop": "1"},
  //                        {"route_id": "1", "pickup_id": "5", "order_id": "5", "latitude": "41.122440000000000", "longitude": "25.406557000000000", "pickup_address": "Komotini, East Macedonia and Thrace, Greece", "pickup_stop": "1"} ];

  //  custrouteSegments_json=[{"route_id": "1", "order_id": "1", "segment_code": "SEGMENT-001", "start_pickup_id": "1", "start_pickup_lat": "37.865044000000000", "start_pickup_long": "23.755045000000000", "start_pickup_address": "Glyfada, Attica, Greece", "end_pickup_id": "2", "end_pickup_lat": "37.955894000000000", "end_pickup_long": "23.702099000000000", "end_pickup_address": "Kallithea, Attica, Greece", "distance_in_kill": "15", "distance_in_duration": "1445", "dur_hour": "0.40", "segment_ch_drv": "0"},
  //                          {"route_id": "1", "order_id": "2", "segment_code": "SEGMENT-002", "start_pickup_id": "2", "start_pickup_lat": "37.955894000000000", "start_pickup_long": "23.702099000000000", "start_pickup_address": "Kallithea, Attica, Greece", "end_pickup_id": "3", "end_pickup_lat": "37.983810000000000", "end_pickup_long": "23.727539000000000", "end_pickup_address": "Athens, Greece", "distance_in_kill": "4", "distance_in_duration": "676", "dur_hour": "0.19", "segment_ch_drv": "0"},
  //                          {"route_id": "1", "order_id": "3", "segment_code": "SEGMENT-003", "start_pickup_id": "3", "start_pickup_lat": "37.983810000000000", "start_pickup_long": "23.727539000000000", "start_pickup_address": "Athens, Greece", "end_pickup_id": "4", "end_pickup_lat": "40.736851000000000", "end_pickup_long": "22.920227000000000", "end_pickup_address": "Thessaloniki, Greece", "distance_in_kill": "513", "distance_in_duration": "18691", "dur_hour": "5.19", "segment_ch_drv": "1"},
  //                          {"route_id": "1", "order_id": "4", "segment_code": "SEGMENT-004", "start_pickup_id": "4", "start_pickup_lat": "40.736851000000000", "start_pickup_long": "22.920227000000000", "start_pickup_address": "Thessaloniki, Greece", "end_pickup_id": "5", "end_pickup_lat": "41.122440000000000", "end_pickup_long": "25.406557000000000", "end_pickup_address": "Komotini, East Macedonia and Thrace, Greece", "distance_in_kill": "247", "distance_in_duration": "8998", "dur_hour": "2.50", "segment_ch_drv": "0"}];

  //  rptdrvroutes_json =  [{ "vehicle_map_id": "2245", "vhc_plates": "OPE6009", "Service": "CHT", "ServiceCode": "panos", "Assignment_From_Date": "2020-10-27 00:00:000:000", "Assignment_To_Date": "2020-10-27 00:00:000:000", "driver_id": "16", "person_id": "2535", "personnel_id": "48", "lname": "Lauda", "fname": "Niki" },
  //  { "vehicle_map_id": "2246", "vhc_plates": "OPE6009", "Service": "CHT", "ServiceCode": "panos", "Assignment_From_Date": "2020-10-28 00:00:000:000", "Assignment_To_Date": "2020-10-28 00:00:000:000", "driver_id": "16", "person_id": "2535", "personnel_id": "48", "lname": "Lauda", "fname": "Niki" },
  //  { "vehicle_map_id": "2247", "vhc_plates": "OPE6009", "Service": "CHT", "ServiceCode": "panos", "Assignment_From_Date": "2020-10-29 00:00:000:000", "Assignment_To_Date": "2020-10-29 00:00:000:000", "driver_id": "16", "person_id": "2535", "personnel_id": "48", "lname": "Lauda", "fname": "Niki" },
  //  { "vehicle_map_id": "2248", "vhc_plates": "OPE6009", "Service": "CHT", "ServiceCode": "panos", "Assignment_From_Date": "2020-10-30 00:00:000:000", "Assignment_To_Date": "2020-10-30 00:00:000:000", "driver_id": "16", "person_id": "2535", "personnel_id": "48", "lname": "Lauda", "fname": "Niki" },
  //  { "vehicle_map_id": "2249", "vhc_plates": "OPE6009", "Service": "CHT", "ServiceCode": "panos2", "Assignment_From_Date": "2020-10-31 00:00:000:000", "Assignment_To_Date": "2020-10-31 00:00:000:000", "driver_id": "16", "person_id": "2535", "personnel_id": "48", "lname": "Lauda", "fname": "Niki" }];

  //  chrbusroutepup_json=[{"chrbus_code": "panos", "zone_id": "4", "pup_code": "chrPup", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 01:00:00.000", "vhc_type": "", "order": "1", "chrbus_name": "panos", "zone_name": "panos_chr", "pup_desc": "chrPup", "cty_code": "1", "pup_address": "chrPup 12", "latitude": "37.983810", "longitude": "23.727539", "cty_name": "Athens"},
  //  {"chrbus_code": "panos", "zone_id": "5", "pup_code": "chrPup2", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 02:00:00.000", "vhc_type": "", "order": "2", "chrbus_name": "panos", "zone_name": "panos_chr2", "pup_desc": "chrPup2", "cty_code": "3", "pup_address": "chrPup 2", "latitude": "40.630777", "longitude": "22.943101", "cty_name": "Thessaloniki"},
  //   {"chrbus_code": "panos", "zone_id": "6", "pup_code": "chrPup4", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 03:00:00.000", "vhc_type": "", "order": "3", "chrbus_name": "panos", "zone_name": "panos_chr3", "pup_desc": "chrPup4", "cty_code": "1", "pup_address": "chrPup 4", "latitude": "38.011600", "longitude": "23.717808", "cty_name": "Athens"}];

  serviceRegistration:any="";
	dataFromService:any="";
  dataFromLoginPage:any;
  dataFromLoginPageJSON:any;
  constructor(private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController,public http:HttpClient,private router : Router, private languageService: LanguageService) {

    //greg

    this.dataFromLoginPage = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataFromLoginPageJSON = JSON.parse(this.dataFromLoginPage);
    console.log('%c Print Data from Login','color:orange;');
    console.log(this.dataFromLoginPageJSON);

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
    this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?route_id=2&userid=dmta')
    .subscribe( (data) => {
      console.log(data);
      this.customPickUps = data;
      this.myPickUp = JSON.parse(this.customPickUps);
      this.theRealPickUp = this.myPickUp;
      console.log('%c JSON PARSE','color:red;');
      console.log(this.myPickUp);
      console.log('%c TheReal array Pickups','color:orange;');
      console.log(this.theRealPickUp);
      

      
    } )
  }
  onChangeFromFunction(){
    const theFirstDate = this.startDate.split('T')[0];
    console.log("THE FIRST DATE", theFirstDate);
    const theLastDate = this.endDate.split('T')[0];
    console.log("THE LAST DATE", theLastDate);
    console.log("You selected FROM:");

    this.http.get('http://cf11.travelsoft.gr/itourapi/rpt_drv_routes.cfm?' 
                  + 'driver_id=' + this.dataFromLoginPageJSON + '&from_date=' + theFirstDate + '&to_date=' + theLastDate + '&userid=dmta').subscribe( (data)=>{
      console.log(data);
      this.rptDriverRoutes = data;this.rptDriverRoutesJSONparse = JSON.parse(this.rptDriverRoutes);
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

  getIdOfItem
  public sendDataToRouteStarted(selectedDatesFromCustomPickups){
    
    
    this.saveMyData(selectedDatesFromCustomPickups).subscribe((dataReturnFromService) =>{
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(this.dataFromService['_body']);

      this.router.navigate(['techinspect/'+ JSON.stringify(selectedDatesFromCustomPickups) + '/' +JSON.stringify(this.dataFromLoginPageJSON)]);
    });

    }
  public sendDataOfTheSelectedRoute(item,itemid:number,itemdeparture:string,itemarrival:string,itemdate:string){
    console.log('%c The Item and the values of item', 'color:blue;');
    console.log([item,itemid,itemdeparture,itemarrival,itemdate]);
    console.log('%c Item Printing JSON', 'color:ora nge;');
    console.log(item);
    this.http.get('http://localhost:3000/routing?route').subscribe( (data)=>{
      console.log(data);
      this.routes = data;
      this.allDates = JSON.stringify(this.routes);
      this.myDate = JSON.parse(this.allDates);
      console.log("This.myDate:",this.myDate);
      console.log(this.allDates.id);
      console.log(this.allDates.id);
      console.log(this.allDates.id);
    } )

    var dataToSend = {
      "id": itemid,
      "date":itemdate,
      "departure":itemdeparture,
      "itemarrival":itemarrival,

    //  'id' + itemid + 'departure' + itemdeparture + 'arrival' + itemarrival + 'date' + itemdate;
    }

    
    console.log(dataToSend);
    var gregJSON = JSON.stringify(dataToSend);
    console.log(gregJSON);
    this.saveMyData(item).subscribe((dataReturnFromService) =>{
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(this.dataFromService['_body']);

      this.router.navigate(['routestarted/'+ JSON.stringify(item) + '/' +JSON.stringify(this.dataFromLoginPageJSON)]);
    });

    }
    saveMyData(dataToSend){
      var url="https://reqres.in/api/users";
      return this.http.post(url,dataToSend,
        {headers:new HttpHeaders(
          {"Content-type":"Application/json"}
        )})
    }
    clickme(routeid:number){
      alert(routeid)
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
    navigateToWalletPage(){
      this.router.navigate(["wallet"])
    }
    navigateToProfilePage(){
      this.router.navigate(["profile"])
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
 

//     confirm(){
//       this.routes=[];
//       this.routesarx=[];
//       var codes=[];
// // thingArray[0] = []; // you are missing this

//     	this.selectedDate = this.selectedDate.substring(0, 10);
//       this.selectedDate2 = this.selectedDate2.substring(0, 10);
//     console.log(this.selectedDate);
//     var date1=this.selectedDate + " 00:00:000:000";
//     var date2=this.selectedDate2 + " 00:00:000:000";
//     console.log(date2);
//      this.serviceCodes=[];
//       this.Dates=[];
//       this.Dates2=[];
//        this.citynames=[[],[]];
//       this.names=[];
//       this.mapids=[];
//       var k=0;
//       var l=0;
//       for(k=0; k<this.rptdrvroutes_json.length; k++){
//         if(this.driver_id==this.rptdrvroutes_json[k].driver_id && this.rptdrvroutes_json[k].Service=="CHT" && date1<=this.rptdrvroutes_json[k].Assignment_From_Date && date2>=this.rptdrvroutes_json[k].Assignment_From_Date){
//           this.serviceCodes[l]=this.rptdrvroutes_json[k].ServiceCode;
//           this.Dates[l]=this.rptdrvroutes_json[k].Assignment_From_Date;
//           this.mapids[l]=this.rptdrvroutes_json[k].vehicle_map_id;
//           l=l+1;
//         }
//       }

//       if(l==0){
//         console.log("no available routes");
//       }
//       console.log(this.serviceCodes,this.Dates);
//       var uniq = this.serviceCodes.reduce(function(a,b){
//     if (a.indexOf(b) < 0 ) a.push(b);
//     return a;
//   },[]);
//       var t=0;
//       var x=0;
//       var p=0;
//       if(l!=0){
//         for(k=0;k<this.serviceCodes.length; k++){
//           x=0;
//            this.routes[p] = [];
//           for(t=0; t<this.chrbusroutepup_json.length; t++){
//             console.log(k,t,x);
//             if(this.chrbusroutepup_json[t].chrbus_code==this.serviceCodes[k]){
//               console.log(k,t,x);
//               this.routes[p][x]=this.chrbusroutepup_json[t].cty_name;
//               this.names[p]=this.chrbusroutepup_json[t].chrbus_code;
//               // this.citynames[k][x]=this.chrbusroutepup_json[t].cty_name;
//               x++;
             
//             }
//           }
//            if(this.routes[p].length==0){
//              console.log("here");
//              this.routes.splice(p, 1)
//              // this.deleteRow(this.routes,p);
             
//            }
//            p++;

//         }
     

// }

//      console.log(this.routes);
//   //    this.names = routes.reduce(function(a,b){
//   //   if (a.indexOf(b) < 0 ) a.push(b);
//   //   return a;
//   // },[]);
//      console.log(this.names);
//      var j=0;
//      var h=0;
//      this.custs=[];
//      this.pickupadds= [[],[]];
//      this.orderids=[];
//      this.routeids=[];
//      this.depdates=[];
//      this.deptimes=[];
//      this.returndates=[];
//      this.returntimes=[];
//      this.orderids=[];
//      this.vehmaps=[];
//      for(j=0; j<this.custroute_json.length; j++){
//        if(this.selectedDate<=this.custroute_json[j].departure_date && this.selectedDate2>=this.custroute_json[j].departure_date){
//          this.routeids[h]=this.custroute_json[j].route_id;
//          this.depdates[h]=this.custroute_json[j].departure_date;
//          this.deptimes[h]=this.custroute_json[j].departure_time;
//          this.returndates[h]=this.custroute_json[j].return_date;
//          this.returntimes[h]=this.custroute_json[j].return_time;
//          this.vehmaps[h]=this.custroute_json[j].vehicle_map_id;
//          // this.custs.push({
//          //                 depdate: this.depdates[h],
//          //                 deptime: this.deptimes[h],
//          //                 returndate: this.returndates[h],
//          //                 returntime: this.returntimes[h],
//          //             });
//          h++;
//        }
//      }
//      h=0;
//      var o=0
//      for(j=0; j<this.routeids.length; j++){
//      for(o=0; o<this.custroutePickups_json.length; o++){
       
//        if(this.custroutePickups_json[o].route_id==this.routeids[j]){
//          this.orderids[h]=this.custroutePickups_json[o].order_id;
//          this.pickupadds[j][h]=this.custroutePickups_json[o].pickup_address;
//          h++;
         
//        }
//      }
//      h=0;
//   }
//  for(j=0; j<this.pickupadds.length; j++){
//    console.log(this.pickupadds[j][0]);
//    console.log(this.pickupadds[j][this.pickupadds.reduce((x, y) => Math.max(x, y.length), 0)-1]);
//  }
//  for(j=0; j<this.returntimes.length; j++){
//    this.custs.push({
//                          depdate: this.depdates[j],
//                          deptime: this.deptimes[j],
//                          returndate: this.returndates[j],
//                          returntime: this.returntimes[j],
//                          pickupadd1: this.pickupadds[j][0],
//                          pickupadd2: this.pickupadds[j][this.pickupadds.reduce((x, y) => Math.max(x, y.length), 0)-1],
//                      });
//  }
//  console.log(this.custs);
// }

//  deleteRow(arr, row) {
//    arr = arr.slice(0); // make copy
//    arr.splice(row - 1, 1);
//    return arr;
// }


// route(m){
//     localStorage.setItem('ekkinisiRoute', this.routes[m][0]);
//     localStorage.setItem('routeDetails', this.routes[m]);
//     localStorage.setItem("custom", this.custom);
//     console.log(m);
//     localStorage.setItem('vehmapid',this.mapids[m]);
//     var i=0;
//     for(i=0; i<this.chrbusroutepup_json.length; i++){
//       if(this.names[m]==this.chrbusroutepup_json[i].chrbus_name){
//         var chrcode=this.chrbusroutepup_json[i].chrbus_code;
//       }
//     }
//     localStorage.setItem('chrcode',chrcode);
//     // this.navCtrl.setRoot(TechinspectPage);
//     this.router.navigate(['techinspect'])  

//   }
//   route2(e){
//     localStorage.setItem('custVehmap', this.vehmaps[e]);
//     localStorage.setItem('ekkinisiCust', this.custs[e].pickupadd1);
//     localStorage.setItem('routeDetails', this.custs[e]);
//     this.custom=true;
//     localStorage.setItem("custom", this.custom);
//     localStorage.setItem("routeid", this.routeids[e]);
//     // this.navCtrl.setRoot(TechinspectPage);
//     this.router.navigate(['techinspect']) 
//   }
//}