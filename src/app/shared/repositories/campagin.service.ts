import { Injectable } from '@angular/core';
import { HttpResponse } from '@classes/http-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';

@Injectable({
  providedIn: 'root'
})
export class CampaginService {

  constructor(
    private http: HttpClient,
    private configuration: Configuration
  ) { }

  hostUrl: string = this.configuration.HostUrl;
// currencyId.toString()
  getCampagins(language: string, currencyId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': language,
        'Content-Language': currencyId.toString()
      })
    };
    const url = this.hostUrl + 'get_campaigns_with_status';
    return this.http.get<HttpResponse>(url, httpOptions);
  }

  getFilteredCompagin(language: string, currencyId: number, campaignFilterStatus: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': language,
        'Content-Language': currencyId.toString()
      })
    };
    const url = this.hostUrl + 'get_campaigns_with_status?status=' + campaignFilterStatus;
    return this.http.get<HttpResponse>(url, httpOptions);
  }

  getCampaginById(campaginId: number, language: string, currencyId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': language,
        'Content-Language': currencyId.toString()
      })
    };
    const url = this.hostUrl + 'campaigns/' + campaginId;
    return this.http.get<HttpResponse>(url, httpOptions);
  }

  getCaouselData(language: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': language,
      })
    };
    const url = this.hostUrl + 'slider/Web';
    return this.http.get<HttpResponse>(url, httpOptions);
  }
}
