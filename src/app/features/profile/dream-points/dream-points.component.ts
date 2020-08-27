import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../../../shared/services/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dream-points',
  templateUrl: './dream-points.component.html',
  styleUrls: ['./dream-points.component.scss']
})
export class DreamPointsComponent implements OnInit {
  currentLanguage;
  points = JSON.parse(localStorage.getItem('points'));
  constructor(private languageService: LanguageService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
  }

}
