import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-routedetails',
  templateUrl: './routedetails.page.html',
  styleUrls: ['./routedetails.page.scss'],
})
export class RoutedetailsPage implements OnInit {
	pickUps=localStorage.getItem('routeDetails');
	tests:any

  constructor(private router : Router) { 
  	console.log(this.pickUps);
  	this.tests=[];
  	this.tests=["Athens", "Komotini", "Alexpoli"];
  }

  ngOnInit() {
  }
  navigateToMyroutePage(){
  	this.router.navigate(['routestarted'])
  }

}
