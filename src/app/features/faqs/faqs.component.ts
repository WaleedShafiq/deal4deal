import { LanguageService } from '@services/language.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService

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
