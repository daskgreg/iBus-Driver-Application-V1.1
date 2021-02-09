import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutepassengersPage } from './routepassengers.page';

const routes: Routes = [
  {
    path: '',
    component: RoutepassengersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutepassengersPageRoutingModule {}
