import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';

import { CardModule } from '../../shared/Component/card/card.module';
import { WhishlistComponent } from './whishlist.component';
import { BlockUIModule } from 'ng-block-ui';
import { NotifierModule } from 'angular-notifier';


const routes: Routes = [
  {
    path: '',
    component: WhishlistComponent,
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
    { prefix: 'assets/i18n/whishlist/', suffix: '.json' },
  ]);
}

@NgModule({
  imports: [
    CardModule,
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
    SharedModule.forRoot(),
    BlockUIModule.forRoot(),
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
    })
  ],
  declarations: [
   WhishlistComponent
    ],
  entryComponents: [],
  providers: []
})
export class WhishlistModule { }
