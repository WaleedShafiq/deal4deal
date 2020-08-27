import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HomeCarouselComponent } from '../../layout';
import { SharedModule } from '../../shared/shared.module';

import { WinnersResolver } from '../../shared/resolvers/winners-resolver';
import { CardModule } from '../../shared/Component/card/card.module';
import { WinnersComponent } from './winners.component';


const routes: Routes = [
  {
    path: '',
    component: WinnersComponent,
    resolve: {
      winners: WinnersResolver
    }
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
    { prefix: 'assets/i18n/winners/', suffix: '.json' },
  ]);
}

@NgModule({
  imports: [
    CardModule,
    FormsModule,
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
    SharedModule.forRoot()
  ],
  declarations: [
    WinnersComponent
    ],
  entryComponents: [],
  providers: [WinnersResolver]
})
export class WinnersModule { }
