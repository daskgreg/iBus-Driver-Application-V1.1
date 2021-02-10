import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'routelist/:id',
    loadChildren: () => import('./routelist/routelist.module').then( m => m.RoutelistPageModule)
  },
  {
    path: 'techinspect',
    loadChildren: () => import('./techinspect/techinspect.module').then( m => m.TechinspectPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'passrec',
    loadChildren: () => import('./passrec/passrec.module').then( m => m.PassrecPageModule)
  },
  {
    path: 'welcome2',
    loadChildren: () => import('./welcome2/welcome2.module').then( m => m.Welcome2PageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register2',
    loadChildren: () => import('./register2/register2.module').then( m => m.Register2PageModule)
  },
  {
    path: 'register3',
    loadChildren: () => import('./register3/register3.module').then( m => m.Register3PageModule)
  },
  {
    path: 'registercomplete',
    loadChildren: () => import('./registercomplete/registercomplete.module').then( m => m.RegistercompletePageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./home2/home2.module').then( m => m.Home2PageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule)
  },
  {
    path: 'routestarted/:xyz',
    loadChildren: () => import('./routestarted/routestarted.module').then( m => m.RoutestartedPageModule)
  },
  {
    path: 'routepassengers',
    loadChildren: () => import('./routepassengers/routepassengers.module').then( m => m.RoutepassengersPageModule)
  },
  {
    path: 'routehistory',
    loadChildren: () => import('./routehistory/routehistory.module').then( m => m.RoutehistoryPageModule)
  },
  {
    path: 'techhistory',
    loadChildren: () => import('./techhistory/techhistory.module').then( m => m.TechhistoryPageModule)
  },
  {
    path: 'routedetails',
    loadChildren: () => import('./routedetails/routedetails.module').then( m => m.RoutedetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'createroute',
    loadChildren: () => import('./createroute/createroute.module').then( m => m.CreateroutePageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'techinspect-finished-route',
    loadChildren: () => import('./techinspect-finished-route/techinspect-finished-route.module').then( m => m.TechinspectFinishedRoutePageModule)
  },
  {
    path: 'techinspect-finished-route',
    loadChildren: () => import('./techinspect-finished-route/techinspect-finished-route.module').then( m => m.TechinspectFinishedRoutePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
