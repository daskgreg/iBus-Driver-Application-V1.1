import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassrecPage } from './passrec.page';

const routes: Routes = [
  {
    path: '',
    component: PassrecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassrecPageRoutingModule {}
