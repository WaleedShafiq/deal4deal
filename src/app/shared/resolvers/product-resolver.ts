import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../repositories/product.service';
import { LanguageService } from '../services/language.service';
import { CurrencyService } from '../services/currency.service';

@Injectable()

export class ProductResolver implements Resolve<any>{
    currentCurrencyId: any;
    currentlanguage: any;
    constructor(
        private productService: ProductService,
        private language: LanguageService,
        private currencyService: CurrencyService
    ) {
        this.language.language.subscribe(lang => {
            this.currentlanguage = lang;
            this.currencyService.currency.subscribe(curr => {
                this.currentCurrencyId = curr;

            }, error => {
            }, () => {
            });
        }, error => {
        }, () => {
        });


    }

    resolve(route: ActivatedRouteSnapshot) {
      //  return this.productService.getProducts(this.currentlanguage, this.currentCurrencyId);
    }

}
