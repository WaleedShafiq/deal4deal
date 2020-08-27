import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '@services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from '@reporsitires/carts.service';
import { Configuration } from '@core/configuration';
import { LanguageService } from '@services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileRepository } from '@reporsitires/userProfileRepository';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';
import { NotifierService } from 'angular-notifier';
import { CartService } from '@services/cart.service';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartItems = [];
  isDonate = true;
  hostUrlImages: any;
  donationValue = 1;
  donateFactor: any;
  currentLanguage: string;
  currencyText: any;
  checkoutProcess: string;
  loggin = false;
  constructor(
    private service: SharedDataService,
    private cartService: CartsService,
    private router: Router,
    private configuration: Configuration,
    private route: ActivatedRoute,
    private userProfileRepository: UserProfileRepository,
    private translate: TranslateService,
    private notifierService: NotifierService,
    private languageService: LanguageService,
    private currencyService: CurrencyLookupsService,
    private cart: CartService
  ) {

  }

  ngOnInit() {
    this.hostUrlImages = this.configuration.HostUrlImages;
    localStorage.setItem('checkout', 'carts');
    this.cartService.ChangeCheckoutProcess('carts');
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    this.donateFactor = this.isDonate ? 2 : 1;
    this.currencyService.getCurrencyById( Number(localStorage.getItem('currency'))).subscribe(res => {
      this.currencyText = this.currentLanguage === 'en' ? res.data.code : res.data.name_ar;
    });
    this.checkForCartsInLocalStorage();
  }

  checkForCartsInLocalStorage() {

      if (this.userProfileRepository.isLoggedIn()) {
        this.loggin = true;
        this.getCartItems();
        this.cartService.getDonationValue().subscribe(res => {
          this.donationValue = res['data'].donation_value;
        });
      } else if (localStorage.getItem('cart') != null) {
        this.loggin = false;
        this.cartService.getDonationValue().subscribe(res => {
          this.donationValue = res['data'].donation_value;
        });
        this.cartItems = JSON.parse(localStorage.getItem('cart'));
        console.log(this.cartItems);
      }
  }

  Next() {
    if (this.userProfileRepository.isLoggedIn()) {
      this.service.IsShipping(true);
      this.router.navigate(['/cart/final-Shipping/' + this.isDonate]);
    } else {
      if (this.currentLanguage === 'en') {
        this.notifierService.notify('warning', 'You are not logged in!, pLease login first');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.notifierService.notify('warning', 'يجب تسجيل الدخول اولا');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }

    }

  }

  getCartItems() {
    this.route.data.subscribe(response => {
      this.cartItems = response.CartItems.data;
      this.cartService.SetCartItem(this.cartItems);
      console.log(this.cartItems);
    });
  }

  getPrice(value): number {
    return Number(Math.round(value).toFixed(3));
  }

  removeItem(item_id) {
    if (localStorage.getItem('cart') != null) {
      const index = this.cartItems.findIndex(cart => cart.campaign_id === item_id);
      console.log(index);
      this.cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } else {
      this.cartService.removeItemFromCart(item_id).subscribe(res => {
        this.cartItems = this.cartItems.filter(item => item.id !== item_id);
      });
    }
    this.cart.changeCartLength(false);
   // window.location.reload();
  }
  changeQuantity(itemIndex, value) {
    if (localStorage.getItem('cart') != null) {
      let item = this.cartItems[itemIndex];
      console.log('item', item);
      if (value === 'Inc') {
        if (item.quantity+1 > (item.campaign.total_num_of_sells - item.campaign.sold)) {
          if (this.currentLanguage === 'en') {
            return this.notifierService.notify('warning', 'Max Quantity Is ' + (item.campaign.total_num_of_sells - item.campaign.sold));
          } else {
            return this.notifierService.notify('warning', 'الكمية المتاحة ' + (item.campaign.total_num_of_sells - item.campaign.sold));
          }
        }
        item.quantity += 1;
      } else if (value === 'Dec') {
        item.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } else {
      let item = this.cartItems[itemIndex];
      if (value === 'Inc') {
        if (item.quantity + 1 > (item.campaign.total_num_of_sells - item.campaign.sold)) {
          if (this.currentLanguage === 'en') {
          return this.notifierService.notify('warning', 'Max Quantity Is ' + (item.campaign.total_num_of_sells - item.campaign.sold));
          } else {
            return this.notifierService.notify('warning', 'الكمية المتاحة ' + (item.campaign.total_num_of_sells - item.campaign.sold));
          }
        }

        item.quantity += 1;
      } else if (value === 'Dec') {
        item.quantity -= 1;
      }

      this.cartService.editItemCartQuantity(item.id, { campaign_id: item.campaign_id, quantity: item.quantity }).subscribe();
    }
  }

  Donate(value: boolean) {
    this.isDonate = value;
    this.donateFactor = this.isDonate ? 2 : 1;
    console.log(value);
    this.getTotal();
  }

  getTotal() {
    let total = 0;
    if (this.isDonate === true) {
      this.cartItems.map(item => {
        total += ((item.quantity * (item.campaign.product.price - item.campaign.product.offer))
          + (item.quantity * this.donationValue));
      });
    } else {
      this.cartItems.map(item => {
        total += (item.quantity * (item.campaign.product.price - item.campaign.product.offer));
      });
    }

 //   console.log('total' + total);
    return total;
  }

  ItemQuantityChanged(index) {
    let item = this.cartItems[index];
    if (item.quantity > (item.campaign.total_num_of_sells - item.campaign.sold)) {
      return this.notifierService.notify('warning', 'Max quantity is ' + (item.campaign.total_num_of_sells - item.campaign.sold));
    }
    if (localStorage.getItem('cart') != null) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } else {
      this.cartService.editItemCartQuantity(item.id, { campaign_id: item.campaign_id, quantity: item.quantity }).subscribe();
    }
  }


}
