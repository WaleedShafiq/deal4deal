import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { CharitiesResolver } from 'src/app/shared/resolvers/charities-resolver';
import { CharitiesComponent } from './charities.component';

const routes: Routes = [
  {
    path: '',
    component: CharitiesComponent,
    resolve: {
      charities: CharitiesResolver
    }
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
    { prefix: 'assets/i18n/charities/', suffix: '.json' },
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
    SharedModule.forRoot()
  ],
  declarations: [
    CharitiesComponent
    ],
  entryComponents: [],
  providers: [CharitiesResolver]
})
export class CharitiesModule { }
