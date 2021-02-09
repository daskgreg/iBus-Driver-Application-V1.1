
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { map } from 'rxjs/operators';


@Injectable()
export class ConnectProvider {
  driverid:string;
  LoginCode:string;
  response:any;
  mobile:string;
  pass:string;
  ip_address: any='dev1.travelsoft.gr/iapps_framework/itourapi';
  //ip_address: any='localhost:8500/DriverApp';
  //ip_address: any='171.49.154.23:8500/DriverApp';
  firstName:any;
  lastName:any;
  licNumber:any;
  birth:any;
 
  Location:any;
  Country:any;
  address:any;
  zip:any;
  email:any;
  plate:any;
  
  passengerid: string;
  userid:string;
  trp_code:any="ATHALX";
  date:any="2020/05/20";
  ticket_date:any="2020/05/28";
  alertValue:string;
  acceptFlag:string;
   
  
  constructor(public http: HttpClient,private nativeHttp: HTTP) {
    console.log('Hello ConnectProvider Provider');
    
  }

 
  
  getJsonLogin(){


    console.log("here");
    this.mobile = localStorage.getItem('mobile');
    this.pass = localStorage.getItem('pass');
    
    

    
    var myrl = this.http.get('http://localhost:3000/login2?users'
    + '&mobile=' + this.mobile+'&password='+this.pass )
    console.log(myrl);
    return myrl;
    
  }

  getJsonLogin2(){
    this.mobile = localStorage.getItem('mobile');
    this.pass = localStorage.getItem('pass');



  }



  }
  


