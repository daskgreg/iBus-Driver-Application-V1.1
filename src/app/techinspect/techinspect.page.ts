import { LoadingController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-techinspect',
  templateUrl: './techinspect.page.html',
  styleUrls: ['./techinspect.page.scss'],
})
export class TechinspectPage implements OnInit {


  langs: any = ["Ελληνικά", "English"];
  language = localStorage.getItem('lang');
  enlangs: any;
  ellangs: any;
  ids: any;
  eng = false;
  el = false;
  com = false;
  comments: any;
  checkpointen: any;
  checkpointel: any;
  amount: any;
  imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;
  greekLanguage: any = [];
  greekLanguageJSON: any;
  englishLanguage: any = []
  englishLanguageJSON: any = [];
  myCommentForm: any = [];
  checkThePoint: any = []
  checkThePointComment: any = []
  test21: string;
  test22: Date;
  //greg
  get measurementData() {
    return this.commentForm.get('measurementData');
  }
  get comment() {
    return this.commentForm.get('comment');
  }
  public errorMessages = {
    comment: [
      { type: 'required', message: 'Comment is Required' },
      { type: 'maxlength', message: 'This field should be no longer than 200 characters' }
    ],
    measurementData: [
      {
        type: 'reuired', message: 'Fill Data'
      }
    ]
  }

  commentForm = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.maxLength(20)]],
    measurementData: ['', [Validators.required]]
  })

  serviceRegistration: any = "";
  dataFromService: any = "";
  dataFromStartedRouteWhileGoingBack: any;
  dataFromStartedRouteWhileGoingBackJSON: any;
  dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId: any;
  dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON: any;
  test1: any;
  test2: any;
  test3: any;
  personId: any;
  Id: any;
  constructor(private platform: Platform, private nativeHttp: HTTP, private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController, public http: HttpClient, private router: Router, public formBuilder: FormBuilder) {
    const selects = document.querySelectorAll('.custom-options');


    //greg 
    this.dataFromStartedRouteWhileGoingBack = this.activatedRoute.snapshot.paramMap.get('dataFromRoute')
    this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId = this.activatedRoute.snapshot.paramMap.get('datafromdriverId');
    this.dataFromStartedRouteWhileGoingBackJSON = JSON.parse(this.dataFromStartedRouteWhileGoingBack);
    this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON = JSON.parse(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId);
    this.personId = this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON
    this.Id = this.dataFromStartedRouteWhileGoingBackJSON.PERSON_ID;



    this.enlangs = [];
    this.ellangs = [];
    this.ids = [];



    var k = 0;

    if (this.language == "en") {


      if (this.platform.is('cordova')) {


        let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_checkpoints.cfm?lang=eng&userid=dmta', {}, {
          'Content-Type': 'application/json'
        });

        from(nativeCall).pipe(
          finalize(() => console.log(''))
        )

          .subscribe((data) => {
            let parsed = JSON.parse(data.data).CHECKS;
            this.englishLanguageJSON = parsed;
            this.test1 = this.englishLanguage;
          })

        this.el = false;
        this.eng = true;
      } else {


        this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_checkpoints.cfm?lang=eng&userid=dmta').subscribe((data) => {

          this.englishLanguage = data;

          this.englishLanguageJSON = this.englishLanguage.CHECKS
        })
        this.el = false;
        this.eng = true;

      }

    }
    else if (this.language == "gr") {
      this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_checkpoints.cfm?lang=gre&userid=dmta').subscribe((data) => {
        this.greekLanguage = data;
        this.greekLanguageJSON = this.greekLanguage.DATA;
      })
      this.el = true;
      this.eng = false;
    }

  }

  ngOnInit() {

  }
  submitWithEveryHttp() {
    this.platform.is('cordova') ? this.submitNativeClient() : this.submitHttpClient();
  }

  public submitHttpClient() {

    this.myCommentForm = this.commentForm.value;

    this.checkThePointComment = this.myCommentForm.comment;
    this.checkThePoint = this.myCommentForm.measurementData;

    //
    this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_inspect_add.cfm?'
      + 'vhc_plates=' + this.dataFromStartedRouteWhileGoingBackJSON.VHC_PLATES
      + '&chrbus_code=' + this.dataFromStartedRouteWhileGoingBackJSON.SERVICECODE
      + '&chrbus_sp_id=' + 1 //this.dataFromStartedRouteWhileGoingBackJSON.CHRBUS_SP_ID
      + '&sp_code=' + 1 //this.dataFromStartedRouteWhileGoingBackJSON.SP_CODE
      + '&fromd=' + this.dataFromStartedRouteWhileGoingBackJSON.ASSIGNMENT_FROM_DATE
      + '&tod=' + this.dataFromStartedRouteWhileGoingBackJSON.ASSIGNMENT_TO_DATE
      + '&driver_id=' + this.dataFromStartedRouteWhileGoingBackJSON.DRIVER_ID
      + '&checkpoint_id=' + this.checkThePoint.CHECKPOINT_ID
      + '&checkpoint_txt=' + this.checkThePoint.CHECKPOINT
      + '&checkpoint_status=' + this.checkThePoint.FLAG
      + '&comment=' + this.checkThePointComment
      + '&userid=dmta'
    ).subscribe(async (data) => {

      let loader = await this.loadingCtrl.create({
        message: "Tech Inspect SuccessFully Done"
      });
      loader.present();

      setTimeout(() => {
        loader.dismiss();
        this.router.navigate(['routestarted/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackJSON) + '/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON)]);
      }, 1000);
    })
  }
  myData: any;
  public submitNativeClient() {

    this.myCommentForm = this.commentForm.value;

    this.checkThePointComment = this.myCommentForm.comment;

    this.checkThePoint = this.myCommentForm.measurementData;
  
    let fromDate = this.dataFromStartedRouteWhileGoingBackJSON.ASSIGNMENT_FROM_DATE;

    let fromDateToGo555 = fromDate.split(/\s/).join(',');

    let fromDateToGo = new Date(fromDateToGo555);

    let year = fromDateToGo.getFullYear();

    let month = fromDateToGo.getMonth() + 1;

    let date = fromDateToGo.getDate();

    let fulldateFromDate = year + '-' + month + '-' + date;

    let toDate = this.dataFromStartedRouteWhileGoingBackJSON.ASSIGNMENT_TO_DATE;

    let toDateToGo555 = toDate.split(/\s/).join(',');

    let toDateToGo = new Date(toDateToGo555);

    let year2 = toDateToGo.getFullYear();

    let month2 = toDateToGo.getMonth() + 1;

    let date2 = toDateToGo.getDate();

    let fulldateToDate = year + '-' + month + '-' + date;

    let checkpoint = this.checkThePoint.CHECKPOINT;

    let checkpoint3 = checkpoint.split(/\s/).join('');

    let commentTime = this.checkThePointComment;

    let commentToGo = commentTime.split(/\s/).join('');


    let whiteSpace = ' A  B C D ';

    let noWhiteSpace = whiteSpace.trim();

    console.log(noWhiteSpace);



    //
    let nativeCall = this.nativeHttp.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_inspect_add.cfm?'
      + 'vhc_plates=' + this.dataFromStartedRouteWhileGoingBackJSON.VHC_PLATES
      + '&chrbus_code=' + this.dataFromStartedRouteWhileGoingBackJSON.SERVICECODE
      + '&chrbus_sp_id=' + 1 //this.dataFromStartedRouteWhileGoingBackJSON.CHRBUS_SP_ID
      + '&sp_code=' + 1 //this.dataFromStartedRouteWhileGoingBackJSON.SP_CODE
      + '&fromd=' + fulldateFromDate
      + '&tod=' + fulldateToDate
      + '&driver_id=' + this.dataFromStartedRouteWhileGoingBackJSON.DRIVER_ID
      + '&checkpoint_id=' + this.checkThePoint.CHECKPOINT_ID
      + '&checkpoint_txt=' + checkpoint3
      + '&checkpoint_status=' + this.checkThePoint.FLAG
      + '&comment=' + commentToGo
      + '&userid=dmta', {}, {
      'Content-Type': 'application/x-www-form-urlencoded',

    });

    console.log('after url call');
    from(nativeCall).pipe(
      finalize(() => console.log('Ready to send'))
    )
      .subscribe(data => {


        console.log(data);


        this.router.navigate(['routestarted/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackJSON) + '/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON)]);
        console.log('LEITOURGW');
      }, err => {
        console.log('Error of Vehicle check', err);
      })
  }

  map() {

    setTimeout(() => {

      this.router.navigate(['routestarted/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackJSON) + '/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON)]);
    }, 1000);

  }





  navigateToroutelist() {
    this.router.navigate(['routelist/' + this.personId + '/' + this.Id])
  }
  navigateToWalletPage() {
    this.router.navigate(['home2/wallet'])
  }
  navigateToSettingsPage() {
    this.router.navigate(['home2/settings'])
  }
  navigateToRouteHistoryPage() {
    this.router.navigate(['home2/routehistory'])
  }
  navigateToTechHistoryPage() {
    this.router.navigate(['home2/techhistory'])
  }
  navigateToProfilePage() {
    this.router.navigate(['profile'])
  }
  navigateToLoginPage() {
    this.router.navigate(['login'])
  }

  navigateToStartRoutePage() {
    this.router.navigate(['routestarted']);
  }

}
