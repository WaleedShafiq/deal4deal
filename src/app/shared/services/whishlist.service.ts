
import { Injectable } from '@angular/core';
import { Campagin } from '@classes/campagin';
import { Cart } from '@classes/cart';
import { Subject} from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AccountService } from '@reporsitires/account.service';
import { Configuration } from '@core/configuration';
import { HttpResponse } from '@classes/http-response';
import {NotifierService} from 'angular-notifier';
import {UserProfileRepository} from '@reporsitires/userProfileRepository';
import {LanguageService} from '@services/language.service';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  whishlistLengthNav: any;
  currentlanguage: any;
  addToWishListObservable = new Subject();
  // removeFromWhishlistnotifications = new Subject();
  hostUrl: string = this.configuration.HostUrl;
  public whishlist = new Subject();
  public removeItem = new Subject();
  constructor(private accountService: AccountService,
              private language: LanguageService,
              private notifierService: NotifierService,
              private userProfileRepository: UserProfileRepository,
              private http: HttpClient, private configuration: Configuration) {
              this.currentlanguage = language['translate'].store.currentLang;
  }
  changeWhishlistLength(status: boolean) {

    if (status !== true) {
      var id  = 0;
      this.whishlist.next({value: 1, id: ++id});
      console.log(this.whishlist);
      console.log(true);
    } else {
      this.whishlist.next('refresh');
      console.log(this.whishlist);
      console.log(false);
    }
 }

  // changeWhishlistLength(justReload?: any) {
  //    if (!justReload) {
  //      var id  = 0;
  //      this.whishlist.next({value: 1, id: ++id});
  //    } else {
  //     this.whishlist.next('refresh');
  //    }
  // }

  sendResult(res, campaignId) {
    console.log(res, campaignId);
    this.addToWishListObservable.next({res, campaignId});
  }
  // notifyDelete(state: boolean) {
  //   console.log(state);
  //   this.removeFromWhishlistnotifications.next({state});
  // }

  // getWhishlistNotifications() {
  //   return this.removeFromWhishlistnotifications.asObservable();
  // }

  removeItemFromWishlist(itemId) {
    this.removeItem.next(itemId);
  }

  addCampaginToWhishlist(camp: Campagin) {

    let campaginsCartArray: Cart[] = [];
    const campaginInCart: Cart = {
      id: 0,
      quantity: 0,
      client_id: 0,
      campaign_id: 0,
      campaign: camp
    };
    if (this.userProfileRepository.isLoggedIn()) {
      var campaign_id: any[] = [];
      var quantity: any[] = [];
      const userId = localStorage.getItem('userId');
      campaign_id.push(camp.id);
      quantity.push(1);
      this.accountService.addCampaginToWhishlist(Number(userId), quantity, campaign_id).subscribe(respon => {
        if (respon.success && ( Number(respon['message'].split('(')[1].charAt(0)) !== 0 )) {

          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('success', 'تمت اضافة الحملة اللي المفضلة بنجاح');
          } else {
            this.notifierService.notify('success', 'Campaign Added To Whishlist Successfully');
          }
          this.sendResult(true, camp.id);
        } else {
          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('warning', 'هذه الحملة موجودة بالفعل في المفضلة');
          } else {
            this.notifierService.notify('warning', 'Campagin Already Exist In Your Wishlist');
          }
          this.sendResult(false, camp.id);
        }
      });
    } else {
      if (localStorage.getItem('whishlist') == null) {
        campaginInCart.quantity = 0;
        campaginInCart.id = 0;
        campaginInCart.client_id = 0;
        campaginInCart.campaign_id = camp.id;
        campaginInCart.campaign = camp;
        campaginInCart.campaign.wished = 'Yes';
        campaginsCartArray.push(campaginInCart);

        localStorage.setItem('whishlist', JSON.stringify(campaginsCartArray));
        if (this.currentlanguage === 'ar') {
          this.notifierService.notify('success', 'تم اضافة الحملة بنجاح اللي المفضلة');
        } else {
          this.notifierService.notify('success', 'Campaign Added To Whishlist Successfully');
        }
        this.sendResult(true, camp.id);
        // this.changeWhishlistLength(true);
      } else {
        campaginsCartArray = JSON.parse(localStorage.getItem('whishlist'));
        const foundCampaginInCart = campaginsCartArray.find(i => i.campaign_id === camp.id);
        if (foundCampaginInCart == null) {
          campaginInCart.quantity = 0;
          campaginInCart.id = 0;
          campaginInCart.client_id = 0;
          campaginInCart.campaign_id = camp.id;
          campaginInCart.campaign = camp;
          campaginInCart.campaign.wished = 'Yes';
          campaginsCartArray.push(campaginInCart);
          localStorage.setItem('whishlist', JSON.stringify(campaginsCartArray));
         // this.changeWhishlistLength(true);

          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('success', 'تم اضافة الحملة بنجاح اللي المفضلة');
          } else {
            this.notifierService.notify('success', 'Campaign Added To Whishlist Successfully');
          }
          this.sendResult(true, camp.id);
        } else {
          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('warning', 'هذه الحملة موجودة بالفعل في المفضله');
          } else {
            this.notifierService.notify('warning', 'Campagin Already Exist In Your Wishlist');
          }
          this.sendResult(false, camp.id);
        }
      }
    }
   }
   removeCampaginFromWhishlist(camp: Campagin) {
    let campaginsCartArray: Cart[] = [];
    campaginsCartArray = JSON.parse(localStorage.getItem('whishlist'));
    const foundProductInCart = campaginsCartArray.find(i => i.campaign_id === camp.id);
    console.log(foundProductInCart);
    const index = campaginsCartArray.findIndex( p => p.campaign_id === foundProductInCart.campaign_id);
    campaginsCartArray.splice(index, 1);
    localStorage.setItem('whishlist', JSON.stringify(campaginsCartArray));
  //  this.changeWhishlistLength(false);
  }
  getWhishlistCampaginFromLocalStorage() {
    if (localStorage.getItem('whishlist') != null || localStorage.getItem('whishlist') != '') {
    const ItemsInCart = JSON.parse(localStorage.getItem('whishlist'));
    return ItemsInCart;
    } else {
      return null;
    }
  }

  getUserWhishlist(userId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Accept-Language' : 'en',
       Authorization: `Bearer ${this.accountService.getAuthorizationToken()}`,
      })
    };
    const url = this.hostUrl + 'wishlists?client_id=' + userId;
    return this.http.get<HttpResponse>(url, httpOptions);
  }

  removeUserCampaginFromWhishlist(whislistId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Accept-Language' : 'en',
       Authorization: `Bearer ${this.accountService.getAuthorizationToken()}`,
      })
    };
    const url = this.hostUrl + 'wishlists/' + whislistId;
    return this.http.delete<HttpResponse>(url, httpOptions);
  }

  addUserCampaginToWhishlist(client_id: number, campaign_id: number ) {

    const httpOptions = {
      headers: new HttpHeaders({
      'Accept-Language' : 'en',
       Authorization: `Bearer ${this.accountService.getAuthorizationToken()}`,
      })
    };
    const url = this.hostUrl + 'wishlists';
    return this.http.post<HttpResponse>(url, {client_id, campaign_id}, httpOptions);
  }
}
