import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
	lang:any;

  constructor(private languageService: LanguageService,private router : Router) { }

  ngOnInit() {
  }
  selecten(){
  	this.lang='en';
     localStorage.setItem('lang',this.lang); 
  	this.languageService.setLanguage(this.lang);
  	this.router.navigate(['beforelogin'])
  }

  selectgr(){
  	this.lang='gr';
    localStorage.setItem('lang',this.lang); 
  	this.languageService.setLanguage(this.lang);
  	this.router.navigate(['beforelogin'])
  }

}
