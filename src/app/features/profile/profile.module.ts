import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HomeCarouselComponent } from 'src/app/layout';
import {ProfileComponent} from './profile.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FinishedOrdersComponent} from './finished-orders/finished-orders.component';
import {WishListComponent} from './wish-list/wish-list.component';
import {InviteFriendsComponent} from './invite-friends/invite-friends.component';
import {LevelsComponent} from './levels/levels.component';
import {RateOurWebsiteComponent} from './rate-our-website/rate-our-website.component';
import {DreamPointsComponent} from './dream-points/dream-points.component';
import { ActiveTicketsComponent } from './active-tickets/active-tickets.component';
import {UserInoResolver} from '../../shared/resolvers/UserInoResolver';
import {LaddaModule} from 'angular2-ladda';
import {WishListResolver} from '../../shared/resolvers/wishListResolver';
import {LevelsReslover} from '../../shared/resolvers/levelsReslover';
import {FinishedOrdersResolver} from '../../shared/resolvers/finished-orders-resolver.service';
import {ActiveTicketsResolver} from '../../shared/resolvers/activeTicketsResolver';
import {NotifierModule, NotifierService} from 'angular-notifier';
import {NotifierQueueService} from 'angular-notifier/lib/services/notifier-queue.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ProfileCurrencyComponent } from './profile-currency/profile-currency.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileLanguageComponent } from './profile-language/profile-language.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      userData: UserInoResolver
    }
  },
  {
    path: 'personal-profile',
    component: PersonalInfoComponent,
    resolve: {
      userData: UserInoResolver
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'finished-orders',
    component: FinishedOrdersComponent,
    resolve: {
      orders: FinishedOrdersResolver
    }
  },
  {
    path: 'wish-list',
    component: WishListComponent,
    resolve: {
      wishListResolver: WishListResolver
    }
  },
  {
    path: 'invite-friends',
    component: InviteFriendsComponent
  },
  {
    path: 'levels',
    component: LevelsComponent,
    resolve: {
      levels: LevelsReslover
    }
  },
  {
    path: 'rate-our-website/:rate',
    component: RateOurWebsiteComponent
  },
  {
    path: 'dream-points',
    component: DreamPointsComponent
  },
  {
    path: 'active-tickets',
    component: ActiveTicketsComponent,
    resolve: {
      tickets: ActiveTicketsResolver
    }
  },
  {
    path: 'user-curreny',
    component: ProfileCurrencyComponent,
  },
  {
    path: 'user-language',
    component: ProfileLanguageComponent,
  }
];
export const Router = RouterModule.forChild(routes);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
        LaddaModule,
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
  declarations: [
    ProfileComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    FinishedOrdersComponent,
    WishListComponent,
    InviteFriendsComponent
  , LevelsComponent,
    RateOurWebsiteComponent,
    DreamPointsComponent,
    ActiveTicketsComponent,
    ProfileCurrencyComponent,
    ProfileLanguageComponent
  ],
  entryComponents: [],
  providers: [UserInoResolver, WishListResolver, LevelsReslover, FinishedOrdersResolver, ActiveTicketsResolver]
})
export class ProfileModule { }
