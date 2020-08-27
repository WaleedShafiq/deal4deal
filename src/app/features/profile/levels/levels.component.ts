import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LanguageService} from '../../../shared/services/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
  levels;
  currentLevelId;
  nextLevels;
  currentLevel;
  currentLanguage;
  constructor(private route: ActivatedRoute,
              private languageService: LanguageService,
              private translateService: TranslateService
              ) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.currentLevel = JSON.parse(localStorage.getItem('level'));
    this.getLevels();
  }

  getLevels() {
    this.route.data.subscribe(response => {
      this.levels = response.levels.data;
      this.nextLevels = this.levels.filter(level => {
        return level.id !== Number(this.currentLevel.id);
      });

    });
  }
}
