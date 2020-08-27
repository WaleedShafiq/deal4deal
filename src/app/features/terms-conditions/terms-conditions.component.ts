import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router

  ) {
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(language => {
      this.translate.use(language);
    }, error => {
    }, () => {
    });
  }
  ngOnInit() {
  }

}
