import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-registercomplete',
  templateUrl: './registercomplete.page.html',
  styleUrls: ['./registercomplete.page.scss'],
})
export class RegistercompletePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  navigateLogin(){
  	this.router.navigate(['login'])
  }

    navigateBack(){
  	this.router.navigate(['register3'])
  }


}
