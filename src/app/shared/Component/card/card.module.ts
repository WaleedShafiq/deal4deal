import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonsModule } from '@ngx-share/buttons';
import '../../Classes/icons';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { NotifierModule } from 'angular-notifier';
import {LaddaModule} from 'angular2-ladda';
import { CarouselModule } from 'ngx-owl-carousel-o';
const routes: Routes = [
  {
    path: '',
    component: CardComponent
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
    FormsModule,
    CommonModule,
    CarouselModule,
    ShareButtonsModule,
    NgbModule,
    LaddaModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
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
    CardComponent
  ],
  entryComponents: [],
  providers: [],
  exports: [CardComponent]

})
export class CardModule { }
