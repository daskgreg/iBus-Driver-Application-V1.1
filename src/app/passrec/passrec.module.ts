import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassrecPageRoutingModule } from './passrec-routing.module';

import { PassrecPage } from './passrec.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassrecPageRoutingModule,
    TranslateModule
  ],
  declarations: [PassrecPage]
})
export class PassrecPageModule {}
