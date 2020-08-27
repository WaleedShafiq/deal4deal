import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import '../../shared/Classes/icons';
import { HowWorkComponent } from './how-work.component';


const routes: Routes = [
  {
    path: '',
    component: HowWorkComponent,
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
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
    HowWorkComponent
  ],
  entryComponents: [],
  providers: []
})
export class HowWorkModule { }
