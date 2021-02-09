import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutestartedPageRoutingModule } from './routestarted-routing.module';

import { RoutestartedPage } from './routestarted.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutestartedPageRoutingModule,
    TranslateModule
  ],
  declarations: [RoutestartedPage]
})
export class RoutestartedPageModule {}
