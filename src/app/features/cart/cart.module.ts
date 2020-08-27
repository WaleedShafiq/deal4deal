import { EmptyCartComponent } from './empty-cart/empty-cart.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderComponent } from './order/order.component';
import {FormsModule} from '@angular/forms';
import { ShippingComponent } from './shipping/shipping.component';
import { FinalShippingComponent } from './final-shipping/final-shipping.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { FinalOrderComponent } from './final-order/final-order.component';
import { CartsService } from 'src/app/shared/repositories/carts.service';
import { CartResolverService } from 'src/app/shared/resolvers/cart-resolver.service';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ShippingAddressResolverService } from '../../shared/resolvers/user-address-resolver.service';
import { FinalORderResolverService } from '../../shared/resolvers/final-order-resolver.service';
import { UserProfileRepository } from '../../shared/repositories/userProfileRepository';


@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    OrderComponent,
    ShippingComponent,
    FinalShippingComponent,
    SuccessOrderComponent,
    FinalOrderComponent,
    EmptyCartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
    SelectDropDownModule
  ],
  providers:[
    CartsService,
    ShippingAddressResolverService,
    CartResolverService,
    FinalORderResolverService,
    UserProfileRepository
  ]
})
export class CartModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/carts/', suffix: '.json' },
  ]);
}
