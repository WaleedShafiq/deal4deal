import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';
import {LanguageService} from '@services/language.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileRepository {
    userId;
    token;
    lang;
    hostUrl;
    public closeLogin = new Subject();
  constructor(
    private http: HttpClient,
    private configuration: Configuration,
    private languageService: LanguageService,
  ) {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.lang = this.languageService['translate'].store.currentLang;
    this.hostUrl = this.configuration.HostUrl;
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

  closeLoginFunc(close) {
    this.closeLogin.next(close);
  }

  getUserInfo() {
    const url = `${this.hostUrl}clients/${this.userId}`;
    return this.http.get(url, this.getHttpOptions());
  }

  rateApp(data) {
    const url = `${this.hostUrl}rate`;
    return this.http.post(url, data, this.getHttpOptions());
  }

  logOutApi() {
    const url = `${this.hostUrl}clients/logout`;
    return this.http.post(url, {}, this.getHttpOptions());
  }

  getWishList() {
    const url = `${this.hostUrl}clients/wishlists?client_id=${this.userId}`;
    return this.http.get(url, this.getHttpOptions());
  }

  getOrders() {
    const url = `${this.hostUrl}orders`;
    return this.http.get(url, this.getHttpOptions());
  }

  getActiveTickets() {
      const url = `${this.hostUrl}tickets`;
      return this.http.get(url, this.getHttpOptions());
    }

 getLevels() {
    const url = `${this.hostUrl}levels`;
    return this.http.get(url, this.getHttpOptions());
  }

  updateUserInfo(data) {
    const url = `${this.hostUrl}clients/edit_profile`;
    return this.http.put(url, data, this.getHttpOptions());
  }

  changePassword(data) {
    const url = `${this.hostUrl}clients/change_password`;
    return this.http.post(url, data, this.getHttpOptions());
  }

  inviteFriends(data) {
    const url = `${this.hostUrl}clients/invite_friends`;
    return this.http.post(url, data, this.getHttpOptions());
  }

  isLoggedIn() {
    return JSON.parse(localStorage.getItem('userId')) != null;
  }
}
