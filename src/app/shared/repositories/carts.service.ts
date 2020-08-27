import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';
import {LanguageService} from '@services/language.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  userId;
  token;
  httpsOptions;

  cartItem = new BehaviorSubject<any[]>([]);
	cartItem_asObs = this.cartItem.asObservable();
  hostUrl;
  checkoutProcess = new BehaviorSubject<string>("");
  lang = localStorage.getItem('Lang');
  constructor(
    private http: HttpClient,
    private configuration: Configuration,
    private languageService: LanguageService) {
      this.userId = localStorage.getItem('userId');
      this.token = localStorage.getItem('token');
      this.hostUrl = this.configuration.HostUrl;
      this.getItemsInCart().subscribe(res => {
        this.cartItem = new BehaviorSubject<any[]>(res['data']);
        this.cartItem_asObs = this.cartItem.asObservable();
      });

     }

  getHttpOptions() {
    if (this.userId) {
      const httpsOptions =  {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'Accept-Language':  this.lang != null ? this.lang : 'en',
          'Content-Language': this.userId ? this.userId.toString() : 1 + 1
        })
      };
      return httpsOptions;
    }
  }

    getCountryList() {
      const url = `${this.hostUrl}countries`;
      return this.http.get(url, this.getHttpOptions());
    }


    postShippingDetailes(data) {
      const url = `${this.hostUrl}shipping_addresses`;
      return this.http.post(url, data, this.getHttpOptions());
    }
    updateShippingDetailes(data, addressId) {
      const url = `${this.hostUrl}shipping_addresses/${addressId}`;
      return this.http.put(url, data, this.getHttpOptions());
    }

    getItemsInCart(){
      let options =  {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Accept-Language': this.lang,
        })
      };
      const url = `${this.hostUrl}carts`;
      return this.http.get(url, options);
    }

    getClientShippingAddresses() {
      const url = `${this.hostUrl}shipping_addresses?client_id=${this.userId}`;
      return this.http.get(url, this.getHttpOptions());
    }
    DeleteAddress(addressId) {
      const url = `${this.hostUrl}shipping_addresses/${addressId}`;
      return this.http.delete(url, this.getHttpOptions());
    }
    getPaymentMethods() {
      const url = `${this.hostUrl}payment_methods`;
      return this.http.get(url, this.getHttpOptions());
    }

    submitOrder(data) {
      const url = `${this.hostUrl}clients/place_order`;
      return this.http.post(url, data, this.getHttpOptions());
    }

    removeItemFromCart(itemId) {
      const url = `${this.hostUrl}carts/${itemId}`;
      return this.http.delete(url, this.getHttpOptions());
    }
    editItemCartQuantity(itemId, data) {
      const url = `${this.hostUrl}carts/${itemId}`;
      return this.http.put(url, data, this.getHttpOptions());
    }

    SetCartItem(cartItem) {
      this.cartItem.next(cartItem);
    }

    ChangeCheckoutProcess(value: string) {
      this.checkoutProcess.next(value);
    }

    getDonationValue() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept-Language': this.lang != null ? this.lang : 'en',
          'Content-Language': this.userId ? this.userId.toString() : 1 + 1
        })
      };
      const url = `${this.hostUrl}clients/donation_value`;
      return this.http.get(url, httpOptions);
    }
    GetTaxes() {
      const url = `${this.hostUrl}taxes`;
      return this.http.get(url, this.getHttpOptions());
    }
    GetShippingValue(country_id){
      let options =  {
        headers: new HttpHeaders({
          'Accept-Language': this.lang,
          'Content-Language': localStorage.getItem('currency')
        })
      };

      const url = `${this.hostUrl}shipping_values?country_id=${country_id}`;
      return this.http.get(url, options);
    }
}
