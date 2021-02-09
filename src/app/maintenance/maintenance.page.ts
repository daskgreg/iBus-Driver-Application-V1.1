import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {
	number:any;
  constructor(private router : Router) { 
  	this.number=123;
  }

  ngOnInit() {
  }
  callWash(){
  	 window.open(`tel:12345`, '_system');
  	 // window.plugins.CallNumber.callNumber(function(){
    //  //success logic goes here
    // }, function(){
    //  //error logic goes here
    // }, number) 
  }
  callAccident(){
  	window.open(`tel:123456`, '_system');
  }
  callService(){
  	window.open(`tel:1234567`, '_system');
  }
  callCompany(){
  	window.open(`tel:12345678`, '_system');
  }
  navigateToroutelist(){
  	this.router.navigate(["home2/routelist"])
  }
  navigateToWalletPage(){
  	this.router.navigate(["home2/wallet"])
  }
  navigateToSettingsPage(){
  	this.router.navigate(["home2/settigns"])
  }

}
