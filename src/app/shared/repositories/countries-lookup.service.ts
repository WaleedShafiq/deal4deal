import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';
import { LanguageService } from '@services/language.service';

@Injectable()
export class CountriesLookupService {
    userId;
    token;
    lang;
    httpsOptions;
    hostUrl: string = this.configuration.HostUrl;

    constructor(
      private http: HttpClient,
      private configuration: Configuration,
      private languageService: LanguageService) {
        this.userId = localStorage.getItem('userId');
        this.token = localStorage.getItem('token');
        this.lang = this.languageService['translate'].store.currentLang;
       }

  getHttpOptions() {
    if (this.userId) {
      const httpsOptions =  {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'Accept-Language': this.lang,
          'Content-Language': this.userId ? this.userId.toString() : 1 + 1
        })
      };
      return httpsOptions;
    }
  }


    getCountries(language: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept-Language': language,
            })
        };
        const url = this.hostUrl + 'countries';
        return this.http.get(url, httpOptions);
    }
    getCityByCountryId(country_id,language){
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept-Language': language,
            })
        };
        const url = `${this.hostUrl}cities?country_id=`;
        return this.http.get(url+country_id,httpOptions);
      }
}
