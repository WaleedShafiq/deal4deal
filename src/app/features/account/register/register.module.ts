import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifierModule } from 'angular-notifier';
import { CountriesLookupResolver } from '../../../shared/resolvers/countries-lookup-resolver';
import {LaddaModule} from 'angular2-ladda';
const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
        resolve: {
            countries: CountriesLookupResolver
        }
    }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: 'assets/i18n/register/', suffix: '.json' },
        { prefix: 'assets/i18n/global/', suffix: '.json' }
    ]);
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CustomFormsModule,
        LaddaModule,
      // ReactiveFormsModule,
        NgSelectModule,
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
        })
    ],
    declarations: [RegisterComponent],
    entryComponents: [],
    providers: [CountriesLookupResolver]
})
export class RegisterModule { }
