import { HttpResponse } from '@classes/http-response';
import { Configuration } from '@core/configuration';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  hostUrl: string = this.configuration.HostUrl;

    contact(model: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept-Language': 'en'
        })
      };
      const url = this.hostUrl + 'contactuses';
      return this.http.post<HttpResponse>(url, model, httpOptions);
    }
}
