import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateroutePage } from './createroute.page';

const routes: Routes = [
  {
    path: '',
    component: CreateroutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateroutePageRoutingModule {}
