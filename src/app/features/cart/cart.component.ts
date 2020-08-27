import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '@services/shared-data.service';
import { Router } from '@angular/router';
import { CartsService } from '@reporsitires/carts.service';
import { LanguageService } from '@services/language.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isShipping: any;
  isOrdered: any;
  Display: any;
  URL: any;
  checkoutProcess = '';
  currentLanguage = '';
  constructor(
    private service: SharedDataService,
    private cartService: CartsService,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService) { }

  ngOnInit() {

    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    // console.log(this.currentLanguage)
    this.service.isSuccess_asObs.subscribe(res => {
      if (res === true) {
        setTimeout(() => {
          this.Display = true;
        });
      }
    });
    this.cartService.checkoutProcess.subscribe(res => {
      setTimeout(() => {
        this.checkoutProcess = res;
      });
    });

    this.service.isShipping_asObs.subscribe(res => {
      if (res === true) {
       setTimeout(() => {
         this.isShipping = true;
       });
      }
    });

    this.service.isOrdered_asObs.subscribe(res => {
      if (res === true) {
      setTimeout(() => {
        this.isOrdered = true;
      });

      }
    });
  }

}
