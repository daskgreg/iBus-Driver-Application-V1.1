import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutestartedPage } from './routestarted.page';

const routes: Routes = [
  {
    path: '',
    component: RoutestartedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutestartedPageRoutingModule {}
