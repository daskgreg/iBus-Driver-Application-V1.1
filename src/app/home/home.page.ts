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

  	// loadMap(){
  	// 	let latLng = new google.maps.LatLng(51.9036442, 7.6673267);

  	// 	let mapOptions = {
  	// 		center:latLng,
  	// 		zoom:5,
  	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
  	// 	};
  	// 	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  	// }
  	ionViewWillEnter(){
  		console.log('here2');
		  this.platform.ready().then(() => {
			if (this.platform.is('android')) {
				 console.log('android');
			} else if (this.platform.is('ios')) {
				 console.log('ios');
			} else {
				 //fallback to browser APIs or
				 console.log('The platform is not supported');
				   }
			});
  		// this.loadMap();
  	}
     navigateToLoginPage(){
    this.router.navigate(['language']);
  }

}
