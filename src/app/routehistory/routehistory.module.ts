import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutehistoryPageRoutingModule } from './routehistory-routing.module';

import { RoutehistoryPage } from './routehistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutehistoryPageRoutingModule
  ],
  declarations: [RoutehistoryPage]
})
export class RoutehistoryPageModule {}
