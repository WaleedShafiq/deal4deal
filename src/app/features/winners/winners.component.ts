import { Configuration } from '@core/configuration';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
  allRows: any;
  ImageURL: any;
  currentlanguage: any;
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText : ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    nav: true
  };
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private config: Configuration
  ) {
    this.ImageURL = this.config.HostUrlImages;
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
      this.getWinnersData();
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {
  }
  getWinnersData() {
    this.route.data.subscribe(response => {
      this.allRows = response.winners.data;
    });
  }
}
