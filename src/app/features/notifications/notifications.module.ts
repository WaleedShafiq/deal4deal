import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {NotificationsComponent} from './notifications.component';
const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent
  },
];
export const Router = RouterModule.forChild(routes);


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/', suffix: '.json' },
  ]);
}

@NgModule({
  imports: [
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
    SharedModule.forRoot(),
  ],
  declarations: [NotificationsComponent,
  ],
  entryComponents: [],
  providers: []
})
export class NotificationsModule { }
