import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CartsService } from '../repositories/carts.service';
@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<any> {

  constructor(private _service : CartsService) { }


  resolve(route: ActivatedRouteSnapshot) {
    return this._service.getItemsInCart();
  }
}
