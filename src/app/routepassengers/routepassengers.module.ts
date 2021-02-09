import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutepassengersPageRoutingModule } from './routepassengers-routing.module';

import { RoutepassengersPage } from './routepassengers.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutepassengersPageRoutingModule,
    TranslateModule
  ],
  declarations: [RoutepassengersPage]
})
export class RoutepassengersPageModule {}
