import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@services/language.service';
import { CampaginService } from '@reporsitires/campagin.service';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  allRows: any;
  currentlanguage: any;

  constructor(
    private languageService: LanguageService,
    private campaginService: CampaginService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute

  ) {

    this.languageService.language.subscribe(lang => {
      // this.translate.use(lang);
      this.currentlanguage = lang;
      this.getCarouselData();
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 5000, pause: false
    });
  }

  getCarouselData() {
    this.campaginService.getCaouselData(this.currentlanguage).subscribe(response => {
      if (response.success) {
        this.allRows = response.data;
      }
    }, error => {

    });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}?autoplay=1&controls=0`);
  }
}
