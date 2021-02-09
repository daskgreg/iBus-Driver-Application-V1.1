import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechhistoryPageRoutingModule } from './techhistory-routing.module';

import { TechhistoryPage } from './techhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechhistoryPageRoutingModule
  ],
  declarations: [TechhistoryPage]
})
export class TechhistoryPageModule {}
