import { NotifierService } from 'angular-notifier';
import { UserProfileRepository } from '@reporsitires/userProfileRepository';
import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';
import { Router } from '@angular/router';
import { FooterMediaService } from '@reporsitires/footer-media.service';
import { Subscription } from 'rxjs';
declare var require: any;
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  img = 'assets/img/selected-option.png';
  isLogin;
  language = localStorage.getItem('Lang');
  currency: any;
  currencyId: number;
  facebook: any;
  twitter: any;
  instgram: any;
  linkedIn: any;
@Input() currencyData: any;
subscription: Subscription;
mediaDataArray: any[] = [];
 customExpandedMobile = false;
  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private currencyLookupsService: CurrencyLookupsService,
    private userProfileRepository: UserProfileRepository,
    private notifierService: NotifierService,
    private router: Router,
    private footerService: FooterMediaService
   )  {
    this.currencyService.currency.subscribe( cur => {
      this.currencyId = cur;
    });
    // this.currencyLookupsService.getCurrencyLookups('en').subscribe(response => {
    //   if (response.success) {
    //     this.currency = response.data;
    //   }
    // });

    this.subscription = this.footerService.getMediaLinksData().subscribe(mediaData => {
      if (mediaData) {
        this.mediaDataArray.push(mediaData);
        for (const iterator of this.mediaDataArray) {
          this.facebook = iterator.mediaData.facebook;
          this.twitter = iterator.mediaData.twitter;
          this.instgram = iterator.mediaData.instgram;
          this.linkedIn = iterator.mediaData.linked_in;
        }
      }
    });





  }

  changeCurrency(currencyId) {
    this.currencyService.changeCurrency(currencyId);
    // window.location.reload();
  }
  ChangeLanguage(lang) {
    localStorage.setItem('Lang', lang);
    this.language = lang;
    this.languageService.ChangeLanguage(lang);
    if (lang === 'ar') {
      require('style-loader!../../../../styles-ar.scss');
    } else if (lang === 'en') {
      require('style-loader!../../../../styles.scss');
    }
    window.location.reload();
  }

  ngOnInit(): void {
  }

  logOut() {
    this.userProfileRepository.logOutApi().subscribe(
      res => {
        if (res['status_code'] == 200) {
          this.notifierService.notify('success', res['message']);
          localStorage.clear();
          // setTimeout(() => {
          this.router.navigate(['/login']);
          // });
        } else {
        }
      }, error => {
      }, () => {
      }
    );
  }

  expandMenuToScroll() {
    this.customExpandedMobile = !this.customExpandedMobile;
  }
}
