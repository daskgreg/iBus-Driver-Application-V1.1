import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-routedetails',
  templateUrl: './routedetails.page.html',
  styleUrls: ['./routedetails.page.scss'],
})
export class RoutedetailsPage implements OnInit {
	pickUps=localStorage.getItem('routeDetails');
	tests:any


  dataFromRouteStartedPickups:any;
  dataFromRouteStartedPickupsJSON:any;

  dataFromRouteStartedDromologio:any;
  dataFromRouteStartedDromologioJSON:any;
  dataFromRouteStartedDriverId:any;
  dataFromRouteStartedDriverIdJSON:any;
  theRoutingPathSelection: any = [];
  toMyNewArray:any = [];
  thisIsMyStartingPoint:any;
  thisIsmyLastPoint:any;
  constructor(private activatedRoute: ActivatedRoute,private router : Router) { 
    //greg 
    this.dataFromRouteStartedDriverId = this.activatedRoute.snapshot.paramMap.get('driverid')
    console.log('%c Driver Id','color:orange;');
    console.log(this.dataFromRouteStartedDriverId);
    this.dataFromRouteStartedDriverIdJSON = JSON.parse(this.dataFromRouteStartedDriverId);
    console.log(this.dataFromRouteStartedDriverIdJSON);

    this.dataFromRouteStartedDromologio = this.activatedRoute.snapshot.paramMap.get('dromologio')
    console.log('%c Dromologio','color:orange;');
    console.log(this.dataFromRouteStartedDromologio);
    this.dataFromRouteStartedDromologioJSON = JSON.parse(this.dataFromRouteStartedDromologio);
    console.log(this.dataFromRouteStartedDromologioJSON);

    this.dataFromRouteStartedPickups = this.activatedRoute.snapshot.paramMap.get('pickups')
    console.log('%c Pickups','color:orange;');
    console.log(this.dataFromRouteStartedPickups);
    this.dataFromRouteStartedPickupsJSON = JSON.parse(this.dataFromRouteStartedPickups);
    console.log(this.dataFromRouteStartedPickupsJSON);


    for (var i=1; i<this.dataFromRouteStartedPickupsJSON.length-1; i++){
      this.thisIsMyStartingPoint = this.dataFromRouteStartedPickupsJSON[0].PICKUP_ADDRESS;
      this.toMyNewArray.push(this.dataFromRouteStartedPickupsJSON[i]);
      this.thisIsmyLastPoint = this.dataFromRouteStartedPickupsJSON[i+1].PICKUP_ADDRESS;
    }
   
   
    console.log(this.toMyNewArray);

    //  console.log('%c JSON','color:yellow;');
    // console.log(this.dataFromRouteStartedDriverIdJSON); // in this line i will take the arrival and departure 
    // this.theRoutingPathSelection = this.dataFromRouteStartedDriverIdJSON.routePath;
    
  	console.log(this.pickUps);
  	this.tests=[];
  	this.tests=["Athens", "Komotini", "Alexpoli"];
  }

  ngOnInit() {
  }
  navigateToMyroutePage(){
  	this.router.navigate(['routestarted/' + this.dataFromRouteStartedDromologio + '/' + this.dataFromRouteStartedDriverId]);
  }

}
