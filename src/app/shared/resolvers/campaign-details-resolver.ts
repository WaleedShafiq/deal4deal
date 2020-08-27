import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { CampaginService } from '../repositories/campagin.service';
import { LanguageService } from '../services/language.service';
import { CurrencyService } from '../services/currency.service';

@Injectable()

export class CompaginDetailsResolver implements Resolve<any>{
    currentCurrencyId: any;
    currentlanguage: any;

    constructor(
        private campaginService: CampaginService,
        private language: LanguageService,
        private activatedRoute: ActivatedRoute,
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
        let campaginDetailsId = route.params.id;

        return this.campaginService.getCampaginById(campaginDetailsId, this.currentlanguage, this.currentCurrencyId);
    }

}
