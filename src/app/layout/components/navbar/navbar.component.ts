import { LanguageService } from '@services/language.service';
import { WhishlistService } from '@services/whishlist.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import {Configuration} from '@core/configuration';
import {UserProfileRepository} from '@reporsitires/userProfileRepository';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CartsService} from '@reporsitires/carts.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showLinks = false;
  cartLength: any;
  whishlistLength: any;
  defaultImage = 'assets/img/defaultIconUserNavbar.png';
  language = localStorage.getItem('Lang');
  userImage;
  hostUrlImages;
  showDrop = false;
  subscription: Subscription;
  subscription1: Subscription;
  subscription2: Subscription;
  userId;
  token;
  lang;
  hostUrl;
  isLogin;
  observableCartId = 0;
  observableCWishListId = 0;
  constructor(private cartsService: CartsService,
              private cartService: CartService,
              private whishlistService: WhishlistService,
              private router: Router,
              private userProfileRepository: UserProfileRepository,
              private http: HttpClient,
              private configuration: Configuration,
              private languageService: LanguageService,
              private notifierService: NotifierService,

    ) {
      this.languageService.language.subscribe(lang => {
        this.language = lang;
      });
    }

  ngOnInit() {
    this.isLogin = this.userProfileRepository.isLoggedIn();
    this.getCartLength();
    this.getWishListLength();
    this.subscription = this.userProfileRepository.closeLogin.subscribe(
      next => {
        if (next) {
          this.showDrop = false;
        }
      }
    );
    this.subscription1 = this.cartService.cart.subscribe(
      next => {
        if (next !== 'refresh') {
          if (localStorage.getItem('cart') != null) {
            const CartLengthInLocal = JSON.parse(localStorage.getItem('cart'));
            let cartLength;
            if (CartLengthInLocal) {
              cartLength = CartLengthInLocal.length;
            }
            this.cartLength =  cartLength.toString();
          } else {
             if (this.observableCartId !== next['id']) {
             this.cartLength += 1;
             this.observableCartId = next['id'];
             setTimeout(() => {
               this.observableCartId = 0;
             }, 300);
           }
          }
        } else {
          this.getCartsFromServer();
        }
      });


    this.subscription2 = this.whishlistService.whishlist.subscribe(

      next => {
        console.log(next);
        if (next !== 'refresh') {
          if (localStorage.getItem('whishlist') != null) {
            const wishListLengthInLocal = JSON.parse(localStorage.getItem('whishlist'));
            console.log(wishListLengthInLocal);
            let wishlistLength;
            if (wishListLengthInLocal) {
              wishlistLength = wishListLengthInLocal.length;
              console.log(wishlistLength);
            }
            this.whishlistLength =  wishlistLength.toString();
            console.log(this.whishlistLength);
          } else {
             if (this.observableCWishListId !== next['id']) {
             this.whishlistLength += 1;
             this.observableCWishListId = next['id'];
             setTimeout(() => {
               this.observableCWishListId = 0;
             }, 300);
           }
          }
        } else {
          this.getwhishlistsFromServer();
        }
      });
    this.hostUrlImages = this.configuration.HostUrlImages;

  }

  getCartLength() {
    if (localStorage.getItem('cart') != null) {
      const carts = JSON.parse(localStorage.getItem('cart'));
      if (carts && carts.length) {
        this.cartLength =  carts.length;
      } else {
        this.cartLength = 0;
      }
    } else {
       if (this.userProfileRepository.isLoggedIn()) {
         this.getCartsFromServer();
       } else {
         this.cartLength = 0;
       }
    }
  }

  getWishListLength() {
    if (localStorage.getItem('whishlist') != null) {
      const whishlist = JSON.parse(localStorage.getItem('whishlist'));
      if (whishlist && whishlist.length) {
        this.whishlistLength =  whishlist.length;
      } else {
        this.whishlistLength = 0;
      }
    } else {
       if (this.userProfileRepository.isLoggedIn()) {
         this.getwhishlistsFromServer();
       } else {
         this.whishlistLength = 0;
       }
    }
  }

  getCartsFromServer() {
    this.hostUrl = this.configuration.HostUrl;
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.lang = this.languageService['translate'].store.currentLang;
    let options =  {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Accept-Language': this.lang,
      })
    };
    const url = `${this.hostUrl}carts`;
    return this.http.get(url, options).subscribe(
      res => {
        if (res['data']) {
          this.cartLength = res['data'].length;
        }
      }
    );
  }

  getwhishlistsFromServer() {
    this.hostUrl = this.configuration.HostUrl;
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.lang = this.languageService['translate'].store.currentLang;
    let options =  {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Accept-Language': this.lang,
      })
    };
    const userId = JSON.parse(localStorage.getItem('userId'));
    const url = this.hostUrl + 'wishlists?client_id=' + userId;
    return this.http.get(url, options).subscribe(
      res => {
        if (res['data']) {
          this.whishlistLength = res['data'].length;
        }
      }
    );
  }

  toggleDropDown() {
    this.showDrop = !this.userProfileRepository.isLoggedIn();
    if (!this.showDrop) {
      this.router.navigate(['/profile']);
    }
  }

  getUserImage() {
    this.userImage = localStorage.getItem('image');
    return this.userImage;
  }

  checkForData() {
      return   this.showDrop;
  }

  showIcons() {
    this.showLinks = !this.showLinks;
  }

  closeLogin() {
    this.userProfileRepository.closeLoginFunc(true);
  }

  logOut() {
    this.userProfileRepository.logOutApi().subscribe(
      res => {
        if (res['status_code'] == 200) {
          this.notifierService.notify('success', res['message']);
          localStorage.clear();
          // setTimeout(() => {
          this.router.navigate(['/login']);
          // });
        } else {
        }
      }, error => {
      }, () => {
      }
    );
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
