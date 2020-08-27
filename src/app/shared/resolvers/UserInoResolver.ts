import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CampaginService } from '../repositories/campagin.service';
import {UserProfileRepository} from '../repositories/userProfileRepository';


@Injectable()

export class UserInoResolver implements Resolve<any> {
  constructor(
    private userProfileRepository: UserProfileRepository) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userProfileRepository.getUserInfo();
  }

}
