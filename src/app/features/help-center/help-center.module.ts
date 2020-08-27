import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import '../../shared/Classes/icons';
import { HelpCenterComponent } from './help-center.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: HelpCenterComponent,
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/global/', suffix: '.json' },
    { prefix: 'assets/i18n/help/', suffix: '.json' },
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
    ReactiveFormsModule
  ],
  declarations: [
    HelpCenterComponent
  ],
  entryComponents: [],
  providers: []
})
export class HelpCenterModule { }
