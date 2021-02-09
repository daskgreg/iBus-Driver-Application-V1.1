import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateroutePageRoutingModule } from './createroute-routing.module';

import { CreateroutePage } from './createroute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateroutePageRoutingModule
  ],
  declarations: [CreateroutePage]
})
export class CreateroutePageModule {}
