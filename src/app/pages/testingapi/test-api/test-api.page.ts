import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.page.html',
  styleUrls: ['./test-api.page.scss'],
})
export class TestApiPage implements OnInit {

  constructor(public loadingCtrl: LoadingController,private platform:Platform,private nativeHttp:HTTP,private http:HttpClient) { }

  ngOnInit() {
  }

  allRequestsButton(){
    this.platform.is('cordova') ? this.nativeRequest() : this.simpleRequest();
  }
  times=0;
  count=0;
  requestStatus:any;
  response2:any;
  response:any;
  id:any;
  msg:any;
  i = 0;
  j:any;


nativeRequest(){

    var headers = new Headers();

    headers.append("Accept", 'application/json');

    headers.append('Content-Type', 'application/json' );

    const requestOptions  = 
    {
      headers: new HttpHeaders({

        'Content-Type':  'application/json'

        })
    };
    let postData = 
    {
            // Empty Post Request Parameters
            // Here you can specify the POST parameters
    }
    this.http.post("http://157.230.111.163/simple", postData, requestOptions)
      .subscribe(data => 
       {

        console.log(data['_body']);

       }, error => {

        console.log(error);
        
       });
}


simpleRequest(){

  let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/', {}, {

    'Content-Type': 'application/json'

  });
  from(nativeCall).pipe(

    finalize(() => console.log('smth'))

  )
    .subscribe(async (data) => {

      console.log(data);

    })
}
}