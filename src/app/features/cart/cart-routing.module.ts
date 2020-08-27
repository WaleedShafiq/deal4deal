import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from 'src/app/features/cart/cart.component';
import { CartListComponent } from 'src/app/features/cart/cart-list/cart-list.component';
import {OrderComponent} from './order/order.component';
import { ShippingComponent } from './shipping/shipping.component';
import { FinalShippingComponent } from './final-shipping/final-shipping.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { FinalOrderComponent } from './final-order/final-order.component';
import { CartResolverService } from 'src/app/shared/resolvers/cart-resolver.service';
import { ShippingAddressResolverService } from '../../shared/resolvers/user-address-resolver.service';
import { FinalORderResolverService } from '../../shared/resolvers/final-order-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full'
      },
      {
        path: 'cart',
        component: CartListComponent,
        resolve :{
          CartItems : CartResolverService
        }
      },
      {
        path: 'order/:addressId',
        component: OrderComponent,
        resolve :{
          PaymentMethods : FinalORderResolverService,
        }
      },
      {
        path: 'shipping/:addressId',
        component: ShippingComponent,
        resolve :{
          shippingAddress : ShippingAddressResolverService
        }
      },
      {
        path: 'final-Shipping/:isdonate',
        component: FinalShippingComponent,
        resolve :{
          shippingAddress : ShippingAddressResolverService
        }
      },
      {
        path: 'success-order',
        component: SuccessOrderComponent
      },
      {
        path: 'final-order/:isdonate/:addressId/:countryId',
        component: FinalOrderComponent,
        resolve :{
          PaymentMethods : FinalORderResolverService,
        }
      },
      
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
