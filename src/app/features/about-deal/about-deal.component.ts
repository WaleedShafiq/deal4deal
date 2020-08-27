import { LanguageService } from '@services/language.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-deal',
  templateUrl: './about-deal.component.html',
  styleUrls: ['./about-deal.component.scss']
})
export class AboutDealComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,

  ) {
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {
  }

}
