import { Injectable } from '@angular/core';
import { HttpResponse } from '@classes/http-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';

@Injectable({
  providedIn: 'root'
})
export class CharitiesService {

  constructor(
    private http: HttpClient,
    private configuration: Configuration
  ) { }

  hostUrl: string = this.configuration.HostUrl;

  getcharities(language: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': language,
      })
    };
    const url = this.hostUrl + 'charities';
    return this.http.get<HttpResponse>(url, httpOptions);
  }


}
