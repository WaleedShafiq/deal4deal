import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignComponent } from './campaign.component';

import { ShareButtonsModule } from '@ngx-share/buttons';
import '../../shared/Classes/icons';

import { CompaginResolver } from 'src/app/shared/resolvers/compaign-resolver';
import { CardModule } from 'src/app/shared/Component/card/card.module';
import { NotifierModule } from 'angular-notifier';


const routes: Routes = [
  {
    path: '',
    component: CampaignComponent,
    resolve: {
      campaignData: CompaginResolver
    }
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
    CardModule,
    FormsModule,
    CommonModule,
    ShareButtonsModule,
    NgbModule,
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
    }),
  ],
  declarations: [
    CampaignComponent
  ],
  entryComponents: [],
  providers: [CompaginResolver]
})
export class CampaignModule { }
