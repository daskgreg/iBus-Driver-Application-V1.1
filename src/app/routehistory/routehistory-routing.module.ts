import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutehistoryPage } from './routehistory.page';

const routes: Routes = [
  {
    path: '',
    component: RoutehistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutehistoryPageRoutingModule {}
