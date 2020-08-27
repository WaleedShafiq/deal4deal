import { LanguageService } from './../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {
  currentlanguage: any;
  checkedAr = false;
  checkedEn = false;

  language = localStorage.getItem('Lang');
  constructor(private translate: TranslateService,
              private languageService: LanguageService) {
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
      if (this.currentlanguage === 'en') {
        this.checkedEn = true;
      } else {
        this.checkedAr  = true;
      }
    }, error => {
    }, () => {
    });
   }

  ngOnInit() {
  }

  ChangeLanguage(lang) {
    localStorage.setItem('Lang', lang);
    this.language = lang;
    this.languageService.ChangeLanguage(lang);
    window.location.reload();
  }

}
