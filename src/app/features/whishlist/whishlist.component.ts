import { CurrencyService } from '@services/currency.service';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';
import { Component, OnInit } from '@angular/core';
import { WhishlistService } from '@services/whishlist.service';
import { LanguageService } from '@services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {
  allRows = [];
  @BlockUI() blockUI: NgBlockUI;
  userId: number;
  dataGetted = false;
  whishlistCampaginLength = 0;
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
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
  currentCurrency: any;
  currentlanguage: any;
  currencyName: any;
  notifyWhishlist: any;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private whishlistService: WhishlistService,
    private currencyLookupsService: CurrencyLookupsService,
    private currencyService: CurrencyService) {

    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(langs => {
      this.translate.use(langs);
      this.currentlanguage = lang;
    }, error => {
    }, () => {
    });
    this.blockUI.start();
    this.currencyService.currency.subscribe(curr => {
      this.currentCurrency = curr;
      this.currencyLookupsService.getCurrencyById(this.currentCurrency).subscribe(response => {
        if (response.success) {
          this.currencyName = response.data["code"];
        }
      });
    });
    if (localStorage.getItem('userId') != null) {
      this.userId = JSON.parse(localStorage.getItem('userId'));
      this.whishlistService.getUserWhishlist(this.userId).subscribe(response => {
        if (response.success) {
          this.dataGetted = true;
          this.blockUI.stop();
          this.allRows = response.data;
        }
      });
    } else {
      this.getCompaginData();
    }


  }

  notifyDeleteLogin() {
    this.whishlistService.getUserWhishlist(this.userId).subscribe(response => {
      if (response.success) {
        this.dataGetted = true;
        this.allRows = response.data;
      }
    });
   // this.ngOnInit();
  }

  notifyDelete() {
    this.blockUI.start();
    this.getCompaginData();
    // this.blockUI.stop();
  }

  getCompaginData() {
    this.allRows = this.whishlistService.getWhishlistCampaginFromLocalStorage();
    this.dataGetted = true;
    this.blockUI.stop();
    if (this.allRows === null) {
      this.allRows = [];
    }
  }
  ngOnInit() {
    this.whishlistService.removeItem.subscribe(
      res => {
        const index = this.allRows.findIndex(item => item.campaign_id === res);
        if (index !== -1) {
          this.allRows.splice(index, 1);
        }
      }
    );
  }

}
