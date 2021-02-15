import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

	//greg 

	get typeOfPayment(){
		return this.paymentForm.get('typeOfPayment');
	}
	get transactionType(){
		return this.paymentForm.get('transactionType');
	}
	get otherTransactionType(){
		return this.paymentForm.get('otherTransactionType');
	}
	get ammountOfPayment(){
		return this.paymentForm.get('ammountOfPayment');
	}

	public errorMessages = {
		typeOfPayment: [
			{ type: 'required', message: 'Type of payment is required'},
		],
		ammountOfPayment: [
			{ type: 'required', message: 'Amount of Payment is required'},
		]
	}

	paymentForm = this.formBuilder.group({
		typeOfPayment: ['', [Validators.required]],
		ammountOfPayment: ['', [Validators.required]],
		transactionType:[''],
		otherTransactionType:['']
	})

	serviceRegistration:any="";
	dataFromService:any="";
	dataFromAllOverTheApplicationBringingDriverId:any;
	dataFromAllOverTheApplicationBringingDriverIdJSON:any;
  constructor(private activatedRoute:ActivatedRoute, public loadingCtrl: LoadingController,public http:HttpClient, private router : Router, public formBuilder: FormBuilder) { 


    this.dataFromAllOverTheApplicationBringingDriverId = this.activatedRoute.snapshot.paramMap.get('fordriverid');
    this.dataFromAllOverTheApplicationBringingDriverIdJSON = JSON.parse(this.dataFromAllOverTheApplicationBringingDriverId);
    console.log('%c DATA FROM ROUTELIST JSON','color:orange;')
    console.log(this.dataFromAllOverTheApplicationBringingDriverIdJSON);
  

  	console.log(this.language);
  	this.enlangs=[];
  	this.ellangs=[];
  	this.ids=[];
  }

  wallets: any = [];

  ngOnInit() {
	
  }
  ionViewWillEnter(){
	console.log('wallet');
	this.http.get('http://localhost:3000/wallet').subscribe( (data) => {
		console.log(data);
		this.wallets = data;
	})
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
 

  public submit(){
  
	console.log(this.paymentForm.value);
	var myPaymentForm = this.paymentForm.value;
	this.sendData(myPaymentForm).subscribe(
	async (dataReturnFromService) => {
		let loader = await this.loadingCtrl.create({
			message: "Wallet is Updated"
		});
		loader.present();
	this.dataFromService = JSON.stringify(dataReturnFromService);
	console.log(JSON.stringify(dataReturnFromService));
	console.log( dataReturnFromService['_body'] );
	setTimeout(() => {
		loader.dismiss();
		this.router.navigate(['routestarted']);
	  }, 1000);
	//this.router.navigate(['register3']);

	}, error => {
	console.log(error);
	});
} 

sendData(myPaymentForm){
	var url="http://localhost:3000/walletDetails";
	return this.http.post(url,myPaymentForm,
		{headers:new HttpHeaders(
		{ "content-type":"application/json"
		})})

}
weAreAlreadyInWalletPage(){
	console.log('%c You are already in Wallet Page','color:green;');
}
goBackToRouteListPageWithDriverId(){
	console.log('%c Going Back To Route list Page with Driver Id','color:orange;');
	console.log(this.dataFromAllOverTheApplicationBringingDriverIdJSON)

	this.router.navigate(['routelist/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
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

  navigateToNotificationsPage(){
	  this.router.navigate(['notifications']);
  }

}
