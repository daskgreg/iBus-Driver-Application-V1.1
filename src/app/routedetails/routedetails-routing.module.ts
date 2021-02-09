import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutedetailsPage } from './routedetails.page';

const routes: Routes = [
  {
    path: '',
    component: RoutedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutedetailsPageRoutingModule {}
