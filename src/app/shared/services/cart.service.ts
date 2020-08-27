import { Injectable } from '@angular/core';
import { Campagin } from '@classes/campagin';
import { Cart } from '@classes/cart';
import { Subject} from 'rxjs';
import {UserProfileRepository} from '@reporsitires/userProfileRepository';
import {AccountService} from '@reporsitires/account.service';
import {NotifierService} from 'angular-notifier';
import {LanguageService} from '@services/language.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentlanguage: any;
  addToCartObservable = new Subject();
  public cart = new Subject();
  constructor(private userProfileRepository: UserProfileRepository,
              private accountService: AccountService,
              private language: LanguageService,
              private notifierService: NotifierService) {

   // this.currentlanguage = language['translate'].store.currentLang;
    this.currentlanguage = localStorage.getItem('Lang');
  }

  changeCartLength(state: boolean) {
    if (!state) {
      var id  = 0;
      this.cart.next({value: 1, id: ++id});
    } else {
      console.log('ref');
      this.cart.next('refresh');
    }
}
  // changeCartLength(justReload?: any) {

  //     if (!justReload) {
  //       var id  = 0;
  //       this.cart.next({value: 1, id: ++id});
  //     } else {
  //       this.cart.next('refresh');
  //     }
  // }

  sendResult(res, campaignId) {
    this.addToCartObservable.next({res, campaignId});
  }

 async addCampaginToCart(camp: Campagin, quantityValue?: any) {
    let campaginsCartArray: Cart[] = [];
    const campaginInCart: Cart = {
      id: 0,
      quantity: 0,
      client_id: 0,
      campaign_id: 0,
      campaign: camp
    };
    if (this.userProfileRepository.isLoggedIn()) {
      console.log(camp, quantityValue);
      var campaign_id: any[] = [];
      var quantity: any[] = [];
      const userId = localStorage.getItem('userId');
      campaign_id.push(camp.id);
      quantity.push(quantityValue ? quantityValue : 1);
      console.log(camp, quantityValue);
      console.log(Number(userId), quantity, campaign_id);

      this.accountService.addCampaginToCart(Number(userId), quantity, campaign_id).subscribe(respon => {
        console.log(Number(userId), quantity, campaign_id);
        console.log(respon);
        if (respon.success && respon['data'][0]['add'] === false && respon['data'][0]['campaign_id'] === camp.id) {
          if (quantityValue) {
            this.accountService.editCampaginToCart(Number(userId), quantity, campaign_id).subscribe(
              result => {
                if (result.success) {
                  console.log(result);
                  if (this.currentlanguage === 'ar') {
                    this.notifierService.notify('success', 'تمت إضافة هذه الحملة إلي العربة بنجاح');
                  } else {
                    this.notifierService.notify('success', 'Campaign successfully added  your cart');
                  }
                }
              }
            );
          } else {
            if (this.currentlanguage === 'ar') {
              this.notifierService.notify('warning', 'هذه الحملة موجودة بالفعل في العربة الخاصة بك');
            } else {
              this.notifierService.notify('warning', 'Campagin already exist in your cart');
            }
          }
          this.sendResult(false, camp.id);
        } else {
          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('success', 'تم اضافه هذه الحملة بنجاح اللي العربة الخاصه بك');
          } else {
            this.notifierService.notify('success', 'Campaign successfully added  your cart');
          }
          this.sendResult(true, camp.id);
        }
      });
    } else {
      if (localStorage.getItem('cart') == null) {
        campaginInCart.quantity =   quantityValue ? quantityValue : 1;
        campaginInCart.campaign = camp;
        campaginInCart.campaign_id = camp.id;
        campaginsCartArray.push(campaginInCart);
        localStorage.setItem('cart', JSON.stringify(campaginsCartArray));
        if (this.currentlanguage === 'ar') {
             this.notifierService.notify('success', 'تمت إضافة هذه الحملة إلي العربة بنجاح');
        } else {
        this.notifierService.notify('success', 'Campaign Added To Cart Successfully');
        }
        this.sendResult(true, camp.id);
      } else {
        campaginsCartArray = JSON.parse(localStorage.getItem('cart'));
        const foundCampaginInCart = campaginsCartArray.find(i => i.campaign_id === camp.id);
        if (foundCampaginInCart == null) {
          campaginInCart.quantity = quantityValue ? quantityValue : 1;
          campaginInCart.campaign_id = camp.id;
          campaginsCartArray.push(campaginInCart);
          localStorage.setItem('cart', JSON.stringify(campaginsCartArray));
          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('success', 'تمت إضافة هذه الحملة إلي العربة بنجاح');
          } else {
            this.notifierService.notify('success', 'Campaign Added To Cart Successfully');
          }
          this.sendResult(true, camp.id);
        } else {
            if (quantityValue !== foundCampaginInCart.quantity && quantityValue != null) {
              foundCampaginInCart.quantity = quantityValue;
              localStorage.setItem('cart', JSON.stringify(campaginsCartArray));

              if (this.currentlanguage === 'ar') {
                this.notifierService.notify('success', 'تم تعديل الكمية بنجاح');
              } else {
              this.notifierService.notify('success', 'Quantity Updated Successfully');
              }
              this.sendResult(false, camp.id);

            } else {
              if (this.currentlanguage === 'ar') {
              this.notifierService.notify('warning', 'هذه الحملة موجودة بالفعل في العربة الخاصة بك');
             } else {
              this.notifierService.notify('warning', 'Campagin Already Exist In Your Cart');
            }
            }


        }
      }
    }
  }
  getQuantityOfCampaginInCart(campa: Campagin) {
     if (localStorage.getItem('cart') != null) {
       let campaginsCartArray: Cart[] = [];
       campaginsCartArray = JSON.parse(localStorage.getItem('cart'));
       const foundProductInCart = campaginsCartArray.find(i => i.campaign_id === campa.id);
       return foundProductInCart ? foundProductInCart.quantity : 0;
     } else {
       return 0;
     }
  }
}
