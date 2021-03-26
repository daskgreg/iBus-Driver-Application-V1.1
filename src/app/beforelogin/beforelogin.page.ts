import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beforelogin',
  templateUrl: './beforelogin.page.html',
  styleUrls: ['./beforelogin.page.scss'],
})
export class BeforeloginPage implements OnInit {

  constructor(
  private router:Router,
  ) { }

  ngOnInit() {
  }

  loginAction(){
    this.router.navigate(['login']);
  }
  registerAction(){
    this.router.navigate(['register']);
  }
}
