import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../shared/services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  currentLanguage: string;

  constructor(private languageService: LanguageService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
  }

}
