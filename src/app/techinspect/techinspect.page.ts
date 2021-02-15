import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-techinspect',
  templateUrl: './techinspect.page.html',
  styleUrls: ['./techinspect.page.scss'],
})
export class TechinspectPage implements OnInit {

	techchk_json=[{"checkpoint_id": "33", "checkpoint_gre": "Τα στοιχεία του οχήματος (πινακίδες κυκλοφορίας, αρ. πλαισίου, αρ. κινητήρα σύμφωνα με την άδεια. κυκλοφορίας).", "checkpoint_eng": "Vehicle details (registration plates, chassis number, engine number according to the license. Registration)."},
	{"checkpoint_id": "34", "checkpoint_gre": "Το όχημα εσωτερικά- εξωτερικά (οπτικώς).", "checkpoint_eng": "The vehicle internally-externally (visually)."},
	{"checkpoint_id": "35", "checkpoint_gre": "Ο εξοπλισμός του οχήματος (τρίγωνο, πυροσβεστήρας, φαρμακείο).", "checkpoint_eng": "The equipment of the vehicle (triangle, fire extinguisher, pharmacy)."},
	{"checkpoint_id": "36", "checkpoint_gre": "Η πίεση των ελαστικών- η ύπαρξη ρεζέρβας.", "checkpoint_eng": "The tire pressure - the existence of a reserve."},
	{"checkpoint_id": "37", "checkpoint_gre": "Η ποιότητα και η σύνθεση των καυσαερίων.", "checkpoint_eng": "The quality and composition of the exhaust gases."},
	{"checkpoint_id": "38", "checkpoint_gre": "Η σύγκλιση- απόκλιση των τροχών.", "checkpoint_eng": "The convergence-deviation of the wheels."},
	{"checkpoint_id": "39", "checkpoint_gre": "Η απόδοση της ανάρτησης.", "checkpoint_eng": "Post performance."},
	{"checkpoint_id": "40", "checkpoint_gre": "Η απόδοση των φρένων.", "checkpoint_eng": "The performance of the brakes."},
	{"checkpoint_id": "41", "checkpoint_gre": "Τα φώτα ως προς την ένταση και την κλίση τους- γενική λειτουργία.", "checkpoint_eng": "Lights in terms of intensity and inclination - general function."},
	{"checkpoint_id": "42", "checkpoint_gre": "Το σύστημα διεύθυνσης.", "checkpoint_eng": "The steering system."},
	{"checkpoint_id": "43", "checkpoint_gre": "Το σύστημα μετάδοσης κίνησης.", "checkpoint_eng": "The drive system."},
	{"checkpoint_id": "44", "checkpoint_gre": "Οι άξονες – οι τροχοί- τα ελαστικά – η ανάρτηση.", "checkpoint_eng": "The axles - the wheels - the tires - the suspension."},
	{"checkpoint_id": "45", "checkpoint_gre": "Οι δίσκοι πέδησης.", "checkpoint_eng": "The brake discs."},
	{"checkpoint_id": "46", "checkpoint_gre": "Οι εύκαμπτες – άκαμπτες σωληνώσεις του συστήματος πέδησης.", "checkpoint_eng": "The flexible - rigid piping of the braking system."},
	{"checkpoint_id": "47", "checkpoint_gre": "Το κάτω μέρος του αμαξώματος (έλεγχος οξειδώσεων).", "checkpoint_eng": "The lower part of the body (oxidation control)."},
	{"checkpoint_id": "48", "checkpoint_gre": "Η εξάτμιση.", "checkpoint_eng": "The exhaust."}]

	langs:any=["Ελληνικά", "English"];
	language=localStorage.getItem('lang');
	enlangs:any;
	ellangs:any;
	ids:any;
	eng=false;
	el=false;
	com=false;
	comments:any;
	checkpointen:any;
	checkpointel:any;
  amount:any;
  imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;
  greekLanguage:any = [];
  greekLanguageJSON:any;
  englishLanguage:any = []
  englishLanguageJSON:any =[];

  //greg
  get measurementData(){
    return this.commentForm.get('measurementData');
  }
  get comment(){
    return this.commentForm.get('comment');
  }
  public errorMessages = {
    comment: [
      {type : 'required', message: 'Comment is Required'},
      {type:  'maxlength', message: 'This field should be no longer than 200 characters'}
    ],
    measurementData: [
      {
        type:'reuired', message:'Fill Data'
      }
    ]
  }

  commentForm = this.formBuilder.group({
    comment:['', [Validators.required, Validators.maxLength(20)]],
    measurementData:['',[Validators.required]]
  })

  serviceRegistration:any="";
  dataFromService:any="";
  dataFromStartedRouteWhileGoingBack:any;
  dataFromStartedRouteWhileGoingBackJSON:any;
  dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId:any;
  dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON:any;
  constructor(private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController,public http:HttpClient, private router : Router, public formBuilder: FormBuilder ) { 

    //greg 
    this.dataFromStartedRouteWhileGoingBack = this.activatedRoute.snapshot.paramMap.get('dataFromRoute')
    this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId = this.activatedRoute.snapshot.paramMap.get('dataFromDriverId');
    this.dataFromStartedRouteWhileGoingBackJSON = JSON.parse(this.dataFromStartedRouteWhileGoingBack);
    this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON = JSON.parse(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverId);
    console.log('%c DATA FROM ROUTELIST JSON','color:orange;')
    console.log(this.dataFromStartedRouteWhileGoingBackJSON);
    console.log('%c DATA FROM ROUTELIST LOGIN JSON','color:yellow;')
    console.log(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON);
    //
   
       

     this.enlangs=[];
     this.ellangs=[];
     this.ids=[];
     var k=0;
       if(this.language=="en" ){
        this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_checkpoints.cfm?lang=eng&userid=dmta').subscribe( (data) => {
           this.englishLanguage= data;
           console.log('%c English Language','color:orange;');
           this.englishLanguageJSON = this.englishLanguage.DATA;
           console.log(this.englishLanguageJSON);
         })
       this.el=false;
       this.eng=true;
       
     }
     else if (this.language=="gr"){
      this.http.get('http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_checkpoints.cfm?lang=gre&userid=dmta').subscribe( (data) => {
         this.greekLanguage= data;
         console.log('%c Greek Language','color:orange;');
         this.greekLanguageJSON = this.greekLanguage.DATA;
         console.log(this.greekLanguageJSON);
       }) 
       this.el=true;
       this.eng=false;
     }
    
  }

  ngOnInit() {
  }

  public submit(){
  
    console.log(this.commentForm.value);
    var myCommentForm = this.commentForm.value;
    this.sendData(myCommentForm).subscribe(
    (dataReturnFromService) => {
      this.dataFromService = JSON.stringify(dataReturnFromService);
      console.log(JSON.stringify(dataReturnFromService));
      console.log(dataReturnFromService['_body'] );
    }, error => {
      console.log(error);
    });
}

sendData(myCommentForm){
  var url="http://cf11.travelsoft.gr/itourapi/chrbus_vehicle_tech_inspect_add.cfm?";
  return this.http.post(url,myCommentForm,
    {headers:new HttpHeaders(
      { "content-type":"application/json"
    })})
}
   map(){
     console.log("kati");
  //	this.router.navigate(['routestarted'])
  	// this.navCtrl.setRoot(CurrentPage);
    let body = {
      message: "Do you hear me?"
    }
    var url="http://localhost:3000/vehicleCheck";
    this.http.post(url,JSON.stringify(body), 
      { headers: new HttpHeaders(
      {"content-type":"application/json"}
    )}).subscribe(async (data) => {
      let loader = await this.loadingCtrl.create({
        message: "Tech Inspect Successfull"
      });
      loader.present();

      setTimeout(() => {
        loader.dismiss();
        this.router.navigate(['routestarted/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackJSON) + '/' + JSON.stringify(this.dataFromStartedRouteWhileGoingBackDataWasTakenFromLoginPageTheDriverIdJSON)]);
      }, 1000);
      console.log(data);
    })

  }



  navigateToroutelist(){
    this.router.navigate(['home2/routelist'])
  }
  navigateToWalletPage(){
    this.router.navigate(['home2/wallet'])
  }
  navigateToSettingsPage(){
    this.router.navigate(['home2/settings'])
  }
  navigateToRouteHistoryPage(){
    this.router.navigate(['home2/routehistory'])
  }
  navigateToTechHistoryPage(){
    this.router.navigate(['home2/techhistory'])
  }
  navigateToProfilePage(){
    this.router.navigate(['profile'])
  }
  navigateToLoginPage(){
    this.router.navigate(['login'])
  }

  check(amount){
      
    if(this.language=="en"){
      alert( "Check " + this.checkpointen + " has been added with your comments " + this.amount);
    }
    else
      if(this.language=="gr"){
     alert( "Ο Έλεγχος " + this.checkpointen + " έχει προστεθεί μαζί με τα σχόλιά σος " + this.amount);
    }
  }
  navigateToStartRoutePage(){
    this.router.navigate(['routestarted']);
  }

}
