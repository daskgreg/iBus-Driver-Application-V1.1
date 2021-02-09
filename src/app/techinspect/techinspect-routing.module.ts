import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechinspectPage } from './techinspect.page';

const routes: Routes = [
  {
    path: '',
    component: TechinspectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechinspectPageRoutingModule {}
