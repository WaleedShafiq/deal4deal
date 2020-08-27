import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {CartsService} from '../repositories/carts.service';


@Injectable()

export class CartsResolver implements Resolve<any> {
  constructor(
    private cartService: CartsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.cartService.getItemsInCart();
  }

}
