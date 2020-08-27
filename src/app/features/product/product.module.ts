import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShareButtonsModule } from '@ngx-share/buttons';
import '../../shared/Classes/icons';

import { ProductComponent } from './product.component';
import { ProductResolver } from '../../shared/resolvers/product-resolver';
import { CardModule } from '../../shared/Component/card/card.module';
import { NotifierModule } from 'angular-notifier';
import { FooterLinksComponent } from '../../layout';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      productData: ProductResolver
    }
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
    { prefix: 'assets/i18n/compaign/', suffix: '.json' },
  ]);
}

@NgModule({
  imports: [
    CardModule,
    FormsModule,
    CommonModule,
    ShareButtonsModule,
    NgbModule,
   TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    Router,
    SharedModule.forRoot(),
    NotifierModule.withConfig({
      position: {
        horizontal: {
            position: 'middle',
        },
        vertical: {
            position: 'top',
            distance: 80
        }
      },
      behaviour: {
          autoHide: 4000,
          onClick: 'hide',
          showDismissButton: false,
          stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    }),
  ],
  declarations: [
    ProductComponent,
    // FooterLinksComponent
  ],
  entryComponents: [],
  providers: [ProductResolver]
})
export class ProductModule { }
