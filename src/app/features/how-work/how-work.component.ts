import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
@Component({
  selector: 'app-how-work',
  templateUrl: './how-work.component.html',
  styleUrls: ['./how-work.component.scss']
})
export class HowWorkComponent implements OnInit {

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
