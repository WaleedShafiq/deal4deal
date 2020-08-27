import { HttpResponse } from '@classes/http-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterMediaService {
  mediaLinksData = new Subject();
  hostUrl: string = this.configuration.HostUrl;

  constructor(
    private http: HttpClient,
    private configuration: Configuration) { }

    getMediaLinksData() {
      return this.mediaLinksData.asObservable();
    }

     notifyMediaLinksData(data: any): void {
      this.mediaLinksData.next({mediaData: data});
    }

  getFooterSettings() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'en',
      })
    };
    const url = this.hostUrl + 'settings';
    return this.http.get<HttpResponse>(url, httpOptions);
  }
}
