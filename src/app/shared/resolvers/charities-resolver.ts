import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { CharitiesService } from '../repositories/charities.service';

@Injectable()

export class CharitiesResolver implements Resolve<any> {
    currentlanguage: any;
    constructor(
        private charitiesService: CharitiesService,
        private language: LanguageService,
    ) {
        this.language.language.subscribe(lang => {
            this.currentlanguage = lang;
        }, error => {
        }, () => {
        });
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.charitiesService.getcharities(this.currentlanguage);
    }
}
