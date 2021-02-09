import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechinspectPageRoutingModule } from './techinspect-routing.module';

import { TechinspectPage } from './techinspect.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechinspectPageRoutingModule,
    TranslateModule
  ],
  declarations: [TechinspectPage]
})
export class TechinspectPageModule {}
