import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[] = [];
  points: any;
  boardVal: any;
  temp: any;
  fire: string;
  waylat: any;
  wayLong: any;
  lastwaylat: any;
  lastwaylong: any;
  newsData2: any;
  k: number = 0;
  i: number = 0;
  loader: any = null;
  board: any;
  str: any;
  latitude: any;
  longitude: any;
  //3/11/2017
  destLat: any = [];
  destLng: any;
  startTr: any;
  navCounter: number = 0;
  chrcode = localStorage.getItem('chrcode');
  lats: any = [];
  longs: any = [];
  telos = 0;
  infowindow: any;
  startLocation: any;
  endLocation: any;
  waypointLocations: any;
  waypoint: any;
  r1: any;
  r2: any;
  apostasi = [];
  xronos = [];
  pickUpJsonFromApi: any;
  hideBackBtn = false;
  hideEndBtn = false;
  hideCustomBtn = false;
  dataFromPickups: any = [];
  dataFromPickupsJSON: any;
  dataFromPickupsFromJSONtoArray: any = [];
  custom = localStorage.getItem("custom");
  routeid = 2;
  custroutePickups_json = [{ "route_id": "1", "pickup_id": "1", "order_id": "1", "latitude": "37.865044000000000", "longitude": "23.755045000000000", "pickup_address": "Glyfada, Attica, Greece", "pickup_stop": "1" },
  { "route_id": "1", "pickup_id": "2", "order_id": "2", "latitude": "37.955894000000000", "longitude": "23.702099000000000", "pickup_address": "Kallithea, Attica, Greece", "pickup_stop": "1" },
  { "route_id": "1", "pickup_id": "3", "order_id": "3", "latitude": "37.983810000000000", "longitude": "23.727539000000000", "pickup_address": "Athens, Greece", "pickup_stop": "1" },
  { "route_id": "1", "pickup_id": "4", "order_id": "4", "latitude": "40.736851000000000", "longitude": "22.920227000000000", "pickup_address": "Thessaloniki, Greece", "pickup_stop": "1" },
  { "route_id": "1", "pickup_id": "5", "order_id": "5", "latitude": "41.122440000000000", "longitude": "25.406557000000000", "pickup_address": "Komotini, East Macedonia and Thrace, Greece", "pickup_stop": "1" }];


  chrbusroutepup_json = [{ "chrbus_code": "panos", "zone_id": "4", "pup_code": "chrPup", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 01:00:00.000", "vhc_type": "", "order": "1", "chrbus_name": "panos", "zone_name": "panos_chr", "pup_desc": "chrPup", "cty_code": "1", "pup_address": "chrPup 12", "latitude": "37.983810", "longitude": "23.727539", "cty_name": "Athens" },
  { "chrbus_code": "panos", "zone_id": "5", "pup_code": "chrPup2", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 02:00:00.000", "vhc_type": "", "order": "2", "chrbus_name": "panos", "zone_name": "panos_chr2", "pup_desc": "chrPup2", "cty_code": "3", "pup_address": "chrPup 2", "latitude": "40.630777", "longitude": "22.943101", "cty_name": "Thessaloniki" },
  { "chrbus_code": "panos", "zone_id": "6", "pup_code": "chrPup4", "duration": "1900-01-01 00:00:00.000", "time": "1900-01-01 03:00:00.000", "vhc_type": "", "order": "3", "chrbus_name": "panos", "zone_name": "panos_chr3", "pup_desc": "chrPup4", "cty_code": "1", "pup_address": "chrPup 4", "latitude": "38.011600", "longitude": "23.717808", "cty_name": "Athens" }];

  dataFromThePickups: any = [];
  dataFromTheRoutes: any = [];
  dataFromTheRoutesJSON: any;
  dataFromTheDriverId: any = [];
  dataFromTheDriverIdJSON: any;
  FIXEDpickups: any;
  dataFromRouteListJSON: any;
  newCustomPickupRoutes: any;

  newCustomPickupRoutesJSON: any;
  newCustomPickupRoutesJSONtoArray: any;
  newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS: any;
  startingPoint: any;

  constructor(private platform: Platform, private loading: LoadingController, private nativeHttp: HTTP, private activatedRoute: ActivatedRoute, private http: HttpClient, private backgroundGeolocation: BackgroundGeolocation, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private router: Router) {
    console.log('%cIN MAP', 'color:red;')
    this.pickUpJsonFromApi = [];
    this.dataFromPickupsFromJSONtoArray = [];
    this.dataFromTheRoutes = this.activatedRoute.snapshot.paramMap.get('rptroutes');
    this.dataFromTheRoutesJSON = JSON.parse(this.dataFromTheRoutes);
    console.log('%c RPT ROUTES', 'color:yellow;');
    console.log(this.dataFromTheRoutesJSON);
    this.dataFromTheDriverId = this.activatedRoute.snapshot.paramMap.get('theidofdriver');
    this.dataFromTheDriverIdJSON = JSON.parse(this.dataFromTheDriverId);
    console.log('%c ID OF DRIVER', 'color:yellow;');
    console.log(this.dataFromTheDriverIdJSON);

    if (platform.is('cordova')) {

      if (this.dataFromTheRoutesJSON.TYPE == 'FIX') {

        let fixNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_route_pup.cfm?' + 'chrbus_code=' + this.dataFromTheRoutesJSON.SERVICECODE + '&userid=dmta', {}, {
          'Content-Type': 'application/json'
        })
        from(fixNativeCall).pipe(
          finalize(() => console.log('fix route'))
        )
          .subscribe((data) => {


            console.log('%c DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'color:red;');
            console.log(data);
            this.newCustomPickupRoutes = JSON.parse(data.data);
            console.log(this.newCustomPickupRoutes)
            alert(this.newCustomPickupRoutes);
            this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
            console.log(this.newCustomPickupRoutesJSON);
            this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
            console.log(this.newCustomPickupRoutesJSONtoArray);
            this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.FIXEDPICKUPS
            alert(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
            console.log('auto thelw');
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].CTY_NAME);
            this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].CTY_NAME

            for (var i = 0; i < this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS.length; i++) {
              console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i]);
              //  this.lats[i]=parseFloat(this.custroutePickups_json[i].latitude);
              //  this.longs[i]=parseFloat(this.custroutePickups_json[i].longitude);
              this.longs[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LONGITUDE);
              this.lats[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LATITUDE);
              console.log('if = 2');
              console.log(this.longs)


            }
            let j: number;
            this.i = 0;
            this.waypoints.length = 0;
            this.destLat = this.lats[this.i];
            console.log(this.destLat);
            console.log('shit happens');
            this.destLng = this.longs[this.i];
            for (let j = 0; j < this.lats.length; j++) {
              let stations =
              {
                location: { lat: this.lats[j], lng: this.longs[j] },
                stopover: true,
              }
                ;
              this.waypoints.push(stations);
              console.log(stations);
              console.log(this.waypoints);
            }
            this.getPosition();

            //this.lats=[];
            //this.longs=[];


            console.log(this.lats, this.longs);
            this.fire = "";

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              suppressPolylines: true
            });
            this.bounds = new google.maps.LatLngBounds();
          })
      } else {

        let custNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.dataFromTheRoutesJSON.SERVICECODE + '&userid=dmta', {}, {
          'Content-Type': 'application/json'
        })
        from(custNativeCall).pipe(
          finalize(() => console.log('custom route'))
        )
          .subscribe(async (data) => {


            console.log('%c DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'color:red;');
            console.log(data);
            this.newCustomPickupRoutes = JSON.parse(data.data);
            console.log(this.newCustomPickupRoutes)
            this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
            console.log(this.newCustomPickupRoutesJSON);
            this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
            console.log(this.newCustomPickupRoutesJSONtoArray);
            this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS



            console.log('NEWWWW CUSTOOOOOOM PIIIIICKUPPPPP', this.newCustomPickupRoutesJSONtoArray);
            console.log('NEWWWW CUSTOOOOOOM PIIIIICKUPPPPP', this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
            for (var i = 0; i < this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS.length; i++) {
              console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i]);
              //  this.lats[i]=parseFloat(this.custroutePickups_json[i].latitude);
              //  this.longs[i]=parseFloat(this.custroutePickups_json[i].longitude);
              this.longs[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LONGITUDE);
              this.lats[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LATITUDE);
              console.log('if = 2');
              console.log('Longitude', this.longs)
              console.log('Latitude', this.lats)


            }
            let j: number;
            this.i = 0;
            this.waypoints.length = 0;
            this.destLat = this.lats[this.i];
            console.log(this.destLat);
            console.log('shit happens');
            this.destLng = this.longs[this.i];
            for (let j = 0; j < this.lats.length; j++) {
              let stations =
              {
                location: { lat: this.lats[j], lng: this.longs[j] },
                stopover: true,
              }
                ;
              this.waypoints.push(stations);
              console.log(stations);
              console.log(this.waypoints);
            }
            this.getPosition();

            //this.lats=[];
            //this.longs=[];


            console.log(this.lats, this.longs);
            this.fire = "";

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              suppressPolylines: true
            });
            this.bounds = new google.maps.LatLngBounds();

          })
      }

    } else {
      if (this.dataFromTheRoutesJSON.TYPE == 'FIX') {

        this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_route_pup.cfm?' + 'chrbus_code=' + this.dataFromTheRoutesJSON.SERVICECODE + '&userid=dmta')
          .subscribe((data) => {


            console.log('%c DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'color:red;');
            console.log(data);
            this.newCustomPickupRoutes = data;
            console.log(this.newCustomPickupRoutes)
            this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
            console.log(this.newCustomPickupRoutesJSON);
            this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
            console.log(this.newCustomPickupRoutesJSONtoArray);
            this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.FIXEDPICKUPS
            console.log('auto thelw');
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].CTY_NAME);
            this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].CTY_NAME

            for (var i = 0; i < this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS.length; i++) {
              console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i]);
              //  this.lats[i]=parseFloat(this.custroutePickups_json[i].latitude);
              //  this.longs[i]=parseFloat(this.custroutePickups_json[i].longitude);
              this.longs[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LONGITUDE);
              this.lats[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LATITUDE);
              console.log('if = 2');
              console.log(this.longs)


            }
            let j: number;
            this.i = 0;
            this.waypoints.length = 0;
            this.destLat = this.lats[this.i];
            console.log(this.destLat);
            console.log('shit happens');
            this.destLng = this.longs[this.i];
            for (let j = 0; j < this.lats.length; j++) {
              let stations =
              {
                location: { lat: this.lats[j], lng: this.longs[j] },
                stopover: true,
              }
                ;
              this.waypoints.push(stations);
              console.log(stations);
              console.log(this.waypoints);
            }
            this.getPosition();

            //this.lats=[];
            //this.longs=[];


            console.log(this.lats, this.longs);
            this.fire = "";

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              suppressPolylines: true
            });
            this.bounds = new google.maps.LatLngBounds();
          })
      } else {
        this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_cust_route_pickups.cfm?' + 'route_id=' + this.dataFromTheRoutesJSON.SERVICECODE + '&userid=dmta')
          .subscribe(async (data) => {


            console.log('%c DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'color:red;');
            console.log(data);
            this.newCustomPickupRoutes = data;
            console.log(this.newCustomPickupRoutes)
            this.newCustomPickupRoutesJSON = this.newCustomPickupRoutes;
            console.log(this.newCustomPickupRoutesJSON);
            this.newCustomPickupRoutesJSONtoArray = this.newCustomPickupRoutesJSON;
            console.log(this.newCustomPickupRoutesJSONtoArray);
            this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS = this.newCustomPickupRoutesJSONtoArray.CUSTPICKUPS
            console.log('auto thelw');
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS);
            console.log(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].PICKUP_ADDRESS);
            this.startingPoint = this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[0].PICKUP_ADDRESS



            for (var i = 0; i < this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS.length; i++) {
              console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i]);
              //  this.lats[i]=parseFloat(this.custroutePickups_json[i].latitude);
              //  this.longs[i]=parseFloat(this.custroutePickups_json[i].longitude);
              this.longs[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LONGITUDE);
              this.lats[i] = parseFloat(this.newCustomPickupRoutesJSONtoArrayCUSTOMPICKUPS[i].LATITUDE);
              console.log('if = 2');
              console.log(this.longs)


            }
            let j: number;
            this.i = 0;
            this.waypoints.length = 0;
            this.destLat = this.lats[this.i];
            console.log(this.destLat);
            console.log('shit happens');
            this.destLng = this.longs[this.i];
            for (let j = 0; j < this.lats.length; j++) {
              let stations =
              {
                location: { lat: this.lats[j], lng: this.longs[j] },
                stopover: true,
              }
                ;
              this.waypoints.push(stations);
              console.log(stations);
              console.log(this.waypoints);
            }
            this.getPosition();

            //this.lats=[];
            //this.longs=[];


            console.log(this.lats, this.longs);
            this.fire = "";

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              suppressPolylines: true
            });
            this.bounds = new google.maps.LatLngBounds();

          })
      }

    }













    // if (this.dataFromTheRoutesJSON.TYPE == 'CUST') {
    //   console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.dataFromTheRoutesJSON);
    //   console.log('%c Data From CUSTOM PICKUP', 'color:red;', this.dataFromTheRoutesJSON.TYPE);

    // } else {
    //   console.log('TIN PANAGIA DEN THA TIN KSANA ')
    //   for (i = 0; i < this.newCustomPickupRoutesJSON.length; i++) {
    //     console.log(this.newCustomPickupRoutesJSON);
    //     console.log(this.newCustomPickupRoutesJSON[i].LATITUDE);
    //     this.lats[i] = parseFloat(this.newCustomPickupRoutesJSON[i].LATITUDE);
    //     this.longs[i] = parseFloat(this.newCustomPickupRoutesJSON[i].LONGITUDE);
    //     console.log(this.longs);
    //     console.log(this.lats);
    //   }
    // }

  }
  ionViewWillEnter() {

  }
  async ngOnInit() {

  }
  async getPosition() {
    console.log('before get position');

    console.log('after get position');
    var response = await Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(res => {
      console.log(res);
      this.loadMap(res);
    })
      .catch(error => {
        console.log('error could not ');
        console.log(error);
      });
    // this.loadMap();
  }

  // ngOnInit() {
  // }
  loadMap(res) {

    console.log('%c LOAD MAP', 'color:red;');
    let latLng = new google.maps.LatLng(41.1214145, 25.3878458);
    console.log('%c LOAD MAP', 'color:red;');
    //this.latitude = res.coords.latitude;
    //this.longitude = res.coords.longitude;
    console.log('%c LOAD MAP', 'color:red;');
    this.latitude = 41.1214145;
    this.longitude = 25.3878458;
    console.log('%c LOAD MAP', 'color:red;');
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');
    this.myLatLng = { lat: this.latitude, lng: this.longitude };
    console.log('%c LOAD MAP', 'color:red;');
    let mapOptions = {
      center: this.myLatLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.infowindow = new google.maps.InfoWindow();

    this.directionsDisplay.setMap(this.map);
    // this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });

  }

  private calculateRoute() {
    var stepDisplay = new google.maps.InfoWindow();
    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {

      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);

    });



    this.map.fitBounds(this.bounds);

    this.directionsService.route({

      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.destLat, this.destLng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      //suppressMarkers: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(response);

        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
        var polylineOptions = {
          strokeColor: '#C83939',
          strokeOpacity: 1,
          strokeWeight: 4
        };
        var polylines = [];
        for (var i = 0; i < polylines.length; i++) {
          polylines[i].setMap(null);
        }
        this.startLocation = new Object();
        this.endLocation = new Object();
        this.waypointLocations = [];

        // Display start and end markers for the route.
        var legs = response.routes[0].legs;
        for (i = 0; i < legs.length; i++) {
          var steps = legs[i].steps;
          for (this.r1 = 0; this.r1 < steps.length; this.r1++) {
            var nextSegment = steps[this.r1].path;
            var stepPolyline = new google.maps.Polyline(polylineOptions);
            for (this.r2 = 0; this.r2 < nextSegment.length; this.r2++) {
              stepPolyline.getPath().push(nextSegment[this.r2]);
              this.bounds.extend(nextSegment[this.r2]);
            }
            google.maps.event.addListener(stepPolyline, 'mouseover', function (evt) {
              console.log(evt);
              console.log("route mouse over event @" + evt.latLng.toUrlValue(6));
              console.log(legs[i].distance, legs[i].duration);
            });
            polylines.push(stepPolyline);
            stepPolyline.setMap(this.map);
            // route click listeners, different one on each step

            google.maps.event.addListener(stepPolyline, 'click', function (evt) {
              console.log(legs[i].distance, legs[i].duration);
              var apostasi = google.maps.geometry.spherical.computeLength(stepPolyline.getPath().getArray());
              console.log(apostasi);
              stepDisplay.setContent("you clicked on the route<br>" + evt.latLng.toUrlValue(6));
              stepDisplay.setPosition(evt.latLng);
              stepDisplay.open(this.map);

            });
          }
          if (i == 0) {
            this.startLocation.latlng = legs[i].start_location;
            this.startLocation.address = legs[i].start_address;
            var startDistance = legs[i].distance;
            var startDuracion = legs[i].duration;
            // createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
          }
          if (i != 0 && i != legs.length - 1) {
            this.waypoint = {};
            this.waypoint.latlng = legs[i].start_location;
            this.waypoint.address = legs[i].start_address;

            this.waypointLocations.push(this.waypoint);
          }
          if (i == legs.length - 1) {
            this.endLocation.latlng = legs[i].end_location;
            this.endLocation.address = legs[i].end_address;
            var endDistance = legs[i].distance;
            var endDuration = legs[i].duration;
          }
          // var steps = legs[i].steps;
        }
        var legs2 = response.routes[0].legs;
        this.createMarker(this.endLocation.latlng, "end", "special text for end marker", "http://www.google.com/mapfiles/markerB.png", endDistance, endDuration)
        this.createMarker(this.startLocation.latlng, "start", "special text for start marker", "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png", startDistance, startDuracion);
        for (var i = 0; i < this.waypointLocations.length; i++) {
          this.apostasi[i] = legs[i + 1].distance;
          this.xronos[i] = legs[i + 1].duration;
          this.createMarker(this.waypointLocations[i].latlng, "waypoint " + i, "special text for waypoint marker " + i, "http://www.google.com/mapfiles/marker_yellow.png", this.apostasi[i], this.xronos[i]);
        }

      } else {
        alert('Could not display directions due to: ' + status);
      }
    });

  }
  createMarker(latlng, label, html, url, distance, duration) {
    console.log(distance);
    if (distance == undefined) { distance = ""; }
    if (duration == undefined) { distance = ""; }
    var dis = distance.text;
    var dur = duration.text;
    var sint = latlng.lat() + " , " + latlng.lng();
    var contentString = '<b>' + label + '</b><br>' + "<p>" + sint + "<p>" + "Επόμενος σταθμός:" + dis + "/" + dur;
    var infowindow2 = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      icon: url,
      title: label,
      subtitle: sint,
      zIndex: Math.round(latlng.lat() * -100000) << 5
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow2.setContent(contentString);
      infowindow2.open(this.map, marker);
    });
  }


  startWithoutApi() {
    // 	this.backgroundGeolocation.start();
    var startDate = new Date().toLocaleTimeString();
    console.log(startDate);
    this.board = 1;
    this.startTr = 1;
    if (this.startTr == 1) {
      this.onTimeOut();
    }
    alert("Αποδοχή δρομολογίου από τη θέση " + this.latitude + "," + this.longitude + " και ώρα " + startDate + ".");
  }
  endWithoutApi() {
    //	this.backgroundGeolocation.stop();
    var endDate = new Date().toLocaleTimeString();
    console.log(endDate);
    this.startTr = 0;
    alert("Τέλος δρομολογίου από τη θέση " + this.latitude + "," + this.longitude + " και ώρα " + endDate + ".");
    this.telos = 1;
    if (this.telos == 1) {

      console.log(this.dataFromTheRoutes);
      console.log(this.dataFromTheDriverId);
      this.router.navigate(['techinspect-finished-route/' + this.dataFromTheRoutes + '/' + this.dataFromTheDriverId]);
    } else {
      alert("Το δρομολόγιο δεν έχει τελειώσει");
    }
  }
  inspect() {
    if (this.telos == 1) {
      this.router.navigate(['techinspect'])
    }
    else {
      alert("Απαιτείται ολοκλήρωση του δρομολογίου.")
    }
  }
  navigateToRouteOnGoPage() {
    this.router.navigate(['routestarted'])
  }
  onTimeOut() {
    if (this.startTr == 1) {
      Geolocation.getCurrentPosition()


        .then(response => {

          console.log(response.coords.latitude, response.coords.longitude);

          let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_drv_geo.cfm?'
            + 'driver_id=' + this.dataFromTheRoutesJSON.DRIVER_ID
            + '&srv_type=' + this.dataFromTheRoutesJSON.SERVICE
            + '&srv_code=' + this.dataFromTheRoutesJSON.SERVICECODE
            + '&sp_id=' + -1
            + '&sp_code=' + -1
            + '&fromd=' + this.dataFromTheRoutesJSON.ASSIGNMENT_FROM_DATE
            + '&tod=' + this.dataFromTheRoutesJSON.ASSIGNMENT_TO_DATE
            + '&vehicle_map_id=' + this.dataFromTheRoutesJSON.VEHICLE_MAP_ID
            + '&vhc_id=' + 1
            + '&vhc_plates=' + this.dataFromTheRoutesJSON.VHC_PLATES
            + '&version_id=' + 1
            + '&VechicleTypeID=' + 1
            + '&virtualversion_id=' + 1
            + '&latitude=' + response.coords.latitude
            + '&longitude=' + response.coords.longitude
            + '&userid=dmta', {}, {
            'Content-Type': 'application/json'
          });

          from(nativeCall).pipe(
            finalize(() => console.log(''))
          ).subscribe((data) => {
            console.log(data);
          })

        })
        .catch(error => {
          console.log('error could not ');
          console.log(error);

        })
      setTimeout(() => {
        this.onTimeOut();
      }, 100000);
    }
  }
  showBtn() {
    console.log('here');
    if ((this.hideBackBtn === false) && (this.hideEndBtn === false) && (this.hideCustomBtn === false)) {
      this.hideBackBtn = true;
      this.hideEndBtn = true;
      this.hideCustomBtn = true;
      document.getElementById('map').style.height = "75%";
    } else {
      this.hideBackBtn = false;
      this.hideEndBtn = false;
      this.hideCustomBtn = false;
      document.getElementById('map').style.height = "87%";
    }
  }


}
