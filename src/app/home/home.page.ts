import { Component, ViewChild, ElementRef } from '@angular/core';
import {Plugins} from '@capacitor/core';
import {Router} from '@angular/router';
import { Platform } from '@ionic/angular';

const {Geolocation} = Plugins;

 declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild('map') mapElement: ElementRef;
	map:any;
	markers = [];  

  constructor(public platform: Platform ,private router : Router) {}

  	ionViewWillEnter(){

		  
		  this.platform.ready().then(() => {

			if (this.platform.is('android')) {

				 console.log('android');

			} else if (this.platform.is('ios')) {

				 console.log('ios');

			} else {
			
				 console.log('The platform is not supported');

				   }

			});
  
  	}
     navigateToLoginPage(){

    this.router.navigate(['language']);

  }

}
