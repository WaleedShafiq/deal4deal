import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {UserProfileRepository} from '../repositories/userProfileRepository';


@Injectable()

export class WishListResolver implements Resolve<any> {
  constructor(
    private userProfileRepository: UserProfileRepository) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userProfileRepository.getWishList();
  }

}
