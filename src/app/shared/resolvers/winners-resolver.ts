import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { WinnersService } from '../repositories/winners.service';

@Injectable()

export class WinnersResolver implements Resolve<any> {
    currentlanguage: any;
    constructor(
        private winnersService: WinnersService,
        private language: LanguageService,
    ) {
        this.language.language.subscribe(lang => {
            this.currentlanguage = lang;
        }, error => {
        }, () => {
        });
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.winnersService.getWinners(this.currentlanguage);
    }
}
