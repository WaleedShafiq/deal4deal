import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from '../../core/configuration';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.scss']
})
export class CharitiesComponent implements OnInit {
  allRows: any;
  readMore = false;
  baseURL: string;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private configurationService: Configuration
  ) {
    this.baseURL = configurationService.HostUrlImages;
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.getCharitiesData();
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {
  }
  getCharitiesData() {
    this.route.data.subscribe(response => {
      this.allRows = response.charities.data;
    });
  }
  readMoreDataCgarities() {
    this.readMore = !this.readMore;
  }
}

