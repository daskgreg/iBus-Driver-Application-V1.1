import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-techhistory',
  templateUrl: './techhistory.page.html',
  styleUrls: ['./techhistory.page.scss'],
})
export class TechhistoryPage implements OnInit {

  constructor( private router : Router) { }

  ngOnInit() {
  }
  backToRoutes(){
  	this.router.navigate(['home2/routelist'])
  }

}
