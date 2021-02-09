import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistercompletePageRoutingModule } from './registercomplete-routing.module';

import { RegistercompletePage } from './registercomplete.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistercompletePageRoutingModule,
    TranslateModule
  ],
  declarations: [RegistercompletePage]
})
export class RegistercompletePageModule {}
