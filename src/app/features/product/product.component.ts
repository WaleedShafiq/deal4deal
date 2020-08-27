import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductService } from '@reporsitires/product.service';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  currentCurrency: any;
  currentlanguage: any;
  filterData: any;
  allRows: any[] = [];
  ActiveButtonIndex: any;
  currencyName: any;
  filterPrdouctLength = 0;

  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private currencyLookupsService: CurrencyLookupsService

  ) {
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
      this.currencyService.currency.subscribe(curr => {
        this.currentCurrency = curr;
        this.gitAllProducts();
        this.currencyLookupsService.getCurrencyById(this.currentCurrency).subscribe(response => {
          if (response.success) {
            this.currencyName = response.data["code"];
          }
        });
      }, error => {
      }, () => {
      });
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {

  }

  filterProducts(categoryId, index) {
    this.filterPrdouctLength = 0;
    this.ActiveButtonIndex = index;
    this.blockUI.start();
    this.productService.getFilteredProducts(this.currentlanguage, this.currentCurrency, categoryId).subscribe(response => {
      this.allRows = response.data;
      for (const item of this.allRows) {
        this.filterPrdouctLength = 0;
        for (const prize of item.prizes) {
          this.filterPrdouctLength += prize.campaigns.length;
        }
      }
      this.blockUI.stop();
    }, error => {

    });
  }
  gitAllProducts() {
    this.blockUI.start();
    this.productService.getProducts(this.currentlanguage, this.currentCurrency).subscribe(response => {
      this.allRows = response.data;
      this.filterData = response.data;
      this.blockUI.stop();
      const id = this.allRows[0].id;
      this.filterProducts(id, 0);
    }, error => {

    });

  }


}
