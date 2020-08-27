import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CurrencyService } from '@services/currency.service';
import { LanguageService } from '@services/language.service';
import { CartsService } from '@reporsitires/carts.service';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';
declare var require: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  currencyData: any;
  language = 'en';
  constructor(
    private translate: TranslateService,
    private router: Router,
    private currencyService: CurrencyService,
    private languageService: LanguageService,
    private cartService: CartsService,
    private currencyLookupsService: CurrencyLookupsService) {
      this.currencyLookupsService.getCurrencyLookups().subscribe(response => {
        if (response.success) {
          this.currencyData = response.data;
          const dirhamObject = response.data.find(i => i.code === 'AED');
          this.currencyService.changeCurrency(dirhamObject.id);
        }
      });
    }


  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
    let checkoutProcess = localStorage.getItem('checkout');
    this.cartService.ChangeCheckoutProcess(checkoutProcess);

    this.checkForLoading();

    // this.currencyLookupsService.getCurrencyLookups('en').subscribe(response => {
    //   if (response.success) {
    //     console.log(response.data);
    //     this.currencyLookupsService.currenctData = response.data;
    //     const dirhamObject = response.data.find(i => i.code === 'AED');
    //     console.log(dirhamObject);
    //     this.currencyService.changeCurrency(dirhamObject.id);
    //   }
    // });


    let lang = 'en';
    this.translate.setDefaultLang(lang);
    lang = localStorage.getItem('Lang') || lang;
    localStorage.setItem('Lang', lang);
    this.translate.use(lang);
    this.languageService.language.next(lang);

    if (lang === 'ar') {
      const body = document.querySelector('body');
      body.classList.toggle('body-right');
      require('style-loader!../../styles-ar.scss');
    } else if (lang === 'en') {
      require('style-loader!../../styles.scss');
    }
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 50 && window.innerWidth > 1000) {
      const element = document.getElementById('headerNavbar');
      const navigateButton = document.getElementById('navigateButton');
      navigateButton.classList.add('showNavigationButton');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('headerNavbar');

      const navigateButton = document.getElementById('navigateButton');
      navigateButton.classList.remove('showNavigationButton');
      element.classList.remove('sticky');

    }
    if (window.pageYOffset > 50 && window.innerWidth < 1000) {
        const element = document.getElementById('mobileNavbar');
        element.classList.add('stickyMobile');
    } else {
      const element = document.getElementById('mobileNavbar');
      element.classList.remove('stickyMobile');

    }
  }

   checkForLoading() {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
   }

   navigateToTop() {
      window.scrollTo(0, 0);
   }
}

