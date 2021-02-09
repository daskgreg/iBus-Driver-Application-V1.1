import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
	selected='';
  constructor(private translate: TranslateService, private storage: Storage) { }

  setInitialAppLanguage(l){
  	let language = l;
  	this.translate.setDefaultLang(language);

  	this.storage.get(LNG_KEY).then(val =>{
  		if(val){
  			this.setLanguage(val);
  			this.selected = val;
  		}
  		this.setLanguage(language);
  	});
  }
  getLanguages(){
  	return[
  	{ text: 'English', value: 'en', img: 'assets/images/flags/english_flag.svg'},
  	{ text: 'Greek', value: 'gr', img: 'assets/images/flags/greek_flag.svg'}
  	];
  }
  setLanguage(lng){
  	this.translate.use(lng);
  	this.selected= lng;
  	this.storage.set(LNG_KEY, lng);
  	console.log(this.selected);
  	console.log(this.storage);
  }
}
