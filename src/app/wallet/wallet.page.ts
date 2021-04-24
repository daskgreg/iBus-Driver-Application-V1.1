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

		this.personId = this.dataTakenFromRouteSTartedListJSON.PERSON_ID

		this.dataFromAllOverTheApplicationBringingDriverId = this.activatedRoute.snapshot.paramMap.get('fordriverid');

		this.dataFromAllOverTheApplicationBringingDriverIdJSON = JSON.parse(this.dataFromAllOverTheApplicationBringingDriverId);

		this.Id = this.dataFromAllOverTheApplicationBringingDriverIdJSON;

		this.enlangs = [];

		this.ellangs = [];

		this.ids = [];
	}
	ngOnInit() {

	}
	walletsArray: any = [];

	costinc = false;

	donedone: any = [];


	confirmPaymentWithEveryHttp() {
		this.platform.is('cordova') ? this.confirm() : this.confirmHttpClient();
	}

	confirmHttpClient() {
		if (this.selectedValue == 'Cost' && this.language == 'en') {

			var myPaymentForm = this.paymentForm.value;

			this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=COST&userid=dmta')

				.subscribe((data) => {


					let parsed = data;

					this.wallets = parsed;


					this.walletsJSON = this.wallets.WTYPES;

					for (var i = 0; i < this.walletsJSON.length; i++) {

						this.donedone = this.walletsJSON[i].TRAN_TYPE_ID;

					} this.costinc = true;


				})
		} else if (this.selectedValue == 'Income' && this.language == 'en') {
			var myPaymentForm = this.paymentForm.value;

			this.http.get('http://cf11.travelsoft.gr/itourapi/drv_wallet_tran_type.cfm?lang=eng&tran_type=INCOME&userid=dmta')
				.subscribe((data) => {


					let parsed = data

					this.wallets = parsed;
					//

					this.walletsJSON = this.wallets.WTYPES;;


					for (var i = 0; i < this.walletsJSON.length; i++) {

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;

					} this.costinc = true;

				})


		}


		else if (this.selectedValue == 'Cost' && this.language == 'gr') {

			var myPaymentForm = this.paymentForm.value;

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


					for (var i = 0; i < this.walletsJSON.length; i++) {


						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;

					} this.costinc = true;

				})
		} else {
			var myPaymentForm = this.paymentForm.value;
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


					for (var i = 0; i < this.walletsJSON.length; i++) {


						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;


					} this.costinc = true;

				})
		}

		
	}

	confirm() {

		if (this.selectedValue == 'Cost' && this.language == 'en') {

			var myPaymentForm = this.paymentForm.value;

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



					for (var i = 0; i < this.walletsJSON.length; i++) {


						this.donedone = this.walletsJSON[i].TRAN_TYPE_ID;

					} this.costinc = true;


				})
		} else if (this.selectedValue == 'Income' && this.language == 'en') {
			var myPaymentForm = this.paymentForm.value;

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



					for (var i = 0; i < this.walletsJSON.length; i++) {

						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;

					} this.costinc = true;

				})


		}


		else if (this.selectedValue == 'Cost' && this.language == 'gr') {
			var myPaymentForm = this.paymentForm.value;

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


					for (var i = 0; i < this.walletsJSON.length; i++) {



						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;

					} this.costinc = true;

				})
		} else {
			var myPaymentForm = this.paymentForm.value;

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


						this.donedone = this.walletsJSON[i].TRAN_TYPE_DESCR;


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
		this.thePaymentForm = this.paymentForm.value;

		let fromDate = this.dataTakenFromRouteSTartedListJSON.ASSIGNMENT_FROM_DATE;
		let fromDateToGo555 = fromDate.split(/\s/).join(',');

		let fromDateToGo = new Date(fromDateToGo555);


		let year = fromDateToGo.getFullYear();

		let month = fromDateToGo.getMonth() + 1;


		let date = fromDateToGo.getDate();


		let fulldateFromDate = year + '-' + month + '-' + date;

		let toDate = this.dataTakenFromRouteSTartedListJSON.ASSIGNMENT_TO_DATE;
		let toDateToGo555 = toDate.split(/\s/).join(',');

		let toDateToGo = new Date(toDateToGo555);


		let year2 = toDateToGo.getFullYear();

		let month2 = toDateToGo.getMonth() + 1;


		let date2 = toDateToGo.getDate();

		let fulldateToDate = year + '-' + month + '-' + date;



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



						this.router.navigate(['routestarted/' + JSON.stringify(this.dataTakenFromRouteSTartedListJSON) + '/' + JSON.stringify(this.dataFromAllOverTheApplicationBringingDriverIdJSON)]);
					}, err => {
						console.log('Error of Vehicle check', err)
					});
			}


		}
	}
	weAreAlreadyInWalletPage() {
	}
	goBackToRouteListPageWithDriverId() {

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
