import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechhistoryPage } from './techhistory.page';

const routes: Routes = [
  {
    path: '',
    component: TechhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechhistoryPageRoutingModule {}
