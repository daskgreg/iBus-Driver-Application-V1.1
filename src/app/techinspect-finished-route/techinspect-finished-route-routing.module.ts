import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechinspectFinishedRoutePage } from './techinspect-finished-route.page';

const routes: Routes = [
  {
    path: '',
    component: TechinspectFinishedRoutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechinspectFinishedRoutePageRoutingModule {}
