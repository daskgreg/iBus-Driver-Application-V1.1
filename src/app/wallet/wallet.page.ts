import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.page.html',
	styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
	wallettypegre_json = [{ "tran_type_id": "1", "tran_type_sh_name": "TOLL", "tran_type_descr_gre": "Διόδια", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "2", "tran_type_sh_name": "FUEL", "tran_type_descr_gre": "Καύσιμα", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "3", "tran_type_sh_name": "OILS", "tran_type_descr_gre": "Λάδια", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "4", "tran_type_sh_name": "MAINT", "tran_type_descr_gre": "Συντήρηση", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "5", "tran_type_sh_name": "PARK", "tran_type_descr_gre": "Πάρκινγκ", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "6", "tran_type_sh_name": "PAY", "tran_type_descr_gre": "Πληρωμή από πελάτη", "tran_type": "INCOME", "is_active": "1" }];

	wallettypeeng_json = [{ "tran_type_id": "1", "tran_type_sh_name": "TOLL", "tran_type_descr_eng": "Toll", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "2", "tran_type_sh_name": "FUEL", "tran_type_descr_eng": "Fuel", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "3", "tran_type_sh_name": "OILS", "tran_type_descr_eng": "Oils", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "4", "tran_type_sh_name": "MAINT", "tran_type_descr_eng": "Maintenace", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "5", "tran_type_sh_name": "PARK", "tran_type_descr_eng": "Parking", "tran_type": "COST", "is_active": "1" },
	{ "tran_type_id": "6", "tran_type_sh_name": "PAY", "tran_type_descr_eng": "Payment from customer", "tran_type": "INCOME", "is_active": "1" }];

	types = ["Cost", "Income"];
	language = localStorage.getItem('lang');
	enlangs: any;
	ellangs: any;
	ids: any;
	selectedValue: any;
	eng = false;
	el = false;
	amount: any;
	checkpointen: any;
	checkpointel: any;

	//greg 

	get typeOfPayment() {
		return this.paymentForm.get('typeOfPayment');
	}
	get tranId() {
		return this.paymentForm.get('tranId');
	}
	get transactionType() {
		return this.paymentForm.get('transactionType');
	}
	get otherTransactionType() {
		return this.paymentForm.get('otherTransactionType');
	}
	get ammountOfPayment() {
		return this.paymentForm.get('ammountOfPayment');
	}

	public errorMessages = {
		typeOfPayment: [
			{ type: 'required', message: 'Type of payment is required' },
		],
		ammountOfPayment: [
			{ type: 'required', message: 'Amount of Payment is required' },
		]
	}

	paymentForm = this.formBuilder.group({
		typeOfPayment: ['', [Validators.required]],
		ammountOfPayment: ['', [Validators.required]],
		transactionType: [''],
		otherTransactionType: [''],
		tranId: ['']
	})

	serviceRegistration: any = "";
	dataFromService: any = "";
	dataFromAllOverTheApplicationBringingDriverId: any;
	dataFromAllOverTheApplicationBringingDriverIdJSON: any;
	wallets: any = [];
	walletsJSON: any;
	walletsJSONtoArray: any = [];
	dataTakenFromRouteStartedList: any;
	dataTakenFromRouteSTartedListJSON: any;
	personId: any;
	Id: any;
	constructor(public platform: Platform, private nativeHttp: HTTP, private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController, public http: HttpClient, private router: Router, public formBuilder: FormBuilder) {

		this.dataTakenFromRouteStartedList = this.activatedRoute.snapshot.paramMap.get('routestartedetails');
		this.dataTakenFromRouteSTartedListJSON = JSON.parse(this.dataTakenFromRouteStartedList);
		console.log('%c DATA TAKEN FROM ROUTE STARTED', 'color:yellow');
		console.log(this.dataTakenFromRouteSTartedListJSON.PERSON_ID);
		this.personId = this.dataTakenFromRouteSTartedListJSON.PERSON_ID
		// TA ROUTE DETAILS 


		console.log(this.dataTakenFromRouteSTartedListJSON);

		this.dataFromAllOverTheApplicationBringingDriverId = this.activatedRoute.snapshot.paramMap.get('fordriverid');
		this.dataFromAllOverTheApplicationBringingDriverIdJSON = JSON.parse(this.dataFromAllOverTheApplicationBringingDriverId);
		console.log('%c DATA FROM ROUTELIST JSON', 'color:orange;')
		console.log(this.dataFromAllOverTheApplicationBringingDriverIdJSON);
		this.Id = this.dataFromAllOverTheApplicationBringingDriverIdJSON;


		console.log(this.language);
		this.enlangs = [];
		this.ellangs = [];
		this.ids = [];
	}
	ngOnInit() {

	}
	walletsArray: any = [];
	//   ionViewWillEnter(){
	// 	console.log('wallet');
	// 	let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_list.cfm?' 
	// 	+ 'driver_id=' + this.dataTakenFromRouteSTartedListJSON 
	// 	+ '&userid=dmta'
	// 	, {}, {
	// 		'Content-Type': 'application/json'
	// 	})
	// 	from(myNativeCall).pipe(
	// 		finalize( () => console.log())
	// 		)
	// 	.subscribe( (data) => {


	// 		let parsed = JSON.parse(data.data).WTRANS;

	// 		this.wallets = parsed;


	// 		this.walletsJSON = this.wallets;
	// 		console.log(this.walletsJSON);


	// 		for(var i = 0; i<this.walletsJSON.length; i++){
	// 			console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);
	// 			console.log(this.walletsJSON[i].TRAN_TYPE_ID);
	// 			console.log(this.walletsJSON[i].DEBIT);
	// 		}
	// 	})
	//   }
	costinc = false;
	donedone: any = [];


	confirmPaymentWithEveryHttp() {
		this.platform.is('cordova') ? this.confirm() : this.confirmHttpClient();
	}

	confirmHttpClient() {
		console.log('%c HTTP CLIENT ', 'color:orange;');
		if (this.selectedValue == 'Cost' && this.language == 'en') {

			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=COST&userid=dmta')

				.subscribe((data) => {


					let parsed = data;

					this.wallets = parsed;


					this.walletsJSON = this.wallets.WTYPES;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);
						this.donedone = this.walletsJSON[i].TRAN_TYPE_ID;
						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;


				})
		} else if (this.selectedValue == 'Income' && this.language == 'en') {
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=INCOME&userid=dmta')
				.subscribe((data) => {


					let parsed = data

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets.WTYPES;;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})


		}


		else if (this.selectedValue == 'Cost' && this.language == 'gr') {
			console.log('inside gr');
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=gre&tran_type=COST&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})
		} else {
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=gre&tran_type=INCOME&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})
		}

		// this.enlangs=[];
		// this.ellangs=[];
		//  		var i=0;
		// 	var j=0;
		// if(this.language=="en" && this.selectedValue=="Cost"){
		// 	console.log("here");
		// 	for(i=0; i<this.wallettypeeng_json.length; i++){
		// 		console.log("here2");
		// 		if(this.wallettypeeng_json[i].tran_type=="COST"){
		// 			console.log("here3");
		// 		this.enlangs[j]=this.wallettypeeng_json[i].tran_type_descr_eng;
		// 		this.ids[j]=this.wallettypeeng_json[i].tran_type_id;
		// 		j=j+1;
		// 	}
		// }
		// 	this.el=false;
		// 	this.eng=true;

		// }
		//  if(this.language=="gr" && this.selectedValue=="Cost"){
		// 	for(i=0; i<this.wallettypegre_json.length; i++){
		// 		if(this.wallettypegre_json[i].tran_type=="COST"){
		// 		this.ellangs[j]=this.wallettypegre_json[i].tran_type_descr_gre;
		// 		this.ids[j]=this.wallettypegre_json[i].tran_type_id;
		// 		j=j+1;
		// 	}
		// }
		// 	this.eng=false;
		// 	this.el=true;

		// }
		//  if(this.language=="en" && this.selectedValue=="Income"){
		// 	for(i=0; i<this.wallettypeeng_json.length; i++){
		// 		if(this.wallettypeeng_json[i].tran_type=="INCOME"){
		// 		this.enlangs[j]=this.wallettypeeng_json[i].tran_type_descr_eng;
		// 		this.ids[j]=this.wallettypeeng_json[i].tran_type_id;
		// 		j=j+1;
		// 	}
		// }
		// 	this.el=false;
		// 	this.eng=true;
		// }
		//  if(this.language=="gr" && this.selectedValue=="Income"){
		// 	for(i=0; i<this.wallettypegre_json.length; i++){
		// 		if(this.wallettypegre_json[i].tran_type=="INCOME"){
		// 		this.ellangs[j]=this.wallettypegre_json[i].tran_type_descr_gre;
		// 		this.ids[j]=this.wallettypegre_json[i].tran_type_id;
		// 		j=j+1;
		// 	}
		// }
		// 	this.eng=false;
		// 	this.el=true;

		// }
		console.log(myPaymentForm.tranId);
	}

	confirm() {

		if (this.selectedValue == 'Cost' && this.language == 'en') {

			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=COST&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);
						this.donedone = this.walletsJSON[i].TRAN_TYPE_ID;
						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;


				})
		} else if (this.selectedValue == 'Income' && this.language == 'en') {
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=INCOME&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})


		}


		else if (this.selectedValue == 'Cost' && this.language == 'gr') {
			console.log('inside gr');
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=gre&tran_type=COST&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})
		} else {
			var myPaymentForm = this.paymentForm.value;
			console.log('im in send data');

			console.log(myPaymentForm.typeOfPayment); // Income


			console.log('call this');
			let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=gre&tran_type=INCOME&userid=dmta'
				, {}, {
				'Content-Type': 'application/json'
			})
			from(myNativeCall).pipe(
				finalize(() => console.log())
			)
				.subscribe((data) => {


					let parsed = JSON.parse(data.data).WTYPES;

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets;
					console.log(this.walletsJSON);


					for (var i = 0; i < this.walletsJSON.length; i++) {

						console.log(this.walletsJSON[i].TRAN_TYPE_ID);

						console.log(this.walletsJSON[i].TRAN_TYPE_SH_NAME);
						console.log(this.walletsJSON[i].TRAN_TYPE_DESCR);

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;
						console.log(this.donedone);

						console.log(this.walletsJSON[i].INCOME);

					} this.costinc = true;

				})
		}

		
		console.log(myPaymentForm.tranId);
	}



	mi: any;
	check(amount) {

		if (this.language == "en") {
			alert(this.amount + " euros as " + this.selectedValue + " for the transaction " + this.tranId);
		}
		else
			if (this.language == "gr") {
				alert(this.amount + " ευρώ ως " + this.selectedValue + " για την συνναλαγή " + this.checkpointel);
			}
	}
	//
	i: any;
	tranid = false;

	public sendData(paymentForm) {


		this.submit();
	}
	tranTypeId: any;
	thePaymentForm: any = [];



	submit() {
		console.log(this.paymentForm.value);
		this.thePaymentForm = this.paymentForm.value;
		console.log(this.thePaymentForm)

		let fromDate = this.dataTakenFromRouteSTartedListJSON.ASSIGNMENT_FROM_DATE;
		let fromDateToGo555 = fromDate.split(/\s/).join(',');
		console.log("from Date", fromDate);

		let fromDateToGo = new Date(fromDateToGo555);

		console.log("from Date 2 ", fromDateToGo);

		let year = fromDateToGo.getFullYear();
		console.log("year", year)

		let month = fromDateToGo.getMonth() + 1;

		console.log(month);

		let date = fromDateToGo.getDate();
		console.log(date);

		let fulldateFromDate = year + '-' + month + '-' + date;
		console.log(fulldateFromDate);

		let toDate = this.dataTakenFromRouteSTartedListJSON.ASSIGNMENT_TO_DATE;
		let toDateToGo555 = toDate.split(/\s/).join(',');
		console.log("from Date", toDate);

		let toDateToGo = new Date(toDateToGo555);

		console.log("from Date 2 ", toDateToGo);

		let year2 = toDateToGo.getFullYear();
		console.log("year", year)

		let month2 = toDateToGo.getMonth() + 1;

		console.log(month2);

		let date2 = toDateToGo.getDate();
		console.log(date2);

		let fulldateToDate = year + '-' + month + '-' + date;
		console.log(fulldateFromDate);


		console.log('Service code',);
		console.log('', this.thePaymentForm.ammountOfPayment);
		// let url='http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_add.cfm'? 
		// + 'driver_id=' + 16 
		// + '&sp_id=' + 1
		// + '&sp_code=' + 2
		// + '&fromd=' + '2021-01-16'
		// + '&tod=' + '2021-01-16'
		// + '&tran_type=' + 'COST'
		// + '&tran_type_id=' +   1
		// + '&srv_type=' + 'CHT'
		// + '&srv_code=' + 2
		// + '&credit=' + 0
		// + '&debit=' + 20.0
		// + '&userid=dmta'
		//  this.http.get(url, {}, {
		// 	'Content-Type': 'application/json'
		// })


		if (this.thePaymentForm.typeOfPayment == 'Cost') {
			if (this.platform.is('cordova')) {

				let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_add.cfm?'
					+ 'driver_id=' + this.dataTakenFromRouteSTartedListJSON.DRIVER_ID
					+ '&sp_id=' + 1
					+ '&sp_code=' + 1 //this.dataTakenFromRouteSTartedListJSON.SP_CODE
					+ '&tod=' + fulldateToDate
					+ '&tran_type=' + this.thePaymentForm.typeOfPayment
					+ '&tran_type_id=' + 1
					+ '&srv_type=' + this.dataTakenFromRouteSTartedListJSON.SERVICE
					+ '&srv_code=' + this.dataTakenFromRouteSTartedListJSON.SERVICECODE
					+ '&credit=' + 0
					+ '&debit=' + this.thePaymentForm.ammountOfPayment
					+ '&userid=dmta', {}, {
					'Content-Type': 'application/x-www-form-urlencoded',
				});


				from(myNativeCall).pipe(
					finalize(() => console.log('tete'))
				)

					.subscribe(data => {


						console.log('mpikes?');
						console.log(data)

						this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
					}, err => {
						console.log('Error of Vehicle check', err)
					});
			} else {
				this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_add.cfm?'
					+ 'driver_id=' + this.dataTakenFromRouteSTartedListJSON.DRIVER_ID
					+ '&sp_id=' + 1
					+ '&sp_code=' + 1 //this.dataTakenFromRouteSTartedListJSON.SP_CODE
					+ '&fromd=' + fulldateFromDate
					+ '&tod=' + fulldateToDate
					+ '&tran_type=' + this.thePaymentForm.typeOfPayment
					+ '&tran_type_id=' + 1
					+ '&srv_type=' + this.dataTakenFromRouteSTartedListJSON.SERVICE
					+ '&srv_code=' + this.dataTakenFromRouteSTartedListJSON.SERVICECODE
					+ '&credit=' + 0
					+ '&debit=' + this.thePaymentForm.ammountOfPayment
					+ '&userid=dmta')

					.subscribe(data => {


						console.log('mpikes?');
						console.log(data)

						this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
					}, err => {
						console.log('Error of Vehicle check', err)
					});
			}


		} else {
			if (this.platform.is('cordova')) {

				let myNativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_add.cfm?'
					+ 'driver_id=' + this.dataTakenFromRouteSTartedListJSON.DRIVER_ID
					+ '&sp_id=' + 1
					+ '&sp_code=' + 1 //this.dataTakenFromRouteSTartedListJSON.SP_CODE
					+ '&fromd=' + fulldateFromDate
					+ '&tod=' + fulldateToDate
					+ '&tran_type=' + this.thePaymentForm.typeOfPayment
					+ '&tran_type_id=' + 1
					+ '&srv_type=' + this.dataTakenFromRouteSTartedListJSON.SERVICE
					+ '&srv_code=' + this.dataTakenFromRouteSTartedListJSON.SERVICECODE
					+ '&credit=' + this.thePaymentForm.ammountOfPayment
					+ '&debit=' + 0
					+ '&userid=dmta', {}, {
					'Content-Type': 'application/x-www-form-urlencoded',
				});


				from(myNativeCall).pipe(
					finalize(() => console.log('tete'))
				)

					.subscribe(data => {


						console.log('mpikes?');
						console.log(data)

						this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
					}, err => {
						console.log('Error of Vehicle check', err)
					});
			} else {
				this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_add.cfm?'
					+ 'driver_id=' + this.dataTakenFromRouteSTartedListJSON.DRIVER_ID
					+ '&sp_id=' + 1
					+ '&sp_code=' + 1 //this.dataTakenFromRouteSTartedListJSON.SP_CODE
					+ '&fromd=' + fulldateFromDate
					+ '&tod=' + fulldateToDate
					+ '&tran_type=' + this.thePaymentForm.typeOfPayment
					+ '&tran_type_id=' + 1
					+ '&srv_type=' + this.dataTakenFromRouteSTartedListJSON.SERVICE
					+ '&srv_code=' + this.dataTakenFromRouteSTartedListJSON.SERVICECODE
					+ '&credit=' + this.thePaymentForm.ammountOfPayment
					+ '&debit=' + 0
					+ '&userid=dmta')

					.subscribe(data => {


						console.log('mpikes?');
						console.log(data)

						this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
					}, err => {
						console.log('Error of Vehicle check', err)
					});
			}


		}
	}
	weAreAlreadyInWalletPage() {
		console.log('%c You are already in Wallet Page', 'color:green;');
	}
	goBackToRouteListPageWithDriverId() {
		console.log('%c Going Back To Route list Page with Driver Id', 'color:orange;');
		console.log(this.dataFromAllOverTheApplicationBringingDriverIdJSON)

		this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + this.Id]);
	}
	navigateToSettingsPage() {
		this.router.navigate(['settings'])
	}
	navigateToRouteHistoryPage() {
		this.router.navigate(['routehistory'])
	}
	navigateToTechHistoryPage() {
		this.router.navigate(['techhistory'])
	}
	navigateToWalletPage() {
		this.router.navigate(['wallet'])
	}
	navigateToProfilePage() {
		this.router.navigate(['profile'])
	}

	navigateToNotificationsPage() {
		this.router.navigate(['notifications']);
	}
	goingBackToRouteList() {
		this.router.navigate(['routelist/' + this.Id + '/' + this.personId]);
	}

}
