import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutelistPageRoutingModule } from './routelist-routing.module';

import { RoutelistPage } from './routelist.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RoutelistBottomBarComponent } from '../components/routelist-bottom-bar/routelist-bottom-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutelistPageRoutingModule,
    TranslateModule,
    
  ],
  declarations: [RoutelistPage,RoutelistBottomBarComponent],
})
export class RoutelistPageModule {}
