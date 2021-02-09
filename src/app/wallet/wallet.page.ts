import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
	wallettypegre_json=[{"tran_type_id": "1", "tran_type_sh_name": "TOLL", "tran_type_descr_gre": "Διόδια", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "2", "tran_type_sh_name": "FUEL", "tran_type_descr_gre": "Καύσιμα", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "3", "tran_type_sh_name": "OILS", "tran_type_descr_gre": "Λάδια", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "4", "tran_type_sh_name": "MAINT", "tran_type_descr_gre": "Συντήρηση", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "5", "tran_type_sh_name": "PARK", "tran_type_descr_gre": "Πάρκινγκ", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "6", "tran_type_sh_name": "PAY", "tran_type_descr_gre": "Πληρωμή από πελάτη", "tran_type": "INCOME", "is_active": "1"}];

	wallettypeeng_json=[{"tran_type_id": "1", "tran_type_sh_name": "TOLL", "tran_type_descr_eng": "Toll", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "2", "tran_type_sh_name": "FUEL", "tran_type_descr_eng": "Fuel", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "3", "tran_type_sh_name": "OILS", "tran_type_descr_eng": "Oils", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "4", "tran_type_sh_name": "MAINT", "tran_type_descr_eng": "Maintenace", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "5", "tran_type_sh_name": "PARK", "tran_type_descr_eng": "Parking", "tran_type": "COST", "is_active": "1"},
	{"tran_type_id": "6", "tran_type_sh_name": "PAY", "tran_type_descr_eng": "Payment from customer", "tran_type": "INCOME", "is_active": "1"}];

    types=["Cost", "Income"];
    language=localStorage.getItem('lang');
	enlangs:any;
	ellangs:any;
	ids:any;
	selectedValue:any;
	eng=false;
	el=false;
	amount:any;
	checkpointen:any;
	checkpointel:any;

  constructor(private router : Router) { 
  	console.log(this.language);
  	this.enlangs=[];
  	this.ellangs=[];
  	this.ids=[];
  }

  ngOnInit() {
  }
  confirm(){
  	this.enlangs=[];
  	this.ellangs=[];
  	 		var i=0;
  		var j=0;
  	if(this.language=="en" && this.selectedValue=="Cost"){
  		console.log("here");
  		for(i=0; i<this.wallettypeeng_json.length; i++){
  			console.log("here2");
  			if(this.wallettypeeng_json[i].tran_type=="COST"){
  				console.log("here3");
  			this.enlangs[j]=this.wallettypeeng_json[i].tran_type_descr_eng;
  			this.ids[j]=this.wallettypeeng_json[i].tran_type_id;
  			j=j+1;
  		}
  	}
  		this.el=false;
  		this.eng=true;
  		
  	}
  	 if(this.language=="gr" && this.selectedValue=="Cost"){
  		for(i=0; i<this.wallettypegre_json.length; i++){
  			if(this.wallettypegre_json[i].tran_type=="COST"){
  			this.ellangs[j]=this.wallettypegre_json[i].tran_type_descr_gre;
  			this.ids[j]=this.wallettypegre_json[i].tran_type_id;
  			j=j+1;
  		}
  	}
  		this.eng=false;
  		this.el=true;
  		
  	}
  	 if(this.language=="en" && this.selectedValue=="Income"){
  		for(i=0; i<this.wallettypeeng_json.length; i++){
  			if(this.wallettypeeng_json[i].tran_type=="INCOME"){
  			this.enlangs[j]=this.wallettypeeng_json[i].tran_type_descr_eng;
  			this.ids[j]=this.wallettypeeng_json[i].tran_type_id;
  			j=j+1;
  		}
  	}
  		this.el=false;
  		this.eng=true;
  	}
  	 if(this.language=="gr" && this.selectedValue=="Income"){
  		for(i=0; i<this.wallettypegre_json.length; i++){
  			if(this.wallettypegre_json[i].tran_type=="INCOME"){
  			this.ellangs[j]=this.wallettypegre_json[i].tran_type_descr_gre;
  			this.ids[j]=this.wallettypegre_json[i].tran_type_id;
  			j=j+1;
  		}
  	}
  		this.eng=false;
  		this.el=true;
  		
  	}

  }
  check(amount){
  		
  	if(this.language=="en"){
  		alert( this.amount + " euros as " + this.selectedValue + " for the transaction " + this.checkpointen);
  	}
  	else
  		if(this.language=="gr"){
  		alert( this.amount + " ευρώ ως " + this.selectedValue + " για την συνναλαγή " + this.checkpointel);
  	}
  }
  navigateToFeedPage(){
    this.router.navigate(['routelist'])
  }
  navigateToSettingsPage(){
    this.router.navigate(['settings'])
  }
  navigateToRouteHistoryPage(){
    this.router.navigate(['routehistory'])
  }
  navigateToTechHistoryPage(){
    this.router.navigate(['techhistory'])
  }
  navigateToWalletPage(){
    this.router.navigate(['wallet'])
  }
  navigateToProfilePage(){
    this.router.navigate(['profile'])
  }
  navigateToRouteListPage(){
    this.router.navigate(['routelist'])
  }
  navigateToNotificationsPage(){
	  this.router.navigate(['notifications']);
  }

}
