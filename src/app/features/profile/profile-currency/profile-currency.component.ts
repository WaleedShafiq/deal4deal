import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../shared/services/language.service';
import { CurrencyLookupsService } from './../../../shared/repositories/currency-lookups.service';
import { CurrencyService } from './../../../shared/services/currency.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-currency',
  templateUrl: './profile-currency.component.html',
  styleUrls: ['./profile-currency.component.scss']
})
export class ProfileCurrencyComponent implements OnInit {
  currentlanguage: any;
  language = localStorage.getItem('Lang');
  currency: any;
  currencyId: any;
  constructor(
    private currencyService: CurrencyService,
    private currencyLookupsService: CurrencyLookupsService,
    private translate: TranslateService,
    private languageService: LanguageService

  ) {
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
    }, error => {
    }, () => {
    });
    this.currencyId = localStorage.getItem('currency');
    this.currencyService.currency.subscribe( cur => {
      this.currencyId = cur;
    });
    this.currencyLookupsService.getCurrencyLookups().subscribe(response => {
      if (response.success) {
        this.currency = response.data;
      }
   });

  }

  changeCurrency(curr) {
    this.currencyId = curr;

  }

  ngOnInit() {
  }

  changeCurrecnyHeader() {
    this.currencyService.changeCurrency(this.currencyId);
  }
}

