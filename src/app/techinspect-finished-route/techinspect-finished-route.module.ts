import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechinspectFinishedRoutePageRoutingModule } from './techinspect-finished-route-routing.module';

import { TechinspectFinishedRoutePage } from './techinspect-finished-route.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechinspectFinishedRoutePageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TechinspectFinishedRoutePage]
})
export class TechinspectFinishedRoutePageModule {}
