import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { Configuration } from './configuration';

import { LanguageService } from '../shared/services/language.service';
import { CurrencyService } from '../shared/services/currency.service';

import { NgSelectModule } from '@ng-select/ng-select';
import {
  AppHeaderComponent,
  AppFooterComponent,
  NavbarComponent,
  FooterLinksComponent
} from '../layout';
import { LoginComponent } from '../features/account/login/login.component';
import { CartModule } from '../features/cart/cart.module';
import {LaddaModule} from 'angular2-ladda';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ClickOutsideModule} from 'ng-click-outside';
import { NotifierModule } from 'angular-notifier';
import { RouterModule } from '@angular/router';

const appLayout = [
  AppHeaderComponent,
  AppFooterComponent,
  NavbarComponent,
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    appLayout,
    LoginComponent,
    FooterLinksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CartModule,
    RouterModule,
    NgbModule,
    LaddaModule,
    SharedModule.forRoot(),
    HttpClientModule,
    ClickOutsideModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgSelectModule,
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
          autoHide: 3000,
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
  providers: [Configuration, HttpClientModule, CurrencyService, LanguageService, HttpClient, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
