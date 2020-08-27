import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';
import { HttpResponse } from '@classes/http-response';

@Injectable()
  export class AccountService {
constructor(private http: HttpClient, private configuration: Configuration) { }

hostUrl: string = this.configuration.HostUrl;

  login(model: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'en'
      })
    };
    const url = this.hostUrl + 'clients/login';
    return this.http.post<HttpResponse>(url, model, httpOptions);
  }

  register(model: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'en'
      })
    };
    const url = this.hostUrl + 'clients/register';
    return this.http.post<HttpResponse>(url, model, httpOptions);
  }

  forgetPassword(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Accept-Language' : 'en',
       Accept: 'application/json'
      })
    };
    const url = this.hostUrl + 'clients/forget_password';
    return this.http.post<HttpResponse>(url, email, httpOptions);
  }

  addCampaginToWhishlist(client_id: number, quantity: any, campaign_id: any) {
      const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'en',
        'Content-Language': client_id.toString(),
        Authorization: `Bearer ${this.getAuthorizationToken()}`,
      })
      };
      const url = this.hostUrl + 'wishlists';
      return this.http.post<HttpResponse>(url, {client_id, campaign_id}, httpOptions);

  }

  addCampaginToCart(clientId: number, quantity: any, campaign_id: any) {
        const httpOptions = {
        headers: new HttpHeaders({
          'Accept-Language': 'en',
          'Content-Language': clientId.toString(),
          Authorization: `Bearer ${this.getAuthorizationToken()}`,
        })
        };
        console.log(clientId, quantity, campaign_id);
        console.log(quantity, campaign_id);

        const url = this.hostUrl + 'carts';
        return this.http.post<HttpResponse>(url, {quantity, campaign_id}, httpOptions);
  }

  editCampaginToCart(clientId: number, quantity: any, campaign_id: any) {
        const httpOptions = {
        headers: new HttpHeaders({
          'Accept-Language': 'en',
          'Content-Language': clientId.toString(),
          Authorization: `Bearer ${this.getAuthorizationToken()}`,
        })
        };
        const url = this.hostUrl + 'carts/multible_update';
        return this.http.post<HttpResponse>(url, {quantity, campaign_id}, httpOptions);
  }

  getAuthorizationToken() {
    if (localStorage.getItem('token') != null) {
    const token = localStorage.getItem('token');
    return token;
    }
  }
}
