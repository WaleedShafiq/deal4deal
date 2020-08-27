import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedDataService } from './services/shared-data.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { AuthGuardService } from './guards/auth-guard.service';

import { AccountService } from './repositories/account.service';
import { ProductService } from './repositories/product.service';
import { CampaginService } from './repositories/campagin.service';
import { CountriesLookupService } from './repositories/countries-lookup.service';
import { WinnersService } from './repositories/winners.service';
import { CharitiesService } from './repositories/charities.service';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeCarouselComponent } from './Component/home-carousel/home-carousel.component';

import { UserProfileRepository } from './repositories/userProfileRepository';
import { BlockUIModule } from 'ng-block-ui';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    CarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    HomeCarouselComponent
  ],
  providers: [
    AccountService,
    StorageService,
    AuthGuardService,
    AccountService,
    ProductService,
    CampaginService,
    StorageService,
    AuthGuardService,
    CountriesLookupService,
    WinnersService,
    CharitiesService,

  ],
  exports: [CarouselModule, BlockUIModule, HomeCarouselComponent]


})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedDataService, AuthService, StorageService, UserProfileRepository]
    };
  }
}
