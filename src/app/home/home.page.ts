import { Component, ViewChild, ElementRef } from '@angular/core';
import {Plugins} from '@capacitor/core';
import {Router} from '@angular/router';

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

  constructor(private router : Router) {}

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
  		console.log('here');
  		// this.loadMap();
  	}
     navigateToLoginPage(){
    this.router.navigate(['language']);
  }

}
