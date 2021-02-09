import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectProvider } from '../providers/connect/connect';

import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
 // import { LanguageService} from './services/language.service';


import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/terms',
  privacyPolicyUrl: '/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};
export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), TranslateModule.forRoot({
    loader:{
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps:[HttpClient]
    }
  }),
  ],
  providers: [
    ConnectProvider,
    HttpClient,
    HTTP,
    StatusBar,
    SplashScreen,
    BackgroundMode,
    BackgroundFetch,
    BackgroundGeolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
