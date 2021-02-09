import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
languages:any;
selectedValueLanguage:any;
  constructor(private languageService: LanguageService, private router : Router) { 
  	this.languages=[];
  	this.languages=["English", "Ελληνικά"];
  }

  ngOnInit() {
  }
  check(){
  	if(this.selectedValueLanguage=="English"){
  	this.languageService.setLanguage("en");
  }
  	if(this.selectedValueLanguage=="Ελληνικά"){
  	this.languageService.setLanguage("gr");
  }
  }

  navigateToStartFeedPage(){
    this.router.navigate(['routelist']);
  }
   navigateToMaintenancePage(){
    this.router.navigate(['maintenance']);
  }
  navigateToWalletPage(){
    this.router.navigate(['wallet'])
  }
  navigateToRouteHistoryPage(){
    this.router.navigate(['routehistory'])
  }
  navigateToTechHistoryPage(){
    this.router.navigate(['techhistory'])
  }
  navigateToProfilePage(){
    this.router.navigate(['profile'])
  }
  navigateToSettingsPage(){
    this.router.navigate(['settings'])
  }
  navigateToNotificationsPage(){
    this.router.navigate(['notifications']);
  }

}
