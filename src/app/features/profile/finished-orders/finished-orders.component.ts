import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Configuration} from '../../../core/configuration';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../shared/services/language.service';

@Component({
  selector: 'app-finished-orders',
  templateUrl: './finished-orders.component.html',
  styleUrls: ['./finished-orders.component.scss']
})
export class FinishedOrdersComponent implements OnInit {
    showDetails = false;
    allOrders = [];
    hostUrlImages;
    currentLanguage: string;
  constructor(private route: ActivatedRoute,
              private configuration: Configuration,
              private translateService: TranslateService,
              private languageService: LanguageService
              ) { }
  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.hostUrlImages = this.configuration.HostUrlImages;
    this.getOrders();
  }

  getOrders() {
    this.route.data.subscribe(response => {
      this.allOrders = response.orders.data;
      this.allOrders.map((order, index) => {
        if (index === 0 ) {
          order['showDetails'] = true;
        } else {
          order['showDetails'] = false;
        }
      });
      // if (this.allOrders.length === 0) {
      //   this.allOrders = [
      //     {
      //       showDetails: false
      //     },
      //     {
      //       showDetails: true
      //     },
      //     {
      //       showDetails: false
      //     },
      //     {
      //       showDetails: false
      //     },
      //     {
      //       showDetails: false
      //     },
      //     {
      //       showDetails: false
      //     },
      //   ];
      // }
    });
  }

  getPrice(value): number {
   return  Number(Math.round(value).toFixed(3));
  }

  getTotal(orders) {
    let total = 0;
    if (this.allOrders.length) {
      orders.map(order => {
        if (order.campaign.product.offer > 0) {
          total += this.getPrice(order.campaign.product.price - order.campaign.product.offer);
        } else {
          total += this.getPrice(order.campaign.product.price);
        }
      });
    }
    return total;
  }
}
