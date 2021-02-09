import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  navigateToFeedPage(){
  	this.router.navigate(['home2/routelist'])
  }
  navigateToWalletPage(){
  	this.router.navigate(['home2/wallet'])
  }
  navigateToRouteHistoryPage(){
  	this.router.navigate(['home2/routehistory'])
  }
  navigateToTechHistoryPage(){
  	this.router.navigate(['techhistory'])
  }
  navigateToProfilePage(){
  	this.router.navigate(['profile'])
  }
  navigateToSettingsPage(){
  	this.router.navigate(['home2/settings'])
  }

}
