var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ConnectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ConnectProvider = /** @class */ (function () {
    function ConnectProvider(http) {
        this.http = http;
        this.ip_address = 'venus.weblogic.gr/itour_demo/itourapi';
        this.trp_code = "ATHALX";
        this.date = "2020/05/20";
        console.log('Hello ConnectProvider Provider');
    }
    // loginJSON(){
    //     this.mobile = localStorage.getItem('mobile');
    //     this.pass = localStorage.getItem('pass');
    //     return this.http.get('http://venus.weblogic.gr/rezglo/rezglotaxi/TaxiApi/login.cfm?mobile='+this.mobile
    //   +'&pass='+this.pass).map(res => res.json());
    // }
    ConnectProvider.prototype.getJsonRouteList = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_available_route_list.cfm').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.dataProcessitourapi = function (body, file) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://venus.weblogic.gr/itour_demo/itourapi/' + file + '.cfm';
        this.passengerid = localStorage.getItem('passengerid');
        this.LoginCode = localStorage.getItem('LoginCode');
        this.userid = 'tures_b2c';
        var parameterSeperator = "&";
        if (body.trim() == "") {
            parameterSeperator = "";
        }
        body = body + parameterSeperator + "passengerid=" + this.passengerid + "&userid=" + this.userid + "&LoginCode=" + this.LoginCode;
        console.log(url + "?" + body);
        console.log(body);
        if (!navigator.onLine) {
        }
        //let data= this.http.post(url, body, options).map(res => res);
        var data = this.http.get(url + "?" + body, options).map(function (res) { return res; });
        return data;
    };
    ConnectProvider.prototype.getJsonCurrentRoute = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_route_pickups.cfm?trp_code=' + this.trp_code).map(function (res) { return res.json(); });
        //return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_route_details_map.cfm').map(res => res.json());
    };
    ConnectProvider.prototype.getJsonCurrentRouteMap = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_route_pickups.cfm?trp_code=' + this.trp_code + "&date=" + this.date).map(function (res) { return res.json(); });
        //return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_route_details_map.cfm').map(res => res.json());
    };
    ConnectProvider.prototype.getJsonBusBuilder = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_seats_availability_date.cfm').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.getJsonLogin = function () {
        this.mobile = localStorage.getItem('mobile');
        this.pass = localStorage.getItem('pass');
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_driver_login.cfm?mobile='
            + this.mobile + '&password=' + this.pass + '&Userid=tures_b2c').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.getJsonReg1 = function () {
        this.firstName = localStorage.getItem('fistName');
        this.lastName = localStorage.getItem('lastName');
        this.licNumber = localStorage.getItem('licNumber');
        this.birth = localStorage.getItem('birth');
        this.pass = localStorage.getItem('pass');
        this.mobile = localStorage.getItem('mobile');
        this.Location = localStorage.getItem('location');
        this.Country = localStorage.getItem('country');
        this.address = localStorage.getItem('address');
        this.zip = localStorage.getItem('zip');
        this.email = localStorage.getItem('email');
        this.plate = localStorage.getItem('plate');
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_driver_signup.cfm?first_name=' +
            this.firstName + '&last_name=' + this.lastName + '&license_number=' + this.licNumber + '&birthday=' + this.birth + '&password=' +
            this.pass + '&Mobile=' + this.mobile + '&Country=' + this.Country + '&Location=' + this.Location + '&Address=' + this.address +
            '&Zip=' + this.zip + '&Email=' + this.email + '&vhc_plate=' + this.plate + '&Userid=tures_b2c').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.getJsonReg2 = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_driver_activate.cfm').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.sendRouteAccept = function () {
        this.acceptFlag = localStorage.getItem('acceptFlag');
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_accept_decline_route.cfm').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.getJsonCountry = function () {
        return this.http.get('http://venus.weblogic.gr/itour_demo/itourapi/trp_countries.cfm').map(function (res) { return res.json(); });
    };
    ConnectProvider.prototype.sendJsonAlert = function () {
        this.alertValue = localStorage.getItem('alert');
    };
    ConnectProvider.prototype.dataProcess = function (body, file) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://' + this.ip_address + '/' + file + '.cfm';
        this.driverid = localStorage.getItem('driverid');
        this.LoginCode = localStorage.getItem('LoginCode');
        var parameterSeperator = "&";
        if (body.trim() == "") {
            parameterSeperator = "";
        }
        body = body + parameterSeperator + "driverid=" + this.driverid + "&LoginCode=" + this.LoginCode;
        console.log(url);
        console.log(body);
        if (!navigator.onLine) {
        }
        var data = this.http.post(url, body, options)
            .map(function (res) { return res; });
        return data;
    };
    ConnectProvider.prototype.dataProcessGet = function (body, url) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        this.driverid = localStorage.getItem('driverid');
        this.LoginCode = localStorage.getItem('LoginCode');
        var parameterSeperator = "&";
        if (body.trim() == "") {
            parameterSeperator = "";
        }
        //body = body + parameterSeperator + "driverid=" + this.driverid + "&LoginCode=" + this.LoginCode;
        console.log(url);
        console.log(body);
        return this.http.get(url, options)
            .map(function (res) { return res; });
    };
    ConnectProvider.prototype.uploadImage = function (username, image) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        //let ip_address = '192.168.1.79';
        var url = 'http://' + this.ip_address + '/tomorrow/uploadImage.php';
        var body = 'username=' + username + '&image=' + image;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res; });
    };
    ConnectProvider.prototype.getImage = function (username) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        //let ip_address = '192.168.1.79';
        var url = 'http://' + this.ip_address + '/tomorrow/getImage.php';
        var body = 'username=' + username;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res; });
    };
    ConnectProvider.prototype.edit = function (name, address) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        //let ip_address = '192.168.1.79';
        var url = 'http://' + this.ip_address + '/tomorrow/editDetails.php';
        var email = localStorage.getItem('username');
        var body = 'username=' + email + '&name=' + name + '&address=' + address;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res; });
    };
    ConnectProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ConnectProvider);
    return ConnectProvider;
}());
export { ConnectProvider };
//# sourceMappingURL=connect.js.map