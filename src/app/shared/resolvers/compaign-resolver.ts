import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CampaginService } from '../repositories/campagin.service';
import { LanguageService } from '../services/language.service';
import { CurrencyService } from '../services/currency.service';

@Injectable()

export class CompaginResolver implements Resolve<any>{
    currentCurrencyId: any;
    currentlanguage: any;
    constructor(
        private campaginService: CampaginService,
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
       // return this.campaginService.getCampagins(this.currentlanguage, this.currentCurrencyId);
    }

}
