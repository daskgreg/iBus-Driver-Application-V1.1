import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutelistPageRoutingModule } from './routelist-routing.module';

import { RoutelistPage } from './routelist.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RoutelistBottomBarComponent } from '../components/routelist-bottom-bar/routelist-bottom-bar.component';
import { DataService } from '../services/data.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutelistPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [RoutelistPage,RoutelistBottomBarComponent],
})
export class RoutelistPageModule {}
