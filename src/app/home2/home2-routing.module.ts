import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home2Page } from './home2.page';

const routes: Routes = [
  {
    path: '',
    component: Home2Page,
    children:[
      {
        path:'routelist',
        loadChildren:() =>import('../routelist/routelist.module').then( m => m.RoutelistPageModule)
      },
         {
           path:'wallet',
           loadChildren:() =>import('../wallet/wallet.module').then( m => m.WalletPageModule)
         },
         {
           path:'routehistory',
           loadChildren:() =>import('../routehistory/routehistory.module').then( m => m.RoutehistoryPageModule)
         },
         {
           path:'settings',
           loadChildren:() =>import('../settings/settings.module').then( m => m.SettingsPageModule)
         },
        
        
        
    ]
  },
  {
    path: '',
    redirectTo: '/home2/routelist'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Home2PageRoutingModule {}
