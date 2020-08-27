import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { CountriesLookupService } from '../repositories/countries-lookup.service';

@Injectable()

export class CountriesLookupResolver implements Resolve<any>{
    currentlanguage: any;
    constructor(
        private countriesLookupService: CountriesLookupService,
        private language: LanguageService,
    ) {
        this.language.language.subscribe(lang => {
            this.currentlanguage = lang;
        }, error => {
        }, () => {
        });
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.countriesLookupService.getCountries(this.currentlanguage);
    }

}