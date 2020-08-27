import { Injectable } from '@angular/core';
import { HttpResponse } from '@classes/http-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '@core/configuration';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient,
        private configuration: Configuration
    ) { }

    hostUrl: string = this.configuration.HostUrl;

    getProducts(language: string, currencyId: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept-Language': language,
                'Content-Language': currencyId.toString()
            })
        };
        const url = this.hostUrl + 'prize_categories';
        return this.http.get<HttpResponse>(url, httpOptions);
    }

    getFilteredProducts(language: string, currencyId: number, categoryId: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept-Language': language,
                'Content-Language': currencyId.toString()
            })
        };
        const url = this.hostUrl + 'prize_categories?category_id=' + categoryId;
        return this.http.get<HttpResponse>(url, httpOptions);
    }

    getProductById(productId: number, language: string, currencyId: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept-Language': language,
                'Content-Language': currencyId.toString()
            })
        };
        const url = this.hostUrl + 'campaigns/' + productId;
        return this.http.get<HttpResponse>(url, httpOptions);
    }

}
