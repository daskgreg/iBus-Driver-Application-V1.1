import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutelistPage } from './routelist.page';

const routes: Routes = [
  {
    path: '',
    component: RoutelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutelistPageRoutingModule {}
