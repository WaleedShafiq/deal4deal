import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from '../shared/guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'campaign', loadChildren: () => import('../features/campaign/campaign.module').then(mod => mod.CampaignModule)
  },
  {
    path: 'about', loadChildren: () => import('../features/about-deal/about-deal.module').then(mod => mod.AboutDealModule)
  },
  {
    path: 'terms', loadChildren: () => import('../features/terms-conditions/terms-conditions.module').then(mod => mod.TermsConditionsModule)
  },
  {
    path: 'faqs', loadChildren: () => import('../features/faqs/faqs.module').then(mod => mod.FaqsModule)
  },
  {
    path: 'help', loadChildren: () => import('../features/help-center/help-center.module').then(mod => mod.HelpCenterModule)
  },
  {
    path: 'work', loadChildren: () => import('../features/how-work/how-work.module').then(mod => mod.HowWorkModule)
  },
  {
    path: 'products', loadChildren: () => import('../features/product/product.module').then(mod => mod.ProductModule)
  },
  {
    path: 'profile', loadChildren: () => import('../features/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'notifications', loadChildren: () => import('../features/notifications/notifications.module').then(mod => mod.NotificationsModule)
  },
  {
    path: 'details/:id', loadChildren: () => import('../features/campagin-details/campagin-details.module')
      .then(mod => mod.CampaignDetailsModule)
  },
  {
    path: 'whishlist', loadChildren: () => import('../features/whishlist/whishlist.module')
      .then(mod => mod.WhishlistModule)
  },
    {
    path: 'register', loadChildren: () => import('../features/account/register/register.module')
      .then(mod => mod.RegisterModule)
  },
  {
    path: 'cart', loadChildren: () => import('../features/cart/cart.module')
    .then(mod => mod.CartModule)
  },
  {
    path: 'winner', loadChildren: () => import('../features/winners/winners.module')
    .then(mod => mod.WinnersModule)
  },
  {
    path: 'charity', loadChildren: () => import('../features/charities/charities.module')
    .then(mod => mod.CharitiesModule)
  },
  {
    path: 'login', loadChildren: () => import('../features/login/login.module')
    .then(mod => mod.LoginModule)
  },
  {
    path: '',
    redirectTo: '/campaign',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '/campaign',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
