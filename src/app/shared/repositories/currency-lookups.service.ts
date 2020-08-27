import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@classes/http-response';
import { Configuration } from '@core/configuration';



@Injectable({
  providedIn: 'root'
})

export class CurrencyLookupsService {

  hostUrl: string = this.configuration.HostUrl;
  lang = localStorage.getItem('Lang');
  constructor( private http: HttpClient, private configuration: Configuration ) { }


  getCurrencyLookups() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': this.lang != null ? this.lang : 'en'
      })
    };
    const url = this.hostUrl + 'currencies';
    return this.http.get<HttpResponse>(url, httpOptions);
  }

  getCurrencyById(currencyId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': this.lang != null ? this.lang : 'en'
      })
    };
    const url = this.hostUrl + 'currencies/' + currencyId;
    return this.http.get<HttpResponse>(url, httpOptions);
  }

}
