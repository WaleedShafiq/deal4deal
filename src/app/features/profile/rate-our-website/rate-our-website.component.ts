import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlTree} from "@angular/router";
import {Subscription} from "rxjs";
import {UserProfileRepository} from "../../../shared/repositories/userProfileRepository";
import {LanguageService} from "../../../shared/services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-rate-our-website',
  templateUrl: './rate-our-website.component.html',
  styleUrls: ['./rate-our-website.component.scss']
})
export class RateOurWebsiteComponent implements OnInit {
  urlTree: UrlTree;
  rate;
  subscription: Subscription;
  loading = false;
  asyncSuccessMessage;
  asyncErrorMessage;
  currentLanguage;
  constructor(private router: Router,
              private  service: UserProfileRepository,
              private languageService: LanguageService,
              private translateService: TranslateService
              ) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.urlTree = this.router.parseUrl(this.router.url);
    this.rate = this.urlTree.root.children[PRIMARY_OUTLET].segments[2].path;
  }

  rateOurApp(value) {
    this.rate = value;
  }

  submit() {
    this.loading = true;
    const data = {
      id: localStorage.getItem('userId'),
      rate: this.rate
    };
    this.subscription = this.service.rateApp(data).subscribe(
      res => {
        if (res['status_code'] == 200) {
          this.loading = false;
          this.asyncSuccessMessage = res['message'];
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 5000);
        } else {
          this.asyncErrorMessage = res['message'];
        }
      }, error => {
        this.loading = false;

      }, () => {
      }
    );
  }

}
