import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { CampaginService } from '@reporsitires/campagin.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';


@Component({
  selector: 'app-campaign',
  templateUrl: 'campaign.component.html',
  styleUrls: ['campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  currentCurrency: any;
  ClosingSoonCampagin = [];
  currentlanguage: any;
  allRows: any;
  ActiveButtonIndex: any;
  currencyName: any;
  // carousel options
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      300: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  };
  customOptionsClosing: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      300: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  };

  // carousel options

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private campaginService: CampaginService,
    private currencyLookupsService: CurrencyLookupsService

  ) {
    // const lang: any = languageService['translate'].store.currentLang;
    // this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
      this.currencyService.currency.subscribe(curr => {
        this.currentCurrency = curr;
        this.gitAllCompagin();
        this.currencyLookupsService.getCurrencyById(this.currentCurrency).subscribe(response => {
          if (response.success) {
            this.currencyName = response.data['code'];
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
    // this.getCompaginData();
    const campaginesIds: any[] = [];
    const campagines: any[] = [];
    let ob = {};

    if (localStorage.getItem('whishlist') != null) {
      const whishlist = JSON.parse(localStorage.getItem('whishlist'));
      const result = whishlist.map((element, index) => {
        let campaignsKey = `campaign_id[${index}]`;
        ob[campaignsKey] = element.campaign_id;
        campagines.push(ob);
        campaginesIds.push({ campagin_id: element.campaign_id });

      });


    }


  }

  // getCompaginData() {
  //   this.ActiveButtonIndex = 1;
  //   this.route.data.subscribe(response => {
  //     this.allRows = response.campaignData.data;
  //   });
  // }

  filterCompagin(index, status) {
    this.ActiveButtonIndex = index;
    this.blockUI.start();
    this.campaginService.getFilteredCompagin(this.currentlanguage, this.currentCurrency, status).subscribe(response => {
      if (response.success) {
        this.allRows = response.data;
        this.blockUI.stop();
      }
    }, error => {

    });

  }

  gitAllCompagin() {
    this.ActiveButtonIndex = 1;
    this.blockUI.start();
    this.campaginService.getCampagins(this.currentlanguage, this.currentCurrency).subscribe(response => {
      if (response.success) {
        this.allRows = response.data;

        this.blockUI.stop();
        for (const item of response.data) {
            if (item.status === 'Closing Soon') {
                this.ClosingSoonCampagin.push(item);
            }
        }
      }
    }, error => {

    });

  }
}
