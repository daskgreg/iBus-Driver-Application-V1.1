import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutedetailsPageRoutingModule } from './routedetails-routing.module';

import { RoutedetailsPage } from './routedetails.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutedetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [RoutedetailsPage]
})
export class RoutedetailsPageModule {}
