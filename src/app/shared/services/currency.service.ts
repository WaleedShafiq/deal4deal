import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CurrencyService {
 public currency = new ReplaySubject<any>();

 constructor( private translate: TranslateService ) { }

 changeCurrency(currency) {
   localStorage.setItem('currency', currency);
   this.currency.next(currency);
  }
}
