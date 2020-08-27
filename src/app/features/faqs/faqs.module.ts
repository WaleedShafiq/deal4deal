import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import '../../shared/Classes/icons';
import { FaqsComponent } from './faqs.component';
import { FaqsAboutComponent } from './faqs-about/faqs-about.component';
import { FaqsAccountComponent } from './faqs-account/faqs-account.component';
import { FaqsCampaginComponent } from './faqs-campagin/faqs-campagin.component';
import { FaqsPurchaseComponent } from './faqs-purchase/faqs-purchase.component';
import { FaqsProductsComponent } from './faqs-products/faqs-products.component';
import { FaqsDonatingComponent } from './faqs-donating/faqs-donating.component';
import { FaqsDreamComponent } from './faqs-dream/faqs-dream.component';
import { FaqsLevelsComponent } from './faqs-levels/faqs-levels.component';
import { FaqsReferComponent } from './faqs-refer/faqs-refer.component';
import { FaqsPrizeComponent } from './faqs-prize/faqs-prize.component';
import { FaqsSecurityComponent } from './faqs-security/faqs-security.component';
import { FaqsInquiriesComponent } from './faqs-inquiries/faqs-inquiries.component';


const routes: Routes = [
  {
    path: '',
    component: FaqsComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: FaqsAboutComponent
      },
      {
        path: 'account',
        component: FaqsAccountComponent
      },
      {
        path: 'campagin',
        component: FaqsCampaginComponent
      },
      {
        path: 'purchase',
        component: FaqsPurchaseComponent
      },
      {
        path: 'product',
        component: FaqsProductsComponent
      },
      {
        path: 'donating',
        component: FaqsDonatingComponent
      },
      {
        path: 'dream',
        component: FaqsDreamComponent
      },
      {
        path: 'level',
        component: FaqsLevelsComponent
      },
      {
        path: 'refer',
        component: FaqsReferComponent
      },
      {
        path: 'prize',
        component: FaqsPrizeComponent
      },
      {
        path: 'security',
        component: FaqsSecurityComponent
      },
      {
        path: 'inquirie',
        component: FaqsInquiriesComponent
      },
    ]
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/faqs/', suffix: '.json' },
    { prefix: 'assets/i18n/work/', suffix: '.json' },
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    Router,
  ],
  declarations: [
    FaqsComponent,
    FaqsAboutComponent,
    FaqsAccountComponent,
    FaqsCampaginComponent,
    FaqsPurchaseComponent,
    FaqsProductsComponent,
    FaqsDonatingComponent,
    FaqsDreamComponent,
    FaqsLevelsComponent,
    FaqsReferComponent,
    FaqsPrizeComponent,
    FaqsSecurityComponent,
    FaqsInquiriesComponent
  ],
  entryComponents: [],
  providers: []
})
export class FaqsModule { }
