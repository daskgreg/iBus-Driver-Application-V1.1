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




  dataFromRouteDetails:any;
  dataFromRouteStartedJSON:any;
  theRoutingPathSelection: any = [];
  constructor(private activatedRoute: ActivatedRoute,private router : Router) { 
    //greg 
    this.dataFromRouteDetails = this.activatedRoute.snapshot.paramMap.get('dromologio')
    console.log('%c JSON','color:orange;');
    console.log(this.dataFromRouteDetails);
    this.dataFromRouteStartedJSON = JSON.parse(this.dataFromRouteDetails);
    
     console.log('%c JSON','color:yellow;');
    console.log(this.dataFromRouteStartedJSON); // in this line i will take the arrival and departure 
    this.theRoutingPathSelection = this.dataFromRouteStartedJSON.routePath;
    
  	console.log(this.pickUps);
  	this.tests=[];
  	this.tests=["Athens", "Komotini", "Alexpoli"];
  }

  ngOnInit() {
  }
  navigateToMyroutePage(){
  	this.router.navigate(['routestarted/' + this.dataFromRouteDetails]);
  }

}
