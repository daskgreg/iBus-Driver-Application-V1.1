import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistercompletePage } from './registercomplete.page';

const routes: Routes = [
  {
    path: '',
    component: RegistercompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistercompletePageRoutingModule {}
